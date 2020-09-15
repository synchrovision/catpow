<?php
namespace Catpow\template_item;
/**
* テンプレートファイルで使用される要素
*/

abstract class php extends template_item{
	public static function render($path_data,$conf_data,$code_data,$indent=0){
		$is_line_start=true;
		$is_single_line=(count($code_data)<2 or (count($code_data)==2 and is_string(next($code_data))));
		$tag_data=reset($code_data);
		if(empty($tag_data) || $tag_data==='_'){
			while($val=next($code_data)){
				if(is_string($val) and $val[0]=='@'){
					$val=explode(' ',substr($val,1));
					$class_name=\cp::get_class_name('template_item','php',array_shift($val));
					$val=$class_name::get_code_data($path_data,$conf_data,$val);
				}
				if(is_array($val)){
					self::render($path_data,$conf_data,$val,$tag_data==='_'?$indent+1:$indent);
				}else{
					printf(str_repeat("\t",$indent)."%s\n",$val);
				}
			}
		}
		else{
			if(preg_match('/^\/?\w+\/?/',$tag_data,$tag)){$tag=$tag[0];}else{$tag='div';}
			if(substr($tag,0,1)=='/'){$open=false;$tag=substr($tag,1);}else{$open=true;}
			if(substr($tag,-1)=='/'){$close=false;$tag=substr($tag,0,-1);}else{$close=true;}
			$attr='';
			if(preg_match('/(?<=#)[\w\-_]+/',$tag_data,$id)){$attr.=sprintf(' id="%s"',$id[0]);}
			if(preg_match_all('/(?<=\.)[\w\-_]+/',$tag_data,$class)){$attr.=sprintf(' class="%s"',implode(' ',$class[0]));}
			if(preg_match('/(?<=\[).+(?=\])/',$tag_data,$at)){$attr.=' '.$at[0];}
			if($tag=='exit')return false;
			if($tag=='php'){
				echo str_repeat("\t",$indent);
				print('<?php'.($is_single_line?' ':"\n"));
				while($val=next($code_data)){
					if(is_array($val)){
						if(parent::render($path_data,$conf_data,$val,$indent+1)==false)return false;
					}
					elseif($is_single_line){
						echo($val);
					}
					else{
						printf(str_repeat("\t",$indent)."%s\n",$val);
					}
				}
				print(($is_single_line?' ':str_repeat("\t",$indent))."?>\n");

			}
			elseif(in_array($tag,['br','img','hr','meta','input','embed','area','base','col','keygen','link','param','source'])){
				echo str_repeat("\t",$indent);
				printf("<%s%s/>\n",$tag,$attr);
			}
			else{
				if($open){
					echo str_repeat("\t",$indent);
					printf('<%s%s>',$tag,$attr);
					if(!$is_single_line)echo "\n";
				}
				while($val=next($code_data)){
					if(is_string($val) and $val[0]=='@'){
						$val=explode(' ',substr($val,1));
						$class_name=\cp::get_class_name('template_item','php',array_shift($val));
						$val=$class_name::get_code_data($path_data,$conf_data,$val);
					}
					if(is_array($val)){
						if(self::render($path_data,$conf_data,$val,$indent+1)==false)return false;
					}else if($is_single_line){
						echo($val);
					}else{
						printf(str_repeat("\t",$indent+1)."%s\n",$val);
					}
				}
				if(!$is_single_line)echo str_repeat("\t",$indent);
				if($close)printf("</%s>\n",$tag);
			}
		}
		return true;
	}
}

?>
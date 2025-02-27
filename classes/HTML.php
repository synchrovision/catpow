<?php
namespace Catpow;

class HTML{
	public static function parse_tag_data($tag_data){
		if(preg_match('/^\w+/',$tag_data,$tag)){$tag=$tag[0];}else{$tag=false;}
		$base_tag_data=preg_replace('/\[.+?\]/','',$tag_data);
		$attr='';
		if(preg_match('/(?<=#)[\w\-_]+/',$base_tag_data,$id)){$id=$id[0];$attr.=sprintf(' id="%s"',$id);}else{$id=false;}
		if(preg_match_all('/(?<=\.)[\w\-_]+/',$base_tag_data,$class)){
			$attr.=sprintf(' class="%s"',implode(' ',$class[0]));$class=$class[0];
		}else{$class=false;}
		if(preg_match('/(?<=\[).+(?=\])/',$tag_data,$at)){$attr.=' '.$at[0];}
		return compact('tag','id','class','attr');
	}
	public static function html($tag_data,$content){
		$tag_data=self::parse_tag_data($tag_data);
		if(empty($content))return sprintf("<%s%s/>\n",$tag_data['tag'],$tag_data['attr']);
		return sprintf('<%1$s%2$s>%3$s</%1$s>',$tag_data['tag'],$tag_data['attr'],$content);
	}
	public static function tag($tag=false,$attr=false){
		static $tags;
		if($tag===false){return printf('</%s>',array_pop($tags));}
		$tag_data=self::parse_tag_data($tag);
		if($attr){
			foreach($attr as $key=>$val){
				if(is_array($val)){$val=json_encode($val);}
				$tag_data['attr'].=' '.$key.'="'.$val.'"';
			}
		}
		$tags[]=$tag_data['tag'];
		printf('<%s%s>',$tag_data['tag'],$tag_data['attr']);
	}
	public static function render($data,$context=[]){
		$props=[];
		$children=[];
		foreach($data as $key=>$val){
			if($key===0){$tag=$val;}
			elseif(is_int($key)){$children[]=$val;}
			elseif($key==='children'){$children=array_merge($children,$val);}
			else{$props[$key]=$val;}
		}
		$classes=[];
		$tag=preg_replace_callback('/(\.|#)([\w\-]++)/',function($matches)use(&$props,&$classes){
			if($matches[1]==='#'){$props['id']=$matches[2];}
			else{$classes[]=$matches[2];}
		},$tag);
		if(empty($tag)){$tag='div';}
		if(!empty($classes)){
			if(empty($props['class'])){$props['class']=$classes;}
			elseif(is_array($props['class'])){$props['class']=array_merge($classes,$props['class']);}
			else{$props['class']=implode(' ',$classes).' '.$props['class'];}
		}
		if(empty($props['class'])){$props['class']='_'.$tag;}

		if(empty($context['bem'])){$context['bem']=$bem=new Bem();}
		else{$bem=$context['bem'];}
		$props['class']=$bem->start($props['class']);

		$attr='';
		foreach($props as $key=>$val){
			if(empty($val)){continue;}
			if($val===true){$attr.=' '.$key;continue;}
			if(is_array($val)){
				if($key==='style'){
					$style='';
					foreach($val as $k=>$v){$style.="{$k}:{$v};";}
					$attr.=sprintf(' %s="%s"',$key,$style);
				}
				else{
					$attr.=sprintf(" %s='%s'",$key,json_encode($val,0540));
				}
			}
			else{
				$attr.=sprintf(' %s="%s"',$key,$val);
			}
			
		}

		printf('<%s%s>',$tag,$attr);
		if(!empty($children)){
			foreach($children as $child){
				if(is_array($child)){
					self::render($child,$context);
				}
				else{
					echo $child;
				}
			}
		}
		printf('</%s>',$tag);
		$bem->end();
	}
}


?>

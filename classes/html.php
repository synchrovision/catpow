<?php
namespace Catpow;

class html{
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
}


?>
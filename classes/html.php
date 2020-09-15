<?php
namespace Catpow;

class html{
	
	public static function gen($str,$format_set=''){
		if(is_string($format_set)){
			include(\cp::get_file_path("cp_html_format/{$format_set}.php"));
		}
		if(is_array($format_set))extract($format_set);
		if(isset($char_style)){
			foreach($char_style as $reg=>$tag_data){
				$str=preg_replace_callback('/'.$reg.'/',$str,function($str)use($tag_data){
					return self::html($tag_data,$str);
				});
			}
		}
		if(isset($para_style)){
			$str_arr=explode("\n",$str);
			foreach($para_style as $marker=>$tag_data){
				$len=strlen($marker);
				foreach($str_arr as &$str){
					if(substr($str,0,$len)==$marker){
						$str=self::html($tag_data,substr($str,$len));
					}
				}
			}
			$str=implode("\n",$str_arr);
		}
		if(isset($frame_style)){
			$ff_cb=function($str_data)use(&$ff_cb,&$frame_style){
				$tag_data=current($ffs);
				$str_arr=explode(key($ffs),$str_data);
				if(next($frame_style)===false){
					foreach($str_arr as &$str){
						$str=self::html($tag_data,$str);
					}
				}
				else{
					foreach($str_arr as &$str){
						$str=self::html($tag_data,$ff_cb($str));
					}
				}
				prev($frame_style);
				return implode('',$str_arr);
			};
			$str=$ff_cb($str);
		}
	}
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

	public static function html_wrap_each($tag_data,$contents,$delimiter="\n"){
		$tag_data=self::parse_tag_data($tag_data);
		$rtn='';
		foreach(explode($delimiter,$contents) as $content){
			$rtn.=sprintf('<%1$s%2$s>%3$s</%1$s>',$tag_data['tag'],$tag_data['attr'],$content);
		}
		return $rtn;
	}

}


?>
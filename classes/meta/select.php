<?php
namespace Catpow\meta;

class select extends meta{
	public static
		$input_type='select';
	
	public static function output($meta,$prm){
		$sels=static::get_selections($meta);
		$v=$meta->value;
		foreach($sels as $key=>$val){
			if(is_array($val)){
				foreach($val as $k=>$s){
					if($s==$v){return '<span class="select_item">'.(is_int($k)?$s:$k).'</span>';}
				}
			}
			elseif($val==$v){return '<span class="select_item">'.(is_int($key)?$val:$key).'</span>';}
		}
	}
	public static function input($meta,$prm){
		$sels=static::get_selections($meta);
		return static::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
	
	public static function get_selections($meta){
		if(isset($meta->conf['value'])){
			$rtn=is_callable($meta->conf['value'])?$meta->conf['value']($meta):$meta->conf['value'];
		}
		else{$rtn=[];}
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
	public static function get_input($path,$conf,$sels,$val){
		if(empty($val))$val='';
		$rtn=sprintf(
			'<select id="%s" name="%s" tabindex="%s"%s>',
			\cp::get_input_id($path),
			\cp::get_input_name($path),
			\cp::get_tabindex(),
			\cp::get_input_attr($path,$conf)
		);
		$rtn.=sprintf('<option value="0">%s</option>',$conf['defaultLabel']??'---');
		foreach($sels as $i=>$s){
			if(is_array($s)){
				$rtn.=sprintf('<optgroup label="%s">',$i);
				foreach($s as $ii=>$ss){
					$rtn.=sprintf('<option value="%s"%s>%s</option>',$ss,($ss==$val)?' selected="selected"':'',is_int($ii)?$ss:$ii);
				}
				$rtn.='</optgroup>';
			}else{
				$rtn.=sprintf('<option value="%s"%s>%s</option>',$s,($s==$val)?' selected="selected"':'',is_int($i)?$s:$i);
			}
		}
		$rtn.='</select>';
		return $rtn;
	}
	
	public static function resolve_conf($conf){
		$conf['value']=static::get_selections(new \Catpow\content\meta(['conf'=>$conf]));
		return $conf;
	}
}
?>
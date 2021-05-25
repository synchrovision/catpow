<?php
namespace Catpow\meta;

class checkbox extends select{
	public static
		$input_type='checkbox',
		$is_bulk_input=true;
	
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return self::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
	
	public static function get_input($path,$conf,$sels,$vals){
		$rtn=sprintf('<div%s>',\cp::get_unit_attr($path,$conf));
		$label_attrs=\cp::get_label_attrs($path,$conf,$sels);
		if(empty($vals))$vals=[''];
		
		foreach((array)$sels as $i=>$s){
			if(is_array($s)){
				$rtn.=sprintf('<fieldset><legend>%s</legend>',$i);
				foreach($s as $ii=>$ss){
					$index=\cp::get_tabindex();
					$rtn.=sprintf(
						'<span class="checkbox"><input id="%s" type="checkbox" name="%s" value="%s"%s><label class="label" for="%1$s"%s>%s</label></span>',
						\cp::get_input_id($path.'/'.$index),\cp::get_input_name($path.'/'.$index),
						$ss,in_array($ss,$vals)?' checked="checked"':'',
						isset($label_attrs[$ss])?$label_attrs[$ss]:'',
						is_int($ii)?$ss:$ii
					);
				}
				$rtn.='</fieldset>';
			}else{
				$index=\cp::get_tabindex();
				$label_attr=isset($label_attrs[$s])?$label_attrs[$s]:'';
				$rtn.=sprintf(
					'<span class="checkbox"><input id="%s" type="checkbox" name="%s" value="%s"%s><label class="label" for="%1$s"%s>%s</label></span>',
					\cp::get_input_id($path.'/'.$index),\cp::get_input_name($path.'/'.$index),
					$s,in_array($s,$vals)?' checked="checked"':'',
					isset($label_attrs[$s])?$label_attrs[$s]:'',
					is_int($i)?$s:$i
				);
			}
		}
		$rtn.='</div>';
		return $rtn;
	}
}
?>
<?php
namespace Catpow\meta;

class radio extends select{
	public static
		$input_type='radio',
		$input_layout='block';
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return self::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
	
	public static function get_input($path,$conf,$sels,$val){
		$rtn=sprintf('<div%s>',\cp::get_item_attr($path,$conf));
		$label_attrs=\cp::get_label_attrs($path,$conf,$sels);
		
		foreach($sels as $i=>$s){
			if(is_array($s)){
				$rtn.=sprintf('<fieldset><legend>%s</legend>',$i);
				foreach($s as $ii=>$ss){
					$rtn.=sprintf(
						'<span class="radio"><input id="%s" type="radio" name="%s" value="%s"%s><label class="label" for="%1$s"%s>%s</label></span>',
						\cp::get_input_id($path).'--'.\cp::get_tabindex(),\cp::get_input_name($path),
						$ss,($ss==$val)?' checked="checked"':'',
						isset($label_attrs[$s])?$label_attrs[$s]:'',
						is_int($ii)?$ss:$ii
					);
				}
				$rtn.='</fieldset>';
			}else{
				$label_attr=isset($label_attrs[$s])?$label_attrs[$s]:'';
				$rtn.=sprintf(
					'<span class="radio"><input id="%s" type="radio" name="%s" value="%s"%s><label class="label" for="%1$s"%s>%s</label></span>',
					\cp::get_input_id($path).'--'.\cp::get_tabindex(),\cp::get_input_name($path),
					$s,($s==$val)?' checked="checked"':'',
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
<?php
namespace Catpow\meta;

class radio extends select{
	public static
		$input_type='radio';
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
						'<label class="radio" for="%2$s--%4$s"%s><input id="%s--%4$s" type="radio" name="%s" tabindex="%s" value="%s"%s>%s</label>',
						isset($label_attrs[$ss])?$label_attrs[$ss]:'',
						\cp::get_input_id($path),\cp::get_input_name($path),\cp::get_tabindex(),
						$ss,($ss==$val)?' checked="checked"':'',is_int($ii)?$ss:$ii
					);
				}
				$rtn.='</fieldset>';
			}else{
				$label_attr=isset($label_attrs[$s])?$label_attrs[$s]:'';
				$rtn.=sprintf(
					'<label class="radio" for="%2$s--%4$s"%s><input id="%s--%4$s" type="radio" name="%s" tabindex="%s" value="%s"%s>%s</label>',
					isset($label_attrs[$s])?$label_attrs[$s]:'',
					\cp::get_input_id($path),\cp::get_input_name($path),\cp::get_tabindex(),
					$s,($s==$val)?' checked="checked"':'',is_int($i)?$s:$i
				);
			}
		}
		$rtn.='</div>';
		return $rtn;
	}
}
?>
,$prm<?php
namespace Catpow\meta;

class submit extends select{
	
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return self::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
	
	public static function get_input($path,$conf,$sels,$val){
		$rtn=sprintf('<div%s>',static::get_input_item_attr($path,$conf));
		$label_attrs=static::get_label_attrs($path,$conf,$sels);
		$n=0;
		foreach($sel as $i=>$s){
			if(is_array($s)){
				$rtn.=sprintf('<fieldset><legend>%s</legend>>',$i);
				foreach($s as $ii=>$ss){
					$_name=array_merge((array)$name,array($n++));
					$rtn.=sprintf(
						'<label class="submit" for="%2$s-%4$s"%s><input id="%s-%4$s" type="submit" name="%s" tabindex="%s" value="%s">%s</label>',
						isset($label_attrs[$ss])?$label_attrs[$ss]:'',
						get_input_id($_name),get_input_name($_name),get_tabindex(),
						$ss,is_int($ii)?$ss:$ii
					);
				}
				$rtn.='</fieldset>';
			}else{
				$_name=array_merge((array)$name,array($n++));
				$rtn.=sprintf(
					'<label class="submit" for="%2$s-%4$s"%s><input id="%s-%4$s" type="submit" name="%s" tabindex="%s" value="%s">%s</label>',
					isset($label_attrs[$s])?$label_attrs[$s]:'',
					get_input_id($_name),get_input_name($_name),get_tabindex(),
					$s,is_int($i)?$s:$i
				);
			}
		}
		$rtn.='</div>';
		return (array)$rtn;
	}
}
?>
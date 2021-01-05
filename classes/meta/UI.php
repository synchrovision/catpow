<?php
namespace Catpow\meta;

class UI extends meta{
	public static $ui=null,$input_type=false,$output_type=false,$defaultParam=[];
	
	public static function output($meta,$prm){
		if(static::$output_type===false){
			$prm=array_merge((array)$prm,['value'=>$meta->value]);
			if(static::$is_bulk_output){$prm['value']=array_values($prm['value']);}
			return self::get_output($meta->the_data_path,$meta->conf,static::fill_param($prm,$meta));
		}
		$class_name=\cp::get_class_name('meta',static::$output_type);
		return $class_name::output($meta,$prm);
	}
	public static function input($meta,$prm){
		if(static::$input_type===false){
			$prm=array_merge((array)$prm,['value'=>$meta->value,'name'=>\cp::get_input_name($meta->the_data_path)]);
			if(static::$is_bulk_input){$prm['value']=array_values($prm['value']);}
			return self::get_input($meta->the_data_path,$meta->conf,static::fill_param($prm,$meta));
		}
		$class_name=\cp::get_class_name('meta',static::$input_type);
		return $class_name::input($meta,$prm);
	}
	
	public static function fill_param($prm,$meta){
		$prm=(array)$prm;
		if(empty(static::$defaultParam)){return $prm;}
		
		return array_map(
			function($item)use($meta){
				if(is_callable($item)){return $item($prm,$meta);}
				return $item;
			},
			array_filter(
				array_merge(
					static::$defaultParam,
					array_intersect_key($meta->conf,static::$defaultParam),
					$prm
				),
				function($v){return isset($v);}
			)
		);
	}
	public static function get_output($path,$conf,$prm){
		$ui=$conf['ui']??static::$ui??static::get_type();
		\cp::use_ui_output($ui);
		$id=\cp::get_input_id($path).'--ui';
		
		ob_start();
		?>
		<div id="<?=$id?>" data-ui="<?=$ui?>">
			<script type="text/javascript">
				jQuery(function($){
					window.Catpow.uiProps=window.Catpow.uiProps || {};
					window.Catpow.uiProps['<?=$id?>']=<?=json_encode($prm)?>;
					wp.element.render(
						wp.element.createElement(
							Catpow.UI.<?=$ui?>Output,
							window.Catpow.uiProps['<?=$id?>']
						),
						document.getElementById("<?=$id?>")
					);
				});
			</script>
		</div>
		<?php
		return ob_get_clean();
	}
	public static function get_input($path,$conf,$prm){
		$ui=$conf['ui']??static::$ui??static::get_type();
		\cp::use_ui_input($ui);
		$id=\cp::get_input_id($path).'--ui';
		
		ob_start();
		?>
		<div id="<?=$id?>" data-ui="<?=$ui?>">
			<script type="text/javascript">
				jQuery(function($){
					window.Catpow.uiProps=window.Catpow.uiProps || {};
					window.Catpow.uiProps['<?=$id?>']=<?=json_encode($prm)?>;
					wp.element.render(
						wp.element.createElement(
							Catpow.UI.<?=$ui?>,
							window.Catpow.uiProps['<?=$id?>']
						),
						document.getElementById("<?=$id?>")
					);
				});
			</script>
		</div>
		<?php
		return ob_get_clean();
	}
}
?>
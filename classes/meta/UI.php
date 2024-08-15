<?php
namespace Catpow\meta;

class UI extends meta{
	public static $ui=null,$input_type=false,$output_type=false,$input_layout='block',$defaultParam=[];
	
	public static function export($data_type,$data_name,$id,$meta_name,$conf){
		if(static::$output_type===false){
			return static::get($data_type,$data_name,$id,$meta_name,$conf);
		}
		$class_name=\cp::get_class_name('meta',static::$output_type);
		return $class_name::export($data_type,$data_name,$id,$meta_name,$conf);
	}
	public static function import($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(static::$output_type===false){
			return static::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
		}
		$class_name=\cp::get_class_name('meta',static::$output_type);
		return $class_name::import($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	
	public static function output($meta,$prm){
		if(static::$output_type===false){
			$prm=array_merge((array)$prm,['value'=>$meta->value]);
			if(static::$is_bulk_output){$prm['value']=array_values($prm['value']);}
			return static::get_output($meta->the_data_path,$meta->conf,static::fill_param($prm,$meta));
		}
		$class_name=\cp::get_class_name('meta',static::$output_type);
		return $class_name::output($meta,$prm);
	}
	public static function input($meta,$prm){
		if(static::$input_type===false){
			$prm=array_merge((array)$prm,['value'=>$meta->value,'name'=>\cp::get_input_name($meta->the_data_path)]);
			if(static::$is_bulk_input){$prm['value']=array_values($prm['value']);}
			return static::get_input($meta->the_data_path,$meta->conf,static::fill_param($prm,$meta));
		}
		$class_name=\cp::get_class_name('meta',static::$input_type);
		return $class_name::input($meta,$prm);
	}
	public static function get_props($meta){
		if(!empty(static::$output_type)){
			$class_name=\cp::get_class_name('meta',static::$output_type);
			return $class_name::get_props($meta);
		}
		return ['value'=>$meta->value];
	}
	
	public static function fill_param($param,$meta){
		$param=(array)$param;
		$ui=$meta->conf['ui']??static::$ui??static::get_type();
		if(!empty(static::$defaultParam)){
			$param=array_map(
				function($item)use($meta){
					if(is_callable($item)){return $item($param,$meta);}
					return $item;
				},
				array_filter(
					array_merge(
						static::$defaultParam,
						array_intersect_key($meta->conf,static::$defaultParam),
						$param
					),
					function($v){return isset($v);}
				)
			);
		}
		if($f=\cp::get_file_path('ui/'.$ui.'/fill_param.php')){include $f;}
		return $param;
	}
	public static function get_output($path,$conf,$prm){
		$ui=$conf['ui']??static::$ui??static::get_type();
		\cp::use_ui_output($ui);
		$id=\cp::get_input_id($path).'--ui';
		
		ob_start();
		?>
		<div id="<?=$id?>" data-ui="<?=$ui?>">
			<script type="text/javascript">
				(async()=>{
					if(document.readyState==='loading'){
						await new Promise((resolve)=>{document.addEventListener('DOMContentLoaded',resolve);});
					}
					window.Catpow.UI.props=window.Catpow.UI.props || {};
					window.Catpow.UI.props['<?=$id?>']=<?=json_encode($prm)?>;
					wp.element.render(
						wp.element.createElement(
							Catpow.UI.<?=$ui?>Output,
							window.Catpow.UI.props['<?=$id?>']
						),
						document.getElementById("<?=$id?>")
					);
				})();
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
				(async()=>{
					if(document.readyState==='loading'){
						await new Promise((resolve)=>{document.addEventListener('DOMContentLoaded',resolve);});
					}
					window.Catpow.UI.props=window.Catpow.UI.props || {};
					window.Catpow.UI.props['<?=$id?>']=<?=json_encode($prm)?>;
					wp.element.render(
						wp.element.createElement(
							Catpow.UI.<?=$ui?>,
							window.Catpow.UI.props['<?=$id?>']
						),
						document.getElementById("<?=$id?>")
					);
				})();
			</script>
		</div>
		<?php
		return ob_get_clean();
	}
	public static function resolve_conf($conf){
		if(empty($conf['ui'])){$conf['ui']=static::$ui??static::get_type();}
		if(!empty(static::$output_type)){
			$class_name=\cp::get_class_name('meta',static::$output_type);
			return $class_name::resolve_conf($conf);
		}
		return $conf;
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(static::$output_type===false){
			meta::reflect_to_query($query,$data_type,$data_name,$meta_name,$id,$input,$conf);
		}
		else{
			$class_name=\cp::get_class_name('meta',static::$output_type);
			$class_name::reflect_to_query($query,$data_type,$data_name,$meta_name,$id,$input,$conf);
		}
	}
}
?>
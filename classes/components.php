<?php
namespace Catpow;;
use Catpow\util\schema;

class components{
	public static function get_config($component,$params=[]){
		if(!empty($config_file=\cp::get_file_path("components/{$component}/config.php"))){
			$config=include $config_file;
		}
		elseif(!empty($schema_json=\cp::get_file_path("components/{$component}/schema.json"))){
			$config=[
				'schema'=>json_decode(file_get_contents($schema_json),true)
			];
		}
		else{
			$config=[];
		}
		if(!empty($params['$defs'])){
			$config['schema']['$defs']=array_merge($params['$defs'],$config['schema']['$defs']??[]);
		}
		$config['components']=self::get_sub_components($component);
		foreach($config['components'] as $component_name=>$component_config){
			$config['schema']['$defs'][$component_config['type']]['properties']['component']['enum'][]=$component_name;
			$config['schema']['$defs'][$component_config['type']]['oneOf'][]=array_merge_recursive(
				['properties'=>['component'=>['const'=>$component_name]]],
				$component_config['schema']??[]
			);
		}
		if(!empty($config['schema'])){
			$config['defaultProps']=self::get_default_props_from_schema($config['schema'],$params);
			$config['useEditors']=array_keys(get_object_vars(self::get_required_editor_flags($config['schema'])));
		}
		return $config;
	}
	private static function get_required_editor_flags($schema,$flags=null){
		if(is_null($flags)){$flags=new \stdClass();}
		static $schema_keys=[
			'definitions'=>true,'$defs'=>true,'properties'=>true,'items'=>false,
			'allOf'=>true,'anyOf'=>true,'oneOf'=>true,
			'if'=>false,'then'=>false,'else'=>false,
			'dependentSchemas'=>true
		];
		if(!empty($schema['@editor'])){$flags->{$schema['@editor']}=true;}
		foreach($schema_keys as $key=>$is_multiple){
			if(isset($schema[$key])){
				if($is_multiple){
					foreach($schema[$key] as $sub_schema){
						self::get_required_editor_flags($sub_schema,$flags);
					}
				}
				else{
					self::get_required_editor_flags($schema[$key],$flags);
				}
			}
		}
		return $flags;
	}
	public static function get_sub_components($root_component){
		static $cache;
		if(isset($cache[$root_component])){return $cache[$root_component];}
		$components=[];
		foreach(\cp::get_file_paths("components/{$root_component}") as $dir){
			foreach(glob($dir.'/*/config.php') as $config_php){
				$component_name=basename(dirname($config_php));
				if(empty($components[$component_name])){$components[$component_name]=include $config_php;}
			}
			foreach(glob($dir.'/*/schema.json') as $schema_json){
				$component_name=basename(dirname($schema_json));
				if(empty($components[$component_name]['schema'])){$components[$component_name]['schema']=json_decode(file_get_contents($schema_json),true);}
			}
		}
		return $cache[$root_component]=$components;
	}
	public static function get_default_props_from_schema($schema,$params=[]){
		$schemaObj=new schema($schema,$params['resolve_schema']??null);
		$default_value=$schemaObj->get_default_value($params['get_default_value']??null);
		return $default_value;
	}
}
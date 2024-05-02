<?php
namespace Catpow;
use Catpow\util\schema;
use Catpow\util\Keynames;

class MenuManager{
	const USE_IMAGE=01,HIERARCHICAL=02;
	//resolve
	public static function resolve_props_for_menu_component($menu_component,$props){
		if(empty($props)){$props=[];}
		$data=is_array($props)?$props:json_decode($props,true);
		self::resolve_props_items_for_menu_component($menu_component,$data);
		$data['siteInfo']=[
			'url'=>get_bloginfo('url',true),
			'path'=>parse_url(get_bloginfo('url'),\PHP_URL_PATH),
			'name'=>get_bloginfo('name'),
			'description'=>get_bloginfo('description')
		];
		if(current_theme_supports('custom-logo') && $logo_id=get_theme_mod('custom_logo')){
			$data['siteInfo']['logo']=array_combine(
				['src','width','height','resized'],
				wp_get_attachment_image_src($logo_id,'full')
			);
		}
		return json_encode($data,0500);
	}
	protected static function resolve_props_items_for_menu_component($menu_component,&$items){
		if(empty($items)){return;}
		foreach($items as $key=>$val){
			if($key==='url' && is_string($val) && $val[0]==='/'){$items[$key]=home_url($val);}
			if(is_array($val)){
				if(isset($val['@query'])){
					$items[$key]['items']=self::get_menu_items_by_query(
						$val['@query']['path']??'post/page',
						$val['@query']['query']??null,
						$val['@query']['flags']??self::HIERARCHICAL
					);
				}
				else{
					self::resolve_props_items_for_menu_component($menu_component,$items[$key]);
				}
			}
		}
	}
	
	//items
	public static function get_panel_menu_item_for_post_type($post_type){
		$config=$GLOBALS['post_types'][$post_type];
		$is_hierarchical=is_post_type_hierarchical($post_type);
		post_type_supports($post_type,'thumbnail');
		$item=[
			'@type'=>'Panel',
			'title'=>$config['label']??$post_type,
			'name'=>$post_type,
			'columns'=>[
				['size'=>1,'contents'=>[
					['@type'=>'Header','title'=>$config['label']??$post_type]

				]],
				['size'=>3,'contents'=>[

				]]
			]
		];
		return $item;
	}
	public static function get_menu_items_by_query($path,$query=[],$flags=0){
		$items=[];
		if(empty($query['limit'])){$query['limit']=-1;}
		foreach(loop($path,$query) as $obj){
			$item=[
				'@type'=>'Link',
				'title'=>CP::$content->the_title,
				'name'=>CP::$content->the_name,
				'id'=>CP::$content->the_id,
				'parent'=>CP::$content->the_parent,
				'url'=>CP::$content->the_url
			];
			if(self::USE_IMAGE & $flags){$item['image']=CP::$content->get_the_image_url('vga');}
			$items[]=$item;
		}
		if(self::HIERARCHICAL & $flags){
			$tree=[];
			$items=array_column($items,null,'id');
			foreach($items as $id=>$item){
				if(empty($item['parent'])){
					$tree[]=&$items[$id];
				}
				else{
					$items[$item['parent']]['children'][]=&$items[$id];
				}
			}
			return $tree;
		}
		return $items;
	}
	public static function get_menu_item_for_post_type($post_type){
		if(is_string($post_type)){$post_type=get_post_type_object($post_type);}
		if(empty($post_type) || !$post_type->has_archive){return null;}
		return [
			'@type'=>'Link',
			'title'=>$post_type->label,
			'name'=>$post_type->name,
			'url'=>get_post_type_archive_link($post_type->name)
		];
	}
	
	//config
	public static function get_config_for_menu_component($menu_component){
		$config_file=\cp::get_file_path("components/{$menu_component}/config.php");
		$config=include $config_file;
		$config['schema']['$defs']=array_merge(self::get_basic_definitions(),$config['schema']['$defs']??[]);
		foreach(self::get_all_components_for_menu_component($menu_component) as $component_name=>$component_config){
			$config['schema']['$defs'][$component_config['type']]['properties']['component']['enum'][]=$component_name;
			$config['schema']['$defs'][$component_config['type']]['oneOf'][]=array_merge_recursive(
				['properties'=>['component'=>['const'=>$component_name]]],
				$component_config['schema']??[]
			);
		}
		$config['defaultProps']=self::get_default_props_from_schema($config['schema']);
		return $config;
	}
	public static function get_all_components_for_menu_component($menu_component){
		static $cache;
		if(isset($cache[$menu_component])){return $cache[$menu_component];}
		$components=[];
		foreach(\cp::get_file_paths("components/{$menu_component}") as $dir){
			foreach(glob($dir.'/*/config.php') as $config_php){
				$component_name=basename(dirname($config_php));
				if(empty($components[$component_name])){$components[$component_name]=include $config_php;}
			}
		}
		return $cache[$menu_component]=$components;
	}
	public static function get_basic_definitions(){
		$data_paths=[];
		foreach(CP::loop_conf_data() as $data_path=>$conf_data){
			$data_paths[]=$data_path;
		}
		// name with UpperCamelCase means type of component, can refer with @type
		// expects component property and be able to extend with config.php file in the component directory
		$types=[
			'Menu'=>[
				'type'=>'object',
				'title'=>'Menu',
				'properties'=>[
					'isDynamic'=>['type'=>'boolean','title'=>'Dynamic']
				],
				'oneOf'=>[
					[
						'properties'=>[
							'isDynamic'=>['const'=>true],
							'query'=>['$ref'=>'#/$defs/query']
						],
						'required'=>['query']
					],
					[
						'properties'=>[
							'isDynamic'=>['const'=>false],
							'items'=>['type'=>'array','title'=>'Items','items'=>['$ref'=>'#/$defs/menuItem']]
						],
						'required'=>['items']
					]
				]
			],
			'Column'=>[
				'type'=>'object',
				'title'=>'Column',
				'properties'=>[
					'basis'=>['type'=>'number','title'=>'Basis'],
					'grow'=>['type'=>'number','title'=>'Grow'],
					'contents'=>[
						'type'=>'array',
						'items'=>['@type'=>'@Contents']
					]
				]
			],
			'Contents'=>[
				'type'=>'object',
				'title'=>'Contents',
				'properties'=>[
					'component'=>['type'=>'string','enum'=>[]]
				],
				'oneOf'=>[]
			],
			'Icon'=>['type'=>'string','title'=>'Icon'],
			'query'=>[
				'type'=>'object',
				'title'=>'Query',
				'properties'=>[
					'path'=>['type'=>'string','title'=>'Path','enum'=>$data_paths],
					'query'=>['type'=>'string','title'=>'Query']
				]
			],
			'menuItem'=>[
				'type'=>'object',
				'title'=>'MenuItem',
				'properties'=>[
					'type'=>['type'=>'string','title'=>'Type','enum'=>['link','panel']],
					'icon'=>['@type'=>'Icon'],
					'title'=>['type'=>'string','title'=>'Title','maxLength'=>8],
					'name'=>['type'=>'string','title'=>'Name','maxLength'=>16]
				],
				'required'=>['title'],
				'oneOf'=>[
					[
						'properties'=>[
							'type'=>['const'=>'link'],
							'link'=>['$ref'=>'#/$defs/linkSettings']
						]
					],
					[
						'properties'=>[
							'type'=>['const'=>'panel'],
							'panel'=>['$ref'=>'#/$defs/panelSettings']
						]
					]
				]
			],
			'linkSettings'=>[
				'properties'=>[
					'isDynamic'=>['type'=>'boolean','title'=>'Dynamic','default'=>false]
				],
				'oneOf'=>[
					[
						'properties'=>[
							'isDynamic'=>['const'=>true],
							'query'=>['$ref'=>'#/$defs/query'],
						],
						'required'=>['query']
					],
					[
						'properties'=>[
							'isDynamic'=>['const'=>false],
							'url'=>['type'=>'string','title'=>'URL']
						],
						'required'=>['url']
					]
				]
			],
			'panelSettings'=>[
				'properties'=>[
					'columns'=>[
						'type'=>'array',
						'items'=>['@type'=>'Column']
					],
				]
			],
		];
		return $types;
	}
	
	//default
	public static function get_default_props_from_schema($schema){
		$default_menu_items=self::get_default_menu_items();
		$schemaObj=new schema($schema,function($schema,$schemaObj){
			if(isset($schema['@type'])){
				$schema['$ref']='#/$defs/'.$schema['@type'];
			}
			return $schema;
		});
		$default_value=$schemaObj->get_default_value(function($schema)use($schemaObj,$default_menu_items){
			if(isset($schema['default'])){return $schema['default'];}
			if(isset($schema['@menuItems'])){return $default_menu_items[$schema['@menuItems']];}
		});
		return $default_value;
	}
	public static function get_default_menu_items(){
		global $post_types;
		static $menu_items;
		if(isset($menu_items)){return $menu_items;}
		$menu_items=[];
		$menu_items_for_pages=array_column(self::get_menu_items_by_query('post/page',['post_parent'=>0]),null,'name');
		
		foreach(Keynames::get('main') as $name){
			if(isset($menu_items_for_pages[$name])){$menu_items['main'][]=$menu_items_for_pages[$name];}
			elseif(isset($post_types[$name])){$menu_items['main'][]=self::get_panel_menu_item_for_post_type($name);}
		}
		foreach(Keynames::get('primary') as $name){
			if(isset($menu_items_for_pages[$name])){$menu_items['primary'][]=$menu_items_for_pages[$name];}
		}
		
		return $menu_items;
	}
	public static function get_all_menu_items(){
		static $menu_items;
		if(isset($menu_items)){return $menu_items;}
		$menu_items=[];
		
		global $wp_post_types;
		$post_type_archive_menu_items=[];
		foreach(
			array_merge(
				[$wp_post_types['post'],$wp_post_types['page']],
				get_post_types(['public'=>true,'_builtin'=>false],'objects')
			) as $post_type
		){
			$menu_items[]=[
				'cat'=>'post',
				'title'=>$post_type->label,
				'items'=>self::get_menu_items_by_query('post/'.$post_type->name,[],self::USE_IMAGE|($post_type->hierarchical?self::HIERARCHICAL:0))
			];
			if($post_type->has_archive){
				$post_type_archive_menu_items[]=self::get_menu_item_for_post_type($post_type);
			}
		}
		if(!empty($post_type_archive_menu_items)){
			$post_type_archive_menu_items[]=[
				'cat'=>'post_type_archive',
				'items'=>$post_type_archive_menu_items
			];
		}
		return $menu_items;
	}
}
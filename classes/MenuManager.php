<?php
namespace Catpow;
use Catpow\components;
use Catpow\util\schema;
use Catpow\util\Keynames;

class MenuManager{
	//resolve props
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
			if($key==='url' && is_string($val) && substr($val,0,1)==='/'){$items[$key]=home_url($val);}
			if(is_array($val)){
				if(isset($val['@link'])){
					$item=self::get_menu_items_by_query($val['@link']['path'],$val['@link']['flags']??self::USE_IMAGE);
					$items[$key]=array_merge($val,$item);
				}
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
	//resolve schema
	public static function resolve_schema($schema,$root_schema){
		if(isset($schema['@type'])){
			$type=$schema['@type'];
			if($type==='MenuItem' || $type==='MenuItems'){
				foreach($schema['features'] as $featrue){
					$defs_name='feature'.$type.ucfirst($feature);
					if(!empty($root_schema['$defs'][$defs_name])){
						$schema['allOf'][]=['$ref'=>'#/$defs/'.$defs_name];
					}
				}
			}
		}
		return $schema;
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
	public static function get_menu_items_by_query($path,$query=[],$features=null){
		$items=[];
		if(is_null($features)){
			$features=self::get_all_menu_item_data_types()[$path]['features'];
		}
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
			if(!empty($features['image'])){$item['image']=CP::$content->get_the_image_url('vga');}
			$items[]=$item;
		}
		if(!empty($features['hierarchy'])){
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
	public static function get_menu_item_by_data_path($data_path,$features=null){
		$path_data=is_array($data_path)?$data_path:CP::parse_data_path($data_path);
		$class_name=CP::get_class_name('data_type',$path_data['data_type']);
		if(is_null($features)){
			$features=self::get_all_menu_item_data_types()[$path_data['data_type'].'/'.$path_data['data_name']]['features'];
		}
		if(empty($path_data['data_id'])){
			$conf=CP::get_conf_data($path_data);
			$item=[
				'@type'=>'Link',
				'title'=>$conf['label'],
				'name'=>$conf['name']
			];
			switch($path_data['data_type']){
				case 'post':{$item['url']=get_post_type_archive_link($path_data['data_name']);break;}
			}
		}
		else{
			$obj=$class_name::get_object($path_data['data_name'],$path_data['data_id']);
			$item=[
				'@type'=>'Link',
				'title'=>$class_name::get_title($obj),
				'name'=>$class_name::get_name($obj),
				'id'=>$class_name::get_title($obj),
				'parent'=>$class_name::get_parent($obj),
				'url'=>$class_name::get_url($obj)
			];
			if(!empty($features['image'])){
				$conf=CP::get_conf_data($path_data);
				$real_path_data=CP::realize_path_data($path_data);
				if(!empty($conf['meta']['image'])){
					$image_id=CP::get_the_meta_value($data_path.'/image?')[0]??null;
				}
				if(
					empty($image_id) && 
					$real_path_data['data_type']==='post' && 
					post_type_supports($real_path_data['data_name'],'thumbnail')
				){
					$image_id=get_post_thumbnail_id($path_data['data_id']);
				}
				$item['image']=wp_get_attachment_image_url($image_id,'vga');
			}
		}
		return $item;
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
				'items'=>self::get_menu_items_by_query('post/'.$post_type->name,[])
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
	public static function get_all_menu_item_data_types(){
		static $types;
		if(isset($types)){return $types;}
		$types=[];
		foreach(CP::loop_conf_data() as $data_path=>$conf_data){
			$features=[];
			$real_path_data=CP::realize_path_data(CP::parse_data_path($data_path));
			$data_type=$real_path_data['data_type'];
			$data_name=$real_path_data['data_name'];
			$features['image']=isset($conf_data['meta']['image']);
			$features['desc']=isset($conf_data['meta']['desc']);
			$features['icon']=isset($conf_data['meta']['icon']);
			$features['color']=isset($conf_data['meta']['color']);
			if($data_type==='post'){
				$post_type=$GLOBALS['wp_post_types'][$data_name];
				if($features['image']===false){$features['image']=post_type_supports($data_name,'thumbnail');}
				if($features['desc']===false){$features['desc']=post_type_supports($data_name,'excerpt');}
				$features['hierarchy']=is_post_type_hierarchical($data_name);
			}
			elseif($data_type==='term'){
				$features['hierarchy']=is_taxonomy_hierarchical($data_name);
			}
			$types[$data_path]=[
				'label'=>$conf_data['label'],
				'path'=>$data_path,
				'data_type'=>$data_type,
				'data_name'=>$data_name,
				'features'=>$features
			];
		}
		return $types;
	}
	
	//config
	public static function get_config_for_menu_component($menu_component){
		$default_menu_items=self::get_default_menu_items();
		return components::get_config($menu_component,[
			'$defs'=>self::get_basic_definitions(),
			'get_default_value'=>function()use($default_menu_items){
				if(isset($schema['default'])){return $schema['default'];}
				if(isset($schema['@menuItems'])){return $default_menu_items[$schema['@menuItems']];}
			}
		]);
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
					'items'=>['type'=>'array','layout'=>'table','title'=>'Items','items'=>['@type'=>'MenuItem']]
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
						'items'=>['@type'=>'Contents']
					]
				]
			],
			'Contents'=>[
				'type'=>'object',
				'title'=>'Contents',
				'properties'=>[
					'@type'=>['const'=>'Contents','hidden'=>true],
					'component'=>['type'=>'string','title'=>'Component','enum'=>[]]
				],
				'oneOf'=>[]
			],
			'Icon'=>['type'=>'string','@editor'=>'Icon','title'=>'Icon'],
			'Image'=>['type'=>'string','@editor'=>'Image','title'=>'Image'],
			'Color'=>['type'=>'string','@editor'=>'Color','title'=>'Color'],
			'DataPath'=>[
				'type'=>'object',
				'title'=>'DataPath',
				'properties'=>[
					'@type'=>['const'=>'DataPath'],
					'path'=>['type'=>'string','title'=>'Path']
				]
			],
			'Query'=>[
				'type'=>'object',
				'title'=>'Query',
				'properties'=>[
					'@type'=>['const'=>'Query'],
					'path'=>['type'=>'string','title'=>'Path','enum'=>$data_paths],
					'query'=>['type'=>'string','title'=>'Query']
				]
			],
			'MenuItem'=>[
				'type'=>'object',
				'label'=>'{title|"Title"}',
				'properties'=>[
					'@type'=>['type'=>'string','title'=>'Type','enum'=>['Link','Panel'],'order'=>1,'hidden'=>false],
				],
				'required'=>['title'],
				'oneOf'=>[
					['@type'=>'Link','feature'=>['icon']],
					['@type'=>'Panel']
				]
			],
			'Link'=>[
				'title'=>'Link',
				'properties'=>[
					'@type'=>['const'=>'Link','hidden'=>true],
					'custom'=>['type'=>'boolean','title'=>'Custom','order'=>2],
				],
				'oneOf'=>[
					[
						'properties'=>[
							'@type'=>['const'=>'Link'],
							'custom'=>['const'=>true],
							'icon'=>['@type'=>'Icon'],
							'title'=>['type'=>'string','title'=>'Title','maxLength'=>8],
							'name'=>['type'=>'string','title'=>'Name','maxLength'=>16],
							'url'=>['type'=>'string','title'=>'URL','cols'=>24,'rows'=>2]
						]
					],
					[
						'properties'=>[
							'@type'=>['const'=>'Link'],
							'custom'=>['const'=>false],
							'linkItem'=>['@type'=>'LinkItem']
						]
					]
				]
			],
			'LinkItem'=>[
				'title'=>'LinkItem',
				'@editor'=>'MenuItem'
			],
			'Panel'=>[
				'title'=>'Panel',
				'properties'=>[
					'@type'=>['const'=>'Panel','hidden'=>true],
					'icon'=>['@type'=>'Icon'],
					'title'=>['type'=>'string','title'=>'Title','maxLength'=>8],
					'name'=>['type'=>'string','title'=>'Name','maxLength'=>16],
					'contents'=>['@type'=>'Contents','order'=>11]
				]
			]
		];
		return $types;
	}
	
	//default
	public static function get_default_menu_items(){
		static $menu_items;
		if(isset($menu_items)){return $menu_items;}
		$menu_items=[];
		$menu_items_for_pages=array_column(self::get_menu_items_by_query('post/page',['post_parent'=>0]),null,'name');
		
		foreach(Keynames::get('main') as $name){
			if(isset($menu_items_for_pages[$name])){$menu_items['main'][]=$menu_items_for_pages[$name];}
			elseif(isset(cp::$config['post_types'][$name])){$menu_items['main'][]=self::get_panel_menu_item_for_post_type($name);}
		}
		foreach(Keynames::get('primary') as $name){
			if(isset($menu_items_for_pages[$name])){$menu_items['primary'][]=$menu_items_for_pages[$name];}
		}
		
		return $menu_items;
	}
}
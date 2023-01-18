<?php
namespace Catpow;

class blocks{
	public static $deps=[
		'editor_script'=>['wp-blocks','wp-i18n','wp-element','wp-editor','wp-plugins','wp-edit-post','catpow','wpinfo'],
		'editor_style'=>['wp-edit-blocks'],
		'front_script'=>[],
		'front_style'=>[],
		'component'=>['wp-element','wp-api-fetch'],
		'script'=>[],
		'style'=>[]
	];
	public static function register_blocks(){
		add_filter('block_categories_all',function($cats,$block_editor_context){
			return array_merge($cats,[
				['slug'=>'catpow','title'=>"\u{1F43E} Catpow"],
				['slug'=>'catpow-parts','title'=>"\u{1F43E} Parts"],
				['slug'=>'catpow-functional','title'=>"\u{1F43E} Functional"],
				['slug'=>'catpow-embed','title'=>"\u{1F43E} Embed"],
				['slug'=>'catpow-mail','title'=>"\u{1F4E8} Mail"]
			]);
		},10,2);
		
		$data=self::get_block_data_to_register();
		if(!empty($data['js'])){
			foreach($data['js'] as $args){
				call_user_func_array('wp_register_script',$args);
				CP::set_script_translations($args[0]);
			}
		}
		if(!empty($data['css'])){
			foreach($data['css'] as $args){
				call_user_func_array('wp_register_style',$args);
			}
		}
		if(!empty($data['blocks'])){
			foreach($data['blocks'] as $block_type=>$param){
				if(isset($param['render_callback'])){
					$param['render_callback']=self::get_render_callback($param['render_callback']);
				}
				register_block_type($block_type,$param);
			}
		}
		if(!empty($data['core_block_params'])){
			$registry=\WP_Block_Type_Registry::get_instance();
			foreach($data['core_block_params'] as $block_type=>$param){
				$block=$registry->get_registered($block_type);
				if(empty($block)){continue;}
				if(isset($param['render_callback'])){
					$param['render_callback']=self::get_render_callback($param['render_callback']);
				}
				foreach($param as $key=>$val){
					$block->$key=$val;
				}
			}
		}
		if(!empty($data['init'])){
			foreach($data['init'] as $block_init_file){
				include_once $block_init_file;
			}
		}
		if(!empty($data['front_init'])){
			foreach($data['front_init'] as $block_type=>$init_file){
				add_filter('render_block_'.$block_type,function($block_content,$block)use($init_file){
					include_once $init_file;
					return $block_content;
				},10,2);
			}
		}
		add_action('enqueue_block_editor_assets',function()use($data){
			foreach($data['editor_init'] as $editor_init_file){
				include $editor_init_file;
			}
		});
		if(current_user_can('edit_themes')){\cp::gzip_compress(glob(\WP_PLUGIN_DIR.'/catpow/blocks/*/*.{js,css}',defined('GLOB_BRACE')?GLOB_BRACE:0));}
		add_filter('allowed_block_types_all',function($allowed_block_types,$block_editor_context){
			$post=$block_editor_context->post;
			if(empty($post)){return $allowed_block_types;}
			if($post->post_type==='page'){
				$conf_data=$GLOBALS['static_pages'][$post->post_name]??null;
			}
			else{
				$conf_data=$GLOBALS['post_types'][$post->post_type]??null;
			}
			if(empty($conf_data)){return $allowed_block_types;}
			if(isset($conf_data['allowed_block_types'])){
				return $conf_data['allowed_block_types'];
			}
			if(isset($conf_data['article_type'])){
				$class_name=\cp::get_class_name('article_type',$conf_data['article_type']);
				return $class_name::get_allowed_block_types();
			}
			return $allowed_block_types;
		},10,2);
	}
	public static function get_all_blocks(){
		static $all_blocks;
		if(isset($all_blocks)){return $all_blocks;}
		foreach(\cp::get_file_urls('blocks') as $block_dir=>$block_url){
			foreach(glob($block_dir.'/*/editor_script.js') as $editor_script){
				$all_blocks[]=basename(dirname($editor_script));
			}
		}
		return $all_blocks;
	} 
	public static function get_supported_blocks(){
		static $supported_blocks;
		if(isset($supported_blocks)){return $supported_blocks;}
		$supported_blocks=['loop','form','embed','widget','tool','cond'];
		foreach(\cp::get_file_paths('blocks',030) as $block_dir){
			$supported_blocks=array_merge(scandir($block_dir),$supported_blocks);
		}
		$supported_blocks=array_intersect(self::get_all_blocks(),$supported_blocks);
		return $supported_blocks;
	}
	public static function get_block_data_to_register(){
		$transient='block_data_to_register_for_'.get_stylesheet();
		if((!current_user_can('edit_themes') || wp_is_json_request()) && $data=get_transient($transient)){return $data;}
		$data=[];
		$data['editor_init']=cp::get_file_paths('blocks/_init/_init.php');
		foreach(cp::get_file_urls('blocks/_init') as $block_init_dir=>$block_init_url){
			foreach(glob($block_init_dir.'/*.js') as $format_script){
				$fname=basename($format_script);
				$code_name=substr(strstr($format_script,'/wp-content/'),12,-3);
				wp_register_script($code_name,$block_init_url.'/'.$fname,['wp-blocks','wp-i18n','wp-element','wp-editor','catpow','wpinfo']);
				self::$deps['editor_script'][]=$code_name;
			}
			foreach(glob($block_init_dir.'/*.css') as $format_style){
				$fname=basename($format_style);
				$code_name=substr(strstr($format_style,'/wp-content/'),12,-4);
				wp_register_style($code_name,$block_init_url.'/'.$fname);
				cp::scss_compile(substr($format_style,0,-3).'scss');
				self::$deps['editor_style'][]=$code_name;
			}
		}
		foreach(scandir(get_stylesheet_directory().'/blocks') as $block_name){
			if($block_name[0]==='.' || $block_name[0]==='_'){continue;}
			$editor_script=CP::get_file_url('blocks/'.$block_name.'/editor_script.js');
			$is_core_block=empty($editor_script);
			$block_type=($is_core_block?'core/':'catpow/').str_replace('_','-',$block_name);
			$param=[];
			foreach([
				'conf'=>'php',
				'editor_script'=>'js',
				'editor_style'=>'css',
				'script'=>'js',
				'style'=>'css',
				'front_script'=>'js',
				'front_style'=>'css',
				'editor_init'=>'js',
				'component'=>'js',
				'render'=>'php',
				'init'=>'php',
				'deps'=>'php',
				'editor_init'=>'php',
				'front_init'=>'php'
			] as $fname=>$ext){
				$file_name=$block_name.'/'.$fname.'.'.$ext;
				$handle='blocks/'.$block_name.'/'.$fname.'.'.$ext;
				switch($ext){
					case 'css':
						cp::scss_compile('blocks/'.$block_name.'/'.$fname);
					case 'js':
						$file_path_url=cp::get_file_path_url('blocks/'.$file_name);
						$file_url=reset($file_path_url);
						if(empty($file_url)){break;}
						$data[$ext][$handle]=[$handle,(string)$file_url,self::$deps[$fname]];
						if($is_core_block){
							$key=$fname;
							if(substr($key,0,6)==='front_'){
								$key=substr($key,6);
							}
							if(in_array($key,['style','script'])){
								$param[$fname]=$handle;
							}
						}
						else{
							if(in_array($fname,['style','script','editor_style','editor_script'])){
								$param[$fname]=$handle;
							}
							else{
								$parent_handle=sprintf(
									'blocks/%s/%s%s',
									$block_name,
									(substr($fname,0,7)==='editor')?'editor_':'',
									['js'=>'script.js','css'=>'style.css'][$ext]
								);
								$data[$ext][$parent_handle][2][]=$handle;
							}
						}
						break;
					case 'php':
						$file_path=cp::get_file_path('blocks/'.$file_name);
						if(empty($file_path)){break;}
						if($fname === 'conf'){
							self::apply_conf_file($param,$file_path);
						}
						elseif($fname === 'deps'){
							$deps = include $file_path;
							if(!empty($deps['scripts'])){
								$data['js']['blocks/'.$block_name.'/script.js'][2]=array_merge(
									$data['js']['blocks/'.$block_name.'/script.js'][2]??[],$deps['scripts']
								);
							}
							if(!empty($deps['styles'])){
								$data['style']['blocks/'.$block_name.'/style.css'][2]=array_merge(
									$data['style']['blocks/'.$block_name.'/style.css'][2]??[],$deps['styles']
								);
							}
						}
						elseif($fname === 'render'){
							$param['render_callback']=$file_path;
						}
						else{
							$data[$fname][$block_type]=$file_path;
						}
						break;
				}
			}
			if($is_core_block){
				if(!empty($param)){$data['core_block_params'][$block_type]=$param;}
			}
			else{
				if($block_json=cp::get_file_path('blocks/'.$block_name.'/block.json')){
					$data['blocks'][$block_json]=$param;
				}
				else{
					$data['blocks'][$block_type]=$param;
				}
			}
		}
		set_transient($transient,$data,\WEEK_IN_SECONDS);
		return $data;
	}
	protected static function apply_conf_file(&$param,$conf_file){
		include $conf_file;
		if(isset($attributes)){
			if(isset($filters)){
				foreach($filters as $filter=>$filter_args){
					$attributes=apply_filters("cp_block_attributes_{$filter}",$attributes,$filter_args);
				}
			}
			if(!empty($attributes['items']['filters'])){
				foreach($attributes['items']['filters'] as $filter=>$filter_args){
					$attributes['items']=apply_filters("cp_block_items_attributes_{$filter}",$attributes['items'],$filter_args);
				}
			}
			$param['attributes']=$attributes;
		}
	}
	public static function get_render_callback($file_path){
		if(is_callable($file_path)){return $file_path;}
		return function($attr,$content=null,$block=null)use($file_path){
			$is_preview=
				!empty(!empty($GLOBALS['wp']->query_vars['rest_route'])) &&
				(
					strpos($GLOBALS['wp']->query_vars['rest_route'],'/block-renderer/') > 0 ||
					strpos($GLOBALS['wp']->query_vars['rest_route'],'/blocks/render/') > 0
				);
			ob_start();
			if(!isset(cp::$content)){
				cp::$content=new content\loop(['parent'=>false]);
			}
			include $file_path;
			return ob_get_clean();
		};
	}
}
<?php
namespace Catpow;

class blocks{
	public static $deps=[
		'editor_script'=>['wp-blocks','wp-i18n','wp-element','wp-editor','wp-plugins','wp-edit-post','babelHelpers','catpow'],
		'editor_style'=>['wp-edit-blocks'],
		'front_script'=>['catpow','cp_init'],
		'front_style'=>[],
		'component'=>['wp-element','wp-api-fetch','catpow'],
		'script'=>['catpow'],
		'style'=>[]
	];
	public static function register_blocks(){
		add_filter('block_categories_all',function($cats,$block_editor_context){
			return array_merge($cats,[
				['slug'=>'catpow','title'=>"\u{1F43E} Catpow"],
				['slug'=>'catpow-functional','title'=>"\u{1F43E} Functional"],
				['slug'=>'catpow-embed','title'=>"\u{1F43E} Embed"],
				['slug'=>'catpow-mail','title'=>"\u{1F4E8} Mail"]
			]);
		},10,2);
		
		$data=self::get_block_data_to_register();
		foreach($data['js'] as $args){
			call_user_func_array('wp_register_script',$args);
		}
		foreach($data['css'] as $args){
			call_user_func_array('wp_register_style',$args);
		}
		foreach($data['blocks'] as $block_type=>$param){
			if(isset($param['render_callback'])){
				$param['render_callback']=self::get_render_callback($param['render_callback']);
			}
			register_block_type($block_type,$param);
		}
		foreach($data['front_init'] as $block_type=>$init_file){
			add_filter('render_block_'.$block_type,function($block_content,$block)use($init_file){
				include_once $init_file;
				return $block_content;
			},10,2);
		}
		
		add_action('enqueue_block_editor_assets',function(){
			foreach(cp::get_file_paths('blocks/_init/_init.php') as $blocks_init_file){
				include $blocks_init_file;
			}
			$block_registry=\WP_Block_Type_Registry::get_instance();
			foreach($block_registry->get_all_registered() as $block_name=>$block_type){
				$block_base_name=explode('/',$block_name)[1];
				if($f=cp::get_file_path('blocks/'.$block_base_name.'/editor_init.php')){include $f;}
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
		$block_style_names=[];
		foreach(cp::get_file_urls('blocks/_init') as $block_init_dir=>$block_init_url){
			foreach(glob($block_init_dir.'/*.js') as $format_script){
				$fname=basename($format_script);
				$code_name=substr(strstr($format_script,'/wp-content/'),12,-3);
				wp_register_script($code_name,$block_init_url.'/'.$fname,['wp-blocks','wp-i18n','wp-element','wp-editor','catpow']);
				self::$deps['editor_script'][]=$code_name;
			}
			foreach(glob($block_init_dir.'/*.css') as $format_style){
				$fname=basename($format_style);
				$code_name=substr(strstr($format_style,'/wp-content/'),12,-4);
				wp_register_style($code_name,$block_init_url.'/'.$fname);
				$block_style_names[]='blocks/_init/'.substr($fname,0,-4);
				self::$deps['editor_style'][]=$code_name;
			}
		}
		foreach(cp::get_file_urls('blocks') as $block_dir=>$block_url){
			foreach(glob($block_dir.'/*/editor_script.js') as $editor_script){
				$block_name=basename(dirname($editor_script));
				$block_type='catpow/'.str_replace('_','-',$block_name);
				if(!in_array($block_name,self::get_all_blocks())){continue;}
				$block_style_names[]='blocks/'.$block_name.'/editor_style';
				$block_style_names[]='blocks/'.$block_name.'/style';
				unset($attributes,$filters);
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
					'editor_init'=>'php',
					'front_init'=>'php'
				] as $fname=>$ext){
					$file_name=$block_name.'/'.$fname.'.'.$ext;
					$handle='blocks/'.$block_name.'/'.$fname.'.'.$ext;
					switch($ext){
						case 'js':
						case 'css':
							$file_url=cp::get_file_url('blocks/'.$file_name);
							$data[$ext][$handle]=[$handle,(string)$file_url,self::$deps[$fname]];
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
							break;
						case 'php':
							$file_path=cp::get_file_path('blocks/'.$file_name);
							if(empty($file_path)){break;}
							if($fname === 'conf'){
								include $file_path;
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
									unset($attributes,$filters,$filter_args);
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
				if(file_exists($block_json=$block_dir.'/'.$block_name.'/block.json')){
					$data['blocks'][$block_json]=$param;
				}
				else{
					$data['blocks'][$block_type]=$param;
				}
				
			}
		}
		cp::scss_compile($block_style_names);
		set_transient($transient,$data,\WEEK_IN_SECONDS);
		return $data;
	}
	public static function get_render_callback($file_path){
		if(is_callable($file_path)){return $file_path;}
		return function($attr,$content=null,$block=null)use($file_path){
			$is_preview=
				!empty(!empty($GLOBALS['wp']->query_vars['rest_route'])) &&
				strpos($GLOBALS['wp']->query_vars['rest_route'],'block-renderer') > 0;
			ob_start();
			if(!isset(cp::$content)){
				cp::$content=new content\loop(['parent'=>false]);
			}
			include $file_path;
			return ob_get_clean();
		};
	}
}
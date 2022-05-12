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
		$block_style_names=[];
		if($will_compile_editor_script=current_user_can('edit_themes') && $_SERVER['SERVER_NAME']==='localhost'){
			include_once(dirname(__DIR__).'/jsx_compiler/functions.php');
		}
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
				if(cp::$use_blocks && !in_array($block_name,cp::$use_blocks)){continue;}
				if($will_compile_editor_script){cp_jsx_compile($editor_script);}
				$block_style_names[]='blocks/'.$block_name.'/editor_style';
				$block_style_names[]='blocks/'.$block_name.'/style';
				unset($attributes,$filters);
				$param=array();
				foreach([
					'conf'=>'php',
					'editor_script'=>'js',
					'editor_style'=>'css',
					'view_script'=>'js',
					'script'=>'js',
					'style'=>'css',
					'render'=>'php'
				] as $fname=>$ext){
					$file_name=$block_name.'/'.$fname.'.'.$ext;
					if($fname==='script' || $fname==='style'){
						$file_path_url=cp::get_file_path_url('blocks/'.$file_name);
						if(empty($file_path_url)){continue;}
						$file_path=key($file_path_url);
						$file_url=reset($file_path_url);
					}
					else{
						if(!file_exists($file_path=$block_dir.'/'.$file_name)){continue;}
						$file_url=$block_url.'/'.$file_name;
					}
					$handle='blocks/'.$block_name.'/'.$fname.'.'.$ext;
					switch($ext){
						case 'js':
							wp_register_script($handle,$file_url,self::$deps[$fname]);
							\cp::set_script_translations($handle);
							$param[$fname]=$handle;
							break;
						case 'css':
							wp_register_style($handle,$file_url,self::$deps[$fname]);
							$param[$fname]=$handle;
							break;
						case 'php':
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
								$param['render_callback']=function($attr,$content=null,$block=null)use($file_path){
									$is_preview=
										!empty(!empty($GLOBALS['wp']->query_vars['rest_route'])) &&
										strpos($GLOBALS['wp']->query_vars['rest_route'],'block-renderer') > 0;
									ob_start();
									if(!isset(cp::$content)){
										cp::$content=new Catpow\content\loop(['parent'=>false]);
									}
									include $file_path;
									return ob_get_clean();
								};
							}
							break;
					}
				}
				if(file_exists($f=$block_dir.'/'.$block_name.'/block.json')){
					register_block_type_from_metadata($f,$param);
				}
				else{register_block_type('catpow/'.str_replace('_','-',$block_name),$param);}
			}
		}
		cp::scss_compile($block_style_names);

		add_filter('render_block',function($block_content,$block){
			static $done=[];
			if(!empty($done[$block['blockName']])){return $block_content;}
			$block_name=explode('/',$block['blockName'])[1]??null;
			if(empty($block_name)){return $block_content;}
			if($f=cp::get_file_path('blocks/'.$block_name.'/front_init.php')){include $f;}
			cp::enqueue_style(
				'blocks/'.$block_name.'/front_style.css',
				self::$deps['front_style']
			);
			cp::enqueue_script(
				'blocks/'.$block_name.'/front_script.js',
				self::$deps['front_script']
			);
			cp::enqueue_script(
				'blocks/'.$block_name.'/component.js',
				self::$deps['component']
			);
			$done[$block['blockName']]=true;
			return $block_content;
		},10,2);
		add_action('enqueue_block_editor_assets',function(){
			foreach(cp::get_file_paths('blocks/_init/_init.php') as $blocks_init_file){
				include $blocks_init_file;
			}
			$block_registry=WP_Block_Type_Registry::get_instance();
			foreach($block_registry->get_all_registered() as $block_name=>$block_type){
				$block_base_name=explode('/',$block_name)[1];
				if($f=cp::get_file_path('blocks/'.$block_base_name.'/editor_init.php')){include $f;}
				cp::enqueue_script(
					'blocks/'.$block_base_name.'/editor_init.js',
					self::$deps['editor_script']
				);
				cp::enqueue_style(
					'blocks/'.$block_base_name.'/front_style.css',
					self::$deps['front_style']
				);
				cp::enqueue_script(
					'blocks/'.$block_base_name.'/front_script.js',
					self::$deps['front_script']
				);
				cp::enqueue_script(
					'blocks/'.$block_base_name.'/component.js',
					self::$deps['component']
				);
			}
		});
		if(current_user_can('edit_themes')){\cp::gzip_compress(glob(WP_PLUGIN_DIR.'/catpow/blocks/*/*.{js,css}',defined('GLOB_BRACE')?GLOB_BRACE:0));}
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
}
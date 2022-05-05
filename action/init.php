<?php

/*script*/

$js_files=[];
$cpjs_dir=dir(WP_PLUGIN_DIR.'/catpow/js');
while($fname = $cpjs_dir->read()){
	if(strpos('.',$fname)===0)continue;
	if(substr($fname,-3)==='.js'){
		wp_register_script(
			substr($fname,0,-3),
			plugins_url().'/catpow/js/'.$fname,
			($fname==='cp_form.js' || substr($fname,0,7)==='cp_rest')?['jquery','wp-api-fetch']:['jquery'],
			filemtime(WP_PLUGIN_DIR.'/catpow/js/'.$fname),
			true
		);
		$js_files[]=WP_PLUGIN_DIR.'/catpow/js/'.$fname;
	}
}
\cp::gzip_compress($js_files);


wp_enqueue_style('font_awesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css');
wp_enqueue_style('materialicons','https://fonts.googleapis.com/icon?family=Material+Icons');
wp_register_script('urljs','https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.19.2/URI.min.js');
wp_register_script('axios','https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js');
wp_register_script('remarkable','https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.1/remarkable.min.js');
wp_register_script('jquery-easing','https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js');
wp_register_script('wp-color-picker-alpha','https://cdn.jsdelivr.net/gh/kallookoo/wp-color-picker-alpha/dist/wp-color-picker-alpha.min.js',['wp-color-picker']);

wp_enqueue_script('catpow');
wp_localize_script('catpow','cp',array(
	'plugins_url'=>plugins_url(),
	'rest_url'=>get_rest_url(),
	'ajax_url'=>admin_url().'admin-ajax.php',
	'upload_url'=>admin_url().'async-upload.php',
	'home_url'=>home_url(),
	'theme_url'=>get_stylesheet_directory_uri(),
	'theme'=>get_stylesheet(),
	'use_functions'=>cp::$use_functions,
	'wp_rest_nonce'=>wp_create_nonce('wp_rest')
));

if($GLOBALS['is_IE']){
	wp_enqueue_script('polyfill','https://polyfill.io/v3/polyfill.min.js');
	wp_enqueue_script('object-fit-images','https://cdnjs.cloudflare.com/ajax/libs/object-fit-images⁄3.2.4/ofi.min.js');
	wp_enqueue_script('stickyfill','https://cdnjs.cloudflare.com/ajax/libs/stickyfill/2.1.0/stickyfill.min.js');
	wp_enqueue_script('css-vars-ponyfill','https://cdnjs.cloudflare.com/ajax/libs/css-vars-ponyfill/2.3.2/css-vars-ponyfill.min.js');
}

/* css vars */
add_action('customize_controls_head',[\cp::get_class_name('util','style_config'),'print_css_vars']);
add_action('admin_head',[\cp::get_class_name('util','style_config'),'print_css_vars']);
add_action('wp_head',[\cp::get_class_name('util','style_config'),'print_css_vars']);

/* script translation */
add_filter('load_script_translation_file',function($file,$handle,$domain){
	if($domain==='catpow' && substr($handle,-3)==='.js'){
		$locale = determine_locale();
		return \cp::get_file_path(dirname($handle).'/languages/'.substr(basename($handle),0,-3).'-'.$locale.'.json');
	}
	return $file;
},10,3);

/*add_image_size*/
add_image_size('vga',640,480,1);

/*body_class*/
add_filter('body_class',function($classes){
	$path_data=cp::get_the_path_data();
	return array_merge($classes,array(
		$path_data['data_type'].'-type-'.$path_data['data_name'],
		$path_data['data_type'].'-type-'.$path_data['data_name'].'-'.$path_data['tmp_name'],
	));
});

/*cp form*/
add_action('wp_ajax_cp_form',[\cp::get_class_name('content','form'),'response']);
add_action('wp_ajax_nopriv_cp_form',[\cp::get_class_name('content','form'),'response']);

/*blocks*/
if(function_exists('register_block_type')){
	add_filter('block_categories_all',function($cats,$block_editor_context){
		$cats[]=[
			'slug'=>'catpow',
			'title'=>"\u{1F43E} Catpow"
		];
		$cats[]=[
			'slug'=>'catpow-functional',
			'title'=>"\u{1F43E} Functional"
		];
		$cats[]=[
			'slug'=>'catpow-embed',
			'title'=>"\u{1F43E} Embed"
		];
		$cats[]=[
			'slug'=>'catpow-mail',
			'title'=>"\u{1F4E8} Mail"
		];
		return $cats;
	},10,2);
	$block_style_names=[];
	$deps=[
		'editor_script'=>['wp-blocks','wp-i18n','wp-element','wp-editor','wp-plugins','wp-edit-post','babelHelpers','catpow'],
		'editor_style'=>['wp-edit-blocks'],
		'front_script'=>['catpow','cp_init'],
		'front_style'=>[],
		'component'=>['wp-element','wp-api-fetch','catpow'],
		'script'=>['catpow'],
		'style'=>[]
	];
	if($will_compile_editor_script=current_user_can('edit_themes') && $_SERVER['SERVER_NAME']==='localhost'){
		include_once(dirname(__DIR__).'/jsx_compiler/functions.php');
	}
	foreach(cp::get_file_urls('blocks/_init') as $block_init_dir=>$block_init_url){
		foreach(glob($block_init_dir.'/*.js') as $format_script){
			$fname=basename($format_script);
			$code_name=substr(strstr($format_script,'/wp-content/'),12,-3);
			wp_register_script($code_name,$block_init_url.'/'.$fname,['wp-blocks','wp-i18n','wp-element','wp-editor','catpow']);
			$deps['editor_script'][]=$code_name;
		}
		foreach(glob($block_init_dir.'/*.css') as $format_style){
			$fname=basename($format_style);
			$code_name=substr(strstr($format_style,'/wp-content/'),12,-4);
			wp_register_style($code_name,$block_init_url.'/'.$fname);
			$block_style_names[]='blocks/_init/'.substr($fname,0,-4);
			$deps['editor_style'][]=$code_name;
		}
	}
	foreach(cp::get_file_urls('blocks') as $block_dir=>$block_url){
		foreach(glob($block_dir.'/*/editor_script.js') as $editor_script){
			$block_name=basename(dirname($editor_script));
			if(cp::$use_blocks && !in_array($block_name,cp::$use_blocks)){continue;}
			if($will_compile_editor_script){Catpow\cp_jsx_compile($editor_script);}
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
						wp_register_script($handle,$file_url,$deps[$fname]);
						\cp::set_script_translations($handle);
						$param[$fname]=$handle;
						break;
					case 'css':
						wp_register_style($handle,$file_url,$deps[$fname]);
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
	
	add_filter('render_block',function($block_content,$block)use($deps){
		static $done=[];
		if(!empty($done[$block['blockName']])){return $block_content;}
		$block_name=explode('/',$block['blockName'])[1]??null;
		if(empty($block_name)){return $block_content;}
		if($f=cp::get_file_path('blocks/'.$block_name.'/front_init.php')){include $f;}
		cp::enqueue_style(
			'blocks/'.$block_name.'/front_style.css',
			$deps['front_style']
		);
		cp::enqueue_script(
			'blocks/'.$block_name.'/front_script.js',
			$deps['front_script']
		);
		cp::enqueue_script(
			'blocks/'.$block_name.'/component.js',
			$deps['component']
		);
		$done[$block['blockName']]=true;
		return $block_content;
	},10,2);
	add_action('enqueue_block_editor_assets',function()use($deps){
		foreach(cp::get_file_paths('blocks/_init/_init.php') as $blocks_init_file){
			include $blocks_init_file;
		}
		$block_registry=WP_Block_Type_Registry::get_instance();
		foreach($block_registry->get_all_registered() as $block_name=>$block_type){
			$block_base_name=explode('/',$block_name)[1];
			if($f=cp::get_file_path('blocks/'.$block_base_name.'/editor_init.php')){include $f;}
			cp::enqueue_script(
				'blocks/'.$block_base_name.'/editor_init.js',
				$deps['editor_script']
			);
			cp::enqueue_style(
				'blocks/'.$block_base_name.'/front_style.css',
				$deps['front_style']
			);
			cp::enqueue_script(
				'blocks/'.$block_base_name.'/front_script.js',
				$deps['front_script']
			);
			cp::enqueue_script(
				'blocks/'.$block_base_name.'/component.js',
				$deps['component']
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

/*shortcode*/
add_shortcode('home_url',function(){return home_url();});
add_shortcode('home_href',function(){static $cache;return $cache??($cache=explode('://',home_url())[1]);});
add_shortcode('home_path',function(){static $cache;return $cache??($cache=ltrim(parse_url(home_url('/'),PHP_URL_PATH),'/'));});
add_shortcode('theme_url',function(){return get_stylesheet_directory_uri();});
foreach(cp::get_file_paths('shortcode') as $sc_dir){
	foreach(glob($sc_dir.'/*/output.php') as $sc_file){
		$tag=substr($sc_file,strrpos($sc_file,'/',-12)+1,-11);
		add_shortcode($tag,'shortcode_callback');
	}
}

function shortcode_callback($atts,$content='',$tag=''){
	if($f=cp::get_file_path('shortcode/'.$tag.'/output.php')){
		cp::enqueue_script('shortcode/'.$tag.'/script.js');
		cp::enqueue_style('shortcode/'.$tag.'/style.css');
		ob_start();
		include $f;
		return ob_get_clean();
	}
	return false;
}
$GLOBALS['wp_filter']['the_content']->callbacks[11]['do_shortcode']['function']=function($content){
	global $shortcode_tags;
	
	if(false===strpos($content,'[')){return $content;}
	if(empty($shortcode_tags) || !is_array($shortcode_tags)){return $content;}

	preg_match_all( '@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches );
	$tagnames = array_intersect( array_keys( $shortcode_tags ), $matches[1] );

	if(empty($tagnames)){return $content;}

	$pattern=get_shortcode_regex($tagnames);
	$content=preg_replace_callback("/$pattern/",'do_shortcode_tag',$content);

	$content=unescape_invalid_shortcodes( $content );

	return $content;
};

/*plugin*/
add_filter('extra_plugin_headers',function($headers){
	$headers[]='GitHub Repository';
	return $headers;
});
add_filter('pre_set_site_transient_update_plugins',function($transient){
	foreach(get_plugins() as $plugin=>$plugin_data){
		$repo=Catpow\github\Repo::of_plugin($plugin);
		if(!empty($repo) && $repo->hasNewerRelease){
			$transient->response[$plugin]=$repo->dataForTransientUpdatePlugins;
		}
	}
	return $transient;
});
add_filter('site_transient_update_plugins',function($values){
	return $values;
});
add_filter('plugins_api',function($res,$action,$arg){
	if(in_array($action,['query_plugins','plugin_information'],true)&& isset($arg->slug)){
		$repo=Catpow\github\Repo::of_plugin($arg->slug);
		if(!empty($repo)){return $repo->dataForPluginsApi;}
	}
	return $res;
},10,3);
add_filter('upgrader_source_selection',function($source,$remote_source,$upgrader,$hook_extra){
	if(
		empty($repo=$upgrader->skin->plugin_info['GitHub Repository']??null) && 
		empty($repo=Catpow\util\wp::get_plugin_data_from_dir($source)['GitHub Repository']??null)
	){return $source;}
	$newsource=dirname($source).'/'.basename($repo).'/';
	rename($source,$newsource);
	return $newsource;
},10,4);

/*media*/
add_filter('wp_generate_attachment_metadata','Catpow\\util\\media::callback_wp_generate_attachment_metadata',10,2);
add_action('delete_attachment','Catpow\\util\\media::callback_delete_attachment',10,2);
add_filter('image_downsize','Catpow\\util\\media::callback_image_downsize',10,3);
add_filter('wp_prepare_attachment_for_js','Catpow\\util\\media::callback_wp_prepare_attachment_for_js',10,3);

/*preview*/
add_action('admin_print_footer_scripts',function(){
	if(!($logo_url=cp::get_logo_url())){return;}
?>
<script>
	wp.hooks.addFilter(
		'editor.PostPreview.interstitialMarkup',
		'my-plugin/modify_preview_message',
		function(msg){return msg.replace(/<svg.+?<\/svg>/,'<img src="<?=$logo_url?>" alt="<?=get_bloginfo('name')?>"/>');}
	);
</script>
<?php
},50);

/*avatar*/
add_filter('get_avatar_url',function($url,$id_or_email,$args){
	if(!is_numeric($id_or_email)){
		if(is_object($id_or_email)){
			if(isset($id_or_email->user_id)){$id_or_email=$id_or_email->user_id;}
		}
		else{$id_or_email=get_user_by('email',$id_or_email)->ID??false;}
	}
	if(is_numeric($id_or_email) && $avatar_url=get_user_meta($id_or_email,'avatar_url')){return $avatar_url;}
	return $url;
},10,3);

/*meta_query*/
add_filter('get_meta_sql',function($sql,$queries,$type,$primary_table,$primary_id_column,$context){
	$meta_table=_get_meta_table($type);
	foreach($queries as $key=>$query){
		if(!is_array($query) || empty($query['compute'])){continue;}
		if(empty($query['alias'])){error_log('compute meta_query must have alias');continue;}
		if(empty($query['keys'])){error_log('compute meta_query must have keys');continue;}
		$sql['join'].=
			" LEFT JOIN (".
			Catpow\util\sql\meta::select_computed_value($type,$meta_table,$query['keys'],$query['compute'],$query['where']??null).
			") AS {$query['alias']} ".
			"ON ({$primary_table}.{$primary_id_column} = {$query['alias']}.{$type}_id) ";
	}
	return $sql;
},10,6);
add_filter('meta_query_find_compatible_table_alias',function($alias,$clause){
	if(isset($clause['alias'])){return $clause['alias'];}
	return $alias;
},10,2);

/*rewrite rules*/
add_filter('query_vars', function($vars){
	$vars=array_merge($vars,array(
		'cp_mode','cp_page_type',
		'cp_data_type','cp_data_name','cp_data_id',
		'cp_tmp_slug','cp_tmp_folder',
		'cp_file_slug',
		'meta_path',
		'cp_file_path',
		'cp_finder_path','q',
		'cp_token','cp_token_key',
		'cp_callee'
	));
	foreach(cp::$data_types as $data_type){
		$vars[]=$data_type.'_id';
	}
	return $vars;
});
add_action('parse_request',function($wp_query){
	if(!empty($wp_query->query_vars['cp_page_type'])){
		if($wp_query->query_vars['cp_page_type']=='me'){
			$wp_query->query_vars['user_id']=get_current_user_id();
		}
		if($wp_query->query_vars['cp_data_type']=='post'){
			$wp_query->query_vars['post_type']=$wp_query->query_vars['cp_data_name'];
			if($wp_query->query_vars['cp_page_type']=='search'){
				$wp_query->query_vars+=cp::extract_query($_REQUEST,'post/'.$wp_query->query_vars['post_type'].'/s');
			}
		}
	}
});
add_action('parse_query',function($query){
	if(isset($query->query_vars['cp_page_type']) and $query->query_vars['cp_page_type']=='search'){
		$query->is_archive=false;
		$query->is_tax=false;
		$query->is_search=true;
	}
	return $query;
});
add_filter('redirect_canonical',function($redirect_url,$request_url){
	global $wp_query;
	if(!empty($wp_query->query_vars['cp_tmp_slug'])){
		return $request_url;
	}
	if(strrpos(basename($request_url),'.')!==false){return rtrim($redirect_url,'/');}
	return $redirect_url;
},10,2);
add_filter('nav_menu_css_class',function($classes,$item,$args,$depth){
	if($post_class=get_post_meta($item->ID,'post_class')){
		$classes+=$post_class;
	}
	return $classes;
},100,4);
add_filter('nav_menu_link_attributes',function($atts,$item,$args,$depth){
	static $crr_url,$crr_url_len;
	if(!isset($crr_url)){
		global $wp;
		$crr_url=home_url($wp->request);
		$crr_url_len=strlen($crr_url);
	}
	if(substr($atts['href'],0,1)==='/'){$atts['href']=home_url($atts['href']);}
	if(substr($atts['href'],0,$crr_url_len)===$crr_url){
		$href=ltrim(substr($atts['href'],$crr_url_len),'/');
		if(substr($href,0,1)==='#'){$atts['href']=$href;}
	}
	return $atts;
},100,4);


/*permalink*/
add_filter('rewrite_rules_array',function($rules){
	return array_merge(Catpow\util\rewrite::get_rules(),$rules);
});
add_filter('flush_rewrite_rules_hard',function($do_hard){
	if($do_hard){Catpow\util\htaccess::update();}
	return $do_hard;
});



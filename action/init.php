<?php
/*script*/
$js_files=[];
$cpjs_dir=dir(WP_PLUGIN_DIR.'/catpow/js');
$deps_map=[
	'jquery'=>['jquery'],
	'catpow.js'=>[],
	'catpow'=>['catpow'],
	'cpform'=>['catpow','wp-api-fetch'],
	'cpui'=>['catpow','wp-element'],
	'wp'=>['wpinfo']
];
while($fname = $cpjs_dir->read()){
	if(strpos('.',$fname)===0)continue;
	if(substr($fname,-3)==='.js'){
		wp_register_script(
			substr($fname,0,-3),
			plugins_url().'/catpow/js/'.$fname,
			$deps_map[$fname]??$deps_map[strstr($fname,'.',true)]??[],
			filemtime(WP_PLUGIN_DIR.'/catpow/js/'.$fname),
			true
		);
		$js_files[]=WP_PLUGIN_DIR.'/catpow/js/'.$fname;
	}
}
\cp::gzip_compress($js_files);


wp_register_style('font_awesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css');
wp_register_style('materialicons','https://fonts.googleapis.com/icon?family=Material+Icons');
wp_register_script('alpine','https://unpkg.com/alpinejs');
wp_register_script('urljs','https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.19.2/URI.min.js');
wp_register_script('axios','https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js');
wp_register_script('remarkable','https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.1/remarkable.min.js');
wp_register_script('mermaid','https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js');
wp_register_script('jquery-easing','https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js');
wp_register_script('ajaxzip3','https://ajaxzip3.github.io/ajaxzip3.js');

wp_scripts()->add_data('react','global','React');
wp_scripts()->add_data('react-dom','global','ReactDOM');
wp_scripts()->add_data('jquery','global','jQuery');
wp_scripts()->add_data('catpow','global','Catpow');
wp_scripts()->add_data('alpine','global','alpine');


\cp::register_script('script.js');
\cp::register_style('style.css');
\cp::register_style('content.css');

wp_register_script('wpinfo',null);
wp_localize_script('wpinfo','wpinfo',array(
	'plugins_url'=>plugins_url(),
	'rest_url'=>get_rest_url(),
	'ajax_url'=>admin_url().'admin-ajax.php',
	'upload_url'=>admin_url().'async-upload.php',
	'home_url'=>home_url(),
	'theme_url'=>get_stylesheet_directory_uri(),
	'theme'=>get_stylesheet(),
	'use_functions'=>cp::$use_functions
));

if($GLOBALS['is_IE']){
	wp_enqueue_script('polyfill','https://polyfill.io/v3/polyfill.min.js');
	wp_enqueue_script('object-fit-images','https://cdnjs.cloudflare.com/ajax/libs/object-fit-images⁄3.2.4/ofi.min.js');
	wp_enqueue_script('stickyfill','https://cdnjs.cloudflare.com/ajax/libs/stickyfill/2.1.0/stickyfill.min.js');
	wp_enqueue_script('css-vars-ponyfill','https://cdnjs.cloudflare.com/ajax/libs/css-vars-ponyfill/2.3.2/css-vars-ponyfill.min.js');
}

/* css vars */
add_action('admin_head','Catpow\\util\\style_config::print_css_vars');
add_action('wp_head','Catpow\\util\\style_config::print_css_vars');
add_action('customize_controls_print_styles','Catpow\\util\\style_config::print_css_vars');
add_action('admin_init',function(){
	add_filter('block_editor_settings_all', function( $editor_settings ) {
		$editor_settings['styles'][] = [
			'css' => Catpow\util\style_config::get_css_vars_code()
		];
		return $editor_settings;
	});
},20);

/* script translation */
add_filter('pre_load_script_translations',function($translations,$file,$handle,$domain){
	if($domain==='catpow' && substr($handle,-3)==='.js'){
		$locale = determine_locale();
		if($file=\cp::get_file_path(dirname($handle).'/languages/'.substr(basename($handle),0,-3).'-'.$locale.'.json')){
			return file_get_contents($file);
		}
	}
	return $translations;
},10,4);

/*add_image_size*/
add_image_size('vga',640,480,1);

/*body_class*/
add_filter('body_class',function($classes){
	$path_data=cp::get_the_path_data();
	return array_merge($classes,array(
		'is-root-container',
		$path_data['data_type'].'-type-'.$path_data['data_name'],
		$path_data['data_type'].'-type-'.$path_data['data_name'].'-'.$path_data['tmp_name'],
	));
});

/*cp form*/
add_action('wp_ajax_cpform',[\cp::get_class_name('content','form'),'response']);
add_action('wp_ajax_nopriv_cpform',[\cp::get_class_name('content','form'),'response']);

/*blocks*/
if(function_exists('register_block_type')){
	Catpow\blocks::register_blocks();
}

/*shortcode*/
Catpow\shortcode::init();

/*plugin*/
add_filter('update_plugins_github.com',function($update,$plugin_data,$plugin_file){
	$repo=Catpow\github\Repo::of_plugin($plugin_file,$plugin_data);
	if(!empty($repo)){
		if($repo->hasNewerRelease){
			return $repo->dataForTransientUpdatePlugins;
		}
	}
	return $update;
},10,3);
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
},100,2);
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
	if($do_hard){
		Catpow\util\htaccess::update();
		Catpow\util\site_config::update();
	}
	return $do_hard;
});
<?php 
namespace Catpow;
add_menu_page('CATPOW','CATPOW','edit_themes','catpow-main',function(){
	this()->render();
},'dashicons-pets');
add_submenu_page('catpow-main','リファレンス','リファレンス','edit_themes','catpow-refelence',function(){
	this()->render();
});



function add_menus($path_data,$conf_data,$menus){
	foreach($menus as $slug=>$menu){
		if($slug=='top'){
			foreach($menu as $label=>$link){
				$link=get_menu_link($link,$path_data);
				$icon=$conf_data['menu_icons'][$path_data['tmp_name']]??$conf_data['menu_icon']??null;
				$pos=$conf_data['menu_positions'][$path_data['tmp_name']]??$conf_data['menu_position']??null;
				if(is_array($link)){
					add_menu_page($label,$label,'publish_posts',key($link),reset($link),$icon,$pos);
				}
				else{
					add_menu_page($label,$label,'publish_posts',$link,null,$icon,$pos);
				}
			}
		}
		else{
			$parent=get_menu_link($slug,$path_data);
			if(is_array($parent)){$parent=key($parent);}
			foreach($menu as $label=>$link){
				$link=get_menu_link($link,$path_data);
				if(is_array($link)){
					add_submenu_page($parent,$label,$label,'publish_posts',key($link),reset($link));
				}
				else{
					add_submenu_page($parent,$label,$label,'publish_posts',$link);
				}
			}
		}
	}
}
/**
* add_menu_page　add_submenu_pageの引数として用いる値を取得する
* @param string $slug 規定値またはcontent_path
* @param array $path_data 
* @return string|array リンクの識別子、または[識別子=>コールバック]のペアの配列
*/
function get_menu_link($slug,$path_data){
	static $hooks;
	global $post_types;
	if($slug==='sub'){$slug=$path_data['data_type'].'/'.$path_data['data_name'];}
	if($slug==='post' || $slug==='post/post'){return 'edit.php';}
	if($slug==='attachment' || $slug==='post/attachment'){return 'upload.php';}
	if($slug==='user' || substr($slug,0,5)==='user/'){return 'users.php';}
	if(isset($post_types[$slug])){return 'edit.php?post_type='.$slug;}
	
	if(substr($slug,-4)==='.php'){
		$slug_path_data=\cp::parse_content_file_path($slug);
		$path_data=array_merge($path_data,$slug_path_data);
	}
	else{
		$slug_path_data=\cp::parse_content_path($slug);
		if(isset($slug_path_data['data_type']) && $slug_path_data['data_type']==='post' && isset($post_types[$slug_path_data['data_name']]) && empty($slug_path_data['tmp_name'])){
			return 'edit.php?post_type='.$slug_path_data['data_name'];
		}
		$path_data=array_merge($path_data,['file_name'=>'admin','file_type'=>'php'],$slug_path_data);
	}
	$file_path=\cp::create_content_file_path($path_data);
	$key=str_replace('/','-',substr($file_path,0,-4));
	if(!isset($hooks[$key])){
		$hooks[$key]=function()use($file_path){
			echo('<div id="cpcf_custom_box"><div class="inside">');
			§form($file_path);
			echo('</div></div>');
			cp::enqueue_style('content.css');
			cp::enqueue_script(dirname($file_path).'/script.js');
			cp::enqueue_style(dirname($file_path).'/style.css');
		};
	}
	return [$key=>$hooks[$key]];
}
cp::conf_data_walk(function($data_type,$data_name,&$conf_data){
	if(isset($conf_data['parent'])){
		add_menus(compact('data_type','data_name'),$conf_data,[$conf_data['parent']=>[$conf_data['label']=>$data_name]]);
	}
	if(isset($conf_data['article_type'])){
		$class_name=cp::get_class_name('article_type',$conf_data['article_type']);
		if(class_exists($class_name)){
			add_menus(compact('data_type','data_name'),$conf_data,$class_name::get_menus($conf_data));
		}
	}
	if($templates=$conf_data[($data_type=='cpdb'?'alias_':'').'template']??null){
		foreach($templates as $template){
			$tmp_name=explode('-',$template)[0];
			$tmp_slug=explode('-',$template)[1]??null;
			$class_name=cp::get_class_name('template_type',$tmp_name);
			$path="{$conf_data[$pref.'path']}/{$template}";
			if(class_exists($class_name)){
				add_menus(compact('data_type','data_name','tmp_name','tmp_slug'),$conf_data,$class_name::get_menus($path,$conf_data));
			}
		}
	}
});

if(isset($GLOBALS['post_types']['wp_block'])){
	$conf=$GLOBALS['post_types']['wp_block'];
	$label=$conf['label']??_('再利用可能ブロック','catpow');
	if($conf['show_in_menu']??true){
		add_menu_page(
			$label,
			$label,
			$conf['capability']??'publish_posts',
			'edit.php?post_type=wp_block',
			null,
			$conf['menu_icon']??'dashicons-block-default'
		);
	}
}


<?php
namespace Catpow\template_type;
/**
* 管理画面で編集できるテンプレート
*/

class template extends template_type{
	
	public static function get_embeddables($path,$conf_data){return [];}
	public static function get_menus($path,$conf_data){
		return [
			'sub'=>[
				'テンプレート'=>$conf_data['data_name'].'_tmpl'
			]
		];
	}
	public static function fill_conf_data(&$conf_data){
		$template_post_type=$conf_data['data_name'].'_tmpl';
		if(!isset(\cp::$config['post_types'][$template_post_type])){
			\cp::$config['post_types'][$template_post_type]=[
				'label'=>'テンプレート',
				'article_type'=>'template',
				'public'=>false,
				'show_in_menu'=>false,
				'meta'=>$conf_data['template_meta']??['name'=>['type'=>'post_name'],'title'=>['type'=>'text'],'slug'=>['type'=>'text'],'image'=>['type'=>'picture']],
				'template'=>['admin']
			];
			\cp::fill_conf_data('post',$template_post_type,\cp::$config['post_types'][$template_post_type]);
		}
	}
}

?>
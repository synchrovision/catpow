<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class search extends template_type{
	public static $permalinks=['archive'];
	public static function get_embeddables($conf_data){
		return ['form'=>['検索フォーム'=>'form.php']];
	}
	public static function get_template_files($conf_data){
		return [
			'index.php'=>['','@catpow'],
			'form.php'=>['','@catpow'],
			'results.php'=>['','@catpow'],
			'loop_item.php'=>['','@catpow'],
			'sec_search.php'=>['','@catpow'],
			'header.php'=>['','@catpow'],
			'footer.php'=>['','@catpow'],
			'sidebar.php'=>['','@catpow'],
			'style.scss'=>[],
			'script.js'=>[],
		];
	}
}

?>
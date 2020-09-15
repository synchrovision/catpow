<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class mailconf extends template_type{
	public static function get_template_files($conf_data){
		return [
			'admin.php'=>'default',
			'sec_manage_item.php'=>'manage/sec_manage_item',
			'sec_manage_item-edit.php'=>'manage/sec_manage_item-edit',
		];
	}
}

?>
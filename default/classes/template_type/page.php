<?php
namespace Catpow\template_type;
/**
* テンプレートファイルを生成せずに固定ページの投稿生成のみ行う　
*/

class page extends single{
	public static $permalinks=[];
	public static function get_template_files($conf_data){
		return [];
	}
}

?>
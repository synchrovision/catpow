<?php
namespace Catpow\template_item\php;
/**
* タイトルと特定の名称のメタとカテゴリのみをフォーマットして出力
* 出力対象 : desc,status,price,date,[thumbnail|image|post_thumbnail]
*/

class item_info extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return [
			'',
			[
				'div.info',
				['h3','@title'],
				'@thumbnail',
				'@desc'
			]
		];
	}
}

?>
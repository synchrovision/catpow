<?php
namespace Catpow\article_type;
/**
* チェックシートを構成する質問の投稿タイプ
*/

class question extends article_type{
	public function __construct($data_path,$conf,$data){
		
	}
	public static function fill_conf_data(&$conf_data){
		$conf_data=array_merge([
			'label'=>'質問',
			'public'=>false,
			'show_in_menu'=>false,
			'template'=>['question']
		],$conf_data);
	}
}

?>
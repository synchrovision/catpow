<?php
namespace Catpow\article_type;
/**
* チェックシート
*/

class checksheet extends article_type{
	public function __construct($data_path,$conf,$data){
		
	}
	public static function get_menus($path,$conf_data){
		$question_post_type=$conf_data['data_name'].'_item';
		return [
			'sub'=>[
				'質問'=>$question_post_type,
				'回答'=>$conf_data['meta']['sheet']['alias_path'],
			]
		];
	}
	public static function fill_conf_data(&$conf_data){
		$question_post_type=$conf_data['data_name'].'_item';
		$conf_data=array_merge([
			'label'=>'チェックシート',
			'public'=>false,
			'hierarchical'=>true,
			'meta'=>[
				'clear'=>['type'=>'checkbox','label'=>'クリア','value'=>['入力検証'=>1,'入力値'=>2,'フォーム'=>4]],
				'receive'=>['type'=>'radio','label'=>'データ受信','value'=>['しない'=>-1,'する'=>1]],
				'push'=>['type'=>'radio','label'=>'登録処理','value'=>['しない'=>-1,'する'=>1]]
			],
			'template'=>['checksheet']
		],$conf_data);
		
		if(!isset($GLOBALS['post_types'][$question_post_type])){
			$GLOBALS['post_types'][$question_post_type]=['article_type'=>'question'];
			\cp::fill_conf_data('post',$question_post_type,$GLOBALS['post_types'][$question_post_type]);
		}
	}
}

?>
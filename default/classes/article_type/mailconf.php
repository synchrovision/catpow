<?php
namespace Catpow\article_type;
/**
* フォームから送信されるメールの送付先・タイトル・文面の設定
*/

class mailconf extends article_type{
	public static $allowed_block_types=[
		'core/paragraph',
		'core/spacer',
		
		'catpow/t-body',
		'catpow/t-box',
		'catpow/t-loop',
		
		'catpow/t-image',
		'catpow/t-media-text',
		
		'catpow/t-heading',
		'catpow/t-paragraph',
		
		'catpow/t-button',
	];
	public function __construct($data_path,$conf,$data){
		
	}
	public static function fill_conf_data(&$conf_data){
		$conf_data=array_merge([
			'label'=>'メール設定',
			'public'=>false,
			'show_in_menu'=>false,
			'meta'=>[
				'name'=>['type'=>'post_name','label'=>'名前'],
				'to'=>['type'=>'text','label'=>'送信先','size'=>30],
				'from'=>['type'=>'text','label'=>'送信元','size'=>30]
			],
			'supports'=>['title','editor','custom-fields'],
			'template_content'=>[['catpow/t-body']]
		],$conf_data);
		register_post_meta($conf_data['data_name'],'type',['type'=>'string','show_in_rest'=>true,'single'=>true]);
	}
	public static function get_default_post_datas($conf_data){
		return [
			$conf_data['data_name'].'/notice'=>[],
			$conf_data['data_name'].'/thanks'=>[],
		];
	}
}

?>
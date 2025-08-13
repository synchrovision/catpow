<?php
namespace Catpow\article_type;
/**
* 記事ではなくメールフォームとして機能するarticle_typeです。
* 投稿はデータベースカスタムフィールドのメールフォームのコンテンツとして利用されます。
* この投稿で利用されるカスタムフィールドのショートコードは、データベースカスタムフィールドのものであり、自身の投稿タイプのものではありません。
* データベースカスタムフィールドの内容はinputsプロパティから設定できます。
*/

class mailform extends article_type{
	public function __construct($data_path,$conf,$data){
		
	}
	public static function get_menus($conf_data){
		$mailconf_post_type=$conf_data['data_name'].'_mail';
		return [
			'sub'=>[
				'受信メール'=>$conf_data['meta']['mail']['alias_path'].'/manage',
				'メール設定'=>$mailconf_post_type
			]
		];
	}
	public static function fill_conf_data(&$conf_data){
		$mailconf_post_type=$conf_data['data_name'].'_mail';
		$conf_data=array_merge([
			'label'=>'お問い合わせ',
			'menu_icon'=>'dashicons-email-alt',
			'public'=>false,
			'hierarchical'=>true
		],$conf_data);
		$default_meta_conf=[
			'name'=>['type'=>'post_name','label'=>'識別名'],
			'clear'=>['type'=>'checkbox','label'=>'クリア','value'=>['入力項目'=>1,'入力値'=>2,'フォーム'=>4]],
			'receive'=>['type'=>'radio','label'=>'入力受取','value'=>['しない'=>-1,'する'=>1]],
			'push'=>['type'=>'radio','label'=>'データ登録','value'=>['しない'=>-1,'する'=>1]],
			'send_mail'=>['type'=>'checkbox_post_datas','label'=>'メール送信','value'=>$mailconf_post_type],
			'mail'=>['type'=>'share','show_in_menu'=>false,'show_in_loop'=>false,'meta'=>[]]
		];
		if(empty($conf_data['meta'])){$conf_data['meta']=$default_meta_conf;}
		else{$conf_data['meta']=array_merge($default_meta_conf,(array)$conf_data['meta']);}
		$conf_data['meta']['mail']+=[
			'label'=>$conf_data['label'],
			'menu_icon'=>'dashicons-email-alt',
			'form'=>$conf_data['data_name'].'/form',
			'mail_conf'=>$mailconf_post_type,
			'alias_template'=>['mailform','manage']
		];
		if(isset($conf_data['inputs'])){
			$conf_data['meta']['mail']['meta']+=$conf_data['inputs'];
		}
		$conf_data['meta']['mail']['meta']+=[
			'email'=>['type'=>'email','label'=>'メールアドレス']
		];
		if(isset($conf_data['on_receive_inputs'])){
			$conf_data['meta']['mail']['on_receive']=$conf_data['on_receive_inputs'];
		}
		if(!isset($GLOBALS['post_types'][$mailconf_post_type])){
			$GLOBALS['post_types'][$mailconf_post_type]=['article_type'=>'mailconf'];
			\cp::fill_conf_data('post',$mailconf_post_type,$GLOBALS['post_types'][$mailconf_post_type]);
		}
		$GLOBALS['post_types'][$mailconf_post_type]['inputs']=$conf_data['inputs']=&$conf_data['meta']['mail']['meta'];
	}
	public static function get_default_post_datas($conf_data){
		return [
			$conf_data['data_name'].'/form'=>['post_title'=>$conf_data['label'].'フォーム'],
			$conf_data['data_name'].'/form/confirm'=>['post_title'=>'確認'],
			$conf_data['data_name'].'/form/send'=>['post_title'=>'送信']
		];
	}
}

?>
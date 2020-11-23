<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class register extends template_type{
	public static $permalinks=['archive','task'];
	public static function get_embeddables($conf_data){
		return ['form'=>['登録'=>'form.php']];
	}
	
	public static function get_nav_menu_items($conf_data){
		return [
			$conf_data['label'].'  登録'=>$conf_data['name'].'/register'
		];
	}
	public static function get_menus($conf_data){
		return [
			'sub'=>[
				'登録フォーム'=>'register_form',
				'登録メール'=>'register_mail'
			]
		];
	}
	public static function fill_conf_data(&$conf_data){
		if(!isset($GLOBALS['post_types']['register_form'])){
			$GLOBALS['post_types']['register_form']=[
				'label'=>'登録フォーム',
				'public'=>false,
				'show_in_menu'=>false,
				'hierarchical'=>true,
				'meta'=>[
					'name'=>['type'=>'post_name','label'=>'名前'],
					'clear'=>['type'=>'checkbox','label'=>'クリア','value'=>['入力検証'=>1,'入力値'=>2,'フォーム'=>4]],
					'receive'=>['type'=>'radio','label'=>'データ受信','value'=>['しない'=>-1,'する'=>1]],
					'push'=>['type'=>'radio','label'=>'登録処理','value'=>['しない'=>-1,'する'=>1]],
					'send_mail'=>['type'=>'checkbox_post_datas','label'=>'メール送信','value'=>'register_mail']
				]
			];
			\cp::fill_conf_data('post','register_form',$GLOBALS['post_types']['register_form']);
		}
		if(!isset($GLOBALS['post_types']['register_mail'])){
			$GLOBALS['post_types']['register_mail']=[
				'label'=>'登録メール',
				'public'=>false,
				'show_in_menu'=>false,
				'richedit'=>false,
				'meta'=>[
					'name'=>['type'=>'post_name','label'=>'名前'],
					'to'=>['type'=>'text','label'=>'送信先'],
					'from'=>['type'=>'text','label'=>'送信元'],
					'type'=>['type'=>'radio','label'=>'メールタイプ','value'=>['plain','html']]
				]
			];
			\cp::fill_conf_data('post','register_mail',$GLOBALS['post_types']['register_mail']);
		}
	}
	public static function get_default_post_datas($conf_data){
		$name=basename($conf_data['path']);
		return [
			'register_form/form-'.$name=>['post_title'=>$conf_data['label'].'登録申請'],
			'register_form/form-'.$name.'/step1'=>['post_title'=>'メールアドレス入力'],
			'register_form/form-'.$name.'/step2'=>['post_title'=>'送信確認'],
			'register_form/task-'.$name=>['post_title'=>$conf_data['label'].'登録フォーム'],
			'register_form/task-'.$name.'/step1'=>['post_title'=>'入力確認'],
			'register_form/task-'.$name.'/step2'=>['post_title'=>'登録'],
			'register_mail/confirm-'.$name=>['post_title'=>$conf_data['label'].'登録確認'],
			'register_mail/thanks-'.$name=>['post_title'=>$conf_data['label'].'登録完了'],
			'register_mail/notice-'.$name=>['post_title'=>$conf_data['label'].'登録通知'],
		];
	}
	public static function get_form_type($file){
		switch($file){
			case 'form.php':
			case 'task.php':
				return 1;
			default:
				return 8;
		}
	}
}

?>
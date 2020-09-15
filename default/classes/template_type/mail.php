<?php
namespace Catpow\template_type;
/**
* @deprecated Catpowのメールフォームは管理画面でフォームの内容を編集できる形を基本にする
*/

class mail extends template_type{
	public static $permalinks=['archive'];
	public static function get_embeddables($conf_data){
		return ['form'=>[__('メールフォーム','catpow')=>'form.php']];
	}
	public static function get_template_files($conf_data){
		return [
			'index.php'=>[
				'php',
				'namespace Catpow;',
				"§form();"
			],
			'form.php'=>[
				'php',
				'namespace Catpow;',
				'clear(3);',
				"§sec('mail-step1');"
			],
			'sec_mail-step1.php'=>[
				'',
				['php','namespace catpow;','clear(1);'],
				'@inputs',
				[
					'ul.buttons',
					['li.primary',['php',"button('確認','step2');"]]
				],
				['php','§message()']
			],
			'sec_mail-step2.php'=>[
				'',
				['php','namespace catpow;','receive();','clear(1);'],
				'@outputs',
				[
					'ul.buttons',
					['li.negative',['php',"button('戻る','step1');"]],
					['li.primary',['php',"button('送信','step3');"]]
				]
			],
			'sec_mail-step3.php'=>[
				'',
				['php','namespace catpow;','push();','mail();',"mail('reply');",'clear(1);'],
				'@outputs'
			],
			'mail.php'=>[
				'',
				['php','namespace catpow;','$headers=[',[
					"'from'=>get_bloginfo('admin_email'),",
					"'to'=>get_bloginfo('admin_email'),",
					"'subject'=>get_bloginfo('name')"
				],'];'],
				'@outputs plain'
			],
			'mail-reply.php'=>[
				'',
				['php','namespace catpow;','$headers=[',[
					"'from'=>get_bloginfo('admin_email'),",
					"'to'=>value('email'),",
					"'subject'=>get_bloginfo('name')"
				],'];'],
				'@outputs plain'
			],
			'header.php'=>['','@catpow','@page_header'],
			'footer.php'=>['','@catpow','@page_footer'],
			'sidebar.php'=>['','@catpow','@sidebar'],
			'style.scss'=>['@config','#{sel(m e)}'=>[]],
			'script.js'=>['jQuery(function($){%s});'=>''],
		];
	}
}

?>
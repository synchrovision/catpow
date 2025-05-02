<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class user_panel extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return [
			'',
			['div.user-panel',
				'<?php if(is_user_logged_in()):foreach(loop() as $obj): ?>',
			 	['div.image','<?= get_avatar($obj->email) ?>'],
			 	['div.text',
					['h3','<?= $obj->display_name ?>'],
					'<a href="<?=wp_logout_url(); ?>"/>ログアウト</a>'
				],
				'<?php endforeach;else: ?>',
			 	'<a class="button" href="<?=wp_login_url(); ?>"/>ログイン</a>',
				'<?php endif; ?>'
			]
		];
	}
}

?>
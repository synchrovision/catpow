<?php
namespace Catpow\template_type;
/**
* テーマの基本ファイル専用のテンプレートタイプ
*/

class primary extends template_type{
	public static function get_template_files($conf_data){
		if(\wp_is_block_theme()){
			return [
				'style.scss'=>'default',
				'admin.scss'=>'default',
				'content.scss'=>'default',
				'config/style_config.scss'=>'default',
			];
		}
		return [
			'style.scss'=>'default',
			'admin.scss'=>'default',
			'content.scss'=>'default',
			'config/style_config.scss'=>'default',
			'header.php'=>['',
				'@catpow',
				'<!DOCTYPE html>',
				['html/',
				 	['head[<?php language_attributes(); ?>]',
						'<meta charset="<?= bloginfo(\'charset\');?>"/>',
						'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;">',
						'<meta http-equiv="Pragma" content="no-cache">',
						'<meta http-equiv="Cache-Control" content="no-cache">',
						'<?php wp_head(); ?>',
				 	],
				 	['body/[<?php body_class(\'base\') ?>]',
					 	'<?php wp_body_open(); ?>',
					 	['header.site_header',
						 	[
								'div.contents',
								['h1.logo',
									 '<?php the_custom_logo(); ?>',
									 '<small><?= bloginfo(\'description\');?></small>'
								],	
							],
						 	'@menu primary',
						 	'@menu header',
						 	'@menu sub',
						 	['div.menu_button',['.line1',' '],['.line2',' '],['.line3',' ']],
						 	['div.back_to_top']
						],
					 	['main/[class="<?php site_main_class(); ?>"]']
					]
				]
			],
			'footer.php'=>['',
				'@catpow',
				['/html',
					['/body',
						['/main'],
						['footer.site_footer',
							'@menu footer',
							['p.copyright','Copyights(c) <?= bloginfo(\'title\');?>. All Rights Reserved.']
						],
						'<?php wp_footer(); ?>'
					]
				]
			],
			'sidebar.php'=>['',
				'@catpow',
				'@menu side',
				'<div class="sidebar_button"></div>',
			],
			'404.php'=>['',
				'@catpow',
				'@site_header',
				['div.message','404 Not Found'],
				'@site_footer'
			],
			'attachment.php'=>['php','header("HTTP/1.1 404 Not Found");','include __DIR__.(\'/404.php\');'],
			'maintenance.php'=>['php','header (\'HTTP/1.0 503 Service Temporarily Unavailable\')']
		];
	}
}

?>
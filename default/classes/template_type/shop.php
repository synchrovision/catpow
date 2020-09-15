<?php
namespace Catpow\template_type;
/**
* ショップカート
* waresのmetaを持つ投稿タイプでしか使用できない
*/

class shop extends template_type{
	public static $permalinks=['archive','archive-cart','task-mail'];
	public static function get_embeddables($conf_data){
		return [
			'form'=>[
				__('ショップ','catpow')=>'form.php',
				__('カート','catpow')=>'form_cart.php'
			]
		];
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
				"§sec('search');"
			],
			'sec_search.php'=>[
				'',
				['php','namespace catpow;','clear(1);'],
				'@inputs_search',
				[
					'ul.buttons',
					['li.primary',['php',"button('検索','results','update_results');"]]
				],
				['php','§results()'],
				['php','§message()']
			],
			'sec_search-results.php'=>[
				'',[
					'php',
					'namespace Catpow;',
					'receive();'
				],[
					'div.items',
					'<?php foreach(loop() as $obj){§sec(\'item\');} ?>'
				],
			],
			'sec_item.php'=>[
				'',
				'@catpow',
				[
					'div.item',
					['h3','@title'],[
						'p',
						'@desc',
					],
					[
						'ul.buttons',
						['li.cart',['php',"button('カートに入れる','to_cart','update_section');"]]
					]
				]
				
			],
			'sec_item-to_cart.php'=>[
				'',
				['php','namespace catpow;','receive();inc(\'sec_item\');'],
				[
					'div.item',
					['h3','@title'],[
						'p',
						'@desc',
					]
				]
				
			],
			'task-mail.php'=>[
				'',
				['php','namespace catpow;','this()->complete()->save();'],
				'メール認証完了'
			],
			
			'index_cart.php'=>[
				'php',
				'namespace Catpow;',
				"form('cart');"
			],
			'form_cart.php'=>[
				'php',
				'namespace Catpow;',
				'clear(3);',
				"§sec('cart-step1');"
			],
			'sec_cart-step1.php'=>[
				'',
				['php','namespace catpow;','clear(1);'],
				'@inputs',
				[
					'ul.buttons',
					['li.primary',['php',"button('確認','step2');"]]
				],
				['php','§message()']
			],
			'sec_cart-step2.php'=>[
				'',
				['php','namespace catpow;','receive();','clear(1);'],
				'@outputs',
				[
					'ul.buttons',
					['li.negative',['php',"button('戻る','step1');"]],
					['li.primary',['php',"button('送信','step3');"]]
				]
			],
			'sec_cart-step3.php'=>[
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
			]
		];
	}
}

?>
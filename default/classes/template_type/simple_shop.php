<?php
namespace Catpow\template_type;
/**
* カートを中継しないシンプルな購入フォーム
* 1 購入ボタンをクリック
* 2 支払い方法を選択
* 
* waresのmetaを持つ投稿タイプでしか使用できない
*/

class simple_shop extends template_type{
	public static $permalinks=['archive','archive-cart','task-mail'];
	public static function get_embeddables($path,$conf_data){
		return [
			'loop'=>[__('商品','catpow')=>'loop_item.php'],
			'form'=>[__('ショップ')=>'form.php',__('カート','catpow')=>'form_cart.php']
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
					['li.primary',['php',"button(_('検索'),'results','update_results');"]]
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
						['li.cart',['php',"button(_('カートに入れる'),'to_cart','update_section');"]]
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
				"<?=_('メール認証完了')?>"
			],
			
		];
	}
}

?>
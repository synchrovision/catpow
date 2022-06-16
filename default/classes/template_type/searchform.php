<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class searchform extends template_type{
	public static function get_embeddables($path,$conf_data){
		return ['form'=>['検索フォーム'=>'form.php']];
	}
	public static function get_template_files($conf_data){
		return [
			'form.php'=>[
				'php',
				'namespace Catpow;',
				'clear(3);',
				"§sec('search');"
			],
			'sec_search.php'=>[
				'',
				'@catpow',
				'@inputs_search',
				[
					'ul.buttons',
					['li.primary',['php',"button('検索','results','update_results');"]]
				],
				['php','§results();'],
				['php','§message();']
			],
			'sec_search-results.php'=>[
				'',[
					'php',
					'namespace Catpow;',
					'receive();'
				],[
					'ul.listed',
					'<?php foreach(loop() as $obj): ?>',[
						'li.item',
						['h3','@title'],[
							'p',
							'@desc',
							'@outputs',
						]
					],
					'<?php endforeach; ?>'
				],
			]
		];
	}
}

?>
<?php
namespace Catpow\template_type;
/**
* 
*/

class slick extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'loop'=>[
				'Slick'=>'loop.php'
			]
		];
	}
	public static function get_template_files($conf_data){
		return [
			'loop.php'=>[
				'',
				[
					'php',
					'namespace Catpow;',
					"wp_enqueue_script('jqury_slick');",
					"wp_enqueue_style('jqury_slick-theme-style');",
					'$slick=[',[
						"'slidesToShow'=>4,",
						"'responsive'=>[",[
							"['breakpoint'=>800,'settings'=>['slidesToShow'=>3]],",
							"['breakpoint'=>600,'settings'=>['slidesToShow'=>2]]",
						],']',
					],'];'
					
				],
				[
					'ul.wp-block-catpow-slick.articles[data-slick=\'<?=json_encode($slick);?>\']',
					'<?php foreach(loop() as $obj): ?>',[
						'li.item',
						'@image',
						['div.text',['h3','@title'],['p','@desc']],
						'@link'
					],
					'<?php endforeach; ?>'
				]
			],
			'script.js'=>[
				'jQuery(funciton($){%s});'=>[
					'if($.fn.slick){$(\'.wp-block-catpow-slick\').slick();}'
				]
			]
		];
	}
}

?>
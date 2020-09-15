<?php
namespace Catpow\template_type;
/**
* チェックシートの質問のセクション
*/

class question extends template_type{
	public static function get_embeddables($conf_data){
		return ['loop'=>['質問'=>'loop.php']];
	}
	public static function fill_conf_data(&$conf_data){
		$conf_data['meta']=array_merge([
			'order'=>['type'=>'menu_order','label'=>'表示順'],
			'conf'=>['type'=>'data','label'=>'設定','meta'=>[
				'required'=>['type'=>'radio','label'=>'必須入力','value'=>['必須'=>1,'任意'=>-1]],
				'min'=>['type'=>'number','label'=>'最小選択数'],
				'max'=>['type'=>'number','label'=>'最大選択数']
			]],
			'selections'=>['type'=>'data','label'=>'選択肢','meta'=>[
				'label'=>['type'=>'text','label'=>'ラベル'],
				'value'=>['type'=>'text','label'=>'評価'],
				'has_text'=>['type'=>'radio','label'=>'テキスト入力','value'=>['あり'=>1,'なし'=>-1]]
			],'multiple'=>'true'],
			'sheet'=>['type'=>'share','show_in_menu'=>false,'meta'=>[
				'ip'=>['type'=>'text','label'=>'IPアドレス'],
				'user'=>['type'=>'select_rel_users','label'=>'ユーザー'],
				'value'=>['type'=>'text','label'=>'評価']
			]],
			'answers'=>['type'=>'checksheet']
		],(array)$conf_data['meta']);
	}
	public static function get_template_files($conf_data){
		$form_post_type=$conf_data['data_name'];
		return[
			'loop.php'=>['',
				'@catpow',
				['ul.questions',
				 	'<?php foreach(loop() as $post): ?>',
				 	['li.item',
					 	['h3','<?php the_title(); ?>'],
					 	['p','<?php the_content(); ?>']
					],
				 	'<?php endforeach; ?>'
				]
			]
		];
	}
	public static function get_default_post_datas($conf_data){
		return [
			$conf_data['data_name'].'/question1'=>['post_title'=>'質問１'],
			$conf_data['data_name'].'/question2'=>['post_title'=>'質問２'],
			$conf_data['data_name'].'/question3'=>['post_title'=>'質問３'],
		];
	}
}

?>
<?php
namespace Catpow\Ability\Customize;

use Catpow\util\style_config;

class GetColor extends \Catpow\Ability{
	public static
		$label='カラー設定を取得',
		$description='サイトの背景色・基本色・強調色・文字色などの色の設定を取得します。',
		$output_schema=[
			'type'=>'object',
			'description'=>'background（背景）、main（基本）、accent（強調）、text（文字）など、カラーロール名と色の対応。',
			'additionalProperties'=>['type'=>'string'],
		];

	public static function exec($data){
		$saved=(array)get_theme_mod('colors',[]);
		$config=(array)style_config::get_config_json('colors');
		$colors=[];
		foreach(style_config::get_color_roles() as $role=>$settings){
			$key=$settings['shorthand'];
			$colors[$role]=$saved[$role]??$saved[$key]??$config[$role]??$config[$key]??$settings['default']??'#888888';
		}
		return (object)$colors;
	}
}

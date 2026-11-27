<?php
namespace Catpow\Ability\Customize;

use Catpow\util\Color;
use Catpow\util\style_config;

class SetColor extends \Catpow\Ability{
	private const HEX_PATTERN='^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$';

	public static
		$label='カラー設定を更新',
		$description='サイトの背景色・基本色・強調色・文字色などの色の設定を更新します。',
		$input_schema=[
			'type'=>'object',
			'description'=>'変更するカラーロール名（background、main、accent、text など）と16進カラーコードの対応。',
			'minProperties'=>1,
			'additionalProperties'=>['type'=>'string','pattern'=>self::HEX_PATTERN],
		],
		$output_schema=[
			'type'=>'object',
			'description'=>'更新後のカラーロール名と色の対応。',
			'additionalProperties'=>['type'=>'string'],
		],
		$meta=['show_in_rest'=>true,'public'=>false],
		$annotations=['readonly'=>false,'destructive'=>false,'idempotent'=>true];

	public static function permission(){
		return current_user_can('edit_theme_options');
	}

	public static function exec($data){
		$roles=style_config::get_color_roles();
		if(!(is_array($data) || is_object($data)) || !(array)$data){
			return new \WP_Error('catpow_invalid_colors','変更するカラーロールと色を指定してください。',['status'=>400]);
		}

		$colors=(array)GetColor::exec(null);
		$changed=[];
		foreach($data as $role=>$color){
			if(!isset($roles[$role]) || !is_string($color) || !preg_match('/'.self::HEX_PATTERN.'/D',$color)){
				return new \WP_Error('catpow_invalid_color',sprintf('カラーロール「%s」または色の指定が無効です。',$role),['status'=>400]);
			}
			if(strlen($color)<=5){
				$color='#'.preg_replace('/[0-9a-fA-F]/','$0$0',substr($color,1));
			}
			if($colors[$role]!==$color){
				$changed[$role]=$color;
			}
		}
		if(!$changed){return (object)$colors;}

		$saved=(array)get_theme_mod('colors',[]);
		$config_tones=(array)style_config::get_config_json('tones');
		$tones=[];
		$colors=array_replace($colors,$changed);
		foreach($colors as $role=>$color){
			$key=$roles[$role]['shorthand'];
			if(!isset($roles[$key])){unset($saved[$key]);}
			if(!isset($changed[$role]) && isset($saved['tones'][$key])){
				$tones[$key]=$saved['tones'][$key];
				continue;
			}
			if(!isset($changed[$role]) && isset($config_tones[$key])){
				$tones[$key]=$config_tones[$key];
				continue;
			}
			try{
				$tones[$key]=self::get_tone($color);
			}
			catch(\Throwable $error){
				return new \WP_Error('catpow_invalid_saved_color',sprintf('カラーロール「%s」の色を変換できませんでした。',$role),['status'=>500]);
			}
		}
		$saved=array_replace($saved,$colors,[
			'tones'=>$tones,
			'hueRange'=>$saved['hueRange']??$config_tones['hr']??30,
			'hueShift'=>$saved['hueShift']??$config_tones['hs']??0,
		]);
		set_theme_mod('colors',$saved);
		style_config::update_config_json('colors',$saved);
		return (object)$colors;
	}

	private static function get_tone(string $color): array{
		if(preg_match('/^oklch\(([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)$/D',$color,$matches)){
			[, $l, $c, $h]=$matches;
			$tone=['l'=>(float)$l,'c'=>(float)$c,'h'=>(float)$h,'a'=>(float)($matches[4]??1)];
		}
		else{
			$tone=Color::to_oklch($color);
		}
		$tone['t']=(1-$tone['l'])/100;
		return $tone;
	}
}

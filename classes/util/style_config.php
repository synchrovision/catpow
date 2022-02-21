<?php
/**
* フォント関連の設定を管理
*/
namespace Catpow\util;
use Spatie\Color\Hex;
use Spatie\Color\Hsl;
use Spatie\Color\Hsla;
use Spatie\Color\Rgba;
use Spatie\Color\Factory;

class style_config{
	protected static
		$color_roles,
		$font_roles,
		$cache=[];
	public static function get_color_roles(){
		if(isset(static::$color_roles)){return static::$color_roles;}
		return static::$color_roles=apply_filters('cp_color_roles',[
			'background'=>['label'=>'背景色','default'=>'#ffffff','shorthand'=>'b'],
			'main'=>['label'=>'基本色','default'=>'#888888','shorthand'=>'m','extend'=>true],
			'accent'=>['label'=>'強調色','default'=>'#EE8800','shorthand'=>'a','extend'=>true],
			'text'=>['label'=>'文字色','default'=>'#666666','shorthand'=>'t']
		]);
	}
	public static function get_font_roles(){
		if(isset(static::$font_roles)){return static::$font_roles;}
		return static::$font_roles=apply_filters('cp_font_roles',[
			'heading'=>['label'=>'見出し','default'=>'sans-serif','shorthand'=>'h'],
			'text'=>['label'=>'本文','default'=>'sans-serif','shorthand'=>'t'],
			'caption'=>['label'=>'キャプション','default'=>'sans-serif','shorthand'=>'c'],
			'decoration'=>['label'=>'装飾','default'=>'sans-serif','shorthand'=>'d'],
			'strong'=>['label'=>'強調','default'=>'sans-serif','shorthand'=>'s']
		]);
	}
	public static function update($wp_customize_settings=null){
		if(isset($wp_customize_settings)){
			$id_data=$wp_customize_settings->id_data();
			$domain=$id_data['base'];
			$key=$id_data['keys'][0];
			$data=get_theme_mod($domain);
			$data[$key]=$wp_customize_settings->post_value();
			$data=static::translate_keys($domain,$data);
			if($domain==='colors'){
				$data=static::extend_colors($data);
				static::set_config_json('tones',static::get_tones($data));
			}
			static::set_config_json($domain,$data);
		}
		do_action('cp_style_config_update');
		update_option('cp_style_config_modified_time',time());
	}
	public static function translate_keys($domain,$data){
		$get_roles_method='get_'.preg_replace('/s$/','',$domain).'_roles';
		if(!method_exists(static::class,$get_roles_method)){return $data;}
		$roles=static::{$get_roles_method}();
		$rtn=[];
		foreach($data as $key=>$val){
			$rtn[$roles[$key]['shorthand']??$key]=$val;
		}
		return $rtn;
	}
	public static function extend_colors($colors){
		$roles=static::get_color_roles();
		$hsls=[];
		foreach($roles as $role=>$conf){
			if(empty($conf['extend'])){continue;}
			$key=$conf['shorthand'];
			$hsl=Factory::fromString($colors[$key])->toHsl();
			foreach(range(1,12) as $i){
				$colors[($key==='m'?'':$key).$i]=(string)(new Hsl(($i-1)*30,$hsl->saturation(),$hsl->lightness()))->toHex();
			}
		}
		$b_hsl=Factory::fromString($colors['b'])->toHsl();
		$bla=$b_hsl->lightness()/250;
		$colors['b2']=(string)(new Hsl($b_hsl->hue(),$b_hsl->saturation(),$b_hsl->lightness()-5))->toHex();
		$colors['sh']=(string)(new Hsla(0,0,0,0.6-$bla));
		$colors['lt']=(string)(new Hsla(0,0,100,0.1+$bla));
		$colors['shd']=(string)(new Hsla(0,0,0,0.7-$bla));
		$colors['i']=$b_hsl->lightness()>50?'#FFFFFF':'#000000';
		$colors['n']='transparent';
		return apply_filters('cp_extend_colors',$colors);
	}
	public static function get_tones($colors){
		$roles=static::get_color_roles();
		$tones=[];
		foreach($roles as $role=>$conf){
			$key=$conf['shorthand'];
			$hsl=Factory::fromString($colors[$key])->toHsl();
			$hsb=$hsl->toHsb();
			$tones[$key]=[
				'h'=>round($hsl->hue()),
				's'=>round($hsl->saturation()).'%',
				'l'=>round($hsl->lightness()).'%',
				't'=>round(1-$hsl->lightness()/100,2).'%',
				'S'=>round($hsb->saturation()).'%',
				'B'=>round($hsb->brightness()).'%',
			];
		}
		foreach(['sh','lt','shd'] as $key){
			$color=Factory::fromString($colors[$key]);
			$tones[$key]=['a'=>round($color->alpha(),2)];
		}
		return $tones;
	}
	public static function print_css_vars(){
		$vars=apply_filters('cp_css_vars',[
			'tones'=>self::get_config_json('tones'),
			'colors'=>self::get_config_json('colors'),
			'fonts'=>self::get_config_json('fonts')
		]);
		echo '<style type="text/css" id="cp-css-vars">:root{';
		foreach($vars as $group=>$vals){
			foreach($vals as $key=>$val){
				if(is_array($val)){
					foreach($val as $k=>$v){
						printf('--cp-%s-%s-%s:%s;',$group,$key,$k,$v);
					}
				}
				else{
					printf('--cp-%s-%s:%s;',$group,$key,$val);
				}
			}
		}
		echo '}</style>';
	}
	public static function set_config_json($domain,$data){
		static::$cache[$domain]=$data;
		return file_put_contents(self::get_config_dir_path().'/'.$domain.'.json',json_encode($data,0700));
	}
	public static function get_config_json($domain){
		if(isset(static::$cache[$domain])){return static::$cache[$domain];}
		if(file_exists($f=self::get_config_dir_path().'/'.$domain.'.json')){
			return static::$cache[$domain]=json_decode(file_get_contents($f),true);
		}
		return static::$cache[$domain]=[];
	}
	public static function get_config_dir_path(){
		static $path;
		if(isset($path)){return $path;}
		$path=WP_CONTENT_DIR.'/config/';
		if(is_multisite()){$path.=get_current_blog_id().'/';}
		$path.=get_stylesheet();
		return $path;
	}
}

?>
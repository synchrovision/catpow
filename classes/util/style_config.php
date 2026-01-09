<?php
/**
* 色・フォントのカスタマイズとCSS変数
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
		$size_roles,
		$font_weight_roles,
		$font_size_roles,
		$cache=[];
	public static function get_color_roles(){
		if(isset(static::$color_roles)){return static::$color_roles;}
		return static::$color_roles=apply_filters('cp_color_roles',[
			'background'=>['label'=>'背景','default'=>'#ffffff','shorthand'=>'b','extend'=>true,'invert'=>'m'],
			'sheet'=>['label'=>'強調背景','default'=>'#F8F6F4','shorthand'=>'s','extend'=>true,'invert'=>'a'],
			'text'=>['label'=>'文字','default'=>'#666666','shorthand'=>'t','extend'=>true,'invert'=>'i'],
			'highlight'=>['label'=>'強調文字','default'=>'#AA1100','shorthand'=>'h','extend'=>true,'invert'=>'e'],
			'main'=>['label'=>'基本','default'=>'#443322','shorthand'=>'m','extend'=>true,'invert'=>'b'],
			'accent'=>['label'=>'強調','default'=>'#FF8800','shorthand'=>'a','extend'=>true,'invert'=>'s'],
			'inside'=>['label'=>'抜文字','default'=>'#ffffff','shorthand'=>'i','extend'=>true,'invert'=>'t'],
			'emphasis'=>['label'=>'抜強調文字','default'=>'#FF3300','shorthand'=>'e','extend'=>true,'invert'=>'h'],
			'light'=>['label'=>'照明','default'=>'hsla(0,0%,100%,0.6)','shorthand'=>'lt','alphaEnabled'=>true],
			'lust'=>['label'=>'光沢','default'=>'hsla(0,0%,100%,0.9)','shorthand'=>'lst','alphaEnabled'=>true],
			'shade'=>['label'=>'陰','default'=>'hsla(0,0%,0%,0.2)','shorthand'=>'sh','alphaEnabled'=>true],
			'shadow'=>['label'=>'影','default'=>'hsla(0,0%,0%,0.3)','shorthand'=>'shd','alphaEnabled'=>true],
		]);
	}
	public static function get_size_roles(){
		if(isset(static::$content_size_roles)){return static::$content_size_roles;}
		$base_size_roles=[
			'contents'=>['label'=>'コンテンツ','default'=>'60rem','shorthand'=>'c'],
		];
		return static::$font_size_roles=apply_filters('cp_content_size_roles',array_merge(
			$base_size_roles
		));
	}
	public static function get_font_roles(){
		if(isset(static::$font_roles)){return static::$font_roles;}
		return static::$font_roles=apply_filters('cp_font_roles',[
			'heading'=>['label'=>'見出し','default'=>'sans-serif','shorthand'=>'h'],
			'text'=>['label'=>'本文','default'=>'sans-serif','shorthand'=>'t'],
			'code'=>['label'=>'コード','default'=>'monospace','shorthand'=>'c'],
			'decoration'=>['label'=>'装飾','default'=>'fantasy','shorthand'=>'d'],
			'script'=>['label'=>'手書き','default'=>'cursive','shorthand'=>'s'],
			'bold'=>['label'=>'太字','default'=>'sans-serif','shorthand'=>'b']
		]);
	}
	public static function get_font_weight_roles(){
		if(isset(static::$font_weight_roles)){return static::$font_weight_roles;}
		return static::$font_weight_roles=apply_filters('cp_font_weight_roles',[
			'heading'=>['label'=>'見出し','default'=>'700','shorthand'=>'h'],
			'text'=>['label'=>'本文','default'=>'400','shorthand'=>'t'],
			'code'=>['label'=>'コード','default'=>'400','shorthand'=>'c'],
			'decoration'=>['label'=>'装飾','default'=>'700','shorthand'=>'d'],
			'script'=>['label'=>'手書き','default'=>'cursive','shorthand'=>'s'],
			'bold'=>['label'=>'太字','default'=>'700','shorthand'=>'b']
		]);
	}
	public static function get_font_size_roles(){
		if(isset(static::$font_size_roles)){return static::$font_size_roles;}
		$relative_size_roles=[
			'large'=>['label'=>'大字','default'=>'1.1em','shorthand'=>'l','relative'=>true],			
			'small'=>['label'=>'小字','default'=>'0.8em','shorthand'=>'s','relative'=>true]
		];
		$heading_size_roles=[];
		$paragraph_size_roles=[];
		$get_size=function($min,$max,$p){
			$size=$min+($max-$min)/5*$p;
			return ($size/16).'rem';
		};
		for($i=1;$i<=6;$i++){
			$heading_size_roles["heading{$i}"]=[
				'label'=>"見出し{$i}",
				'default'=>[$get_size(12,52,6-$i),$get_size(12,22,6-$i)],'shorthand'=>"h{$i}",
				'responsive'=>true
			];
			$paragraph_size_roles["paragraph{$i}"]=[
				'label'=>"段落{$i}",
				'default'=>[$get_size(10,20,6-$i),$get_size(10,15,6-$i)],'shorthand'=>"p{$i}",
				'responsive'=>true
			];
		}
		return static::$font_size_roles=apply_filters('cp_font_size_roles',array_merge(
			$base_size_roles,
			$heading_size_roles,
			$paragraph_size_roles,
			$relative_size_roles
		));
	}
	public static function update($wp_customize_settings=null){
		if(isset($wp_customize_settings)){
			$id_data=$wp_customize_settings->id_data();
			$domain=$id_data['base'];
			$data=get_theme_mod($domain);
			if(!empty($key=$id_data['keys'][0]??null)){
				$data[$key]=$wp_customize_settings->post_value();
			}
			else{
				$data=$wp_customize_settings->post_value();
			}
			static::update_config_json($domain,$data);
		}
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
	public static function get_tones($colors){
		$roles=static::get_color_roles();
		$tones=[];
		$lacks=[];
		foreach($roles as $role=>$conf){
			$key=$conf['shorthand'];
			$color=$colors[$role]??$colors[$key]??null;
			if(empty($color)){$lacks[]=$role;}
			if($conf['alphaEnabled']){
				$raw=Factory::fromString($color);
				$hsl=$raw->toHsl();
				$tones[$key]=[
					'h'=>round($hsl->hue()),
					's'=>round($hsl->saturation()),
					'l'=>round($hsl->lightness()),
					'a'=>round($raw->alpha(),2),
				];
			}
			else{
				$hsl=Factory::fromString($color)->toHsl();
				$hsb=$hsl->toHsb();
				$tones[$key]=[
					'h'=>round($hsl->hue()),
					's'=>round($hsl->saturation()),
					'l'=>round($hsl->lightness()),
					't'=>round(1-$hsl->lightness()/100,2),
					'S'=>round($hsb->saturation()),
					'B'=>round($hsb->brightness()),
				];
			}
		}
		return $tones;
	}
	public static function get_breakpoints(){
		static $cache;
		if(isset($cache)){return $cache;}
		return $cache=apply_filters('cp_breakpoints',[
			'all'=>'all',
			'<=960'=>'screen and (max-width:960px)',
			'<=720'=>'screen and (max-width:720px)',
			'<=480'=>'screen and (max-width:480px)'
		]);
	}
	public static function get_css_vars(){
		static $css_vars;
		if(isset($css_vars)){return $css_vars;}
		$roles=static::get_color_roles();
		$css_vars=['all'=>[]];
		$vars=apply_filters('cp_css_vars',[
			'tones'=>self::get_config_json('tones'),
			'colors'=>self::get_config_json('colors'),
			'sizes'=>self::get_config_json('sizes'),
			'fonts'=>self::get_config_json('fonts'),
			'font-weights'=>self::get_config_json('font-weights'),
			'font-sizes'=>self::get_config_json('font-sizes'),
		]);
		$bps=array_values(self::get_breakpoints());
		if(isset($vars['tones']['i'])){
			foreach($roles as $role){
				if(!empty($role['invert'])){
					$key=$role['shorthand'];
					$vars['tones'][$key.'x']=$vars['tones'][$key]??[];
				}
			}
		}
		foreach($vars as $group=>$vals){
			foreach($vals as $key=>$val){
				if(is_array($val) && key($val)!==0){
					foreach($val as $k=>$v){
						if(is_array($v)){
							foreach($v as $i=>$vv){
								$css_vars[$bps[$i]][sprintf('--cp-%s-%s-%s',$group,$key,$k)]=$vv;
							}
						}
						else{
							$css_vars['all'][sprintf('--cp-%s-%s-%s',$group,$key,$k)]=$v;
							if($group==='tones'){
								$css_vars['all'][sprintf('--cp-root-%s-%s-%s',$group,$key,$k)]=$v;
								$css_vars['all'][sprintf('--cp-container-%s-%s-%s',$group,$key,$k)]=$v;
							}
						}
					}
				}
				else{
					if(is_array($val)){
						foreach($val as $i=>$v){
							$css_vars[$bps[$i]][sprintf('--cp-%s-%s',$group,$key)]=$v;
						}
					}
					else{
						$css_vars['all'][sprintf('--cp-%s-%s',$group,$key)]=$val;
					}
				}
			}
		}
		$css_vars['all']['--wp-background-image']=sprintf('url(%s)',get_background_image());
		$css_vars['all']['--wp-background-position-x']=get_theme_mod('background_position_x',get_theme_support('custom-background','default-position-x'));
		$css_vars['all']['--wp-background-position-y']=get_theme_mod('background_position_y',get_theme_support('custom-background','default-position-y'));
		$css_vars['all']['--wp-background-attachment']=get_theme_mod('background_attachment');
		$css_vars['all']['--wp-background-repeat']=get_theme_mod('background_repeat');
		$css_vars['all']['--wp-background-size']=get_theme_mod('background_size',get_theme_support('custom-background','default-size'));
		$css_vars['all']['--wp-logo-image']=sprintf('url(%s)',wp_get_attachment_url(get_theme_mod('custom_logo')));
		$css_vars['all']['--wp-icon-image']=sprintf('url(%s)',get_site_icon_url());
		return $css_vars;
	}
	public static function get_css_vars_code(){
		static $code;
		if(isset($code)){return $code;}
		$code='';
		foreach(self::get_css_vars() as $bp=>$vars){
			$code.=$bp==='all'?':root{':"@media({$bp}){:root{";
			foreach($vars as $key=>$val){
				if(is_array($val)){
					$code.=sprintf('%s:%s;',$key,$val[0]);
					$altCode.=sprintf('%s:%s;',$key,$val[1]);
				}
				else{
					$code.=sprintf('%s:%s;',$key,$val);
				}
			}
			$code.=$bp==='all'?'}':'}}';
		}
		return $code;
	}
	public static function print_css_vars(){
		echo '<style type="text/css" id="cp-css-vars">';
		echo self::get_css_vars_code();
		echo '</style>';
	}
	public static function resolve_css_vars($css_code){
		$vars=self::get_css_vars()['all'];
		return preg_replace_callback('/var\((\-\-[\w\-]+)(,\w+)?\)/',function($matches)use($vars){
			if(isset($vars[$matches[1]])){return $vars[$matches[1]];}
			return $matches[0];
		},$css_code);
	}
	public static function init_config_json(){
		$colors=array_merge(
			array_column(static::get_color_roles(),'default','shorthand'),
			static::get_config_json('colors')
		);
		static::set_config_json('colors',$colors);
		$tones=self::fill_tones_data(static::get_tones($colors));
		static::set_config_json('tones',$tones);
		static::set_config_json('fonts',array_merge(
			array_column(static::get_font_roles(),'default','shorthand'),
			static::get_config_json('fonts')
		));
		static::set_config_json('font-weights',array_merge(
			array_column(static::get_font_weight_roles(),'default','shorthand'),
			static::get_config_json('font-weights')
		));
		static::set_config_json('font-sizes',array_merge(
			array_column(static::get_font_size_roles(),'default','shorthand'),
			static::get_config_json('font-sizes')
		));
		static::set_config_json('sizes',array_merge(
			array_column(static::get_size_roles(),'default','shorthand'),
			static::get_config_json('sizes')
		));
	}
	public static function update_config_json($domain,$data){
		if($domain==='colors'){
			$tones=self::fill_tones_data($data['tones']);
			$tones['hr']=$data['hueRange'];
			$tones['hs']=$data['hueShift'];
			static::set_config_json('tones',$tones);
			unset($data['tones']);
			unset($data['autoDefine']);
			unset($data['hueRange']);
			unset($data['hueShift']);
		}
		$data=static::translate_keys($domain,$data);
		static::set_config_json($domain,$data);
		do_action('cp_style_config_update');
		update_option('cp_style_config_modified_time',time());
	}
	public static function fill_tones_data($tones){
		$inverts=array_column(self::get_color_roles(),'invert','shorthand');
		foreach($tones as $key=>$tone){
			foreach($tone as $k=>$v){
				if($k!=='h' && $k!=='a')$tones[$key][$k].='%';
			}
			if($tone['s']==0 && $tone['h']==0 && isset($inverts[$key]) && isset($tones[$inverts[$key]])){
				$tones[$key]['h']=$tones[$inverts[$key]]['h'];
			}
		}
		return $tones;
	}
	public static function set_config_json($domain,$data){
		static::$cache[$domain]=$data;
		$config_dir=self::get_config_dir_path();
		if(!is_dir($config_dir)){mkdir($config_dir,0755,true);}
		return file_put_contents($config_dir.'/'.$domain.'.json',json_encode($data,0700));
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
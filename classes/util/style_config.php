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
		$size_roles,
		$font_family_roles,
		$font_weight_roles,
		$font_size_roles,
		$line_height_roles,
		$letter_spacing_roles,
		$text_block_roles=[
			'heading'=>['label'=>'見出し','shorthand'=>'h','sampleValues'=>[28,26,24,23,22,21]],
			'lead'=>['label'=>'リード文','shorthand'=>'l','sampleValues'=>[21,20,19,18,17,16]],
			'paragraph'=>['label'=>'本文','shorthand'=>'p','sampleValues'=>[20,19,18,17,16,15]],
			'ui'=>['label'=>'UI','shorthand'=>'u','sampleValues'=>[22,21,20,19,18,17]],
			'caption'=>['label'=>'注釈','shorthand'=>'c','sampleValues'=>[19,18,17,16,15,14]],
		],
		$size_variants_3=[
			's'=>'small',
			'm'=>'medium',
			'l'=>'large',
		],
		$size_variants_5=[
			'xs'=>'x-small',
			's'=>'small',
			'm'=>'medium',
			'l'=>'large',
			'xl'=>'x-large'
		],
		$level_variants=[
			1=>'Level1',
			2=>'Level2',
			3=>'Level3',
			4=>'Level4',
			5=>'Level5',
			6=>'Level6',
		],
		$component_variants=[
			'f'=>'Frame',
			'h'=>'Header',
			'c'=>'Card',
			'b'=>'Button',
			'l'=>'Label',
			't'=>'Tab',
			'i'=>'Input',
		],
		$cache=[];

	//roles
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
		if(isset(static::$size_roles)){return static::$size_roles;}
		$static_sizes=[
			'contents'=>[
				'label'=>'コンテンツ',
				'shorthand'=>'c',
				'var'=>'--cp-content-width',
				'variants'=>self::$size_variants_3,'type'=>'size',
				'group'=>'contentsSize',
				'defaultValues'=>['min(90vw,40rem)','min(95vw,60rem)','min(98vw,80rem)']
			],
			'item'=>[
				'label'=>'アイテム',
				'shorthand'=>'i',
				'var'=>'--cp-item-size',
				'variants'=>self::$size_variants_3,'type'=>'sizeRelative',
				'group'=>'contentsSize',
				'defaultValues'=>['10em','15em','20em']
			],
			'radius'=>[
				'label'=>'角丸',
				'shorthand'=>'r',
				'variants'=>self::$component_variants,'type'=>'radiusRelative',
				'group'=>'borderRadius',
				'defaultValues'=>['1em','1em','1em','1em','1em','1em','1em']
			],
			'spread'=>[
				'label'=>'余白',
				'shorthand'=>'sp',
				'variants'=>self::$component_variants,'type'=>'paddingRelative',
				'group'=>'spread',
				'defaultValues'=>['0.5em 1em','0.5em 1em','0.5em 1em','0.5em 1em','0.5em 1em','0.5em 1em','0.5em 1em']
			],
			'margin'=>[
				'label'=>'マージン',
				'shorthand'=>'mg',
				'var'=>'--cp-margin',
				'variants'=>self::$size_variants_5,'type'=>'spacingeRelative',
				'group'=>'staticSpacing',
				'defaultValues'=>['0.5em','1em','2em','4em','8em']
			],
			'padding'=>[
				'label'=>'パディング',
				'shorthand'=>'pd',
				'var'=>'--cp-padding',
				'variants'=>self::$size_variants_5,'type'=>'spacingeRelative',
				'group'=>'staticSpacing',
				'defaultValues'=>['0.5em','1em','2em','4em','8em']
			],
		];
		$text_block_margin_top_sizes=self::generate_text_block_roles(function($v){return sprintf("min(%svw,%srem)",$v/4,$v/16);},true,[
			'name'=>'%s_margin_top',
			'label'=>'%s上',
			'shorthand'=>'%smgt',
			'var'=>'--cp-%s-margin-top',
			'type'=>'spacing',
			'group'=>'textBlockMarginTop'
		]);
		$text_block_margin_bottom_sizes=self::generate_text_block_roles(function($v){return sprintf("min(%svw,%srem)",$v/4,$v/16);},true,[
			'name'=>'%s_margin_bottom',
			'label'=>'%s下',
			'shorthand'=>'%smgb',
			'var'=>'--cp-%s-margin-bottom',
			'type'=>'spacing',
			'group'=>'textBlockMarginBottom'
		]);
		$contents_padding_sizes=[
			'section_padding'=>[
				'label'=>'セクション',
				'shorthand'=>'spd',
				'var'=>'--cp-section-padding',
				'variants'=>self::$level_variants,
				'type'=>'paddingVertical',
				'group'=>'contentsPadding',
				'defaultValues'=>array_map(fn($n)=>sprintf('min(%1$svw,%2$srem) 0 min(%1$svw,%2$srem)',$n,$n/4),range(6,1))
			],
			'frame_padding'=>[
				'label'=>'フレーム',
				'shorthand'=>'fpd',
				'var'=>'--cp-frame-padding',
				'variants'=>self::$level_variants,
				'type'=>'padding',
				'group'=>'contentsPadding',
				'defaultValues'=>array_map(fn($n)=>sprintf('min(%1$svw,%2$srem) min(%1$svw,%2$srem)',$n,$n/4),range(6,1))
			],
			'item_padding'=>[
				'label'=>'アイテム',
				'shorthand'=>'ipd',
				'var'=>'--cp-item-padding',
				'variants'=>self::$level_variants,
				'type'=>'padding',
				'group'=>'contentsPadding',
				'defaultValues'=>array_map(fn($n)=>sprintf('min(%1$svw,%2$srem) min(%1$svw,%2$srem)',$n,$n/4),range(6,1))
			]
		];
		$gap_sizes=[
			'item_gap'=>[
				'label'=>'アイテム間隔',
				'shorthand'=>'g',
				'var'=>'--cp-item-gap',
				'variants'=>self::$level_variants,
				'type'=>'gap',
				'group'=>'Gap',
				'defaultValues'=>array_map(fn($n)=>sprintf('min(%1$svw,%2$srem) min(%1$svw,%2$srem)',$n,$n/4),range(6,1))
			],
			'cell_padding'=>[
				'label'=>'セル余白',
				'shorthand'=>'cpd',
				'var'=>'--cp-cell-padding',
				'variants'=>self::$level_variants,
				'type'=>'gap',
				'group'=>'Gap',
				'defaultValues'=>array_map(fn($n)=>sprintf('min(%1$svw,%2$srem) min(%1$svw,%2$srem)',$n,$n/4),range(6,1))
			],
		];
		return static::$size_roles=apply_filters('cp_size_roles',array_merge(
			$static_sizes,
			$text_block_margin_top_sizes,
			$text_block_margin_bottom_sizes,
			$contents_padding_sizes,
			$gap_sizes
		));
	}
	public static function get_font_family_roles(){
		if(isset(static::$font_family_roles)){return static::$font_family_roles;}
		$block_font_family_roles=self::generate_text_block_roles([
			'sans-serif','sans-serif','sans-serif','sans-serif','sans-serif'
		]);
		$format_font_family_roles=[
			'gothic'=>['label'=>'ゴシック','default'=>'sans-serif','shorthand'=>'g'],
			'mincho'=>['label'=>'明朝','default'=>'serif','shorthand'=>'m'],
			'english'=>['label'=>'英数','default'=>'sans-serif','shorthand'=>'e'],
			'code'=>['label'=>'コード','default'=>'monospace','shorthand'=>'cd'],
			'decoration'=>['label'=>'装飾','default'=>'fantasy','shorthand'=>'dc'],
			'script'=>['label'=>'手書き','default'=>'cursive','shorthand'=>'sc'],
			'strong'=>['label'=>'強調','default'=>'sans-serif','shorthand'=>'st']
		];
		return static::$font_family_roles=apply_filters('cp_font_family_roles',array_merge(
			$block_font_family_roles,
			$format_font_family_roles
		));
	}
	public static function get_font_weight_roles(){
		if(isset(static::$font_weight_roles)){return static::$font_weight_roles;}
		return static::$font_weight_roles=apply_filters('cp_font_weight_roles',self::generate_text_block_roles(['700','400','400','700','400']));
	}
	public static function get_font_size_roles(){
		if(isset(static::$font_size_roles)){return static::$font_size_roles;}
		$static_size_roles=self::generate_text_block_roles(function($v){return sprintf("min(%svw,%srem)",$v/4,$v/16);},true);
		$relative_size_roles=[
			'x-small'=>['label'=>'極小','default'=>'75%','shorthand'=>'xsm','relative'=>true],
			'small'=>['label'=>'小','default'=>'90%','shorthand'=>'sm','relative'=>true],
			'large'=>['label'=>'大','default'=>'110%','shorthand'=>'lg','relative'=>true],
			'x-large'=>['label'=>'極大','default'=>'125%','shorthand'=>'xlg','relative'=>true],
		];
		return static::$font_size_roles=apply_filters('cp_font_size_roles',array_merge(
			$static_size_roles,
			$relative_size_roles
		));
	}
	public static function get_line_height_roles(){
		if(isset(static::$line_height_roles)){return static::$line_height_roles;}
		return static::$line_height_roles=apply_filters('cp_line_height_roles',self::generate_text_block_roles("150%"));
	}
	public static function get_letter_spacing_roles(){
		if(isset(static::$letter_spacing_roles)){return static::$letter_spacing_roles;}
		return static::$letter_spacing_roles=apply_filters('cp_letter_spacing_roles',self::generate_text_block_roles("normal"));
	}

	public static function generate_text_block_roles($default_values,$has_level=false,$formats=null){
		$roles=[];
		foreach(array_keys(self::$text_block_roles) as $i=>$name){
			$role=self::$text_block_roles[$name];
			if($has_level){
				$role['variants']=self::$level_variants;
				if(isset($default_values)){
					if(is_callable($default_values)){
						$role['defaultValues']=array_map($default_values,$role['sampleValues']);
					}
					else{
						$role['defaultValues']=$default_values[$i];
					}
				}
			}
			else{
				if(isset($default_values)){
					$role['default']=is_array($default_values)?$default_values[$i]:$default_values;
				}
			}
			foreach(['label','shorthand'] as $key){
				if(!empty($formats[$key])){$role[$key]=sprintf($formats[$key],$role[$key]);}
			}
			foreach(['type','group','var'] as $key){
				if(!empty($formats[$key])){$role[$key]=sprintf($formats[$key],$name);}
			}
			$roles[empty($formats['name'])?$name:sprintf($formats['name'],$name)]=$role;
		}
		return $roles;
	}

	//css
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
			'size'=>self::get_config_json('size'),
			'font'=>self::get_config_json('font'),
			'font-family'=>self::get_config_json('font_family'),
			'font-weight'=>self::get_config_json('font_weight'),
			'font-size'=>self::get_config_json('font_size'),
			'line-height'=>self::get_config_json('line_height'),
			'letter-spacing'=>self::get_config_json('letter_spacing'),
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

	//json
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
	public static function init_config_json(){
		$colors=array_merge(
			array_column(static::get_color_roles(),'default','shorthand'),
			static::get_config_json('colors')
		);
		static::set_config_json('colors',$colors);
		$tones=self::fill_tones_data(static::get_tones($colors));
		static::set_config_json('tones',$tones);
		static::set_config_json('font_family',array_merge(
			array_column(static::get_font_family_roles(),'default','shorthand'),
			static::get_config_json('font_family')
		));
		static::set_config_json('font_weight',array_merge(
			array_column(static::get_font_weight_roles(),'default','shorthand'),
			static::get_config_json('font_weights')
		));
		static::set_config_json('font_size',array_merge(
			array_column(static::get_font_size_roles(),'default','shorthand'),
			static::get_config_json('font_size')
		));
		static::set_config_json('size',array_merge(
			array_column(static::get_size_roles(),'default','shorthand'),
			static::get_config_json('size')
		));
		static::set_config_json('line_height',array_merge(
			array_column(static::get_line_height_roles(),'default','shorthand'),
			static::get_config_json('line_height')
		));
		static::set_config_json('letter_spacing',array_merge(
			array_column(static::get_letter_spacing_roles(),'default','shorthand'),
			static::get_config_json('letter_spacing')
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
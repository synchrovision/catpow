<?php
namespace Catpow;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\Type;
use Spatie\Color\Hex;
use Spatie\Color\Hsl;
use Spatie\Color\Rgba;

class scss{
	public static $scssc;
	public static function get_scssc(){
		if(isset(static::$scssc)){return static::$scssc;}
		$scssc = new Compiler();
		$scssc->addImportPath(ABSPATH.'/wp-admin/css/colors/');
		$catpow_scss_dir=WP_PLUGIN_DIR.'/catpow/scss/';
		if(!file_exists($catpow_scss_dir.'catpow.scss')){
			$repo=new github\Repo('synchrovision/catpow-scss');
			$repo->download($catpow_scss_dir);
		}
		$scssc->addImportPath(function($path)use($scssc){
			if(Compiler::isCssImport($path)){return null;}
			$vars=$scssc->getVariables();
			if($vars['is_plugins_scss']==Compiler::$true){
				$catpow_dir=WP_PLUGIN_DIR.'/catpow/';
				$plugin_dir=preg_replace('|(/wp-content/plugins/.+?/).+$|','$1',$vars['scss_name'][1]);
				foreach(['scss/','default/'] as $d){
					if(file_exists($f=$plugin_dir.$d.$path)){return $f;}
					if($catpow_dir!==$plugin_dir && file_exists($f=$catpow_dir.$d.$path)){return $f;}
				}
				return null;
			}
			if($f=CP::get_file_path('scss/'.$path,CP::FROM_PLUGIN)){return $f;}
			return CP::get_file_path($path,CP::FROM_THEME|CP::FROM_DEFAULT);
		});
		$scssc->setSourceMap(Compiler::SOURCE_MAP_FILE);
		$color_roles=util\style_config::get_color_roles();
		$font_roles=util\style_config::get_font_roles();
		$colors=get_theme_mod('colors');
		$fonts=get_theme_mod('fonts');
		$theme_customize_values=[
			'header_image'=>get_header_image(),
			'background_image'=>get_background_image()
		];
		foreach($color_roles as $color_role=>$color_role_settings){
			$theme_customize_values[$color_role.'_color']=$colors[$color_role]??$color_role_settings['default'];
		}
		foreach($font_roles as $font_role=>$font_role_settings){
			$theme_customize_values[$font_role.'_font']=$fonts[$font_role]??$font_role_settings['default'];
		}
		$scssc->addVariables(array_map(function($val){return [TYPE::T_KEYWORD,$val];},$theme_customize_values));
		$scssc->registerFunction('debug',function($args){
			error_log(var_export($args,1));
			return false;
		});
		$scssc->registerFunction('embed_svg',function($args)use($scssc){
			if($f=CP::get_file_path($args[0][2][0])){
				return sprintf('data:image/svg+xml;base64,%s',base64_encode(file_get_contents($f)));
			}
			return false;
		});
		$scssc->registerFunction('embed_image',function($args)use($scssc){
			if($f=CP::get_file_path($args[0][2][0])){
				return sprintf('data:%s;base64,%s',mime_content_type($f),base64_encode(file_get_contents($f)));
			}
			return false;
		});
		$scssc->registerFunction('export_colors',function($args){
			static::export_map_data('colors',$args);
		});
		$scssc->registerFunction('export_fonts',function($args){
			static::export_map_data('fonts',$args);
		});
		$scssc->registerFunction('import_colors',function($args)use($scssc,$color_roles,$theme_customize_values){
			foreach($color_roles as $color_role=>$color_role_settings){
				$colors[$color_role_settings['shorthand']]=$theme_customize_values[$color_role.'_color'];
			}
			$colors=util\style_config::extend_colors($colors);
			return self::create_map_data($colors);
		});
		$scssc->registerFunction('import_fonts',function($args)use($scssc,$font_roles,$theme_customize_values){
			$fonts=[];
			foreach($font_roles as $font_role=>$font_role_settings){
				$fonts[$font_role_settings['shorthand']]=$theme_customize_values[$font_role.'_font'];
			}
			return self::create_map_data($fonts);
		});
		if(apply_filters('cp_use_css_vars',true)){
			$scssc->registerFunction('translate_color',function($args){
				$args=array_map([static::$scssc,'compileValue'],$args);
				$color=false;
				$colors=util\style_config::get_config_json('colors');
				$tones=util\style_config::get_config_json('tones');
				if(preg_match('/^([a-z]+)?(-)?(\d+)?$/',$args[0],$matches)){
					$key=$matches[1]?:'m';
					$staticHue=!empty($matches[2]);
					$num=$matches[3]??null;
					if(isset($tones[$key])){
						$f='var(--cp-tones-'.$key.'-%s)';
						$tone=$tones[$key];
						$color=sprintf(
							'hsla(%s,%s,%s,%s)',
							empty($num)?sprintf($f,'h'):($staticHue?$num:sprintf('calc('.$f.' + var(--cp-tones-hr) * %s + var(--cp-tones-hs))','h',(int)$num-6)),
							sprintf($f,'s'),
							$args[1]==='false'?sprintf($f,'l'):sprintf('calc(100%% - '.$f.' * %s)','t',$args[1]),
							$args[2]==='false'?(isset($tone['a'])?'var(--cp-tones-'.$key.'-a)':1):(isset($tone['a'])?'calc(var(--cp-tones-'.$key.'-a) * '.$args[2].')':$args[2])
						);
					}
				}
				$color=apply_filters('cp_translate_color',$color,$args);
				if(empty($color)){return Compiler::$false;}
				return [TYPE::T_KEYWORD,$color];
			});
			$scssc->registerFunction('extract_color_tone',function($args){
				$args=array_map([static::$scssc,'compileValue'],$args);
				$tones=util\style_config::get_config_json('tones');
				$tone=null;
				if(preg_match('/^([a-z]+)?(\d+)?$/',$args[0],$matches)){
					$key=$matches[1]?:'m';
					$num=$matches[2]??null;
					if(isset($tones[$key])){
						$f='var(--cp-tones-'.$key.'-%s)';
						$tone=[
							'h'=>isset($num)?30*($num-1).'deg':sprintf('calc(1deg * '.$f.')','h'),
							's'=>sprintf($f,'s'),
							'l'=>isset($args[1])?sprintf('calc(100%% - '.$f.' * %s)','t',$args[1]):sprintf($f,'l'),
							'S'=>sprintf($f,'S'),
							'B'=>isset($args[1])?sprintf('calc(100%% - '.$f.' * %s)','t',$args[1]):sprintf($f,'B'),
						];
					}
				}
				$tone=apply_filters('cp_extract_color_tone',$tone,$args);
				return self::create_map_data($tone);
			});
			$scssc->registerFunction('translate_font',function($args){
				$args=array_map([static::$scssc,'compileValue'],$args);
				$font=false;
				$fonts=util\style_config::get_config_json('fonts');
				if(isset($fonts[$args[0]])){
					$font=sprintf('var(--cp-fonts-%s)',$args[0]);
				}
				$font=apply_filters('cp_translate_font',$font,$args);
				if(empty($font)){return Compiler::$false;}
				return [TYPE::T_KEYWORD,$font];
			});
		}
		do_action('cp_scss_compiler_init',$scssc);
		return static::$scssc=$scssc;
		
	}
	public static function compile($scss_names){
		if(!current_user_can('edit_themes'))return;
		if(version_compare(PHP_VERSION, '5.4')<0)return;
		static $scssc,$admin_style_config_modified_time,$style_config_modified_time;
		$results=[];
		if(empty($style_config_modified_time)){
			if(empty($config_file=CP::get_file_path('config/style_config.scss',CP::FROM_THEME))){$style_config_modified_time=0;}
			else{$style_config_modified_time=filemtime($config_file);}
			if(!apply_filters('cp_use_css_vars',true)){
				$style_config_modified_time=max((int)get_option('cp_style_config_modified_time',0),$style_config_modified_time);
			}
		}
		if(empty($admin_style_config_modified_time)){
			if(empty($admin_config_file=CP::get_file_path('scss/admin_style_config.scss',CP::FROM_PLUGIN))){$admin_style_config_modified_time=0;}
			else{$admin_style_config_modified_time=filemtime($admin_config_file);}
		}
		foreach((array)$scss_names as $scss_base_name){
			if(substr($scss_base_name,-5)==='.scss'){
				if(!file_exists($scss_base_name)){continue;}
				$scss_name=substr($scss_base_name,0,-5);
			}
			else if($f=CP::get_file_path_url($scss_base_name.'.scss',0733)){
				$scss_name=substr(key($f),0,-5);
			}
			else{continue;}
			$result=['scss'=>$scss_name.'.scss','css'=>$scss_name.'css','name'=>$scss_name];
			$is_theme_file=strpos($scss_name,'/wp-content/themes/')!==false;
			if(
				!file_exists($scss_name.'.css') or
				filemtime($scss_name.'.css') < max(
					filemtime($scss_name.'.scss')+10,
					$is_theme_file?$style_config_modified_time:$admin_style_config_modified_time
				)
			){
				$scssc=self::get_scssc();
				try{
					error_log('SCSS compile '.$scss_name);
					$scssc->addVariables([
						'is_plugins_scss'=>(strpos($scss_name,WP_PLUGIN_DIR)===0)?Compiler::$true:Compiler::$false,
						'scss_name'=>[Type::T_STRING,$scss_name]
					]);
					$scssc->setSourceMapOptions([
						'sourceMapWriteTo'=>$scss_name.'.css.map',
						'sourceMapURL'=>'./'.basename($scss_name).'.css.map',
						'sourceMapFilename'=>basename($scss_name).'.css.map',
						'sourceMapBasepath'=>ABSPATH,
						'sourceRoot'=>'/'
					]);
					$css=$scssc->compile(file_get_contents($scss_name.'.scss'),$scss_name.'.scss');
					file_put_contents($scss_name.'.css',$css);
					$result['status']='success';
				}catch(\Exception $e){
					error_log(sprintf('%s:%s;',$scss_name,$e->getMessage()));
					$result['status']='error';
				}
				$results[]=$result;
			}
		}
		return $results;
	}
	public static function create_map_data($data){
		return [
			TYPE::T_MAP,
			array_map(function($key){return [TYPE::T_KEYWORD,$key];},array_keys($data)),
			array_map(function($val){return [TYPE::T_KEYWORD,$val];},array_values($data))
		];
	}
	public static function export_map_data($name,$args){
		if(empty($args[0]) || $args[0][0]!=='map'){return false;}
		$data=array_combine(
			array_map([static::$scssc,'compileValue'],$args[0][1]),
			array_map([static::$scssc,'compileValue'],$args[0][2])
		);
		$dir=get_stylesheet_directory().'/json';
		if(!is_dir($dir)){mkdir($dir,0777,true);}
		file_put_contents($dir.'/'.$name.'.json',json_encode($data,0700));
		return true;
	}
}


?>
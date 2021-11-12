<?php
namespace Catpow;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\Type;

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
				$plugin_dir=preg_replace('|(/wp-content/plugins/.+?/).+$|','$1',$vars['scss_name']);
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
		$scssc->setVariables([
			'header_image'=>get_header_image(),
			'background_image'=>get_background_image(),
			'background_color'=>get_theme_mod('background_color')?'#'.get_theme_mod('background_color'):$color_roles['background_color']['default'],
			'main_color'=>get_theme_mod('main_color',$color_roles['main_color']['default']),
			'accent_color'=>get_theme_mod('accent_color',$color_roles['accent_color']['default']),
			'text_color'=>get_theme_mod('text_color',$color_roles['text_color']['default'])
		]);
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
		$scssc->registerFunction('export_colors',function($args)use($scssc){
			if(empty($args[0]) || $args[0][0]!=='map'){return false;}
			$data=array_combine(
				array_map([$scssc,'compileValue'],$args[0][1]),
				array_map([$scssc,'compileValue'],$args[0][2])
			);
			$dir=get_stylesheet_directory().'/json';
			if(!is_dir($dir)){mkdir($dir,0777,true);}
			file_put_contents($dir.'/colors.json',json_encode($data,0500));
			return true;
		});
		do_action('cp_scss_compiler_init',$scssc);
		return static::$scssc=$scssc;
		
	}
	public static function compile($scss_names){
		if(!current_user_can('edit_themes'))return;
		if(version_compare(PHP_VERSION, '5.4')<0)return;
		static $scssc,$admin_style_config_modified_time,$style_config_modified_time;
		$css_files=[];
		if(empty($style_config_modified_time)){
			if(empty($config_file=CP::get_file_path('config/style_config.scss',CP::FROM_THEME))){$style_config_modified_time=0;}
			else{$style_config_modified_time=filemtime($config_file);}
			$style_config_modified_time=max((int)get_option('cp_style_config_modified_time',0),$style_config_modified_time);
		}
		if(empty($admin_style_config_modified_time)){
			if(empty($admin_config_file=CP::get_file_path('scss/admin_style_config.scss',CP::FROM_PLUGIN))){$admin_style_config_modified_time=0;}
			else{$admin_style_config_modified_time=filemtime($admin_config_file);}
		}
		foreach($scss_names as $scss_base_name){
			if($f=CP::get_file_path_url($scss_base_name.'.scss',0733)){
				$scss_name=substr(key($f),0,-5);
				$scss_url=substr(reset($f),0,-5);
			}
			else{continue;}
			$css_files[]=$scss_name.'.css';
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
				}catch(\Exception $e){
					error_log(sprintf('%s:%s;',$scss_name,$e->getMessage()));
				}
			}
		}
	
	}
}


?>
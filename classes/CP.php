<?php
namespace Catpow;
/**
* Catpowの基本クラス
* パスの解析・生成、ファイル取得、テンプレート選択
* メタ取得・設定など様々なメソッドを保持する
* セッションにデータを保持する役割も担う
*/
class CP{
	const
		INPUT_ID_DELIMITER='--',
		FROM_PLUGIN=0001,FROM_FUNCTIONS=0002,FROM_CONTENT_DIR=0004,
		FROM_STYLESHEET_DIR=0010,FROM_TEMPLATE_DIR=0020,FROM_THEME=0030,FROM_DEFAULT=0040,
		FROM_STYLESHEET_CONFIG=0100,FROM_TEMPLATE_CONFIG=0200,FROM_THEME_CONFIG=0300,FROM_DEFAULT_CONFIG=0400,FROM_CONFIG=0700;
	
	public static
		$cp,$id,$extensions,$data_types,$content,$content_path,$inputs,$forms,$form,$data,$vars=[],
		$core_functions=[
			'init',
			'basic',
			'image',
			'post','term','user','nav','comment','view',
			'template',
		],$use_functions,$use_blocks;
		
	protected $stock;
	
	protected function __construct(){
		$this->stock['id']=self::rand_id();
	}
	public static function init(){
		self::$extensions=apply_filters('catpow_extensions',[]);
		self::$data_types=apply_filters('catpow_data_types',['post','page','nav','term','comment','user','site','view','cpdb']);
		
		spl_autoload_register(function($class){
			static $classes_dirs;
			if(!isset($classes_dirs)){$classes_dirs=self::get_file_paths('classes');}
			if(substr($class,0,7)==='Catpow\\'){
				$class=str_replace('\\','/',substr($class,7));
				foreach($classes_dirs as $dir){
					if(file_exists($f=$dir.'/'.$class.'.php')){include $f;break;}
				}
			}
			else{
				$class=str_replace('\\','/',$class);
				if(self::include_plugin_file('lib/'.$class)){return true;}
			}
		});
		do_action('cp_init');
		foreach(self::$use_functions as $n){
			self::include_plugin_files('functions/'.$n.'/functions');
			self::include_template_files('functions/'.$n.'/functions');
		}
		foreach(self::get_file_paths('languages/'.determine_locale().'.mo',1) as $mo_file){
			load_textdomain('catpow',$mo_file);
		}
		if($mo_file=self::get_file_path('languages/'.determine_locale().'.mo',030)){load_textdomain('catpow',$mo_file);}
		
		do_action('cp_setup');
	}
	public static function session_start(){
		if(session_status() !== \PHP_SESSION_ACTIVE){session_start();}
		if(!isset($_SESSION['catpow'])){
			$_SESSION['catpow']=new self();
		}
		self::$id=&$_SESSION['catpow']->stock['id'];
		self::$inputs=&$_SESSION['catpow']->stock['inputs'];
		self::$forms=&$_SESSION['catpow']->stock['forms'];
		self::$data=&$_SESSION['catpow']->stock['data'];
	}
	
	
	/*ファイル取得・読み込み*/
	public static function get_file_path($name,$flag=073){
		if($flag&self::FROM_PLUGIN){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/'.$name)){return $f;}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/'.$name)){return $f;}
		}
		if($flag&self::FROM_CONTENT_DIR && isset(self::$content_path)){
			if(file_exists($f=get_stylesheet_directory().'/'.self::$content_path.'/'.$name)){return $f;}
			if(file_exists($f=get_template_directory().'/'.self::$content_path.'/'.$name)){return $f;}
		}
		if($flag&self::FROM_STYLESHEET_DIR){
			if(file_exists($f=get_stylesheet_directory().'/'.$name)){return $f;}
		}
		if($flag&self::FROM_TEMPLATE_DIR){
			if(file_exists($f=get_template_directory().'/'.$name)){return $f;}
		}
		if($flag&self::FROM_FUNCTIONS){
			foreach(self::get_use_functions_dir() as $dir){
				if(file_exists($f=$dir.'/'.$name)){return $f;}
			}
		}
		if($flag&self::FROM_DEFAULT){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/default/'.$name)){return $f;}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/default/'.$name)){return $f;}
		}
		if($flag&self::FROM_CONFIG){
			return self::get_file_path(self::get_config_file_path($name),(self::FROM_CONFIG&$flag)>>3);
		}
		return null;
	}
	public static function get_file_paths($name,$flag=073){
		$rtn=[];
		if($flag&self::FROM_PLUGIN){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/'.$name)){$rtn[]=$f;}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/'.$name)){$rtn[]=$f;}
		}
		if($flag&self::FROM_CONTENT_DIR && isset(self::$content_path)){
			if(file_exists($f=get_stylesheet_directory().'/'.self::$content_path.'/'.$name)){$rtn[]=$f;}
			if(self::is_child_theme() && file_exists($f=get_template_directory().'/'.self::$content_path.'/'.$name)){$rtn[]=$f;}
		}
		if($flag&self::FROM_STYLESHEET_DIR){
			if(file_exists($f=get_stylesheet_directory().'/'.$name)){$rtn[]=$f;}
		}
		if($flag&self::FROM_TEMPLATE_DIR){
			if(self::is_child_theme() && file_exists($f=get_template_directory().'/'.$name)){$rtn[]=$f;}
		}
		if($flag&self::FROM_FUNCTIONS){
			foreach(self::get_use_functions_dir() as $dir){
				if(file_exists($f=$dir.'/'.$name)){$rtn[]=$f;}
			}
		}
		if($flag&self::FROM_DEFAULT){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/default/'.$name)){$rtn[]=$f;}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/default/'.$name)){$rtn[]=$f;}
		}
		if($flag&self::FROM_CONFIG){
			$rtn=array_merge($rtn,self::get_file_paths(self::get_config_file_path($name),(self::FROM_CONFIG&$flag)>>3));
		}
		return $rtn;
	}
	public static function get_file_url($name,$flag=073){
		if($flag&self::FROM_PLUGIN){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists(WP_PLUGIN_DIR.'/'.$catpow_extension.'/'.$name)){return plugins_url().'/'.$catpow_extension.'/'.$name;}
			}
			if(file_exists(WP_PLUGIN_DIR.'/catpow/'.$name)){return plugins_url().'/catpow/'.$name;;}
		}
		if($flag&self::FROM_CONTENT_DIR && isset(self::$content_path)){
			if(file_exists(get_stylesheet_directory().'/'.self::$content_path.'/'.$name)){
				return get_stylesheet_directory_uri().'/'.self::$content_path.'/'.$name;
			}
			if(self::is_child_theme() && file_exists(get_template_directory().'/'.self::$content_path.'/'.$name)){
				return get_template_directory_uri().'/'.self::$content_path.'/'.$name;
			}
		}
		if($flag&self::FROM_STYLESHEET_DIR){
			if(file_exists(get_stylesheet_directory().'/'.$name)){return get_stylesheet_directory_uri().'/'.$name;}
		}
		if($flag&self::FROM_TEMPLATE_DIR){
			if(self::is_child_theme() && file_exists(get_template_directory().'/'.$name)){return get_template_directory_uri().'/'.$name;}
		}
		if($flag&self::FROM_FUNCTIONS){
			foreach(self::get_use_functions_dir_url() as $dir=>$url){
				if(file_exists($f=$dir.'/'.$name)){return $url.'/'.$name;}
			}
		}
		if($flag&self::FROM_DEFAULT){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists(WP_PLUGIN_DIR.'/'.$catpow_extension.'/default/'.$name)){return plugins_url().'/'.$catpow_extension.'/default/'.$name;}
			}
			if(file_exists(WP_PLUGIN_DIR.'/catpow/default/'.$name)){return plugins_url().'/catpow/default/'.$name;;}
		}
		if($flag&self::FROM_CONFIG){
			return self::get_file_url(self::get_config_file_path($name),(self::FROM_CONFIG&$flag)>>3);
		}
		return null;
	}
	public static function get_file_urls($name,$flag=073){
		$rtn=[];
		if($flag&self::FROM_PLUGIN){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/'.$name)){$rtn[$f]=plugins_url().'/'.$catpow_extension.'/'.$name;}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/'.$name)){$rtn[$f]=plugins_url().'/catpow/'.$name;}
		}
		if($flag&self::FROM_CONTENT_DIR && isset(self::$content_path)){
			if(file_exists($f=get_stylesheet_directory().'/'.self::$content_path.'/'.$name)){
				$rtn[$f]=get_stylesheet_directory_uri().'/'.self::$content_path.'/'.$name;
			}
			if(get_template_directory()!==get_stylesheet_directory() && file_exists($f=get_template_directory().'/'.self::$content_path.'/'.$name)){
				$rtn[$f]=get_template_directory_uri().'/'.self::$content_path.'/'.$name;
			}
		}
		if($flag&self::FROM_STYLESHEET_DIR){
			if(file_exists($f=get_stylesheet_directory().'/'.$name)){$rtn[$f]=get_stylesheet_directory_uri().'/'.$name;}
		}
		if($flag&self::FROM_TEMPLATE_DIR){
			if(get_template_directory()!==get_stylesheet_directory() && file_exists($f=get_template_directory().'/'.$name)){$rtn[$f]=get_template_directory_uri().'/'.$name;}
		}
		if($flag&self::FROM_FUNCTIONS){
			foreach(self::get_use_functions_dir_url() as $dir=>$url){
				if(file_exists($f=$dir.'/'.$name)){$rtn[$f]=$url.'/'.$name;}
			}
		}
		if($flag&self::FROM_DEFAULT){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/default/'.$name)){$rtn[$f]=plugins_url().'/'.$catpow_extension.'/default/'.$name;}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/default/'.$name)){$rtn[$f]=plugins_url().'/catpow/default/'.$name;;}
		}
		if($flag&self::FROM_CONFIG){
			$rtn=array_merge($rtn,self::get_file_urls(self::get_config_file_path($name),(self::FROM_CONFIG&$flag)>>3));
		}
		return $rtn;
	}
	public static function get_file_path_url($name,$flag=073){
		if($flag&self::FROM_PLUGIN){
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/'.$name)){
					return [$f=>plugins_url().'/'.$catpow_extension.'/'.$name];
				}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/'.$name)){
				return [$f=>plugins_url().'/catpow/'.$name];
			}
		}
		if($flag&self::FROM_CONTENT_DIR && isset(self::$content_path)){
			if(file_exists($f=get_stylesheet_directory().'/'.self::$content_path.'/'.$name)){
				return [$f=>get_stylesheet_directory_uri().'/'.self::$content_path.'/'.$name];
			}
			if(self::is_child_theme() && file_exists($f=get_template_directory().'/'.self::$content_path.'/'.$name)){
				return [$f=>get_template_directory_uri().'/'.self::$content_path.'/'.$name];
			}
		}
		if($flag&self::FROM_STYLESHEET_DIR){
			if(file_exists($f=get_stylesheet_directory().'/'.$name)){
				return [$f=>get_stylesheet_directory_uri().'/'.$name];
			}
		}
		if($flag&self::FROM_TEMPLATE_DIR){
			if(self::is_child_theme() && file_exists($f=get_template_directory().'/'.$name)){
				return [$f=>get_template_directory_uri().'/'.$name];
			}
		}
		if($flag&self::FROM_FUNCTIONS){
			foreach(self::get_use_functions_dir_url() as $dir=>$url){
				if(file_exists($f=$dir.'/'.$name)){return [$f=>$url.'/'.$name];}
			}
		}
		if($flag&self::FROM_DEFAULT){
			$name=self::get_config_file_path($name);
			foreach(self::$extensions as $catpow_extension){
				if(file_exists($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/default/'.$name)){
					return [$f=>plugins_url().'/'.$catpow_extension.'/default/'.$name];
				}
			}
			if(file_exists($f=WP_PLUGIN_DIR.'/catpow/default/'.$name)){
				return [$f=>plugins_url().'/catpow/default/'.$name];
			}
		}
		if($flag&self::FROM_CONFIG){
			return self::get_file_path_url(self::get_config_file_path($name),(self::FROM_CONFIG&$flag)>>3);
		}
		return [];
	}
	public static function include_plugin_file($name,$vars=false){
		if($vars!==false){extract($vars);}
		if(substr($name,-4)!=='.php'){$name.='.php';}
		foreach(self::$extensions as $extension){
			if(file_exists($f=WP_PLUGIN_DIR.'/'.$extension.'/'.$name)){include($f);return true;}
		}
		if(file_exists($f=WP_PLUGIN_DIR.'/catpow/'.$name)){include($f);return true;}
		return false;
	}
	public static function include_plugin_files($name,$vars=false){
		if($vars!==false){extract($vars);}
		if(substr($name,-4)!=='.php'){$name.='.php';}
		foreach(self::$extensions as $extension){
			if(file_exists($f=WP_PLUGIN_DIR.'/'.$extension.'/'.$name))include($f);
		}
		if(file_exists($f=WP_PLUGIN_DIR.'/catpow/'.$name))include($f);
	}
	public static function include_template_file($name,$vars=false){
		if($vars!==false){extract($vars);}
		if(substr($name,-4)!=='.php'){$name.='.php';}
		if(file_exists($f=get_stylesheet_directory().'/'.$name)){include($f);return true;}
		if(file_exists($f=get_template_directory().'/'.$name)){include($f);return true;}
		$name=self::get_config_file_path($name);
		foreach(self::$extensions as $extension){
			if(file_exists($f=WP_PLUGIN_DIR.'/'.$extension.'/default/'.$name)){include($f);return true;}
		}
		if(file_exists($f=WP_PLUGIN_DIR.'/catpow/default/'.$name)){include($f);return true;}
		return false;
	}
	public static function include_template_files($name,$vars=false){
		if($vars!==false){extract($vars);}
		if(substr($name,-4)!=='.php'){$name.='.php';}
		if(file_exists($f=get_stylesheet_directory().'/'.$name)){include($f);}
		if(file_exists($f=get_template_directory().'/'.$name)){include($f);}
		$name=self::get_config_file_path($name);
		foreach(self::$extensions as $extension){
			if(file_exists($f=WP_PLUGIN_DIR.'/'.$extension.'/default/'.$name)){include($f);}
		}
		if(file_exists($f=WP_PLUGIN_DIR.'/catpow/default/'.$name)){include($f);}
	}
	public static function get_template_part($name,$vars=false){
		static $inc,$tmps,$datas;
		if(substr($name,-4)!=='.php'){$name.='.php';}
		if(!isset($inc)){
			$inc=function($tmp,$conf_data,$vars){
				if(empty($tmp)){return false;}
				if(is_array($tmp)){return call_user_func([$tmp[0],'preview'],$tmp[1],$conf_data,$vars);}
				if(file_exists($tmp)){if($vars){extract($vars);}include $tmp;return true;}
		
				return false;
			};
			$tmps=array();
			$datas=array();
		}
		$f=&$tmps[$name];
		$d=&$datas[$name];
		if(isset($f))return $inc($f,$d,$vars);

		$path_data=self::parse_content_file_path($name);
		if(!isset($d)){
			if(isset($path_data['data_type']) and in_array($path_data['data_type'],self::$data_types)){
				$d=self::get_the_conf_data(dirname($name));
			}
		}
		if($inc($f=get_stylesheet_directory().'/'.$name,$d,$vars))return true;
		if($inc($f=get_template_directory().'/'.$name,$d,$vars))return true;
		
		if(isset($path_data['data_type'])){
			if(
				file_exists(get_stylesheet_directory().'/'.dirname($name)) or 
				file_exists(get_template_directory().'/'.dirname($name))
			){return $f=false;}

		 	if(in_array($path_data['data_type'],self::$data_types)){
				$class_name=self::get_class_name('template_type',$path_data['tmp_name']);
				if(class_exists($class_name) and $inc($f=[$class_name,$path_data],$d,$vars))return true;
				$vars['path_data']=$path_data;
				$path_data['data_type']='config';
				$path_data['data_name']='template';
				$path_data['tmp_name']=$path_data['tmp_name'];
				unset($path_data['tmp_slug']);
			}
			elseif($path_data['data_type'] === 'catpow'){
				if(in_array($path_data['data_name'],self::$use_functions,true)){
					$path_data['data_name']='functions';
				}
			}
		}
		else{
			$class_name=self::get_class_name('template_type','primary');
			if($inc($f=[$class_name,$path_data],$d,$vars))return true;
		}
		unset($path_data['file_type']);
		$content_file=self::create_content_file_path($path_data).'.php';
		if(empty($content_file)){return $f=false;}
		foreach(self::$extensions as $catpow_extension){
			if($inc($f=WP_PLUGIN_DIR.'/'.$catpow_extension.'/default/'.$content_file,$d,$vars))return true;
		}
		if($inc($f=WP_PLUGIN_DIR.'/catpow/default/'.$content_file,$d,$vars))return true;
		
		return $f=false;
	}
	public static function get_template_contents($name,$vars=false){
		ob_start();self::get_template_part($name,$vars);
		return ob_get_clean();
	}
	
	public static function get_config_file_path($path){
		$path_data=self::parse_content_file_path($path);
		if(isset($path_data['data_type']) && in_array($path_data['data_type'],self::$data_types)){
			$path_data['data_type']='config';
			$path_data['data_name']='template';
			unset($path_data['tmp_slug']);
			return self::create_content_file_path($path_data);
		}
		return $path;
	}

	public static function enqueue_script($src=false,$deps=array(),$flag=0733,$ver=false,$in_footer=true){
		static $missed=[];
		if(wp_script_is($src) || isset($missed[$src])){return false;}
		if(wp_script_is($src,'registered')){wp_enqueue_script($src);return true;}
		if(empty($file=self::get_file_path_url($src,$flag))){$missed[$src]=1;return false;}
		if(current_user_can('edit_themes') && $_SERVER['SERVER_NAME']==='localhost'){
			include_once(dirname(__DIR__).'/jsx_compiler/functions.php');
			cp_jsx_compile(key($file));
		}
		if(empty($ver)){$ver=filemtime(key($file));}
		wp_enqueue_script($src,reset($file),$deps,$ver,$in_footer);
		return true;
	}
	public static function set_script_translations($src){
		wp_set_script_translations($src,'catpow',WP_PLUGIN_DIR.'/catpow/languages');
	}
	public static function enqueue_style($src=false,$deps=array(),$flag=0733,$ver=false,$media=false){
		static $missed=[];
		if(wp_style_is($src) || isset($missed[$src])){return false;}
		if(wp_style_is($src,'registered')){wp_enqueue_style($src);return true;}
		if(empty($file=self::get_file_path_url($src,$flag))){$missed[$src]=1;return false;}
		if(current_user_can('edit_themes')){scss::compile([substr($src,0,-4)]);}
		if(empty($ver)){$ver=filemtime(key($file));}
		wp_enqueue_style($src,reset($file),$deps,$ver,$media);
		return true;
	}
	public static function use_ui_input($name){
		static $done=[];
		if(isset($done[$name])){return false;}
		self::enqueue_script('ui/HiddenValues/input.js',['wp-element','babelHelpers']);
		self::enqueue_style('ui/'.$name.'/input.css');
		$deps=['ui/HiddenValues/input.js'];
		if($f=self::get_file_path('ui/'.$name.'/deps.php')){
			include $f;
			if(!empty($inputDeps)){
				foreach($inputDeps as $inputDep){
					self::use_ui_output($inputDep);
					$deps[]='ui/'.$inputDep.'/input.js';
				}
			}
			if(!empty($useComponents)){
				foreach($useComponents as $useComponent){
					self::use_component($useComponent);
					$deps[]='components/'.$useComponent.'/component.js';
				}
			}
			if(!empty($useStores)){
				foreach($useStores as $useStore){
					self::use_store($useStore);
					$deps[]='stores/'.$useStore.'/store.js';
				}
			}
		}
		self::enqueue_script('ui/'.$name.'/input.js',$deps);
		self::set_script_translations('ui/'.$name.'/input.js');
		if($f=self::get_file_path('ui/'.$name.'/inputInit.php')){include $f;}
		$done[$name]=1;
		return true;
	}
	public static function use_ui_output($name){
		static $done=[];
		if(isset($done[$name])){return false;}
		self::enqueue_style('ui/'.$name.'/output.css');
		$deps=['wp-element','babelHelpers'];
		if($f=self::get_file_path('ui/'.$name.'/deps.php')){
			include $f;
			if(!empty($outputDeps)){
				foreach($outputDeps as $outputDep){
					self::use_ui_output($outputDep);
					$deps[]='ui/'.$outputDep.'/output.js';
				}
			}
			if(!empty($useComponents)){
				foreach($useComponents as $useComponent){
					self::use_component($useComponent);
					$deps[]='components/'.$useComponent.'/component.js';
				}
			}
			if(!empty($useStores)){
				foreach($useStores as $useStore){
					self::use_store($useStore);
					$deps[]='stores/'.$useStore.'/store.js';
				}
			}
		}
		self::enqueue_script('ui/'.$name.'/output.js',$deps);
		self::set_script_translations('ui/'.$name.'/output.js');
		if($f=self::get_file_path('ui/'.$name.'/outputInit.php')){include $f;}
		$done[$name]=1;
		return true;
	}
	public static function use_components($names){
		foreach($names as $name){self::use_component($name);}
	}
	public static function use_component($name){
		static $done=[];
		if(isset($done[$name])){return false;}
		$deps=['wp-i18n','wp-api-fetch','wp-element','babelHelpers'];
		if($f=self::get_file_path('components/'.$name.'/deps.php')){
			include $f;
			if(!empty($useScripts)){
				foreach($useScripts as $useScript){
					self::enqueue_script($useScript);
					$deps[]=$useScript;
				}
			}
			if(!empty($useStyles)){
				foreach($useStyles as $useStyle){
					self::enqueue_style($useStyle);
				}
			}
			if(!empty($useComponents)){
				foreach($useComponents as $useComponent){
					self::use_component($useComponent);
					$deps[]='components/'.$useComponent.'/component.js';
				}
			}
			if(!empty($useStores)){
				foreach($useStores as $useStore){
					self::use_store($useStore);
					$deps[]='stores/'.$useStore.'/store.js';
				}
			}
		}
		if(strpos($name,'/')>0){
			$useComponent=dirname($name);
			self::use_component($useComponent);
			$deps[]='components/'.$useComponent.'/component.js';
		}
		self::enqueue_script('components/'.$name.'/component.js',$deps);
		self::enqueue_style('components/'.$name.'/style.css');
		self::set_script_translations('components/'.$name.'/component.js');
		$done[$name]=1;
	}
	public static function use_store($name){
		static $done=[];
		if(isset($done[$name])){return false;}
		$deps=['wp-data','wp-api-fetch','babelHelpers'];
		if($f=self::get_file_path('stores/'.$name.'/deps.php')){
			include $f;
			if(!empty($useScripts)){
				foreach($useScripts as $useScript){
					self::enqueue_script($useScript);
					$deps[]=$useScript;
				}
			}
		}
		self::enqueue_script('stores/'.$name.'/store.js',$deps);
		self::set_script_translations('stores/'.$name.'/store.js');
		$done[$name]=1;
	}
	
	/*post*/
	public static function get_post($path){
		if(!preg_match('/^([^\/]+)\/(.+)$/',rtrim($path,'/'),$matches)){return false;}
		list(,$post_type,$page_path)=$matches;
		return get_page_by_path($page_path,OBJECT,$post_type);
	}
	public static function get_post_data($path,$names=null){
		if(!preg_match('/^([^\/]+)\/(.+)$/',rtrim($path,'/'),$matches)){return false;}
		list(,$post_type,$page_path)=$matches;
		$names=(array)$names;
		$names[]=false;
		foreach($names as $name){
			if($post_data=get_page_by_path($page_path.($name?'-'.$name:''),ARRAY_A,$post_type)){
				$post_data['meta']=array_map(function($values){
					return array_map('maybe_unserialize',$values);
				},get_post_custom($post_data['ID']));
				return $post_data;
			}
		}
		return self::get_default_post_data($path);
	}
	public static function get_default_post_data($path){
		static $cache;
		if(isset($cache[$path])){return $cache[$path];}
		$path_data=explode('/',$path);
		$post_type=reset($path_data);
		$parent=self::get_post(dirname($path));
		$conf_data=$GLOBALS['post_types'][$post_type];
		$post_data=[
			'post_type'=>$post_type,
			'post_status'=>'publish',
			'post_name'=>basename($path),
			'post_parent'=>$parent?$parent->ID:0
		];
		if(isset($conf_data['article_type'])){
			$path_data[0]=$conf_data['article_type'];
			$real_path=implode('/',$path_data);
		}
		else{
			$real_path=$path;
		}
		if($f=self::get_file_path('post_data/'.preg_replace('/\-[^\-\/]+/','',rtrim($real_path,'/')).'.php',self::FROM_DEFAULT|self::FROM_THEME)){
			include $f;
		}
		return $cache[$path]=$post_data;
	}
	public static function get_block_code($block,$attr,$children=false){
		if($f=self::get_file_path("blocks/{$block}/gen.php")){
			if(is_array($children)){$children=implode("\n",$children);}
			ob_start();include $f;return ob_get_clean();
		}
	}
	
	/*基本テンプレート*/
	public static function site_header($name=false,$vars=false){
		do_action('get_header');
		self::get_template_part('header',$name,$vars);
	}
	public static function page_header($name=false,$vars=false){
		self::get_template_part(self::get_the_content_path().'/header',$name,$vars);
	}
	public static function page_sidebar($name=false,$vars=false){
		if($sidebar=self::get_template_contents(self::get_the_content_path().'/sidebar',$name,$vars)){
			echo('<aside class="page_sidebar">');
			echo($sidebar);
			echo('</aside>');
		}
	}
	public static function page_content($name=false,$vars=false){
		if(is_page() || is_single()){the_post();}
		echo('<div class="page_content">');
		if(is_a(self::$content,'Catpow\content\form')){self::$content->render();}
		else{self::get_template_part(self::get_the_content_file_path(),$name,$vars);}
		echo('</div>');
	}
	public static function page_footer($name=false,$vars=false){
		self::get_template_part(self::get_the_content_path().'/footer',$name,$vars);
	}
	public static function site_footer($name=false,$vars=false){
		do_action('get_footer');
		self::get_template_part('footer',$name,$vars);
	}
	
	/*名称取得*/
	public static function get_meta_name($data_type){
		switch($data_type){
			case 'post':
			case 'page':
			case 'nav':
				return 'post_meta';
			default: return $data_type.'_meta';
		}
	}
	public static function get_data_type_name($data_type){
		switch($data_type){
			case 'post':
			case 'page':
			case 'nav':
				return 'post_type';
			case 'term':
				return 'taxonomy';
			case 'user':
				return 'role';
			case 'comment':
				return 'type';
			case 'cpdb':
				return 'table';
			default:
				return "{$data_type}_type";
		}
	}
	public static function get_data_id_name($data_type){
		switch($data_type){
			case 'post':
			case 'page':
			case 'nav':
			case 'user':
				return 'ID';
			case 'comment':
				return "{$data_type}_ID";
			case 'cpdb':
				return 'meta_id';
			default:
				return "{$data_type}_id";
		}
	}
	public static function get_conf_data_name($data_type){
		switch($data_type){
			case 'post':return 'post_types';
			case 'page':return 'static_pages';
			case 'term':return 'taxonomies';
			default: return $data_type.'_datas';
		}
	}
	
	public static function get_class_name(){
		$name=implode('\\',array_filter(func_get_args()));
		return '\\Catpow\\'.$name;
	}
	public static function get_preserved_class_names($path){
		$dirs=self::get_file_paths('classes/'.$path);
		$rtn=[];
		foreach($dirs as $dir){
			foreach(scandir($dir) as $f){
				if(substr($f,-4)==='.php'){
					$rtn[]=substr($f,0,-4);
				}
			}
		}
		return $rtn;
	}
	
	/*設定データ取得*/
	public static function get_the_conf_data($content_path){
		static $cache;
		if(empty($content_path)){return [];}
		if(isset($cache[$content_path])){return $cache[$content_path];}
		$content_path=trim($content_path,'/');
		$depth=substr_count($content_path,'/');
		if($depth<3){
			if($depth===2){list($data_type,$data_name,$tmp_name)=explode('/',$content_path);}
			elseif($depth===1){list($data_type,$data_name)=explode('/',$content_path);}
			else{return $cache[$content_path]=[];}
			$conf_data_name=self::get_conf_data_name($data_type);
			if(!isset($GLOBALS[$conf_data_name][$data_name])){
				if($data_type==='catpow'){
					if($f=self::get_file_path('functions/'.$data_name.'/conf.php',1)){
						include $f;
						$GLOBALS[$conf_data_name][$data_name]=$conf;
						self::fill_confs($GLOBALS[$conf_data_name][$data_name]['meta'],'catpow/'.$data_name);
					}
					else{$GLOBALS[$conf_data_name][$data_name]=[];}
				}
				else{
					$GLOBALS[$conf_data_name][$data_name]=['name'=>$data_name,'label'=>$data_name,'path'=>$data_type.'/'.$data_name];
				}
			}
			$conf_data=$GLOBALS[$conf_data_name][$data_name];
			if(isset($tmp_name) && $f=self::get_file_path($content_path.'/meta.php')){
				include $f;
				if(isset($meta)){$conf_data['meta']=array_merge($meta,(array)$conf_data['meta']);}
			}
			return $cache[$content_path]=$conf_data;
		}
		$conf_data=self::get_the_conf_data(dirname($content_path))['meta'][basename($content_path)]??[];
		if($f=self::get_file_path($content_path.'/meta.php')){
			include $f;
			if(isset($meta)){$conf_data['meta']=array_merge($meta,(array)$conf_data['meta']);}
		}
		return $cache[$content_path]=$conf_data;
	}
	public static function &get_conf_data($conf_data_path){
		static $cache;
		if(is_array($conf_data_path)){
			if(isset($conf_data_path['data_type'])){
				$conf_data_path=self::create_conf_data_path($conf_data_path);
				$path_arr=explode('/',$conf_data_path);
			}
			else{
				$path_arr=$conf_data_path;
				$conf_data_path=implode('/',$conf_data_path);
			}
		}
		if(isset($cache[$conf_data_path])){return $cache[$conf_data_path];}
		else{$path_arr=explode('/',$conf_data_path);}
		if(empty(end($path_arr))){array_pop($path_arr);}
		$data_type=array_shift($path_arr);
		$data_name=array_shift($path_arr);
		$conf_data_name=self::get_conf_data_name($data_type);
		if($data_type==='catpow' && !isset($GLOBALS[$conf_data_name][$data_name])){
			if($f=self::get_file_path('functions/'.$data_name.'/conf.php',self::FROM_PLUGIN)){
				include $f;
				$GLOBALS[$conf_data_name][$data_name]=$conf;
				if(isset($conf['meta'])){
					self::fill_confs($GLOBALS[$conf_data_name][$data_name]['meta'],'catpow/'.$data_name);
				}
			}
			else{$GLOBALS[$conf_data_name][$data_name]=[];}
		}
		if(empty($path_arr)){$cache[$conf_data_path]=&$GLOBALS[$conf_data_name][$data_name];return $cache[$conf_data_path];}
		eval("\$cache['{$conf_data_path}']=&\$GLOBALS['{$conf_data_name}']['{$data_name}']['meta']['".implode("']['meta']['",$path_arr)."'];");
		return $cache[$conf_data_path];
	}
	
	/*設定データ操作*/
	public static function conf_data_walk($callback){
		foreach(self::$data_types as $data_type){
			$conf_data_name=self::get_conf_data_name($data_type);
			global $$conf_data_name;
			if(!isset($$conf_data_name)){$$conf_data_name=array();}
			foreach($$conf_data_name as $data_name=>&$conf_data){
				$callback($data_type,$data_name,$conf_data);
			}
		}
	}
	public static function fill_conf_data($data_type,$data_name,&$conf_data){
		if($data_type==='cpdb'){return;}
		if(!empty($conf_data['is_filled'])){return;}
		$conf_data['data_type']=$data_type;
		$conf_data['data_name']=$data_name;
		$conf_data['path']=$data_type.'/'.$data_name;
		if(isset($conf_data['article_type'])){
			$class_name=self::get_class_name('article_type',$conf_data['article_type']);
			$class_name::fill_conf_data($conf_data);
		}
		if(!isset($conf_data['template'])){
			$data_type_class=self::get_class_name('data_type',$data_type);
			$conf_data['template']=$data_type_class::get_default_templates($conf_data);
		}
		foreach($conf_data['template'] as $template){
			$class_name=self::get_class_name('template_type',explode('-',$template)[0]);
			if(!class_exists($class_name)){continue;}
			$class_name::fill_conf_data($conf_data);
		}
		if(isset($conf_data['meta'])){
			self::fill_confs($conf_data['meta'],$conf_data['path']);
		}
		if(!isset($conf_data['label'])){$conf_data['label']=$data_name;}
		if($data_type==='post'){
			global $taxonomies,$comment_datas;
			$conf_data['name']=$data_name;
			if(isset($conf_data['taxonomies'])){
				foreach($conf_data['taxonomies'] as $key => $val){
					$tax_name=is_string($val)?$val:$key;
					if(isset($taxonomies[$tax_name])){
						if(!isset($taxonomies[$tax_name]['post_type']))$taxonomies[$tax_name]['post_type']=[];
						$taxonomies[$tax_name]['post_type'][]=$data_name;
					}else{
						$taxonomies[$tax_name]=['post_type'=>[$data_name]];
					}
					if(is_array($val)){
						$taxonomies[$tax_name]=array_merge($val,$taxonomies[$tax_name]);
					}
				}
			}
			$conf_data['taxonomies']=[];
			if(isset($conf_data['comments'])){
				foreach($conf_data['comments'] as $key => $val){
					$comment_data_type=is_string($val)?$val:$key;
					if(isset($comment_datas[$comment_data_type])){
						if(!isset($comment_datas[$comment_data_type]['post_type']))$comment_datas[$comment_data_type]['post_type']=[];
						$comment_datas[$comment_data_type]['post_type'][]=$post_type_name;
					}else{
						$comment_datas[$comment_data_type]=['post_type'=>[$data_name]];
					}
					if(is_array($val)){
						$comment_datas[$comment_data_type]=array_merge($val,$comment_datas[$comment_data_type]);
					}
				}
			}
			$conf_data['comments']=[];
		}
		elseif($data_type==='page'){
			if(isset($conf_data['parent'])){
				if(empty($conf_data['page_name'])){$conf_data['page_name']=$data_name;}
				$conf_data['page_path']=$conf_data['parent'].'/'.$conf_data['page_name'];
			}
			else{
				$conf_data['page_name']=$conf_data['page_path']=$data_name;
			}
			if(isset($conf_data['children'])){
				foreach($conf_data['children'] as $child_page_name=>$child_page_conf){
					$child_page_conf['page_name']=$child_page_name;
					$child_page_conf['parent']=$conf_data['page_path'];
					$child_data_name=$data_name.'-'.$child_page_name;
					$GLOBALS['static_pages'][$child_data_name]=$child_page_conf;
					self::fill_conf_data($data_type,$child_data_name,$GLOBALS['static_pages'][$child_data_name]);
				}
			}
			if(isset($GLOBALS['post_types']['page']['meta'])){
				foreach($GLOBALS['post_types']['page']['meta'] as $meta_name=>$meta_conf){
					$conf_data['meta'][$meta_name]=&$GLOBALS['post_types']['page']['meta'][$meta_name];
				}
			}
		}
		elseif($data_type==='user'){
			if($data_name==='common' && !empty($conf_data['meta'])){
				foreach(wp_roles()->role_names as $role=>$role_name){
					foreach($conf_data['meta'] as $meta_name=>$meta_conf){
						$GLOBALS['user_datas'][$role]['meta'][$meta_name]=&$conf_data['meta'][$meta_name];
					}
				}
			}
		}
		elseif($data_type==='term'){
			global $post_types,$taxonomies;
			foreach($conf_data['post_type'] as $i=>$post_type_name){
				$post_types[$post_type_name]['taxonomies'][$data_name]=&$taxonomies[$data_name];
			}
		}
		elseif($data_type==='comment'){
			global $post_types,$comment_datas;
			foreach($conf_data['post_type'] as $i=>$post_type_name){
				$post_types[$post_type_name]['comment'][$data_name]=&$comment_datas[$data_name];
			}
		}
		$conf_data['is_filled']=true;
	}
	public static function fill_confs(&$metas,$parent_path){
		if(!is_array($metas)){return false;}
		foreach($metas as $cf_name=>&$conf){
			self::fill_conf($conf,$parent_path.'/'.$cf_name);
		}
	}
	public static function fill_conf(&$conf,$path){
		if(empty($conf['type'])){return;}
		if(!empty($conf['is_filled'])){return;}
		$conf['name']=$conf['attr']['data-meta-name']=basename($path);
		$conf['path']=$path;
		$class_name=self::get_class_name('meta',$conf['type']);
		if(!class_exists($class_name)){return;}
		$class_name::fill_conf($conf);
		if(empty($conf['input_type'])){$conf['input_type']=$class_name::$input_type;}
		$conf['output_type']=$class_name::$output_type??$conf['input_type'];
		if(!isset($conf['label']))$conf['label']=$conf['name'];
		if(substr($conf['label'],-1)=='*')$conf['required']=true;
		if(!empty($conf['show_in_rest'])){
			$path_data=self::parse_conf_data_path($path);
			register_meta($path_data['data_type'],$conf['name'],[
				'object_subtype'=>$path_data['data_name'],
				'single'=>empty($conf['multiple'])?:$class_name::$is_bulk_input,
				'show_in_rest'=>true,
			]);
		}
		if($class_name::$has_children){
			self::fill_confs($conf['meta'],$conf['path']);
		}
		if($class_name::$is_database){
			global $cpdb_datas;
			$alias_name=cpdb::get_alias_name(explode('/',$conf['path']))??$conf['alias']??str_replace('/','_',$conf['path']);
			$conf['alias_path']='cpdb/'.$alias_name;
			$cpdb_datas[$alias_name]=&$conf;
		}
		$conf['is_filled']=true;
	}
	public static function resolve_conf($conf){
		if(empty($conf['type'])){return $conf;}
		$class_name=self::get_class_name('meta',$conf['type']);
		return $class_name::resolve_conf($conf);
	}
	
	/*データ解析*/
	public static function get_data_info($object){
		$class_name=get_class($object);
		if(substr($class_name,0,3)==='WP_'){$data_type=strtolower(substr($class_name,3));}
		else{$data_type=end(explode('\\',$class_name));}
		$data_name=$object->{self::get_data_type_name($data_type)};
		$data_id=$object->{self::get_data_id_name($data_type)};
		if($data_type==='post'){
			switch($data_name){
				case 'page':
					$page_name=str_replace('/','-',get_page_uri($object));
					if(isset($GLOBALS['static_pages'][$page_name])){
						$data_type='page';$data_name=$page_name;
					}
					break;
				case 'nav_menu_item':$data_type='nav';$data_name=get_menu_location($object->ID,true);break;
			}
		}
		return compact('data_type','data_name','data_id');
	}
	
	/*データ入出力*/
	public static function get_the_meta_value($data_path,$tmp=null){
		static $cache;
		if(isset($cache[$data_path][$tmp])){return $cache[$data_path][$tmp];}
		$data_path=trim($data_path,'/');
		if(substr_count($data_path,'/')<3){return null;}
		if(substr_count($data_path,'/')===3){
			if(strpos($data_path,'->')!==false){
				list($data_path,$relkey)=explode('->',$data_path);
			}
			$path_data=self::parse_data_path($data_path);
			if(isset($tmp)){
				$path_data['tmp_name']=$tmp;
				$conf=self::get_the_conf_data(self::create_content_path($path_data));
			}
			else{
				$conf=self::get_conf_data($path_data);
			}
			if(empty($conf['type'])){return null;}
			$class_name=self::get_class_name('meta',$conf['type']);
			$values=$cache[$data_path][$tmp]=$class_name::get(
				$path_data['data_type'],
				$path_data['data_name'],
				$path_data['data_id'],
				$path_data['meta_path'][0]['meta_name'],
				$conf
			);
			if(isset($relkey)){
				return $cache[$data_path.'->'.$relkey][$tmp]=$class_name::get_rel_data_value($relkey,$values,$conf);
			}
			return $values;
		}
		return $cache[$data_path][$tmp]=self::get_the_meta_value(dirname($data_path),$tmp)[basename($data_path)]??null;
	}
	public static function get_meta_handler($data_path){
		static $handlers;
		$handler=&$handlers[$data_path];
		if(isset($handler)){return $handler;}
		$path_data=self::parse_data_path($data_path);
		$conf=self::get_conf_data(self::create_conf_data_path($path_data));
		$class_name=self::get_class_name('meta',$conf['type']);
		return $handler=new $class_name($data_path,$conf);
	}
	public static function get_meta($data_type,$data_name,$id,$meta_name,$single=false){
		$conf=self::get_conf_data([$data_type,$data_name,$meta_name]);
		$class_name=self::get_class_name('meta',!empty($conf['type'])?$conf['type']:'text');
		$vals=$class_name::get($data_type,$data_name,$id,$meta_name,$conf);
		if(empty($vals)){return null;}
		if($single){return reset($vals);}
		return $vals;
	}
	public static function set_meta($data_type,$data_name,$id,$meta_name,$vals){
		$conf=self::get_conf_data($data_type,$data_name,$meta_name);
		$class_name=self::get_class_name('meta',$conf['type']?:'text');
		$class_name::set($data_type,$data_name,$meta_name,$id,$vals,$conf);
	}
	
	/*メタ補助*/
	public static function get_data_name($type,$id){
		switch($type){
			case 'post':return get_post_type($id);
			case 'page':return 'page';
			case 'user':return get_user_role($id);
			case 'term':return get_term_taxonomy($id,false);
			case 'user':return get_user_role($id);
			case 'nav':return get_menu_location($id,true);
			case 'comment':return get_comment_type($id);
			default: return apply_filters('cp_get_'.$type.'_data_name',false,$id);
		}
	}
	
	/*パス解析・生成*/
	public static function sanitize_path(&$path){
		$path=preg_replace('/\/\.+/','',urldecode($path));
	}
	
	public static function parse_content_path($path){
		static $path_datas;
		if(isset($path_datas[$path]))return $path_datas[$path];
		self::sanitize_path($path);
		if(preg_match('/^\/?(\w+)\/([\w_\-]+)(\/([\w_]+)(\-[\w_\-]+)?((\/[\w_\-]+)+)?)?\/?$/',$path,$matches)){
			$path_data=[];
			$path_data['data_type']=$matches[1];
			$path_data['data_name']=$matches[2];
			if(!empty($matches[3])){
				$path_data['tmp_name']=$matches[4];
				if(!empty($matches[5])){
					$path_data['tmp_slug']=substr($matches[5],1);
				}
				if(!empty($matches[6])){
					$fol_arr=explode('/',substr($matches[6],1));
					$metas=self::get_conf_data(array_slice($matches,1,2)['meta']??[]);
					$fol=reset($fol_arr);
					while(isset($metas[$fol])){
						array_shift($fol_arr);
						$path_data['meta_path'][]=['meta_name'=>$fol];
						if(!isset($metas[$fol]['meta']) or empty($fol_arr)){break;}
						$metas=$metas[$fol]['meta'];
						$fol=reset($fol_arr);
					}
					if(!empty($fol_arr)){
						$fol=array_pop($fol_arr);
						$fol_data=explode('-',$fol);
						$fol_arr[]=$fol_data[0];
						$path_data['folder']=implode('/',$fol_arr);
						if(!empty($fol_data[1])){$path_data['folder_slug']=$fol_data[1];}
					}
				}
			}
			$path_datas[$path]=$path_data;
			return $path_data;
		}
		else{
			return [];
		}
	}
	public static function create_content_path($path_data){
		$rtn='';
		if(isset($path_data['data_type'])){
			$rtn.=$path_data['data_type'].'/'.$path_data['data_name'].'/'.($path_data['tmp_name']??'default');
			if(isset($path_data['tmp_slug'])){$rtn.='-'.$path_data['tmp_slug'];}
		}
		if(!empty($path_data['meta_path'])){$rtn.='/'.implode('/',array_column($path_data['meta_path'],'meta_name'));}
		if(isset($path_data['folder'])){
			$rtn.='/'.$path_data['folder'];
			if(isset($path_data['folder_slug'])){$rtn.='-'.$path_data['folder_slug'];}
		}
		self::sanitize_path($rtn);
		return $rtn;
	}
	
	public static function parse_content_file_path($path){
		static $path_datas;
		if(isset($path_datas[$path]))return $path_datas[$path];
		self::sanitize_path($path);
		$path_data=self::parse_content_path(dirname($path));
		if(preg_match('/^([\w_]+)(\-[\w\-_]+)?(\.\w+)?(\.\w+)?$/',basename($path),$matches)){
			$path_data['file_name']=$matches[1];
			if(!empty($matches[2])){$path_data['file_slug']=substr($matches[2],1);}
			if(empty($matches[3])){
				$path_data['file_type']='php';
			}
			elseif(empty($matches[4])){
				$path_data['file_type']=substr($matches[3],1);
			}
			else{
				$path_data['file_sub_type']=substr($matches[3],1);
				$path_data['file_type']=substr($matches[4],1);
			}
			$path_datas[$path]=$path_data;
		}
		return $path_data;
	}
	public static function create_content_file_path($path_data){
		$rtn=self::create_content_path($path_data);
		if(isset($path_data['file_name'])){$rtn.='/'.$path_data['file_name'];}
		if(isset($path_data['file_slug'])){$rtn.='-'.$path_data['file_slug'];}
		if(isset($path_data['file_sub_type'])){$rtn.='.'.$path_data['file_sub_type'];}
		if(isset($path_data['file_type'])){$rtn.='.'.$path_data['file_type'];}
		self::sanitize_path($rtn);
		return $rtn;
	}
	
	public static function parse_data_path($path){
		static $cache;
		if(isset($cache[$path])){return $cache[$path];}
		self::sanitize_path($path);
		$arr=explode('/',$path);
		$path_data=[];
		$path_data['data_type']=reset($arr);
		$path_data['data_name']=next($arr);
		if(next($arr)!==false){
			$path_data['data_id']=current($arr);
			while($meta_name=next($arr)){
				$meta_id=next($arr);
				$path_data['meta_path'][]=compact('meta_name','meta_id');
			}
		}
		return $cache[$path]=$path_data;
	}
	public static function create_data_path($path_data){
		if(empty($path_data['data_type']) || empty($path_data['data_name'])){return false;}
		$rtn=$path_data['data_type'].'/'.$path_data['data_name'];
		if(isset($path_data['data_id'])){$rtn.='/'.$path_data['data_id'];}
		if(!empty($path_data['meta_path'])){
			foreach($path_data['meta_path'] as $meta){
				$rtn.='/'.$meta['meta_name'].'/'.$meta['meta_id'];
			}
		}
		self::sanitize_path($rtn);
		return $rtn;
		
	}
	
	public static function realize_path_data($path_data){
		$query_class=self::get_class_name('query',$path_data['data_type']);
		return $query_class::realize_path_data($path_data);
	}
	
	public static function parse_conf_data_path($path=false){
		// ex: post/my_post/my_meta/my_child_meta
		self::sanitize_path($path);
		$arr=explode('/',$path);
		$path_data=[];
		$len=count($arr);
		$path_data['data_type']=reset($arr);
		$path_data['data_name']=next($arr);
		while($meta_name=next($arr)){
			$path_data['meta_path'][]=compact('meta_name');
		}
		return $path_data;
	}
	public static function create_conf_data_path($path_data){
		/*
		$rtn='';
		if($path_data['data_type']==='post' and $path_data['data_name']==='page'){
			if(isset($path_data['data_id'])){
				$rtn.='page/'.get_post($path_data['data_id'])->post_name;
			}
			else{$rtn.='page/default';}
		}
		elseif($path_data['data_type']==='post' and $path_data['data_name']==='nav_menu_item'){
			if(isset($path_data['data_id'])){
				$term=reset(get_the_terms($path_data['data_id'],'nav_menu'));
				$rtn.='menu/'.$term->name;
			}
			else{$rtn.='menu/default';}
		}
		else{$rtn.=$path_data['data_type'].'/'.$path_data['data_name'];}
		*/
		$rtn=$path_data['data_type'].'/'.$path_data['data_name'];
		if(!empty($path_data['meta_path'])){$rtn.='/'.implode('/',array_column($path_data['meta_path'],'meta_name'));}
		self::sanitize_path($rtn);
		return $rtn;
	}
	
	
	/*input関連*/
	public static function get_input_id($data_path,$key='value'){
		$path_arr=explode('/',$data_path);
		array_splice($path_arr,4,0,$key);
		return implode(self::INPUT_ID_DELIMITER,$path_arr);
	}
	public static function parse_input_id($input_id){
		$path_arr=explode(self::INPUT_ID_DELIMITER,$input_id);
		array_splice($path_arr,4,1);
		return self::parse_data_path(implode('/',$path_arr));
	}

	public static function get_input_name($data_path,$key='value'){
		$path_arr=explode('/',$data_path);
		if(!empty($key)){array_splice($path_arr,4,0,$key);}
		return array_shift($path_arr).'['.implode('][',$path_arr).']';
	}
	
	public static function get_input_attr($path,$conf,$io='input'){
		$rtn=' id="'.self::get_input_id($path).'"';
		$classes=isset($conf['class'])?is_string($conf['class'])?explode(' ',$conf['class']):$conf['class']:[];
		$classes[]=$conf[$io.'-type']??$conf['type']??'text';
		$rtn.=' class="'.implode(' ',$classes).'"';
		foreach(['placeholder','size','rows','cols','maxlength','autocomplete','min','max','step','pattern'] as $i=>$attr_name){
			if(isset($conf[$attr_name]))$rtn.=' '.$attr_name.'="'.$conf[$attr_name].'"';
		}
		if(!isset($conf['placeholder']))$rtn.=' placeholder="'.($conf['label']??'').'"';
		if(isset($conf['attr'])){
			foreach($conf['attr'] as $attr_name=>$attr_val){
				$rtn.=' '.$attr_name.'="'.(is_array($attr_val)?implode(' ',$attr_val):$attr_val).'"';
			}
		}
		return $rtn;
	}
	public static function get_label_attrs($path,$conf,$sels){
		static $label_attr_data_keys;
		if(!isset($label_attr_data_keys)){
			$label_attr_data_keys=array('refine-cond'=>'data-refine-cond');
		}
		$rtn=[];
		$label_attr_datas=array_intersect_key($conf,$label_attr_data_keys);
		if(empty($label_attr_datas))return array();
		
		array_walk_recursive($sels,function($val)use($label_attr_datas,$label_attr_data_keys,&$rtn){
			$attr='';
			foreach($label_attr_datas as $label_attr_name=>$label_attr_data){
				if(is_callable($label_attr_data)){$label_attr=$label_attr_data($val);}
				elseif(is_array($label_attr_data) and isset($label_attr_data[$val])){$label_attr=$label_attr_data[$val];}
				else{$label_attr=$label_attr_data;}
				$attr.=' '.$label_attr_data_keys[$label_attr_name].'=\''.(is_array($label_attr)?json_encode($label_attr):$label_attr).'\'';
			}
			$rtn[$val]=$attr;
		});
		return $rtn;
	}
	

	public static function get_item_attr($data_path,$conf){
		$path_data=self::parse_data_path($data_path);
		$attr=sprintf(
			' id="%1$s" class="cp-meta-item %2$s cp-meta-item-%3$s %4$s" data-meta_name="%3$s" data-role="cp-meta-item" data-meta_type="%2$s"',
			self::get_input_id($data_path),
			$conf['type']??'text',
			empty($path_data['meta_path'])?'':end($path_data['meta_path'])['meta_name'],
			empty($conf['multiple'])?'single-item':'multiple-item'
		);
		if(isset($conf['watch'])){
			$f=self::get_input_name(dirname(self::create_data_path($path_data)).'/%s');
			$attr.=sprintf(' data-watch="%s"',implode(',',array_map(function($name)use($f){
				return sprintf($f,$name);
			},$conf['watch'])));
		}
		return $attr;
	}
	public static function get_unit_attr($data_path,$conf){
		$path_data=self::parse_data_path($data_path);
		return sprintf(
			' id="%s" class="cp-meta-unit" data-role="cp-meta-unit"',
			self::get_input_id($data_path)
		);
	}

	public static function get_tabindex(){
		static $tabindex;
		if(empty($tabindex)){
			if(!self::is_ajax()){$_SESSION['cp_tabindex']=1;}
			$tabindex=$_SESSION['cp_tabindex'];
		}
		$_SESSION['cp_tabindex']++;
		return $tabindex++;
	}
	
	/*holder*/
	/**
	*　自身を関連投稿とする投稿のデータを取得します
	* @param string $holder_data_type  保持者のデータタイプ
	* @param string $holder_data_name  保持者のデータ名
	* @param string $holder_meta_name  保持者のメタデータ名
	* @param int $id 保持されるデータのID
	* @return array 保持者のデータの配列
	*/
	public static function get_holders($data_type,$data_name,$meta_name,$id=false){
		if($id===false){$id=self::$content->data_id;}
		return call_user_func('get_'.$data_type.'s',array(
			self::get_data_type_name($data_type)=>$data_name,
			'nopaging'=>1,
			'meta_query'=>array(
				array('key'=>$meta_name,'value'=>$id)
			)
		));
	}
	/**
	*　自身を関連投稿とする投稿のIDを取得します
	* @param string $holder_data_type  保持者のデータタイプ
	* @param string $holder_data_name  保持者のデータ名
	* @param string $holder_meta_name  保持者のメタデータ名
	* @param int $id 保持されるデータのID、指定がなければ現在のループのデータのID
	* @return array 保持者のIDの配列
	*/
	public static function get_holders_id($data_type,$data_name,$meta_name,$id=false){
		if($id===false){$id=self::$content->data_id;}
		$rtn=self::get_holders($data_type,$data_name,$meta_name,$id);
		if(empty($rtn))return $rtn;
		foreach($rtn as &$val){
			$val=$val->{self::get_data_id_name($data_type)};
		}
		return $rtn;
	}
	/**
	*　自身を関連投稿とする投稿を更新します
	* @param string $type  データタイプ
	* @param string $holder_data_type  保持者のデータタイプ
	* @param string $holder_data_name  保持者のデータ名
	* @param string $holder_meta_name  保持者のメタデータ名
	* @param array $new_holders 新しい保持者のIDの配列
	* @param int $id 保持されるデータのID、指定がなければ現在のループのデータのID
	* @return bool 処理が成功した場合にtrue
	*/
	public static function update_holders($data_type,$data_name,$meta_name,$new_holders,$id=false){
		if($id===false){$id=self::$content->data_id;}
		$crr_holders=self::get_holders_id($data_type,$data_name,$meta_name,$id);
		$to_delete=array_diff($crr_holders,$new_holders);
		if(empty($new_holders)){$to_delete=$crr_holders;}else{$to_delete=array_diff($crr_holders,$new_holders);}
		if(empty($crr_holders)){$to_add=$new_holders;}else{$to_add=array_diff($new_holders,$crr_holders);}
		if(!empty($to_delete)){
			foreach($to_delete as $holder_id){
				call_user_func("delete_{$data_type}_meta",$holder_id,$meta_name,$id);
			}
		}
		if(!empty($to_add)){
			foreach($to_add as $holder_id){
				call_user_func("add_{$data_type}_meta",$holder_id,$meta_name,$id);
			}
		}
		return true;
	}
	/**
	*　自身を関連投稿として投稿に保持させます
	* @param string $type  データタイプ
	* @param string $holder_data_type  保持者のデータタイプ
	* @param string $holder_data_name  保持者のデータ名
	* @param string $holder_meta_name  保持者のメタデータ名
	* @param array $new_holders 新しい保持者のIDの配列
	* @param int $id 保持されるデータのID、指定がなければ現在のループのデータのID
	* @return array 追加された保持者のIDの配列
	*/
	public static function add_holders($data_type,$data_name,$meta_name,$new_holders,$id=false){
		if($id===false){$id=self::$content->data_id;}
		$crr_holders=self::get_the_holders_id($data_type,$data_name,$meta_name,$id);
		$to_add=array_diff($new_holders,$crr_holders);
		if(!empty($to_add)){
			foreach($to_add as $holder_id){
				call_user_func("add_{$data_type}_meta",$holder_id,$meta_name,$id);
			}
		}
		return $to_add;
	}
	/**
	*　自身を関連投稿とする投稿の保持を解除します
	* @param string $type  データタイプ
	* @param string $holder_data_type  保持者のデータタイプ
	* @param string $holder_data_name  保持者のデータ名
	* @param string $holder_meta_name  保持者のメタデータ名
	* @param array $new_holders 新しい保持者のIDの配列
	* @param int $id 保持されるデータのID、指定がなければ現在のループのデータのID
	* @return array 解除された保持者のIDの配列
	*/
	public static function remove_holders($data_type,$data_name,$meta_name,$new_holders,$id=false){
		if($id===false){$id=self::$content->data_id;}
		$crr_holders=self::get_holders_id($type,$holder_data_type,$holder_data_name,$holder_meta_name,$id);
		$to_delete=array_diff($crr_holders,$new_holders);
		if(!empty($to_delete)){
			foreach($to_delete as $holder_id){
				call_user_func("delete_{$data_type}_meta",$holder_id,$meta_name,$id);
			}
		}
		return $to_delete;
	}

	
	/*表示ページ情報取得*/
	public static function get_the_path_data(){
		static $path_data;
		if(isset($path_data)){return $path_data;}
		
		global $wp_query;

		
		if(is_admin()){
			global $pagenow;
			if($pagenow==='admin.php'){
				if(preg_match('/^(catpow|site|cpdb)\-([\w_].+)$/',$_GET['page']??'',$matches)){
					return $path_data=[
						'data_type'=>$matches[1],
						'data_name'=>$matches[2],
						'tmp_name'=>'admin',
						'file_name'=>'index',
						'file_type'=>'php'
					];
					
				}
			}
		}
		
		$path_data=[];
		$path_data['data_type']=$wp_query->query['cp_data_type']??'post';
		
		if(!isset($wp_query->query_vars['cp_data_name'])){
			switch($path_data['data_type']){
				case 'post':
					global $post;
					if(!empty($wp_query->query_vars['post_type'])){$path_data['data_name']=$wp_query->query_vars['post_type'];}
					elseif(!empty($post)){$path_data['data_name']=$post->post_type;}
					else{$path_data['data_name']='post';}
					break;
				case 'user':
					$role=get_user_role($wp_query->query_vars['user_id']??false);
						$path_data['data_name']=$role;
					break;
				default:
					$data_type_name=self::get_data_type_name($path_data['data_type']);
					if(isset($wp_query->query_vars[$data_type_name])){
						$path_data['data_name']=$wp_query->query_vars[$data_type_name];
					}
					else{
						if(isset($wp_query->query_vars['cp_data_id'])){
							$id=$wp_query->query_vars['cp_data_id'];
						}
						else{
							$id_name=self::get_data_id_name($path_data['data_type']);
							if(isset($wp_query->query_vars[$id_name])){
								$id=$wp_query->query_vars[$id_name];
							}
						}
						$path_data['data_name']=self::get_data_name($path_data['data_type'],$id);
					}
			}
		}
		else{$path_data['data_name']=$wp_query->query_vars['cp_data_name'];}
		
		
		if(!isset($wp_query->query_vars['cp_data_id'])){
			switch($path_data['data_type']){
				case 'post':
					if(!empty($wp_query->query_vars['p'])){$path_data['data_id']=$wp_query->query_vars['p'];}
					if(!empty($wp_query->query_vars['post_id'])){$path_data['data_id']=$wp_query->query_vars['post_id'];}
					elseif($wp_query->is_single() || $wp_query->is_page()){$path_data['data_id']=$wp_query->post->ID;}
					break;
				default:
					$id_name=$path_data['data_type'].'_id';
					if(isset($wp_query->query_vars[$id_name])){$path_data['data_id']=$wp_query->query_vars[$id_name];}
			}
		}
		else{$path_data['data_id']=$wp_query->query_vars['cp_data_id'];}
		$path_data['tmp_name']=self::get_the_content_type();
		if(isset($wp_query->query_vars['cp_tmp_slug'])){$path_data['tmp_slug']=$wp_query->query_vars['cp_tmp_slug'];}
		if(isset($wp_query->query_vars['cp_tmp_folder'])){$path_data['folder']=$wp_query->query_vars['cp_tmp_folder'];}
		if(isset($wp_query->query_vars['cp_meta_path'])){$path_data['meta_path']=$wp_query->query_vars['cp_meta_path'];}
		if(isset($wp_query->query_vars['cp_page_type']) && in_array($wp_query->query_vars['cp_page_type'],['task'],true))
		{$path_data['file_name']=$wp_query->query_vars['cp_page_type'];}
		else{$path_data['file_name']='index';}
		$path_data['file_type']='php';
		if(isset($wp_query->query_vars['cp_file_slug'])){$path_data['file_slug']=$wp_query->query_vars['cp_file_slug'];}
		
		if($path_data['data_type']==='post'){
			switch($path_data['data_name']){
				case 'page':
					global $static_pages,$post;
					$data_name=str_replace('/','-',get_page_uri($post));
					if(
						isset($static_pages[$data_name]) && 
						in_array('single',$static_pages[$data_name]['template'])
					){
						$path_data['data_type']='page';
						$path_data['data_name']=$data_name;
					}
					break;
				case 'nav':
					$path_data['data_type']='nav';
					$path_data['data_name']=get_menu_location($path_data['data_id'],true);
					break;
			}
		}
		
		return $path_data;
	}
	public static function get_the_content_type(){
		global $wp_query;
		static $content_type;
		if(!empty($content_type)){return $content_type;}
		if(isset($wp_query->query_vars['cp_mode'])){return $content_type=$wp_query->query_vars['cp_mode'];}
		if(is_admin()){return $content_type='admin';}
		if(is_search()){return $content_type='search';}
		if(is_archive()){return $content_type='archive';}
		if(is_single()){return $content_type='single';}
		if(is_page()){return $content_type='single';}
		if(is_home()){return $content_type='home';}
		return $content_type='single';
	}
	public static function get_the_content_path(){
		static $path;
		if(isset($path))return $path;
		$path=self::create_content_path(self::get_the_path_data());
		return $path;
	}
	public static function get_the_content_file_path(){
		static $path;
		if(isset($path))return $path;
		$path=self::create_content_file_path(self::get_the_path_data());
		return $path;
	}
	public static function get_the_data_path(){
		static $path;
		if(isset($path))return $path;
		$path=self::create_data_path(self::get_the_path_data());
		return $path;
	}
	public static function get_the_real_data_path(){
		static $path;
		if(isset($path))return $path;
		$path=self::create_data_path(self::realize_path_data(self::get_the_path_data()));
		return $path;
	}
	public static function get_the_conf_data_path(){
		static $path;
		if(isset($path))return $path;
		self::create_conf_data_path(self::get_the_path_data());
		return $path;
	}
	public static function get_the_content(){
		static $content;
		if(isset($content)){return $content;}
		
		$path_data=self::get_the_path_data();
		if(isset($path_data['meta_path'])){
			$last_meta=&end($path_data['meta_path']);
			if(isset($last_meta['meta_id'])){
				$loop_id=$last_meta['meta_id'];
				unset($last_meta['meta_id']);
			}
			else{$loop_id=null;}
			return $content=new content\meta(['path_data'=>$path_data,'loop_id'=>$loop_id]);
		}
		global $wp_query;
		if(
			isset($wp_query->query_vars['cp_page_type']) &&
			$wp_query->query_vars['cp_page_type']==='task' && 
			isset($wp_query->query_vars['cp_token']) && 
			isset($wp_query->query_vars['cp_token_key'])
		){
			return $content=new content\task([
				'path_data'=>$path_data,
				'token'=>$wp_query->query_vars['cp_token'],
				'token_key'=>$wp_query->query_vars['cp_token_key']
			]);
		}
		
		$data_type=$path_data['data_type'];
		$data_name=$path_data['data_name'];
		$query_class_name=self::get_class_name('query',$data_type);
		if(in_array($data_type,array('post','nav','page'),true)){
			global $wp_query;
			$query=new $query_class_name($wp_query);
		}
		else{
			$q=self::extract_query($_REQUEST,$data_type,$data_name);
			$q[self::get_data_type_name($data_type)]=$data_name;
			if(isset($path_data['data_id'])){$q[self::get_data_id_name($data_type)]=$path_data['data_id'];}
			$query=new $query_class_name($q);
		}
		if(isset($path_data['data_id'])){
			$loop_id=$path_data['data_id'];
			unset($path_data['data_id']);
		}
		else{$loop_id=null;}
		return $content=new content\loop(['path_data'=>$path_data,'query'=>$query,'loop_id'=>$loop_id]);
	}
	public static function get_the_query_value(){
		static $query_value;
		if(isset($query_values)){return $query_value;}
		$query_value=[];
		$path_data=self::get_the_path_data();
		$data_type=$path_data['data_type'];
		$data_name=$path_data['data_name'];
		if(isset($_REQUEST[$data_type][$data_name]['s'])){
			foreach($_REQUEST[$data_type][$data_name]['s'] as $meta_name=>$inputs){
				if(!isset($inputs['value'])){continue;}
				$query_value[$meta_name]=$inputs['value'];
			}
			array_walk_recursive($query_value,function(&$val){$val=_h($val);});
		}
		return $query_value;
	}
	
	/*フォーム*/
	public static function get_the_form($req=false){
		if($req===false){$form_id=$_REQUEST['cp_form_section_id']??$_REQUEST['cp_form_id']??null;}
		elseif(is_array($req)){$form_id=$req['cp_form_section_id']??$req['cp_form_id']??null;}
		else{$form_id=$req;}
		return self::$forms[$form_id]??false;
	}
	public static function extract_query($req=false,$data_path=null){
		if(empty($req)){$req=$_REQUEST;}
		if(isset($data_path)){$path_data=self::parse_data_path($data_path);}
		else{$path_data=self::get_the_path_data();}
		
		$data_type=$path_data['data_type'];
		$data_name=$path_data['data_name'];
		$id=$path_data['data_id']??'s';
		
		$query_class_name=self::get_class_name('query',$data_type);
		
		
		$rtn=[self::get_data_type_name($data_type)=>$data_name];
		if(!isset($req[$data_type][$data_name][$id])){return $rtn;}
		$metas=self::get_conf_data([$data_type,$data_name])['meta'];
		foreach($req[$data_type][$data_name][$id] as $name=>$vals){
			if(substr($name,0,2)=='__'){continue;}
			if(isset($vals['value'])){
				if(isset($metas[$name])){
					$conf=$metas[$name];
					$class_name=self::get_class_name('meta',$conf['type']);
					if($class_name::$can_search){
						$class_name::reflect_to_query($rtn,$data_type,$data_name,$name,$id,$vals,$conf);
					}
				}
				elseif(isset($query_class_name::$search_keys[$name])){
					if($query_class_name::$search_keys[$name]){$rtn[$name]=$vals['value'];}
					else{$rtn[$name]=is_array($vals['value'])?reset($vals['value']):$vals['value'];}
				}
			}
		}
		return $rtn;
	}
	public static function extract_data($req=false,$data_path=null){
		if(empty($req)){$req=$_REQUEST;}
		if(isset($data_path)){$path_data=self::parse_data_path($data_path);}
		else{
			foreach($req as $key=>$vals){
				if(in_array($key,self::$data_types)){
					$path_data['data_type']=$key;
					$path_data['data_name']=key($vals);
					if(isset($vals['p'])){
						$path_data['data_id']='p';
					}
					else{$path_data['data_id']=key(reset($vals));}
					break;
				}
			}
		}
		
		$data_type=$path_data['data_type'];
		$data_name=$path_data['data_name'];
		$data_id=$path_data['data_id'];
		
		$rtn=$path_data;
		
		
		
		if(!isset($req[$data_type][$data_name][$data_id])){return $rtn;}
		$metas=self::get_conf_data([$data_type,$data_name])['meta'];
		$query_class_name=self::get_class_name('query',$data_type);
		foreach($req[$data_type][$data_name][$data_id] as $name=>$vals){
			if(substr($name,0,2)=='__'){continue;}
			if(isset($metas[$name])){
				$conf=$metas[$name];
				$class_name=self::get_class_name('meta',$conf['type']);
				$class_name::reflect_to_data($rtn,$data_type,$data_name,$name,$data_id,$vals,$conf);
			}
			elseif(in_array($name,$query_class_name::$data_keys)){
				$rtn['object_data'][$name]=$vals;
			}
		}
		if(!empty($rtn['meta_data'])){
			foreach($rtn['meta_data'] as &$meta_data){
				if(!empty($meta_data)){ksort($meta_data,SORT_NUMERIC);}
			}
		}
		if($query_class_name::$united){
			$rtn['object_data']=$rtn['meta_data'];
			unset($rtn['meta_data']);
		}
		if(isset($rtn['object_data'])){
			$rtn['object_data']=$query_class_name::fill_object_data($rtn['object_data'],$path_data);
		}
		return $rtn;
	}
	public static function insert_data($req=false,$data_path=null){
		$data=self::extract_data($req,$data_path);
		$data_type=$data['data_type'];
		$data_name=$data['data_name'];
		$query_class_name=self::get_class_name('query',$data_type);
		$data_id=$query_class_name::insert($data['object_data']);
		$conf_data_path=$data_type.'/'.$data_name.'/';
		foreach($data['meta_data'] as $meta_name=>$vals){
			$conf=self::get_conf_data($conf_data_path.$meta_name);
			$meta_class_name=self::get_class_name('meta',$conf['type']);
			$meta_class_name::set($data_type,$data_name,$data_id,$meta_name,$vals,$conf);
		}
		return $data_id;
	}
	public static function update_data($req=false,$data_path=null,$override=true){
		$data=self::extract_data($req,$data_path);
		$data_type=$data['data_type'];
		$data_name=$data['data_name'];
		$query_class_name=self::get_class_name('query',$data_type);
		$data_id=$data['data_id'];
		$conf_data_path=$data_type.'/'.$data_name.'/';
		
		if($query_class_name::is_available_id($data_id)){
			if(!empty($data['object_data'])){
				$data['object_data'][self::get_data_id_name($data_type)]=$data_id;
				$query_class_name::update($data['object_data']);
			}
			if(!empty($data['meta_data'])){
				foreach($data['meta_data'] as $meta_name=>$vals){
					$conf=self::get_conf_data($conf_data_path.$meta_name);
					$meta_class_name=self::get_class_name('meta',$conf['type']);
					if(!class_exists($meta_class_name)){
						error_log('meta class of '.$conf_data_path.$meta_name.' not found');
					}
					if($override || (empty($conf['multiple']) && !$meta_class_name::$is_bulk_input)){
						$meta_class_name::set($data_type,$data_name,$data_id,$meta_name,$vals,$conf);
					}
					else{
						$meta_class_name::add($data_type,$data_name,$data_id,$meta_name,$vals,$conf);
					}
				}
			}
		}
		else{
			$data_id=$query_class_name::insert($data['object_data']);
			if(!empty($data['meta_data'])){
				foreach($data['meta_data'] as $meta_name=>$vals){
					$conf=self::get_conf_data($conf_data_path.$meta_name);
					$meta_class_name=self::get_class_name('meta',$conf['type']);
					$meta_class_name::add($data_type,$data_name,$data_id,$meta_name,$vals,$conf);
				}
			}
		}
		return $data_id;
	}
	public static function delete_data($data_path){
		$path_data=self::parse_data_path($data_path);
		$query_class_name=self::get_class_name('query',$path_data['data_type']);
		$query_class_name::delete($path_data['data_name'],$path_data['data_id']);
	}
	
	/*メール*/
	public static function send_mails($confs,$override=null){
		if(empty($confs)){return false;}
		foreach($confs as $conf){self::send_mail($conf,$override);}
	}
	public static function send_mail($conf,$override=null){
		if(!is_array($conf)){
			$meta_keys=['to','from','cc','bcc','type'];
			if(is_numeric($conf)){$post=get_post($conf);}
			elseif(is_string($conf)){$post=self::get_post($conf);}
			elseif(is_object($conf)){$post=$conf;}
			if(is_a($post,'WP_Post')){
				$conf=[
					'subject'=>$post->post_title,
					'message'=>$post->post_content
				];
				foreach($meta_keys as $key){
					if($val=get_post_meta($post->ID,$key)){$conf[$key]=$val;}
				}
				$post_type=$post->post_type;
			}
			elseif(is_string($conf)){
				$post_data=self::get_default_post_data($conf);
				$conf=[
					'subject'=>$post_data['post_title'],
					'message'=>$post_data['post_content']
				];
				foreach($meta_keys as $key){
					if(isset($post_data['meta'][$key])){
						$conf[$key]=$post_data['meta'][$key];
					}
				}
				$post_type=$post_data['post_type'];
			}
			else{
				return false;
			}
			if(empty($conf['type'])){$conf['type']='plain';}
			if(is_array($conf['type'])){$conf['type']=reset($conf['type']);}
			
			if($conf['type']==='html'){
				$front_styles=[self::get_file_path('mail.css',0733)=>true];
				$body_class='';
				$GLOBALS['wp_filter']['render_block']->callbacks[10]['collect_front_styles']=[
					'function'=>function($block_content,$block)use(&$front_styles,&$body_class){
						$block_name=explode('/',$block['blockName'])[1]??null;
						if(empty($block_name)){return $block_content;}
						if(isset($block['attrs']['body_class'])){$body_class=$block['attrs']['body_class'];}
						if($f=self::get_file_path('blocks/'.$block_name.'/front_style.css',0733)){
							$front_styles[$f]=true;
						}
						return $block_content;
					},
					'accepted_args'=>2
				];
				$body=apply_filters('the_content',$conf['message']);
				$css='';
				foreach($front_styles as $front_style=>$flag){
					$css.=file_get_contents($front_style);
				}
				$conf['message']=
					'<!DOCTYPE html><html lang="ja">'.
					'<head>'.
					'<meta name="viewport" content="width=device-width" />'.
					'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'.
					'<title>'.do_shortcode($conf['subject']).'</title>'.
					'<style>'.$css.'</style>'.
					'</head>'.
					'<body class="mail_body '.$body_class.'">'.$body.'</body>'.
					'</html>';
			}
		}
		$conf=array_merge([
			'subject'=>get_option('blogname'),
			'to'=>wp_get_current_user()->user_email,
			'from'=>sprintf('%s<%s>',get_option('blogname'),get_option('admin_email')),
			'charset'=>'UTF-8',
			'type'=>'plain'
		],(array)$conf);
		if(isset($override) && is_array($override)){
			$conf=array_merge($conf,$override);
		}
		$h=[];
		foreach($conf as $key=>$val){
			if($key==='reply_to'){$key='reply-to';}
			switch($key){
				case 'reply-to':
				case 'to':
				case 'from':
				case 'cc':
				case 'bcc':
					if(is_numeric($val)){$val=get_userdata($val)->user_email;}
					elseif(is_array($val)){
						$val=array_map(function($v){
							if(is_numeric($v)){return get_userdata($v)->user_email;}
							return $v;
						},$val);
						$val=implode(',',$val);
					}
					if(empty($val)){break;}
					if($key==='to'){$to=do_shortcode($val);}
					elseif($val){$h[$key]=do_shortcode($val);}
					break;
				case 'charset':
					if(is_array($val)){$val=reset($val);}
					$h['text_charset']=$val;
					$h['html_charset']=$val;
					$h['head_charset']=$val;
					break;
				case 'type':
					if(is_array($val)){$val=reset($val);}
					$h['Content-type']='text/'.$val.';';
					break;
				case 'title':
				case 'subject':
					if(is_array($val)){$val=implode(' ',$val);}
					$subject=do_shortcode($val);
					break;
				case 'body':
				case 'message':
					if(is_array($val)){$val=implode("\n",$val);}
					$message=do_shortcode($val);
					break;
			}
		}
		
		$h['Content-type'].='charset='.$h['text_charset'];
		foreach($h as $k=>&$v){$v=$k.':'.$v;}
		if($conf['type']==='plain'){
			$message=preg_replace("/\r\n|\r|\n/","\r\n",strip_tags($message));
		}
		wp_mail($to,$subject,$message,$h);
	}
	public static function send_notice($user_id,$notice_type,$vars=null){
		$user=get_user($user_id);
		$role=get_user_role($user_id);
		
		if(
			$f=self::get_file_path("user/{$role}/notice/{$notice_type}.php") ||
			$f=self::get_file_path("user/common/notice/{$notice_type}.php")
		 ){
			ob_start();
			if(is_array($vars)){extract($vars);}
			$data=['to'=>$user->user_email];
			include $f;
			$data['message']=ob_get_clean();
			self::send_mail($data);
		}
	}
	
	/*テーマ画像取得*/
	public static function get_logo_url(){
		if($id=get_theme_mod('costom_logo')){
			return wp_get_attachment_image_src($id,'full')[0];
		}
		$fs=glob(get_stylesheet_directory().'/images/logo.{png,svg,jpg,gif}',(defined('GLOB_BRACE')?GLOB_BRACE:0));
		if(!empty($fs[0])){return get_stylesheet_directory_uri().'/images/'.basename($fs[0]);}
		$fs=glob(get_template_directory().'/images/logo.{png,svg,jpg,gif}',(defined('GLOB_BRACE')?GLOB_BRACE:0));
		if(!empty($fs[0])){return get_template_directory_uri().'/images/'.basename($fs[0]);}
		return false;
	}
	
	/*パスワード*/
	public static function reset_user_pass_url($user_id){
		static $urls;
		if(isset($urls[$user_id]))return $urls[$user_id];
		if(!isset($urls))$urls=[];
		global $wpdb, $wp_hasher;
		$user=get_user($user_id);
		$key = wp_generate_password( 20, false );
		do_action( 'retrieve_password_key', $user->user_login, $key );
		if ( empty( $wp_hasher ) ) {
			require_once ABSPATH . WPINC . '/class-phpass.php';
			$wp_hasher = new PasswordHash( 8, true );
		}
		$hashed = time() . ':' . $wp_hasher->HashPassword( $key );
		$wpdb->update( $wpdb->users, array( 'user_activation_key' => $hashed ), array( 'user_login' => $user->user_login ) );
		$urls[$user_id]=network_site_url("wp-login.php?action=rp&key=$key&login=".rawurlencode($user->user_login),'login');
		return $urls[$user_id];
	}
	
	/*UID*/
	public static function get_uid(){
		static $user_id;
		if(isset($user_id)){return $user_id;}
		if($user_id=get_current_user_id()){return $user_id;}
		if(isset($_SESSION['cpuid'])){return $user_id=$_SESSION['cpuid'];}
		if(isset($_COOKIE['cpuid'])){return $user_id=$_COOKIE['cpuid'];}
		if(headers_sent()){return $user_id=$_SESSION['cpuid']=uniqid('s_');}
		setcookie('cpuid',uniqid('c_'));
		return $user_id=$_SESSION['cpuid']=$_COOKIE['cpuid'];
	}
	
	/*アクセス制限*/
	public static function user_barrier($redirect_url=false){
		if(is_user_logged_in())return;
		if($redirect_url==false)$redirect_url=$_SERVER['REQUEST_URI'];
		if($GLOBALS['pagenow']!=='wp-login.php')wp_redirect(wp_login_url($redirect_url));
	}
	public static function user_role_barrier($roles=false,$redirect_url=false){
		self::user_barrier();
		if($roles==false)$roles=array('administrator');
		if($redirect_url==false)$redirect_url=home_url();
		if(!in_array(get_user_role(),(array)$roles)){wp_redirect($redirect_url);}
	}
	public static function user_cap_barrier($cap=false,$redirect_url=false){
		self::user_barrier();
		if($cap==false)$cap='edit_themes';
		if($redirect_url==false)$redirect_url=home_url();
		if(!current_user_can($cap)){wp_redirect($redirect_url);}
	}

	/*暗号化*/
	public static function encrypt($str){
		return openssl_encrypt($str,'aes-256-ecb',AUTH_SALT);
	}
	public static function decrypt($str){
		return openssl_decrypt($str,'aes-256-ecb',AUTH_SALT);
	}
	public static function rand_id($bytes=16){
		return bin2hex(openssl_random_pseudo_bytes($bytes));
	}
	
	/*scss*/
	public static function scss_compile($scss_names){
		if(current_user_can('edit_themes')){scss::compile($scss_names);}
	}
	/*gzip*/
	public static function gzip_compress($files){
		if(!current_user_can('edit_themes'))return;
		foreach($files as $f){
			if(!file_exists($f.'.gz') or filemtime($f.'.gz') < filemtime($f)){
				$gz=gzopen($f.'.gz','w9');
				gzwrite($gz,file_get_contents($f));
				gzclose($gz);
			}
		}
	}
	
	/*time*/
	public static function date($date='now',$format='Y-m-d'){
		return date($format,strtotime($date));
	}
	
	/*class functions*/
	public static function get_all_functions(){
		static $all_functions;
		if(isset($all_functions)){return $all_functions;}
		return $all_functions=array_map('basename',glob(
			WP_PLUGIN_DIR.'/{catpow,'.implode(',',self::$extensions).'}/functions/[!_]*',
			GLOB_ONLYDIR|(defined('GLOB_BRACE')?GLOB_BRACE:0)
		));
	}
	public static function get_use_functions_dir(){
		static $functions_dirs;
		if(empty(self::$use_functions)){return [];}
		if(isset($functions_dirs)){return $functions_dirs;}
		return $functions_dirs=glob(
			WP_PLUGIN_DIR.'/{catpow,'.implode(',',self::$extensions).'}'.
			'/functions/{'.implode(',',self::$use_functions).'}',
			GLOB_ONLYDIR|(defined('GLOB_BRACE')?GLOB_BRACE:0)
		);
	}
	public static function get_use_functions_dir_url(){
		static $functions_dir_urls;
		if(empty(self::$use_functions)){return [];}
		if(isset($functions_dir_urls)){return $functions_dir_urls;}
		$functions_dir_urls=[];
		$l=strlen(WP_PLUGIN_DIR);
		foreach(self::get_use_functions_dir() as $dir){
			$functions_dir_urls[$dir]=plugins_url().substr($dir,$l);
		}
		return $functions_dir_urls;
	}
	public static function get_all_blocks(){
		static $all_blocks;
		if(isset($all_blocks)){return $all_blocks;}
		foreach(self::get_file_urls('blocks') as $block_dir=>$block_url){
			foreach(glob($block_dir.'/*/editor_script.js') as $editor_script){
				$all_blocks[]=basename(dirname($editor_script));
			}
		}
		return $all_blocks;
	} 
	public static function get_supported_blocks(){
		static $supported_blocks;
		if(isset($supported_blocks)){return $supported_blocks;}
		$supported_blocks=['loop','form','embed','widget','tool','cond'];
		foreach(self::get_file_paths('blocks',030) as $block_dir){
			$supported_blocks=array_merge(scandir($block_dir),$supported_blocks);
		}
		$supported_blocks=array_intersect(self::get_all_blocks(),$supported_blocks);
		return $supported_blocks;
	}
	
	/*theme*/
	public static function is_child_theme(){
		static $is_child_theme;
		if(isset($is_child_theme)){return $is_child_theme;}
		if(did_action('template_redirect')){
			return $is_child_theme=get_template_directory()!==get_stylesheet_directory();
		}
		return get_template_directory()!==get_stylesheet_directory();
	}
	
	/*接続情報*/
	public static function is_ajax(){
		static $is_ajax;
		if(!isset($is_ajax))$is_ajax=(isset($_SERVER['HTTP_X_REQUESTED_WITH']) and strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])=='xmlhttprequest');
		return $is_ajax;
	}
	public static function is_mobile(){
		static $is_mobile;
		if(isset($is_mobile))return $is_mobile;
		$useragents = array(
			'iPhone', // iPhone
			'iPod', // iPod touch
			'Android.*Mobile', // 1.5+ Android *** Only mobile
			'Windows.*Phone', // *** Windows Phone
			'dream', // Pre 1.5 Android
			'CUPCAKE', // 1.5+ Android
			'blackberry9500', // Storm
			'blackberry9530', // Storm
			'blackberry9520', // Storm v2
			'blackberry9550', // Storm v2
			'blackberry9800', // Torch
			'webOS', // Palm Pre Experimental
			'incognito', // Other iPhone browser
			'webmate' // Other iPhone browser
		);
		$pattern = '/'.implode('|', $useragents).'/i';
		$is_mobile=preg_match($pattern, $_SERVER['HTTP_USER_AGENT']);
		return $is_mobile;
	}
	public static function is_task(){
		static $is_task;
		if(!isset($is_task)){$is_task=get_query_var('cp_page_type')==='task';}
		return $is_task;
	}
	public static function is_beacon(){
		static $is_beacon;
		if(!isset($is_beacon)){
			$is_beacon=get_query_var('cp_page_type')==='task' && get_query_var('cp_file_slug')==='beacon';
		}
		return $is_beacon;
		
	}
	
	/*magic method*/
	function __sleep(){
		return ['stock'];
	}
}
class_alias('Catpow\CP','cp');

add_action('plugins_loaded',['CP','init']);

?>
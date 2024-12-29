<?php
if(php_sapi_name()!=='cli'){exit;}
chdir(__DIR__);
passthru('git submodule update --init --recursive');
define('INC_DIR',__DIR__);
define('WP_CONTENT_DIR',dirname(__DIR__,3));
init();
echo "start jsx compile\n";

while(true){
	$jsx_files=get_jsx_files();
	$entry_files=get_entry_files();
	$is_in_dir_of_entry_file=function($fname)use(&$entry_files){
		foreach($entry_files as $dirname=>$entry_file){
			if(str_starts_with($fname,$dirname.'/')){return false;}
		}
		return true;
	};
	$entry_files=array_filter($entry_files,$is_in_dir_of_entry_file,ARRAY_FILTER_USE_KEY);
	$jsx_files=array_filter($jsx_files,$is_in_dir_of_entry_file);
	for($i=0;$i<20;$i++){
		cp_jsx_compile($jsx_files);
		cp_jsx_bundle($entry_files);
		sleep(3);
	}
}

function init(){
	putenv('PATH='.getenv('PATH').':'.INC_DIR.':'.INC_DIR.'/node_modules/.bin');
	putenv('NODE_PATH='.getenv('NODE_PATH').':'.INC_DIR.'/node_modules');
	chdir(INC_DIR);
	if(!file_exists(INC_DIR.'/node_modules')){
		passthru('npm install');
	}
}

function get_jsx_files(){
	$jsx_files=[];
	foreach(glob(WP_CONTENT_DIR.'/{plugins,themes}/catpow{,-*}{,/default,/functions/*}/{js,blocks/*,ui/*,components/*,elements/*,stores/*,*/*/*}/*.{t,j}sx',GLOB_BRACE) as $jsx_file){
		if(
			strpos($jsx_file,'/node_modules/')!==false || 
			strpos($jsx_file,'/modules/')!==false
		){continue;}
		$jsx_files[]=$jsx_file;
	}
	return $jsx_files;
}

function cp_jsx_compile($jsx_files){
	foreach($jsx_files as $jsx_file){
		if(!file_exists($jsx_file)){continue;}
		$js_file=substr($jsx_file,0,is_mjs_former($jsx_file)?-4:-1);
		if(!file_exists($js_file) or filemtime($js_file) < filemtime($jsx_file)){
			passthru("node bundle.esbuild.mjs {$jsx_file} {$js_file}");
			echo "build {$js_file}\n";
			touch($js_file);
		}
	}
}
function is_mjs_former($fname){
	return preg_match('/\.mjs\.[jt]sx?$/',$fname);
}

function get_entry_files(){
	$entry_files=[];
	foreach(glob(WP_CONTENT_DIR.'/{plugins,themes}/catpow{,-*}{,/default,/functions/*}/{js,blocks/*,ui/*,components/*,elements/*,stores/*,*/*/*}/*/index{,.mjs}.{t,j}s{,x}',GLOB_BRACE) as $entry_file){
		if(strpos($entry_file,'/node_modules/')!==false || strpos($entry_file,'/modules/')!==false){continue;}
		$entry_files[dirname($entry_file)]=$entry_file;
	}
	return $entry_files;
}
function cp_jsx_bundle($entry_files){
	foreach($entry_files as $entry_file){
		$dirname=dirname($entry_file);
		$bundle_js_file=$dirname.(is_mjs_former($entry_file)?'.mjs':'.js');
		$latest_filetime=filemtime($entry_file);
		foreach(glob($dirname.'/{*,*/*,*/*/*}',GLOB_BRACE) as $bundle_file){
			$latest_filetime=max($latest_filetime,filemtime($bundle_file));
		}
		if(!file_exists($bundle_js_file) or filemtime($bundle_js_file) < $latest_filetime){
			passthru("node bundle.esbuild.mjs {$entry_file} {$bundle_js_file}");
			echo "bundle {$bundle_js_file}\n";
		}
	}
}
function get_max_filemtime_in_dir($dir,$filemtime){
	foreach(scandir($dir) as $fname){
		if(substr($fname,0,1)==='.'){continue;}
		$f=$dir.'/'.$fname;
		$filemtime=max($filemtime,is_dir($f)?get_max_filemtime_in_dir($f):filemtime($f));
	}
	return $filemtime;
}
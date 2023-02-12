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
	
	foreach(glob(WP_CONTENT_DIR.'/{plugins,themes}/catpow{,-*}{,/default,/functions/*}/{js,blocks/*,ui/*,components/*,stores/*,*/*/*}/*.jsx',GLOB_BRACE) as $jsx_file){
		if(strpos($jsx_file,'/node_modules/')!==false || file_exists(dirname($jsx_file).'/index.jsx')){continue;}
		$jsx_files[]=$jsx_file;
	}
	return $jsx_files;
}

function cp_jsx_compile($jsx_files){
	foreach($jsx_files as $jsx_file){
		$js_file=substr($jsx_file,0,-1);
		if(!file_exists($jsx_file)){continue;}
		if(!file_exists($js_file) or filemtime($js_file) < filemtime($jsx_file)){
			passthru("node bundle.esbuild.mjs {$jsx_file} {$js_file}");
			echo "build {$js_file}\n";
			touch($js_file);
		}
	}
}

function get_entry_files(){
	$entry_files=[];
	
	foreach(glob(WP_CONTENT_DIR.'/{plugins,themes}/catpow{,-*}{,/default,/functions/*}/{js,blocks/*,ui/*,components/*,stores/*,*/*/*}/*/index.jsx',GLOB_BRACE) as $entry_file){
		if(strpos($entry_file,'/node_modules/')!==false){continue;}
		$entry_files[]=$entry_file;
	}
	return $entry_files;
}
function cp_jsx_bundle($entry_files){
	foreach($entry_files as $entry_file){
		$bundle_js_file=dirname($entry_file).'.js';
		$latest_filetime=filemtime($entry_file);
		foreach(glob(dirname($entry_file).'/*') as $bundle_file){
			$latest_filetime=max($latest_filetime,filemtime($bundle_file));
		}
		if(!file_exists($bundle_js_file) or filemtime($bundle_js_file) < $latest_filetime){
			passthru("node bundle.esbuild.mjs {$entry_file} {$bundle_js_file}");
			echo "bundle {$bundle_js_file}\n";
		}
	}
}
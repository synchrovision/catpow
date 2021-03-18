<?php

putenv('PATH='.getenv('PATH').':'.__DIR__.':'.__DIR__.'/node_modules/.bin');
putenv('NODE_PATH='.getenv('NODE_PATH').':'.__DIR__.'/node_modules');
passthru('cd '.__DIR__);

while(true){
	$jsx_files=get_jsx_files();
	for($i=0;$i<20;$i++){cp_jsx_compile($jsx_files);sleep(3);}
}

function get_jsx_files(){
	$jsx_files=[];
    $wp_content_dir=dirname(__DIR__,3).'/';
	
	foreach(glob($wp_content_dir.'{plugins,themes}/catpow{,-*}{,/default,/functions/*}/{blocks,ui,components,store,*/*}/*/*.jsx',GLOB_BRACE) as $jsx_file){
		$jsx_files[]=$jsx_file;
	}
	return $jsx_files;
}

function cp_jsx_compile($jsx_files){
	foreach($jsx_files as $jsx_file){
		$js_file=substr($jsx_file,0,-1);
		if(!file_exists($jsx_file)){continue;}
		if(!file_exists($js_file) or filemtime($js_file) < filemtime($jsx_file)){
			passthru('babel '.$jsx_file.' -o '.$js_file.' > '.__DIR__.'/logs/result.txt');
			echo "build {$js_file}\n";
			touch($js_file);
		}
	}
}
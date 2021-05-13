<?php
putenv('PATH='.getenv('PATH').':'.__DIR__.':'.__DIR__.'/node_modules/.bin');
putenv('NODE_PATH='.getenv('NODE_PATH').':'.__DIR__.'/node_modules');
chdir(dirname(__DIR__));
passthru('git submodule update --init --recursive');
chdir(__DIR__);
if(!file_exists(__DIR__.'/node_modules')){passthru('npm install');}

while(true){
	$jsx_files=get_jsx_files();
	$po_files=get_po_files();
	for($i=0;$i<20;$i++){
		cp_jsx_compile($jsx_files);
		cp_po_compile($po_files);
		sleep(3);
	}
}

function get_jsx_files(){
	$jsx_files=[];
    $wp_content_dir=dirname(__DIR__,3).'/';
	
	foreach(glob($wp_content_dir.'{plugins,themes}/catpow{,-*}{,/default,/functions/*}/{blocks,ui,components,stores,*/*}/*/*.jsx',GLOB_BRACE) as $jsx_file){
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

function get_po_files(){
	$po_files=[];
    $wp_content_dir=dirname(__DIR__,3).'/';
	
	foreach(glob($wp_content_dir.'{plugins,themes}/catpow{,-*}/{blocks,components,ui}/*/languages/*.po',GLOB_BRACE) as $po_file){
		$po_files[$po_file]=substr($po_file,0,-3).'.json';
	}
	return $po_files;
}

function cp_po_compile($po_files){
	foreach($po_files as $po_file=>$jed_file){
		if(!file_exists($po_file)){continue;}
		if(!file_exists($jed_file) or filemtime($jed_file) < filemtime($po_file)){
			if(!is_dir(dirname($jed_file))){mkdir(dirname($jed_file),0777,true);}
			passthru('po2json '.$po_file.' '.$jed_file.' -f jed1.x -d catpow > '.__DIR__.'/logs/result.txt');
			echo "build {$jed_file}\n";
			touch($jed_file);
		}
	}
}
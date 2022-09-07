<?php
namespace Catpow;
chdir(__DIR__);

function cp_jsx_compile($js_file){
	$jsx_file=$js_file.'x';
	if(file_exists($jsx_file) and !file_exists($js_file) || filemtime($js_file) < filemtime($jsx_file)){
		passthru("deno bundle {$jsx_file} {$js_file}");
		error_log("build {$js_file}\n");
		touch($js_file);
	}
	$dir=dirname($js_file);
	foreach(glob($dir.'/languages/*.po') as $po_file){
		$jed_file=substr($po_file,0,-3).'.json';
		if(!file_exists($jed_file) or filemtime($jed_file) < filemtime($po_file)){
			passthru('po2json '.$po_file.' '.$jed_file.' -f jed1.x -d catpow');
			error_log("build {$jed_file}\n");
			touch($jed_file);
		}
	}
}
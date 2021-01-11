<?php
define('COMPRESS_SCRIPTS',true);
define('COMPRESS_CSS',true);
define('ENFORCE_GZIP',true);
add_action('init',function(){
	if(!current_user_can('edit_themes'))return;
	$fs=[];
	$dirs=[get_stylesheet_directory()];
	if(get_stylesheet_directory() !== get_template_directory()){$dirs[]=get_template_directory();}
	foreach($dirs as $dir){
		for($i=1;$i<5;$i++){
			foreach(glob($dir.str_repeat('/*',$i).'.gz') as $gz){
				$f=substr($gz,0,-3);
				if(file_exists($f)){$fs[]=$f;}
				else{unlink($gz);}
			}
		}
	}
	\cp::gzip_compress($fs);
},20);
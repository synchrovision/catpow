<?php
if($_REQUEST['setup_type']==='htaccess'){
	$code=
"RewriteEngine On
RewriteCond %{HTTP:Accept-Encoding} gzip
RewriteCond %{REQUEST_FILENAME}\.gz -s
RewriteRule .+ %{REQUEST_URI}.gz

AddEncoding x-gzip .gz

<files *.css.gz>
 AddType text/css .gz
</files>
<files *.js.gz>
 AddType text/javascript .gz
</files>";
	file_put_contents(get_stylesheet_directory().'/.htaccess',$code);
}
elseif($_REQUEST['setup_type']==='create_gzip'){
	if(!current_user_can('edit_themes'))return;
	for($i=1;$i<5;$i++){
		\cp::gzip_compress(glob(get_stylesheet_directory().str_repeat('/*',$i).'.css'));
		\cp::gzip_compress(glob(get_stylesheet_directory().str_repeat('/*',$i).'.js'));
	}
	if(get_stylesheet_directory() !== get_template_directory()){
		for($i=1;$i<5;$i++){
			\cp::gzip_compress(glob(get_template_directory().str_repeat('/*',$i).'.css'));
			\cp::gzip_compress(glob(get_template_directory().str_repeat('/*',$i).'.js'));
		}
	}
}
elseif($_REQUEST['setup_type']==='delete_gzip'){
	if(!current_user_can('edit_themes'))return;
	for($i=1;$i<5;$i++){
		foreach(glob(get_stylesheet_directory().str_repeat('/*',$i).'.gz') as $f){unlink($f);}
	}
	if(get_stylesheet_directory() !== get_template_directory()){
		for($i=1;$i<5;$i++){
			foreach(glob(get_template_directory().str_repeat('/*',$i).'.gz') as $f){unlink($f);}
		}
	}
}
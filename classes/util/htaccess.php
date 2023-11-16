<?php
/**
* .htaccessの更新
*/
namespace Catpow\util;
class htaccess{
	static $code_start="### CATPOW\n",$code_end="\n### /CATPOW\n";
	public static function update(){
		$code_start=self::$code_start;
		$code_end=self::$code_end;
		if(file_exists($f=WP_CONTENT_DIR.'/.htaccess')){unlink($f);}
		$f=ABSPATH.'/.htaccess';
		$content=file_get_contents($f);
		$content=preg_replace("|{$code_start}.+{$code_end}|s",'',$content);
		file_put_contents($f,$code_start.self::get_rules().$code_end.$content);
	}
	public static function get_rules(){
		return
<<<EOT
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} -f
RewriteCond %{REQUEST_URI} \.svg
RewriteCond %{QUERY_STRING} .+
RewriteRule . wp-content/plugins/catpow/callee/svg.php?uri=%{REQUEST_URI} [L,QSA]

RewriteCond %{HTTP_ACCEPT} image/webp
RewriteCond %{SCRIPT_FILENAME}.webp -f
RewriteRule .(jpe?g|png|gif)$ %{SCRIPT_FILENAME}.webp [T=image/webp]

<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType text/javascript .mjs
</IfModule>

RewriteCond %{HTTP:Accept-Encoding} gzip
RewriteCond %{REQUEST_FILENAME}\.gz -s
RewriteRule .+ %{REQUEST_URI}.gz

AddEncoding x-gzip .gz

<files *.css.gz>
  AddType text/css .gz
</files>

<files *.js.gz>
  AddType text/javascript .gz
</files>
EOT;
	}
}

?>
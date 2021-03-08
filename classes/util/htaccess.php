<?php
/**
* wp-content/.htaccessの作成・更新
*/
namespace Catpow\util;
class htaccess{
	static $code_start='### CATPOW',$code_end='### /CATPOW';
	public static function update(){
		$code_start=self::$code_start;
		$code_end=self::$code_end;
		$f=WP_CONTENT_DIR.'/.htaccess';
		if(file_exists($f)){
			$code=file_get_contents($f);
			if(strpos($code,$code_start)!==false && strpos($code,$code_end)!==false){
				file_put_contents($f,preg_replace("|{$code_start}.+{$code_end}|s",self::get_rules(),$code));
			}
			else{
				file_put_contents($f,$code."\n".self::get_rules());
			}
		}
		else{
			file_put_contents($f,self::get_rules());
		}
	}
	public static function get_rules(){
		$code_start=self::$code_start;
		$code_end=self::$code_end;
		return
<<<EOT
{$code_start}
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} -f
RewriteCond %{REQUEST_URI} \.svg
RewriteCond %{QUERY_STRING} .+
RewriteRule . plugins/catpow/callee/svg.php?uri=%{REQUEST_URI} [L,QSA]

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
{$code_end}
EOT;
	}
}

?>
<?php
/**
* ディレクトリ操作のメソッド
*/
namespace Catpow\util;
class dir{
	public static function copy($from, $to){
		if (!is_dir($to)) { mkdir($to); }
		if (is_dir($from)) {
			if ($dh = opendir($from)) {
				while (($file = readdir($dh)) !== false) {
					if ($file == "." || $file == "..") { continue; }
					if (is_dir($from . "/" . $file)) {self::copy($from . "/" . $file, $to . "/" . $file);}
					else {copy($from . "/" . $file, $to . "/" . $file);}
				}
				closedir($dh);
			}
		}
		return true;
	}
	public static function delete($dir){
		foreach(scandir($dir) as $file) {
			if ('.' === $file || '..' === $file) continue;
			if (is_dir("$dir/$file")) self::delete("$dir/$file");
			else unlink("$dir/$file");
		}
		rmdir($dir);
	}
}

?>
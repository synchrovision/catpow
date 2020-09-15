<?php
namespace Catpow\meta;

class post_content extends post_title{
	public static function input($meta,$prm){
		return textarea::input($meta,$prm);
	}
}
?>
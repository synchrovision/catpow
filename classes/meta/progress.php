<?php
namespace Catpow\meta;

class progress extends number{
	
	public static function output($meta,$prm){
		return sprintf(
			'<progress value="%d" max="%d"/>%1$d</progress>',
			$meta->value,
			$meta->conf['max']??100
		);
	}
}
?>
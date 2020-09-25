<?php
namespace Catpow\meta;

class Progress extends UI{
	public static $defaultParam=['max'=>100,'step'=>5];
	public static function output($meta,$prm){
		return sprintf(
			'<progress value="%d" max="%d"/>%1$d</progress>',
			$meta->value,
			$meta->conf['max']??100
		);
	}
}
?>
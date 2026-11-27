<?php
namespace Catpow;
abstract class Ability{
	public static 
		$label='',
		$description='',
		$meta=[
			'show_in_rest'=>true,
			'public'=>true
		],
        $input_schema=[],
        $output_schema=[],
        $annotations=[
	        'readonly'=>true,
	        'destructive'=>false,
	        'idempotent'=>true,
		];
	public static function exec($data){
	}
	public static function permission(){
		return true;
	}
}

?>
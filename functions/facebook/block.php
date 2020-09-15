<?php
namespace Catpow\blocks;
class facebook{
	public static $label='FaceBook';
	public static function get_conf(){
		return [
			['label'=>'HOGE','values'=>'hoge','key'=>'hoge'],
			['label'=>'PIYO','values'=>['hoge','fuga'],'key'=>'piyo']
		];
	}
	public static function render($param){
		echo '<pre>';
		var_dump($param);
		echo '</pre>';
	}
}
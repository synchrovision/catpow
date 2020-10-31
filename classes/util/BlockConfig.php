<?php
namespace Catpow\util;
class BlockConfig{
	public static function getPictureSoucesAttributes($selector='picture'){
		return [
			'source'=>'query',
			'selector'=>$selector.' source',
			'query'=>[
				'srcset'=>['source'=>'attribute','attribute'=>'srcset'],
				'device'=>['source'=>'attribute','attribute'=>'data-device']
			]
		];
	}
	public static function getPictureSoucesAttributesForDevices($devices,$selector='picture',$image='dummy.jpg'){
		$attr=self::getPictureSoucesAttributes($selector);
		$attr['default']=self::getPictureSoucesAttributesDefaultValueForDevices($devices,$image);
		return $attr;
	}
	public static function getPictureSoucesAttributesDefaultValueForDevices($devices,$image='dummy.jpg'){
		return array_map(function($device)use($image){
			return ['srcset'=>\cp::get_file_url('images/'.$image),'device'=>$device];
		},$devices);
	}
}

?>
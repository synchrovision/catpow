<?php
namespace Catpow\util;
class BlockConfig{
	//picture
	public static function getPictureSoucesAttributes($selector='picture'){
		return [
			'type'=>'array',
			'source'=>'query',
			'selector'=>(empty($selector)?'':' ').'source',
			'query'=>[
				'srcset'=>['type'=>'string','source'=>'attribute','attribute'=>'srcset'],
				'device'=>['type'=>'string','source'=>'attribute','attribute'=>'data-device']
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
	//placed picture
	public static function getPlacedPicturesAttributes($selector='.placedPictures'){
		return [
			'type'=>'array',
			'source'=>'query',
			'selector'=>$selector.' > .item',
			'query'=>[
				'style'=>['type'=>'object','source'=>'attribute','attribute'=>'style'],
				'sources'=>self::getPictureSoucesAttributes(),
				
				'src'=>['type'=>'string','source'=>'attribute','selector'=>'img','attribute'=>'src'],
				'alt'=>['type'=>'string','source'=>'attribute','selector'=>'img','attribute'=>'alt'],
				'code'=>['type'=>'string','source'=>'text'],
			]
		];
	}
	public static function getPlacedPicturesAttributesForDevices($devices,$selector='.placedPictures',$image='dummy_deco.png'){
		$attr=self::getPlacedPicturesAttributes($selector);
		$attr['default']=self::getPlacedPicturesAttributesDefaultValueForDevices($devices,$image);
		return $attr;
	}
	public static function getPlacedPicturesAttributesDefaultValueForDevices($devices,$image='dummy_deco.png'){
		return [
			[
				'style'=>['position'=>'absolute','top'=>'0%','right'=>'0%','width'=>'10rem','height'=>'auto'],
				'sources'=>self::getPictureSoucesAttributesDefaultValueForDevices($devices,$image),
				'src'=>\cp::get_file_url('images/'.$image),
				'srcset'=>\cp::get_file_url('images/'.$image),
				'alt'=>'',
				'code'=>''
			]
		];
	}
}

?>
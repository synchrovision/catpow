<?php
namespace Catpow\util;
class BlockConfig{
	//picture
	public static function getPictureAttributes($selector,$prefix=null,$devices=['tb','sp'],$default='dummy.jpg'){
		$keys=['mime','src','srcset','alt','code','sources'];
		if(!empty($prefix)){
			foreach($keys as $i=>$key){
				$keys[$i]=$prefix.ucfirst($key);
			}
		}
		return [
			$keys[0]=>['source'=>'attribute','selector'=>"{$selector} [src]",'attribute'=>'data-mime'],
			$keys[1]=>['source'=>'attribute','selector'=>"{$selector} [src]",'attribute'=>'src','default'=>\cp::get_file_url('images/'.$default)],
			$keys[2]=>['source'=>'attribute','selector'=>"{$selector} [src]",'attribute'=>'srcset'],
			$keys[3]=>['source'=>'attribute','selector'=>"{$selector} [src]",'attribute'=>'alt'],
			$keys[4]=>['source'=>'text','selector'=>$selector],
			$keys[5]=>self::getPictureSoucesAttributesForDevices($devices,$selector,$default)
		];
	}
	public static function getPicturAttributesDefaultValueForDevices($prefix=null,$devices=['tb','sp'],$default='dummy.jpg'){
		$keys=['mime','src','srcset','alt','code','sources'];
		if(!empty($prefix)){
			foreach($keys as $i=>$key){
				$keys[$i]=$prefix.ucfirst($key);
			}
		}
		return [
			$keys[0]=>'image/jpeg',
			$keys[1]=>\cp::get_file_url('images/'.$default),
			$keys[2]=>\cp::get_file_url('images/'.$default),
			$keys[3]=>'',
			$keys[4]=>'',
			$keys[5]=>self::getPictureSoucesAttributesDefaultValueForDevices($devices,$default)
		];
	}
	public static function getPictureSoucesAttributes($selector='picture'){
		return [
			'type'=>'array',
			'source'=>'query',
			'selector'=>(empty($selector)?'':"{$selector} ").'source',
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
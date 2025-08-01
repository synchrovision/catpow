<?php
/**
 * Catpowの各種ブロックを構成するコンポーネントのattributeをサーバーサイドでレンダリングするためのメソッド群
 */
namespace Catpow;

class BlockComponent{
	static $devices=[
		'sp'=>[
			'icon'=>'smartphone',
			'width'=>480,
			'media_query'=>'(max-width:640px)',
			'sizes'=>'(max-width:640px) 480px',
			'sizes_value'=>'480px',
			'media_size'=>'medium_large',
			'reg'=>'/[^,]+ 480w,/',
			'rep'=>' 480w,'
		],
		'tb'=>[
			'icon'=>'tablet',
			'width'=>960,
			'media_query'=>'(max-width:1280px)',
			'sizes'=>'(max-width:1280px) 960px',
			'sizes_value'=>'960px',
			'media_size'=>'full',
			'reg'=>'/[^,]+ 960w,/',
			'rep'=>' 960w,'
		],
		'lt'=>[
			'icon'=>'laptop',
			'width'=>1440,
			'media_query'=>'(max-width:1920px)',
			'sizes'=>'(max-width:1920px) 1440px',
			'sizes_value'=>'1440px',
			'media_size'=>'full',
			'reg'=>'/[^,]+ 1440w,/',
			'rep'=>' 1440w,'
		],
		'pc'=>[
			'icon'=>'desktop',
			'width'=>1920,
			'media_query'=>false,
			'sizes'=>'100vw',
			'sizes_value'=>'100vw',
			'media_size'=>'full',
			'reg'=>'/[^,]+$/',
			'rep'=>''
		]
	];
	public static function ResponsiveImage($props,$conf){
		if(isset($conf['keys']) && !empty($props)){
			foreach($conf['keys'] as $key=>$name){$props[$key]=$props[$name];}
		}
		if(empty($props['src'])){
			$props=['mime'=>'image/jpg','src'=>CP::get_file_url('images/dummy.jpg'),'alt'=>__('ダミー画像','catpow')];
		}
		$type=strstr($props['mime'],'/',true);
		$tag=$type==='image'?'picture':$type;
		$sources='';
		if(isset($props['sources'])){
			$src_attr=$type==='image'?'srcset':'src';
			foreach($props['sources'] as $source){
				$sources.=sprintf('<source %s="%s" media="%s"/>',$src_attr,$source['srcset'],self::$devices[$source['device']]['media_query']);
			}
		}
		$class_name=!empty($props['className'])?$props['className']:'cp-responsiveimage';
		$attr=sprintf('class="%s"',$class_name);
		if($type==='image'){
			$base=sprintf('<img class="%s" src="%s" alt="%s"/>',$class_name,$props['src'],$props['alt']);
		}
		else{
			$attr.=sprintf(' autoplay loop playsinline muted');
			$base=sprintf('<source src="%s"/>',$props['src']);
		}
		return sprintf(
			'<%s %s>%s%s</%1$s>',
			$tag,$attr,$sources,$base
		);
	}
}


?>
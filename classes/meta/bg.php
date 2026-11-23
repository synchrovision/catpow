<?php
namespace Catpow\meta;

class bg extends media{
	public static function output($meta,$prm){
		$prm=array_merge(['position'=>'50% 50%','size'=>'cover'],(array)$prm);
		$img_data=wp_get_attachment_image_src($meta->value,'full');
		return "<div class='bg' style='background:url(\"{$img_data[0]}\") {$prm['position']} / {$prm['size']} no-repeat;width:100%;height:100%;top:0;left:0;position:absolute;'></div>";
	}
	public static function get_output_html_data($meta,$prm){
		$image=wp_get_attachment_image_src($meta->value,'full');
		if(empty($image)){return null;}
		$position=$prm['position']??'50% 50%';
		$size=$prm['size']??'cover';
		return [
			'div.bg',
			'class'=>$prm['class']??null,
			'style'=>[
				'background'=>sprintf("url('%s') %s / %s no-repeat",$image[0],$position,$size),
				'width'=>'100%','height'=>'100%','top'=>'0','left'=>'0','position'=>'absolute'
			]
		];
	}
}
?>
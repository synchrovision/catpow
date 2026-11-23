<?php
namespace Catpow\meta;

class GoogleMap extends UI{
	public static
		$can_search_with_range=true,
		$defaultParam=['q'=>false,'t'=>'m','z'=>16,'hl'=>'ja'];
	
	public static function output($meta,$prm){
		return sprintf(
			'<iframe src="%s" frameBorder="0" class="googlemap" width="%d" height="%d"></iframe>',
			$meta->value,$meta->conf['width']??640,$meta->conf['height']??480
		);
	}
	public static function get_output_html_data($meta,$prm){
		return [
			'iframe.googlemap',
			'class'=>$prm['class']??null,
			'src'=>$meta->value,
			'frameBorder'=>'0',
			'width'=>$meta->conf['width']??640,
			'height'=>$meta->conf['height']??480
		];
	}
}
?>
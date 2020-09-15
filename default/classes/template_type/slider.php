<?php
namespace Catpow\template_type;
/**
* スライダーブロックのループ
* サムネールへの対応保留
*/

class slider extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($conf_data){
		return [
			'loop'=>[
				'スライダー'=>'loop.php'
			]
		];
	}
	public static function get_template_files($conf_data){
		return [
			'loop.php'=>[
				'',
				'@catpow',
				self::get_slider_block_code_data([
					'image'=>'@image vga',
					'title'=>'@title',
					'text'=>'@desc',
					'dots'=>true,
					'arrow'=>true,
					'autoplay'=>true,
					'flickable'=>true
				])
			]
		];
	}
	public static function get_slider_block_code_data($prm){
		$rtn=[
			'tag'=>'div.wp-block-catpow-slider',
			'contents'=>[
				'tag'=>'ul.contents',
				'<?php foreach(loop() as $obj): ?>',
				'item'=>['li.item'],
				'<?php endforeach; ?>'
			],
			'controls'=>['tag'=>'div.controls']
		];
		$rtn['tag'].='.'.($prm['type']??'articles');
		if(!empty($prm['image'])){$rtn['tag'].='.hasImage';$rtn['contents']['item']['image']=$prm['image'];}
		
		if(!empty($prm['title']) || !empty($prm['subTitle']) || !empty($prm['text'])){
			$text=['div.text'];
			if(!empty($prm['title'])){$rtn['tag'].='.hasTitle';$text['title']=['h3',$prm['title']];}
			if(!empty($prm['subTitle'])){$rtn['tag'].='.hasSubTitle';$text['subTitle']=['h4',$prm['subTitle']];}
			if(!empty($prm['text'])){$rtn['tag'].='.hasText';$text['text']=['p',$prm['text']];}
			$rtn['contents']['item']['text']=$text;
		}
		
		if(!empty($prm['background'])){$rtn['tag'].='.hasBackgroundImage';$rtn['contents']['item']['background']=$prm['background'];}
		if(!empty($prm['link'])){$rtn['tag'].='.hasLink';$rtn['contents']['item']['link']=$prm['link'];}
		
		if(!empty($prm['arrow'])){$rtn['tag'].='.hasArrow';$rtn['controls']['arrowPrev']=['div.arrow.prev'];}
		if(!empty($prm['dots'])){$rtn['tag'].='.hasDots';$rtn['controls']['dots']=['ul.dots',['li.dot']];}
		if(!empty($prm['arrow'])){$rtn['controls']['arrowNext']=['div.arrow.next'];}
		
		if(!empty($prm['loop'])){$rtn['controls']['tag'].='.loop';}
		if(!empty($prm['autoplay'])){$rtn['controls']['tag'].='.autoplay';}
		if(!empty($prm['flickable'])){$rtn['controls']['tag'].='.flickable';}
		if(!empty($prm['scrollable'])){$rtn['controls']['tag'].='.scrollable';}
		if(!empty($prm['stopbyhover'])){$rtn['controls']['tag'].='.stopbyhover';}
		if(!empty($prm['closable'])){$rtn['controls']['tag'].='.closable';}
		
		return $rtn;
	}
}

?>
<?php
namespace Catpow\template_type;
/**
* 
*/

class listed extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($conf_data){
		return [
			'loop'=>[
				'一覧'=>'loop.php'
			]
		];
	}
	public static function get_listed_block_code_data($prm){
		$rtn=[
			'tag'=>'ul.wp-block-catpow-listed',
			'<?php foreach(loop() as $obj): ?>',
			'item'=>['li.item'],
			'<?php endforeach; ?>'
		];
		$rtn['tag'].='.'.($prm['type']??'menu');
		if(!empty($prm['image'])){$rtn['tag'].='.hasImage';$rtn['item']['image']=$prm['image'];}
		
		if(!empty($prm['title']) || !empty($prm['subTitle']) || !empty($prm['text'])){
			$text=['div.text'];
			if(!empty($prm['title'])){$rtn['tag'].='.hasTitle';$text['title']=['h3',$prm['title']];}
			if(!empty($prm['subTitle'])){$rtn['tag'].='.hasSubTitle';$text['subTitle']=['h4',$prm['subTitle']];}
			if(!empty($prm['text'])){$rtn['tag'].='.hasText';$text['text']=['p',$prm['text']];}
			$rtn['item']['text']=$text;
		}
		
		if(!empty($prm['background'])){$rtn['tag'].='.hasBackgroundImage';$rtn['item']['background']=$prm['background'];}
		if(!empty($prm['link'])){$rtn['tag'].='.hasLink';$rtn['item']['link']=$prm['link'];}
		
		
		return $rtn;
	}
}

?>
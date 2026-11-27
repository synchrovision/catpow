<?php
use Catpow\util\BlockCode;

$name='core/image';
foreach(['width','height'] as $dimension){
	if(isset($attr[$dimension]) && is_numeric($attr[$dimension])){$attr[$dimension]=$attr[$dimension].'px';}
}
$comment=BlockCode::commentAttributes($name,$attr,['id','align','className','sizeSlug','width','height','aspectRatio','scale','linkDestination','anchor']);
$classes=BlockCode::classes(
	'wp-block-image',
	isset($attr['align'])?'align'.$attr['align']:'',
	isset($attr['sizeSlug'])?'size-'.$attr['sizeSlug']:'',
	isset($attr['width'])||isset($attr['height'])?'is-resized':'',
	$attr['className']??''
);
$image='<img'.BlockCode::attrs([
	'src'=>$attr['src']??$attr['url']??\cp::get_file_url('images/dummy.jpg'),
	'alt'=>$attr['alt']??'',
	'title'=>$attr['title']??null,
	'class'=>isset($attr['id'])?'wp-image-'.(int)$attr['id']:null,
	'style'=>BlockCode::style([
		'aspectRatio'=>$attr['aspectRatio']??null,'objectFit'=>$attr['scale']??null,
		'width'=>$attr['width']??null,'height'=>$attr['height']??null
	])
]).'/>';
if(!empty($attr['href'])){
	$image=BlockCode::element('a',$attr['linkClass']??null,$image,['href'=>$attr['href'],'target'=>$attr['linkTarget']??null,'rel'=>$attr['rel']??null]);
}
if(!empty($attr['caption'])){
	$image.=BlockCode::element('figcaption','wp-element-caption',$attr['caption']);
}
echo BlockCode::serialize($name,$comment,BlockCode::element('figure',$classes,$image,['id'=>$attr['anchor']??null]));

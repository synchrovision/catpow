<?php
use Catpow\util\BlockCode;

$name='core/heading';
$attr+=['level'=>3,'className'=>'is-style-headline'];
$attr['level']=max(1,min(6,(int)$attr['level']));
$comment=BlockCode::commentAttributes($name,$attr,['level','className','anchor','textAlign','align']);
$class=BlockCode::classes(
	'wp-block-heading',
	isset($attr['textAlign'])?'has-text-align-'.$attr['textAlign']:'',
	isset($attr['align'])?'align'.$attr['align']:'',
	$attr['className']
);
echo BlockCode::serialize($name,$comment,BlockCode::element('h'.$attr['level'],$class,$attr['content']??'',['id'=>$attr['anchor']??null]));

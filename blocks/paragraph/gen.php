<?php
use Catpow\util\BlockCode;

$name='core/paragraph';
$attr+=['className'=>'is-style-paragraph','fontSize'=>'regular'];
$comment=BlockCode::commentAttributes($name,$attr,['className','fontSize','anchor','align','dropCap','direction']);
$class=BlockCode::classes(
	isset($attr['align'])?'has-text-align-'.$attr['align']:'',
	!empty($attr['dropCap'])?'has-drop-cap':'',
	$attr['className'],
	!empty($attr['fontSize'])?'has-'.$attr['fontSize'].'-font-size':''
);
echo BlockCode::serialize($name,$comment,BlockCode::element('p',$class?:null,$attr['content']??'',[
	'id'=>$attr['anchor']??null,'dir'=>$attr['direction']??null
]));

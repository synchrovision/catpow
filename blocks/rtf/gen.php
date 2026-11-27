<?php
use Catpow\util\BlockCode;

$name='catpow/rtf';
$attr+=['text'=>__("■ 見出し\n\nテキスト[リンク](example.com)**強調**",'catpow')];
$comment=BlockCode::commentAttributes($name,$attr,['text','level','vars']);
echo BlockCode::serialize($name,$comment,
	'<div'.BlockCode::root('rtf',$attr).'>'.\Catpow\util\RTF::format($attr['text'],(int)($attr['level']??3)).'</div>'
);

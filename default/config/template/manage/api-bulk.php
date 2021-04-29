<?php
namespace Catpow;

switch($req['param']){
	case 'index':
		$res->set_data(['hoge'=>$req['hoge']]);
		return;
	case 'test':
		$res->set_data(['message'=>['text'=>'メッセージ']]);
		return;
}
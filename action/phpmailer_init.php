<?php
/*代替テキストメール*/
if(strpos($phpmailer->Body,'<textmail>')!==false){
	$phpmailer->Body=preg_replace_callback('|<textmail>(.+?)</textmail>|s',function($matches)use($phpmailer){
		$phpmailer->AltBody=html_entity_decode($matches[1],ENT_QUOTES|ENT_HTML5,'UTF-8');
		return '';
	},$phpmailer->Body);
}

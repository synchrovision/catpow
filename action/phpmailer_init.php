<?php
/*代替テキストメール*/
if(strpos($phpmailer->Body,'<textmail>')!==false){
	$phpmailer->Body=preg_replace_callback('|<textmail>(.+?)</textmail>|s',function($matches)use($phpmailer){
		$phpmailer->AltBody=$matches[1];
		return '';
	},$phpmailer->Body);
}

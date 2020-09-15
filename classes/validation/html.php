<?php
namespace Catpow\validation;

class html extends validation{
	public static function is_valid(&$val,$conf){
		return true;
		libxml_use_internal_errors(true);
		$doc=new \DOMDocument();
		$ret=$doc->loadXML(html_entity_decode($val));
		libxml_clear_errors();
		return ($ret===false)?false:true;
	}
	
	public static function get_message_format($conf){
		return __('HTML構文にエラーがあります','catpow');
	}
}

?>
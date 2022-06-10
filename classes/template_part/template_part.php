<?php
namespace Catpow\template_part;
/**
* テンプレートの部品を出力するためのクラス
*/

abstract class template_part{
	abstract public static function render(array $param=[]):void;
}

?>
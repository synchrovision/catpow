<?php
namespace Catpow\content;

class form_exception extends \Exception{
	public $action,$data;
	public function __construct($param){
		foreach($param as $key=>$val){$this->data[$key]=$val;}
		parent::__construct('cpform:invalid input value');
	}
}
?>
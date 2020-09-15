<?php
namespace Catpow\setup;

class template implements iSetup{
	static function exec(){
		try{
			global $cptc;
			\Catpow\template_creator::init();
			$cptc->create();
			$cptc->log();
		}
		catch(Exception $e){
			printf('%s at %s:line %s',$e->getMessage(),$e->getFile(),$e->getLine());
		}
	}
}
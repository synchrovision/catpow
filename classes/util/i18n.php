<?php
/**
* i18n
*/
namespace Catpow\util;
use Gettext\Loader\PoLoader;
use Gettext\Generator\JsonGenerator;

class i18n{
	public static function make_json_for_script($handler){
		$lang_dirs=\cp::get_file_paths(dirname($handler).'/languages');
		foreach($lang_dirs as $lang_dir){
			foreach(scandir($lang_dir)as $fname){
				if(substr($fname,-3)==='.po'){
					$po_file=$lang_dir.'/'.$fname;
					$json_file=$lang_dir.'/'.substr($fname,0,-3).'.json';
					if(!file_exists($json_file)or filemtime($json_file)< filemtime($po_file)){
						$translations=(new PoLoader())->loadFile($po_file);
						$translations->setDomain('catpow');
						$domain=$data['domain'];
						file_put_contents($json_file,json_encode(static::get_data_for_json($translations),0700));
					}
				}
			}
		}
	}
	public static function get_data_for_json($translations){
		$domain=$translations->getDomain()?:'messages';
		$messages=static::build_messages($translations);

		$config=[
			''=>[
				'domain'=>$domain,
				'lang'=>$translations->getLanguage()?:'en',
				'plural-forms'=>$translations->getHeaders()->get('Plural-Forms')?:'nplurals=2; plural=(n !=1);',
			],
		];

		$data=[
			'domain'=>$domain,
			'locale_data'=>[
				$domain=>$config+$messages,
			]
		];
		return $data;
	}
	public static function build_messages($translations){
		$plural_forms=$translations->getHeaders()->getPluralForm();
		$number_of_plurals=is_array($plural_forms)?($plural_forms[0]-1):null;
		$messages=[];

		foreach($translations as $translation){
			if($translation->isDisabled()){continue;}

			$message=$translation->getPluralTranslations($number_of_plurals);
			array_unshift($message, $translation->getTranslation());
			$message=[$translation->getTranslation()];

			$messages[$translation->getOriginal()]=$message;
		}

		return $messages;
	}
}

?>
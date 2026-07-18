<?php
namespace Catpow\api\schema;

class jsonld extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=false;
	public static function call($req,$res){
		$types=[];
		$formals=[];
		$dir=\cp::get_file_path('schema/jsonld');
		foreach(glob($dir.'/*.json') as $json_file){
			if(basename($json_file)==='schema.json'){continue;}
			$data=json_decode(file_get_contents($json_file),true);
			$types[$data['name']]=$data;
		}
		foreach(glob($dir.'/formal/*.json') as $json_file){
			$data=json_decode(file_get_contents($json_file),true);
			if(empty($data)){
				error_log("failed to parse json : {$json_file}");
				continue;
			}
			$formals[$data['name']]=$data;
		}
		$res->set_data(['types'=>$types,'formals'=>$formals]);
	}
}

?>
<?php
namespace Catpow\meta;
/**
test
*/
class text extends meta{
	public static
		$validation=['text'];
	public static function resolve_conf($conf){
		if(empty($conf['role'])){
			$conf['role']=[
				'name'=>'name',
				'simei'=>'name',
				'namae'=>'name',
				'tel'=>'tel',
				'fax'=>'fax',
				'desc'=>'desc',
				'excerpt'=>'desc',
				'caption'=>'caption',
				'zip'=>'zip',
				'address'=>'address',
				'keywords'=>'keywords'
			][$conf['name']]??'label';
		}
		return $conf;
	}
}
?>
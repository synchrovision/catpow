<?php
namespace Catpow\meta;

class cron extends database{
	public static $functions=['cron'];
	
	public static function cron($conf,$row){
		if(isset($conf['callback'])){return $conf['callback']($conf,$row);}
		if($file=$conf['file']??$row['file']??null){
			\cp::get_template_part($conf['path'].'/'.$file,compact('conf','row'));
		}
	}
	public static function fill_conf(&$conf){
		if(empty($conf['meta'])){$conf['meta']=[];}
		$conf['meta']+=[
			'datetime'=>['type'=>'DateTimeSelect'],
			'interval'=>['type'=>'select','value'=>['once','1 hour','1 day','1 week','1 month','1 year']],
			'done'=>['type'=>'radio','value'=>['未'=>-1,'済'=>1]]
		];
	}
}
?>
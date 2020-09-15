<?php
namespace Catpow\meta;
/**
* 受信メールを保存するデータベース
*/
class mail extends database{
	static $has_parent=false;
	
	public static function fill_conf(&$conf){
		$conf=array_merge([
			'meta'=>[],'alias'=>'mails','alias_template'=>['mailform']
		],$conf);
		$conf['meta']=array_merge([
			'name'=>['type'=>'text','label'=>__('お名前','catpow')],
			'email'=>['type'=>'email','label'=>__('メールアドレス','catpow'),'required'=>1]
		],$conf['meta']);
	}
}
?>
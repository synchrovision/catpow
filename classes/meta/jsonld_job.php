<?php
namespace Catpow\meta;

class jsonld_job extends jsonld{
	public static function fill_conf(&$conf){
		$conf['@type']='JobPosting';
		$conf['meta']=array_merge([
			'datePosted'=>['type'=>'DateTimeSelect','label'=>'掲載日'],
			'validThrough'=>['type'=>'DateTimeSelect','label'=>'掲載期限'],
			'title'=>['type'=>'text','label'=>'タイトル'],
			'hiringOrganization'=>['type'=>'data','label'=>'企業情報','@type'=>'Organization','meta'=>[
				'name'=>['type'=>'text','label'=>'企業名'],
				'sameAs'=>['type'=>'text','label'=>'HP'],
				'logo'=>['type'=>'text','label'=>'ロゴ画像URL','size'=>40]
			]],
			"employmentType"=>['type'=>'checkbox','label'=>'雇用形態','multiple'=>1,'value'=>[
				'正社員'=>"FULL_TIME",
				'パート・アルバイト'=>"PART_TIME",
				'契約社員'=>"CONTRACTOR",
				'一時的な雇用'=>"TEMPORARY",
				'インターンシップ'=>"INTERN",
				'ボランティア'=>"VOLUNTEER",
				'日雇い'=>"PER_DIEM",
				'その他'=>"OTHER"
			]],
			'description'=>['type'=>'textarea','label'=>'説明文','rows'=>20,'cols'=>50],
			'jobLocation'=>['type'=>'data','label'=>'勤務地','@type'=>'Place','multiple'=>1,'meta'=>[
				'address'=>['type'=>'data','label'=>'住所','@type'=>'PostalAddress','meta'=>[
					'addressCountry'=>['type'=>'select_json','label'=>'国','value'=>'country'],
					'postalCode'=>['type'=>'ZipCode','label'=>'郵便番号','address'=>['addressRegion','addressLocality','streetAddress']],
					'addressRegion'=>['type'=>'todouhuken','label'=>'都道府県'],
					'addressLocality'=>['type'=>'text','label'=>'住所１','size'=>'50'],
					'streetAddress'=>['type'=>'text','label'=>'住所２','size'=>'50'],
				]]
			]]
		],$conf['meta']??[]);
	}
}
?>
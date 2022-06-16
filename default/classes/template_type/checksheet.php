<?php
namespace Catpow\template_type;
/**
* チェックシート
* 出力するシートはpost_dataで選択
*/

class checksheet extends template_type{
	public static function get_embeddables($path,$conf_data){
		$post_data_paths=[];
		$posts=get_posts([
			'post_type'=>$conf_data['data_name'],
			'post_parent'=>0
		]);
		if(empty($posts)){
			if(isset($conf_data['article_type'])){
				$article_type_class=\cp::get_class_name('article_type',$conf_data['article_type']);
				foreach($article_type_class::get_default_post_datas($conf_data) as $path=>$post_data){
					if(substr_count($path,'/')>1)continue;
					$post_data_paths[$path]=$post_data['post_title'];
				}
			}
			foreach(self::get_default_post_datas($conf_data) as $path=>$post_data){
				if(substr_count($path,'/')>1)continue;
				$post_data_paths[$path]=$post_data['post_title'];
			}
		}
		else{
			foreach($posts as $post){
				$post_data_paths[$conf_data['data_name'].'/'.$post->post_name]=$post->post_title;
			}
		}
		return [
			'form'=>[
				'チェックシート'=>[
					'file'=>'form.php',
					'post_data_paths'=>$post_data_paths
				]
			]
		];
	}
	public static function fill_conf_data(&$conf_data){
		$conf_data['meta']=array_merge([
			'clear'=>['type'=>'checkbox','label'=>'クリア','value'=>['入力検証'=>1,'入力値'=>2,'フォーム'=>4]],
			'receive'=>['type'=>'radio','label'=>'データ受信','value'=>['しない'=>-1,'する'=>1]],
			'push'=>['type'=>'radio','label'=>'登録処理','value'=>['しない'=>-1,'する'=>1]]
		],$conf_data['meta']);
	}
	public static function get_default_post_datas($conf_data){
		return [
			$conf_data['data_name'].'/form'=>['post_title'=>$conf_data['label']],
			$conf_data['data_name'].'/form/step1'=>['post_title'=>'Step1'],
			$conf_data['data_name'].'/form/step2'=>['post_title'=>'Step2'],
			$conf_data['data_name'].'/form/step3'=>['post_title'=>'Step3'],
		];
	}
	
	public static function get_form_type($file){
		switch($file){
			case 'form.php':
				return 1;
			default:
				return parent::get_form_type($file);
		}
	}
}

?>
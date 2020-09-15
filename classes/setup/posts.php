<?php
namespace Catpow\setup;

class posts implements iSetup{
	static function exec(){
		$contents=[];
		\cp::conf_data_walk(function($data_type,$data_name,$conf_data)use(&$contents){
			if(isset($conf_data['article_type'])){
				$class_name=\cp::get_class_name('article_type',$conf_data['article_type']);
				$contents+=$class_name::get_default_post_datas($conf_data);
			}
			if(isset($conf_data['template'])){
				foreach($conf_data['template'] as $template){
					$class_name=\cp::get_class_name('template_type',explode('-',$template)[0]);
					$contents+=$class_name::get_default_post_datas($conf_data);
				}
			}
		});
		ksort($contents);
		array_walk($contents,function($post_data,$path){
			if(empty(\cp::get_post($path))){
				$post_data=array_merge(\cp::get_default_post_data($path),$post_data);
				$post_id=wp_insert_post($post_data);
				if(!empty($post_data['meta'])){
					foreach($post_data['meta'] as $key=>$vals){
						if(is_array($vals)){
							foreach($vals as $val){
								add_post_meta($post_id,$key,$val);
							}
						}
						else{
							add_post_meta($post_id,$key,$vals);
						}
					}
				}
				if($path==='page/home'){
					update_option('show_on_front','page');
					update_option('page_on_front',$post_id);
				}
				printf("page created : %s <br/>",$path);
			}
		});
	}
}
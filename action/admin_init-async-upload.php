<?php
namespace Catpow;

add_action("add_attachment",function($id){
	$default_actions=[
		'/^(?P<type>icon|symbol|pattern)\-(?P<name>[^\.]+)/'=>function($post,$matches){
			add_post_meta($post->ID,'is_'.$matches['type'],1);
		}
	];
	$actions=array_merge($default_actions,$GLOBALS['post_types']['attachment']['bind']??[]);
	$post=get_post($id);
	foreach($actions as $pattern=>$action){
		if(preg_match($pattern,$post->post_title,$matches)){
			if(is_string($action)){
				$path=vsprintf($action,array_slice($matches,1));
				$path_data=\cp::parse_data_path($path);
				if(!is_numeric($path_data['data_id'])){
					return;
				}
				$conf_data=\cp::get_conf_data($path_data);
				$class_name=\cp::get_class_name('meta',$conf_data['type']);
				$class_name::set(
					$path_data['data_type'],
					$path_data['data_name'],
					$path_data['data_id'],
					$path_data['meta_path'][0]['meta_name'],
					[$id],
					$conf_data
				);
			}
			else if(is_callable($action)){
				$action($post,$matches);
			}
		}
	}
});
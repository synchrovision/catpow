<?php
/**
* wp-content/config/site.jsonを管理
*/
namespace Catpow\util;

class site_config{
	public static function update(){
		$json=WP_CONTENT_DIR.'/config/sites.json';
		if(!is_dir(dirname($json))){mkdir(dirname($json,0755,true));}
		$sites=[];
		if(is_multisite()){
			foreach(get_sites() as $site){
				switch_to_blog($site->id);
				$sites[$site->domain.$site->path]=[
					'id'=>$site->id,
					'theme'=>get_stylesheet()
				];
				restore_current_blog();
			}
		}
		else{
			$sites[get_site_url()]=[
				'theme'=>get_stylesheet()
			];
		}
		file_put_contents($json,json_encode($sites,0700));
	}
}

?>
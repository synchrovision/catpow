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
		foreach(get_sites() as $site){
			$sites[$site->domain.$site->path]=$site->id;
		}
		file_put_contents($json,json_encode($sites,0700));
	}
}

?>
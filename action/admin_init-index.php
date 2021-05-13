<?php
namespace Catpow;

add_action( 'wp_dashboard_setup',function(){
	foreach(cp::get_file_urls('dashboard/widgets') as $widgets_dir=>$widgets_url){
		array_walk(glob($widgets_dir.'/*/contents.php'),function($contents_file)use($widgets_url){
			$dir=dirname($contents_file);
			$id=basename($dir);
			if(file_exists($conf_file=$dir.'/conf.php')){include $conf_file;}
			\cp::enqueue_style("dashboard/widgets/{$id}/style.css");
			\cp::enqueue_script("dashboard/widgets/{$id}/script.js");
			wp_add_dashboard_widget($id,$conf['label']??$id,function()use($contents_file){
				include $contents_file;
			});
		});
	}
});
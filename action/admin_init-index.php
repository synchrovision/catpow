<?php
namespace Catpow;

add_action('wp_dashboard_setup',function(){
	foreach(cp::get_file_urls('dashboard/widgets') as $widgets_dir=>$widgets_url){
		if(!empty($files=glob($widgets_dir.'/*/contents.php'))){
			array_walk($files,function($contents_file)use($widgets_url){
				$dir=dirname($contents_file);
				$id=basename($dir);
				if(file_exists($conf_file=$dir.'/conf.php')){include $conf_file;}
				if(!current_user_can($conf['capability']??'edit_themes')){return;}
				\cp::enqueue_style("dashboard/widgets/{$id}/style.css");
				\cp::enqueue_script("dashboard/widgets/{$id}/script.js");
				if(file_exists($form_file=$dir.'/form.php')){
					$control_callback=function()use($form_file){
						include $form_file;
					};
				}
				wp_add_dashboard_widget(
					$id,
					$conf['label']??$id,function($object,$args)use($contents_file){
						include $contents_file;
					},
					$control_callback??null,
					$conf['callback_args']??null,
					$conf['context']??'normal',
					$conf['priority']??'core'
				);
			});
		}
	}
});
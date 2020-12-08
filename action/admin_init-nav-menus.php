<?php
namespace Catpow;

CP::conf_data_walk(function($data_type,$data_name,&$conf_data){
	if(empty($conf_data['template'])){return;}
	foreach($conf_data['template'] as $template){
		$class_name=CP::get_class_name('template_type',explode('-',$template)[0]);
		foreach($class_name::get_nav_menu_items($conf_data) as $label=>$uri){
			$menu_items_name=$data_type=='post'?$data_name:'page';
			add_filter("nav_menu_items_{$menu_items_name}",function($posts)use($data_name,$template,$label,$uri){
				array_unshift($posts,(object)array(
					'ID'=>null,
					'db_id'=>null,
					'menu_item_parent'=>null,
					'target'=>null,
					'attr_title'=>null,
					'classes'=>array(),
					'xfn'=>null,
					'title'=>$label,
					'object_id'=>$template.'_'.$data_name,
					'object'=>$data_name,
					'type'=>'custom',
					'url'=>home_url($uri)
				));
				return $posts;
			},10);
		}
	}
});

add_action('wp_nav_menu_item_custom_fields',function($item_id,$item,$depth,$args,$id){
	foreach((array)get_menu_location($item->ID) as $i=>$location_name){
		if(empty($location_name) || empty($GLOBALS['nav_datas'][$location_name]['meta'])){continue;}
		echo("<div class=\"wp_nav_menu_item_custom_fields wp-clearfix {$location_name}\">");
		$sec=\cp::$content->sec('nav/'.$location_name.'/admin/form.php',$item->ID);
		printf('<input type="hidden" name="cp_form_section_ids[]" value="%s"/>',$sec->form_id);
		$sec->render();
		echo('</div>');
	}
},10,5);

add_action('wp_update_nav_menu_item',function($menu_id,$menu_item_db_id,$args){
	if(empty($_REQUEST['cp_form_section_ids'])){return;}
	foreach((array)$_REQUEST['cp_form_section_ids'] as $sec_id){
		if(isset(cp::$forms[$sec_id])){
			$form=cp::$forms[$sec_id];
			$form->receive();
			CP::update_data($form->inputs->data,'nav/'.get_term($menu_id)->name.'/'.$menu_item_db_id);
			$form->clear();
		}
	}

},10,3);

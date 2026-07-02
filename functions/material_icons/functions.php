<?php
add_action('init',function(){
	wp_enqueue_style('materialicons');
});
add_filter('cp_block_attributes_iconHolder',function($atts,$args){
	$atts['materialIconName']=array_merge([
		"source"=>"text",
		"selector"=>".material-icon",
		"default"=>"arrow_circle_right"
	],$args);
	return $atts;
},10,2);
add_filter('cp_block_items_attributes_iconHolder',function($items,$args){
	$items['query']['materialIconName']=array_merge(["source"=>"text","selector"=>".material-icon"],$args);
	for($i=0;$i<count($items['default']);$i++){
		$items['default'][$i]['materialIconName']="arrow_circle_right";
	}
	return $items;
},10,2);
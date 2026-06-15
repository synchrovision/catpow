<?php
add_filter('cp_block_attributes_iconHolder',function($atts,$args){
	$atts['embedIconSrc']=array_merge([
		"source"=>'attribute',
		"selector"=>'.embed-icon',
		"attribute"=>'data-src',
		"default"=>\cp::get_file_url("images/dummy_icon.svg")
	],$args);
	return $atts;
},10,2);
add_filter('cp_block_items_attributes_iconHolder',function($items,$args){
	$items['query']['embedIconSrc']=array_merge(["source"=>'attribute',"selector"=>'.embed-icon',"attribute"=>'data-src'],$args);
	for($i=0;$i<count($items['default']);$i++){
		$items['default'][$i]['embedIconSrc']=\cp::get_file_url("images/dummy_icon.svg");
	}
	return $items;
},10,2);
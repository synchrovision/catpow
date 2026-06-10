<?php
add_filter('cp_block_attributes_iconHolder',function($atts,$args){
	$atts['embedIconSrc']=array_merge(["source"=>'attribute',"selector"=>'.embed-icon',"attribute"=>'data-src'],$args);
	return $atts;
},10,2);
add_filter('cp_block_items_attributes_iconHolder',function($items,$args){
	$items['query']['embedIconSrc']=array_merge(["source"=>'attribute',"selector"=>'.embed-icon',"attribute"=>'data-src'],$args);
	return $items;
},10,2);
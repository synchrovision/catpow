<?php
add_filter('cp_block_attributes_iconHolder',function($atts,$args){
	$atts['embedIconSrc']=array_merge(["source"=>'attribute',"selector"=>'.embedIcon',"attribute"=>'data-src'],$args);
	$atts['embedIconCode']=array_merge(["source"=>'html',"selector"=>'.embedIcon'],$args);
	return $atts;
},10,2);
add_filter('cp_block_items_attributes_iconHolder',function($items,$args){
	$items['query']['embedIconSrc']=array_merge(["source"=>'attribute',"selector"=>'.embedIcon',"attribute"=>'data-src'],$args);
	$items['query']['embedIconCode']=array_merge(["source"=>'html',"selector"=>'.embedIcon'],$args);
	return $items;
},10,2);
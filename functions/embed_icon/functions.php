<?php
add_filter('cp_block_items_attributes_iconHolder',function($items,$args){
	$items['query']['embedIconSrc']=array_merge(["source"=>'attribute',"selector"=>'.embedIcon',"attribute"=>'data-src'],$args);
	$items['query']['embedIconCode']=array_merge(["source"=>'html',"selector"=>'.embedIcon'],$args);
	$items['iconComponent']='EmbedIcon';
	return $items;
},10,2);
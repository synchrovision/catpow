<?php
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['event']=array_merge(["source"=>'attribute',"attribute"=>'data-event'],$args);
	$items['eventDispatcherAttributes'][]='event';
	return $items;
},10,2);
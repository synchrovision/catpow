<?php
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['yssEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-yss-event'],$args);
	$items['eventDispatcherAttributes'][]='yssEvent';
	$items['query']['yjadEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-yjad-event'],$args);
	$items['eventDispatcherAttributes'][]='yjadEvent';
	return $items;
},10,2);

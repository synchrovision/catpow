<?php
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['linetagEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-linetag-event'],$args);
	$items['eventDispatcherAttributes'][]='linetagEvent';
	return $items;
},10,2);

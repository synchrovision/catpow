<?php
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['fbpEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-fbp-event'],$args);
	$items['eventDispatcherAttributes'][]='fbpEvent';
	return $items;
},10,2);

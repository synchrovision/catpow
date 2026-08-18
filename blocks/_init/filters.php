<?php
add_filter('cp_block_items_attributes_link',function($items,$args){
	$items=apply_filters('cp_block_items_attributes_eventDispatcher',$items,['selector'=>'.cp-link']);
	$items['query']+=[
		"linkHref"=>["source"=>"attribute","attribute"=>"href","selector"=>".cp-link"],
	];
	if(is_array($items['default'])){
		foreach($items['default'] as $i=>$item){
			$items['default'][$i]+=['linkHref'=>'/'];
		}
	}
	return $items;
},10,2);
add_filter('cp_block_items_attributes_button',function($items,$args){
	$is_link=$args['is_link']??true;
	$items=apply_filters('cp_block_items_attributes_iconHolder',$items,["selector"=>".cp-button__link-icon"]);
	$items=apply_filters('cp_block_items_attributes_eventDispatcher',$items,["selector"=>".cp-button__link"]);
	$items['query']+=[
		"buttonClasses"=>["source"=>"attribute","attribute"=>"class","selector"=>".cp-button"],
		"buttonCopy"=>["source"=>"html","selector"=>".cp-button__copy"],
		"buttonText"=>["source"=>"html","selector"=>".cp-button__link-text"],
		"buttonCaption"=>["source"=>"html","selector"=>".cp-button__caption"],
	];
	if($is_link){$items['query']+=['buttonHref'=>["source"=>"attribute","attribute"=>"href","selector"=>".cp-button__link"]];}
	if(is_array($items['default'])){
		foreach($items['default'] as $i=>$item){
			$items['default'][$i]+=[
				'buttonClasses'=>$args['class'].' is-ui-type-solid is-rank-secondary cp-button',
				'buttonText'=>'',
			];
			if($is_link){$items['default'][$i]+=['buttonHref'=>'/'];}
			if(!preg_match('/\bcp\-button\b/',$items['default'][$i]['buttonClasses'])){
				$items['default'][$i]['buttonClasses'].=' cp-button';
			}
		}
	}
	return $items;
},10,2);
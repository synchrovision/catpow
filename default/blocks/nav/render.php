<?php
namespace Catpow;
HTML::render(['.wp-block-catpow-nav--.'.str_replace(' ','.',$attr['classes']),
	'style'=>$attr['vars'],
	['ul._menu',
		'children'=>array_map(fn($item)=>['li._item',
			['a._link','href'=>$item->url,$item->title]
		],[...loop('nav/'.$attr['nav_name'])])
	]
]);
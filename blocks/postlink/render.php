<?php
namespace Catpow;
HTML::render([
	'.wp-block-catpow-postlink--',
	'class'=>$attr['classes'],
	'style'=>$attr['vars'],
	[
		'ul._links',
		'children'=>!$attr['preview']?[
			['li._prev',get_previous_post_link('%link')],
			['li._next',get_next_post_link('%link')],
		]:[
			['li._prev',['a',__('前の記事','catpow')]],
			['li._next',['a',__('次の記事','catpow')]],
		]
	]
]);

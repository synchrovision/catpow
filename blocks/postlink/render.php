<?php
namespace Catpow;
HTML::render([
	'.wp-block-catpow-postlink--.'.strtr($attr['classes'],' ','.'),
	[
		'ul._links',
		'children'=>!$attr['preview']?[
			['li._prev',get_previous_post_link('%link')],
			['li._next',get_next_post_link('%link')],
		]:[
			['li._prev',['a','前の記事']],
			['li._next',['a','次の記事']],
		]
	]
]);
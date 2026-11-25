<?php
namespace Catpow;
$states=array_fill_keys(explode(' ',$attr['classes']),true);
HTML::render([
	'header#siteHeader.cp-siteheader--',
	'class'=>$attr['classes'],
	'data-wp-interactive'=>'catpow/siteheader',
	"data-wp-context"=> [
		'isOpen'=> true,
		'currentPanelId'=>false
	],
	"data-wp-class--is-open"=> "context.isOpen",
	[
		'div._contents',
		['h1._logo',
			get_custom_logo(),
			$states['has-catch-phrase']?['small._catch',get_bloginfo('description')]:null
		]
	],
	[
		'ul._menu',
		'children'=>loop_map(fn($item)=>[
			'li._item',
			'class'=>['has-children'=>has_children()],
			'data-wp-class--is-open'=>'callbacks.isPanelOpen',
			'data-wp-on--mouseenter'=>'actions.onEnterMenuItem',
			'data-wp-on--mouseleave'=>'actions.onLeaveMenuItem',
			'data-wp-context'=>['panelId'=>'panel-'.$item->ID],
			[
				'a._link',
				'href'=>$item->url,
				($states['has-icon-in-main-menu'] && $item->icon)?['span._icon','children'=>meta('icon')->get_output_html_data()]:null,
				['span._label',['span._text',$item->title],
				$states['has-sub-title-in-main-menu']?['span._alt',get_output('alt')]:null]
			],
			has_children()?[
				'div._panel',
				'data-wp-class--is-open'=>'callbacks.isPanelOpen',
				'data-wp-bind--inert'=>'!callbacks.isPanelOpen',
				[
					'ul._items',
					'children'=>children_map(fn($sub_item)=>[
						'li._item',
						['a._link','href'=>$sub_item->url,$sub_item->title]
					])
				]
			]:null
		],'nav/header')
	],
	[
		'ul._primary',
		'children'=>loop_map(fn($item)=>[
			'li._item',
			'class'=>$item->post_class,
			[
				'a._link',
				'href'=>$item->url,
				($states['has-icon-in-primary-menu'] && $item->icon)?['span._icon','children'=>meta('icon')->get_output_html_data()]:null,
				['span._label',['span._text',$item->title],$states['has-sub-title-in-primary-menu']?['span._alt',get_output('alt')]:null]
			]
		],'nav/primary')
	],
	[
		'button._button',
		'data-wp-on--click'=>'actions.onClickToggle',
		['span._icon',' ']
	],
	[
		'button._back',
		'data-wp-on--click'=>'actions.onClickBack',
		['span._icon',' ']
	],
]);
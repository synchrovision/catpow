<?php
namespace Catpow;
$states=array_fill_keys(explode(' ',$attr['classes']),true);
HTML::render(['header#siteHeader.cp-siteheader--',
	'class'=>$attr['classes'],
	['div._contents',
		['h1._logo',
			get_custom_logo(),
			['small._catch',get_bloginfo('description')]
		]
	],
	['ul._menu',
		'children'=>loop_map(fn($item)=>['li._item',
			[
				'a._link',
				'href'=>$item->url,
				($states['has-icon-in-main-menu'] && $item->icon)?['span._icon','children'=>meta('icon')->get_output_html_data()]:null,
				['span._label',['span._text',$item->title],$states['has-sub-title-in-main-menu']?['span._alt',get_output('alt')]:null]
			]
		],'nav/header')
	],
	['ul._primary',
		'children'=>loop_map(fn($item)=>['li._item',
			'class'=>$item->post_class,
			[
				'a._link',
				'href'=>$item->url,
				($states['has-icon-in-primary-menu'] && $item->icon)?['span._icon','children'=>meta('icon')->get_output_html_data()]:null,
				['span._label',['span._text',$item->title],$states['has-sub-title-in-primary-menu']?['span._alt',get_output('alt')]:null]
			]
		],'nav/primary')
	],
	['button._button',
		['span._icon',' ']
	],
	['button._back',
		['span._icon',' ']
	],
]);
?>
<script type="text/javascript">
	document.addEventListener('DOMContentLoaded',function(){
		const siteHeader=document.getElementById('siteHeader');
		siteHeader.querySelector('.cp-siteheader__button').addEventListener('click',()=>{
			siteHeader.classList.toggle('is-open');
		});
		siteHeader.querySelector('.cp-siteheader__back').addEventListener('click',()=>{
			window.scrollTo(0,0);
		});
		var reseizeObserver=new ResizeObserver(function(entries){
			document.documentElement.style.setProperty('--cp-page-top-offset',siteHeader.getBoundingClientRect().bottom+'px');
		});
		reseizeObserver.observe(siteHeader);
	});
</script>
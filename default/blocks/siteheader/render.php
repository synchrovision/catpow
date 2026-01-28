<?php
namespace Catpow;
HTML::render(['header#siteHeader.wp-block-catpow-siteheader--',
	['div._contents',
		['h1._logo',
			get_custom_logo(),
			['small._catch',get_bloginfo('description')]
		]
	],
	['ul._menu',
		'children'=>array_map(fn($item)=>['li._item',
			['a._link','href'=>$item->url,$item->title]
		],[...loop('nav/header')])
	],
	['ul._primary',
		'children'=>array_map(fn($item)=>['li._item',
			['a._link','href'=>$item->url,$item->title]
		],[...loop('nav/primary')])
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
		siteHeader.querySelector('.wp-block-catpow-siteheader__button').addEventListener('click',()=>{
			siteHeader.classList.toggle('is-open');
		});
		siteHeader.querySelector('.wp-block-catpow-siteheader__back').addEventListener('click',()=>{
			window.scrollTo(0,0);
		});
		var reseizeObserver=new ResizeObserver(function(entries){
			document.documentElement.style.setProperty('--cp-page-top-offset',siteHeader.getBoundingClientRect().bottom+'px');
		});
		reseizeObserver.observe(siteHeader);
	});
</script>
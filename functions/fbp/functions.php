<?php
add_action('cp_setup',function(){
	if($cp_fbp_id=get_option('cp_fbp_id')){
		if(is_array($cp_fbp_id)){$cp_fbp_id=reset($cp_fbp_id);}
		add_action('wp_head',function()use($cp_fbp_id){
			?>
			<!-- Facebook Pixel Code -->
			<script>
				!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window, document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '<?=$cp_fbp_id?>');
				fbq('track', 'PageView');

				document.addEventListener('DOMContentLoaded',function(){
					var cb=function(el){
						if(!el.dataset.event || el.dataset.eventRegistered){return;}
						var datas=window.Catpow.ga.parseEventValue(el.dataset.event);
						datas.map(function(data){
							el.addEventListener(data.event,function(){
								window.Catpow.ga.send(data);
							});
						});
						el.dataset.eventRegistered=true;
					};
					document.querySelectorAll('[data-fbp-event]').forEach(cb);
					var o=new MutationObserver(function(mutations){
						mutations.map(function(mutation){
							mutation.addedNodes.forEach(function(node){
								if(node.nodeType===1){
									if(node.dataset.event){cb(node);}
									node.querySelectorAll('[data-fbp-event]').forEach(cb);
								}
							});
						});
					});
					document.querySelectorAll('.cpform').forEach(function(node){o.observe(node,{childList:true,subtree:true});});
				});
			</script>
			<noscript><img height="1" width="1" style="display:none"
			  src="https://www.facebook.com/tr?id=<?=$cp_fbp_id?>&ev=PageView&noscript=1"
			/></noscript>
			<!-- End Facebook Pixel Code -->
			<?php
		},20);
	}
});

add_action('init',function(){
	cp::enqueue_script('functions/fbp/script.js');
});
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['fbpEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-fbp-event'],$args);
	$items['eventDispatcherAttributes'][]='fbpEvent';
	return $items;
},10,2);
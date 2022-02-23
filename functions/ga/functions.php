<?php
add_action('cp_setup',function(){
	if($cp_ga_code=get_option('cp_ga_code')){
		if(is_array($cp_ga_code)){$cp_ga_code=reset($cp_ga_code);}
		add_action('wp_head',function()use($cp_ga_code){
			$conf=[
				'custom_map'=>apply_filters('cpga_dimensions',[])
			];
			?>
			<!-- Global site tag (gtag.js) - Google Analytics -->
			<script async src="https://www.googletagmanager.com/gtag/js?id='<?=$cp_ga_code?>"></script>
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config','<?=$cp_ga_code?>',<?=json_encode($conf)?>);

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
					document.querySelectorAll('[data-event]').forEach(cb);
					var o=new MutationObserver(function(mutations){
						mutations.map(function(mutation){
							mutation.addedNodes.forEach(function(node){
								if(node.nodeType===1){
									if(node.dataset.event){cb(node);}
									node.querySelectorAll('[data-event]').forEach(cb);
								}
							});
						});
					});
					document.querySelectorAll('.cp_form').forEach(function(node){o.observe(node,{childList:true,subtree:true});});
				});
			</script>
			<?php
		},5);
	}
});

function cpga_send_event($cat,$action,$label=false,$value=false){
	$event=['event_category'=>$cat];	
	if($label!==false)$event['event_label']=$label;
	if($value!==false)$event['event_value']=$value;
	printf("<script>gtag('event','%s',%s);</script>",$action,json_encode($event));
}

add_action('init',function(){
	cp::enqueue_script('functions/ga/script.js');
});
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['event']=array_merge(["source"=>'attribute',"attribute"=>'data-event'],$args);
	$items['eventDispatcherAttributes'][]='event';
	return $items;
},10,2);
<?php
add_action('cp_setup',function(){
	if($cp_yss_id=get_option('cp_yss_id')){
		if(is_array($cp_yss_id)){$cp_yss_id=reset($cp_yss_id);}
		add_action('wp_head',function()use($cp_yss_id){
			$use_retargeting=get_option('cp_yss_use_retargeting')==='1';
			?>
			<!-- Global site tag (ytag.js) - Yahoo Listing -->
			<script async src="https://s.yimg.jp/images/listing/tool/cv/ytag.js"></script>
			<script>
				window.primaryYssId="<?=$cp_yss_id?>";
				window.yjDataLayer = window.yjDataLayer || [];
				function ytag() { yjDataLayer.push(arguments); }
				ytag({"type":"ycl_cookie"});
				ytag({"type":"ycl_cookie_extended"});
				<?php if($use_retargeting): ?>
				ytag({
					"type":"yss_retargeting",
					"config": {
						"yahoo_ss_retargeting_id": window.primaryYssId,
						"yahoo_sstag_custom_params": {}
					}
				});
				<?php endif; ?>

				document.addEventListener('DOMContentLoaded',function(){
					var cb=function(el){
						if(!el.dataset.yssEvent || el.dataset.yssEventRegistered){return;}
						var datas=window.Catpow.yss.parseEventValue(el.dataset.yssEvent);
						datas.map(function(data){
							el.addEventListener(data.event,function(){
								window.Catpow.yss.send(data);
							});
						});
						el.dataset.yssEventRegistered=true;
					};
					document.querySelectorAll('[data-yss-event]').forEach(cb);
					var o=new MutationObserver(function(mutations){
						mutations.map(function(mutation){
							mutation.addedNodes.forEach(function(node){
								if(node.nodeType===1){
									if(node.dataset.yssEvent){cb(node);}
									node.querySelectorAll('[data-yss-event]').forEach(cb);
								}
							});
						});
					});
					document.querySelectorAll('.cpform').forEach(function(node){o.observe(node,{childList:true,subtree:true});});
				});
			</script>
			<?php
		},5);
	}
});

add_action('init',function(){
	cp::enqueue_script('functions/ytm/script.js');
});
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['yssEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-yss-event'],$args);
	$items['eventDispatcherAttributes'][]='yssEvent';
	return $items;
},10,2);
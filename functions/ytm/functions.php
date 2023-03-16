<?php
add_action('cp_setup',function(){
	$cp_yss_id=get_option('cp_yss_id');
	if(is_array($cp_yss_id)){$cp_yss_id=reset($cp_yss_id);}
	$cp_yjad_id=get_option('cp_yjad_id');
	if(is_array($cp_yjad_id)){$cp_yjad_id=reset($cp_yjad_id);}
	if(!empty($cp_yss_id) || !empty($cp_yjad_id)){
		add_action('wp_head',function()use($cp_yss_id,$cp_yjad_id){
			$use_yss_retargeting=get_option('cp_yss_use_retargeting')==='1';
			$yjad_retargeting_id=get_option('cp_yjad_retargeting_id');
			?>
			<!-- Global site tag (ytag.js) - Yahoo Listing -->
			<script async src="https://s.yimg.jp/images/listing/tool/cv/ytag.js"></script>
			<script>
				window.yjDataLayer = window.yjDataLayer || [];
				function ytag() { yjDataLayer.push(arguments); }
				ytag({"type":"ycl_cookie"});
				ytag({"type":"ycl_cookie_extended"});
				<?php if(!empty($cp_yss_id)): ?>
				window.primaryYssId="<?=$cp_yss_id?>";
				<?php if($use_yss_retargeting): ?>
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
				<?php endif; ?>
				<?php if(!empty($cp_yjad_id)): ?>
				window.primaryYjadId="<?=$cp_yjad_id?>";
				<?php if(!empty($yjad_retargeting_id)): ?>
				ytag({
					"type":"yjad_retargeting",
					"config":{
						"yahoo_retargeting_id": "<?=$yjad_retargeting_id?>",
						"yahoo_retargeting_label": "",
						"yahoo_retargeting_page_type": "",
						"yahoo_retargeting_items":[
							{item_id: '', category_id: '', price: '', quantity: ''}
						]
					}
				});
				<?php endif; ?>

				document.addEventListener('DOMContentLoaded',function(){
					var cb=function(el){
						if(!el.dataset.yjadEvent || el.dataset.yjadEventRegistered){return;}
						var datas=window.Catpow.yjad.parseEventValue(el.dataset.yjadEvent);
						datas.map(function(data){
							el.addEventListener(data.event,function(){
								window.Catpow.yjad.send(data);
							});
						});
						el.dataset.yjadEventRegistered=true;
					};
					document.querySelectorAll('[data-yjad-event]').forEach(cb);
					var o=new MutationObserver(function(mutations){
						mutations.map(function(mutation){
							mutation.addedNodes.forEach(function(node){
								if(node.nodeType===1){
									if(node.dataset.yjadEvent){cb(node);}
									node.querySelectorAll('[data-yjad-event]').forEach(cb);
								}
							});
						});
					});
					document.querySelectorAll('.cpform').forEach(function(node){o.observe(node,{childList:true,subtree:true});});
				});
				<?php endif; ?>
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
	$items['query']['yjadEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-yjad-event'],$args);
	$items['eventDispatcherAttributes'][]='yjadEvent';
	return $items;
},10,2);
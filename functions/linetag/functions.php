<?php
add_action('cp_setup',function(){
	if($cp_linetag_codes=get_option('cp_linetag_code')){
		$cp_linetag_codes=(array)$cp_linetag_codes;
		$cp_linetag_code=reset($cp_linetag_codes);
		add_action('wp_head',function()use($cp_linetag_codes,$cp_linetag_code){
			?>
			<!-- LINE Tag Base Code -->
			<!-- Do Not Modify -->
			<script>
			(function(g,d,o){
				g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};
				var h=location.protocol==='https:'?'https://d.line-scdn.net':'http://d.line-cdn.net';
				var s=d.createElement('script');s.async=1;
				s.src=o||h+'/n/line_tag/public/release/v1/lt.js';
				var t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);
			})(window, document);
			_lt('init',{
				customerType: 'lap',
				tagId:'<?=$cp_linetag_code?>'
			});
<?php foreach($cp_linetag_codes as $cp_sub_linetag_code): ?>
			_lt('send','pv',['<?=$cp_sub_linetag_code?>']);
<?php endforeach; ?>

			document.addEventListener('DOMContentLoaded',function(){
				window.Catpow.linetag.initialTagId='<?=$cp_linetag_code?>';
				var cb=function(el){
					if(!el.dataset.linetagEvent || el.dataset.linetagEventRegistered){return;}
					var datas=window.Catpow.linetag.parseEventValue(el.dataset.linetagEvent);
					datas.map(function(data){
						el.addEventListener(data.event,function(){
							window.Catpow.linetag.send(data);
						});
					});
					el.dataset.linetagEventRegistered=true;
				};
				document.querySelectorAll('[data-linetag-event]').forEach(cb);
				var o=new MutationObserver(function(mutations){
					mutations.map(function(mutation){
						mutation.addedNodes.forEach(function(node){
							if(node.nodeType===1){
								if(node.dataset.linetagEvent){cb(node);}
								node.querySelectorAll('[data-linetag-event]').forEach(cb);
							}
						});
					});
				});
				document.querySelectorAll('.cpform').forEach(function(node){o.observe(node,{childList:true,subtree:true});});
			});
			</script>
			<noscript>
<?php foreach($cp_linetag_codes as $cp_sub_linetag_code): ?>
			  <img height="1" width="1" style="display:none" src="https://tr.line.me/tag.gif?c_t=lap&t_id=<?=$cp_sub_linetag_code?>&e=pv&noscript=1" />
<?php endforeach; ?>
			</noscript>
			<!-- End LINE Tag Base Code -->
			<?php
		},5);
	}
});

add_action('enqueue_block_assets',function(){
	cp::enqueue_script('functions/linetag/script.js');
});
add_filter('cp_block_items_attributes_eventDispatcher',function($items,$args){
	$items['query']['linetagEvent']=array_merge(["source"=>'attribute',"attribute"=>'data-linetag-event'],$args);
	$items['eventDispatcherAttributes'][]='linetagEvent';
	return $items;
},10,2);
<?php
add_action('wp_head',function(){
?>
<script type="text/javascript">
	jQuery(function($){
		var rootStyle=document.documentElement.style;
		const roles=<?=json_encode(Catpow\util\style_config::get_color_roles(),0700)?>;
		wp.customize('colors',function(setting){
			setting.bind(function(colors){
				var hsl,i;
				Object.keys(roles).map((role)=>{
					if(colors[role]===undefined){return;}
					const key=roles[role].shorthand;
					rootStyle.setProperty('--cp-colors-'+key,colors[role]);
					if(roles[role].extend && colors.tones[role]){
						hsl=colors.tones[role];
						for(i=0;i<12;i++){
							rootStyle.setProperty('--cp-colors-'+(key!=='m'?key:'')+(i+1),Catpow.util.hslToHex({h:i*30,s:hsl.s,l:hsl.l}));
						}
					}
				});
				Object.keys(colors.tones).map((key)=>{
					Object.keys(colors.tones[key]).map((k)=>{
						rootStyle.setProperty('--cp-tones-'+key+'-'+k,colors.tones[key][k]+(k==='h'?'':'%'));
					});
				});
			});
		});
<?php foreach(Catpow\util\style_config::get_font_roles() as $role=>$conf):$key=$conf['shorthand'];?>
		wp.customize('fonts[<?=$role?>]',function(setting){
			setting.bind(function(font){
				rootStyle.setProperty('--cp-fonts-<?=$key?>',font);
			});
		});
<?php endforeach; ?>
	});
</script>
<?php
});
<?php
add_action('wp_head',function(){
?>
<script type="text/javascript">
	jQuery(function($){
		var rootStyle=document.documentElement.style;
		const roles=<?=json_encode(Catpow\util\style_config::get_color_roles(),0700)?>;
		const inverts=<?=json_encode(array_column(Catpow\util\style_config::get_color_roles(),'invert','shorthand'),0700)?>;
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
					if(colors.tones[key].h==0 && colors.tones[key].s==0 && inverts[key]){
						colors.tones[key].h=colors.tones[inverts[key]].h;
					}
					Object.keys(colors.tones[key]).map((k)=>{
						rootStyle.setProperty('--cp-tones-'+key+'-'+k,colors.tones[key][k]+((k==='h' || k==='a')?'':'%'));
						if(k==='h'){
							rootStyle.setProperty('--cp-root-tones-'+key+'-'+k,colors.tones[key][k]);
							rootStyle.setProperty('--cp-container-tones-'+key+'-'+k,colors.tones[key][k]);
						}
					});
				});
				rootStyle.setProperty('--cp-tones-hr',colors.hueRange);
				rootStyle.setProperty('--cp-tones-hs',colors.hueShift);
			});
		});
<?php foreach(Catpow\util\style_config::get_font_family_roles() as $role=>$conf):$key=$conf['shorthand'];?>
		wp.customize('font_family[<?=$role?>]',function(setting){
			setting.bind(function(font){
				rootStyle.setProperty('--cp-font-family-<?=$key?>',font);
			});
		});
<?php endforeach; ?>
		wp.customize('font_size',function(setting){
			setting.bind(function(fontSizes){
				Object.keys(fontSizes).forEach((role)=>{
					rootStyle.setProperty('--cp-font-size-'+role,fontSizes[role]);
				});
			});
		});
		wp.customize('line_height',function(setting){
			setting.bind(function(lineHeights){
				Object.keys(lineHeights).forEach((role)=>{
					rootStyle.setProperty('--cp-line-height-'+role,lineHeights[role]);
				});
			});
		});
		wp.customize('font_weight',function(setting){
			setting.bind(function(fontWeight){
				Object.keys(fontWeight).forEach((role)=>{
					rootStyle.setProperty('--cp-font-weight-'+role,fontWeight[role]);
				});
			});
		});
	});
</script>
<?php
});
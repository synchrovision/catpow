<?php
add_action('wp_head',function(){
?>
<script type="text/javascript">
	jQuery(function($){
		var rootStyle=document.documentElement.style;
<?php foreach(Catpow\util\style_config::get_color_roles() as $role=>$conf):$key=$conf['shorthand'];?>
		wp.customize('colors[<?=$role?>]',function(setting){
			setting.bind(function(color){
				var hsl=Catpow.util.hexToHsl(color),hsb=Catpow.util.hexToHsb(color),i;
				rootStyle.setProperty('--cp-colors-<?=$key?>',color);
				rootStyle.setProperty('--cp-tones-<?=$key?>-h',hsl.h);
				rootStyle.setProperty('--cp-tones-<?=$key?>-s',hsl.s + '%');
				rootStyle.setProperty('--cp-tones-<?=$key?>-l',hsl.l + '%');
				rootStyle.setProperty('--cp-tones-<?=$key?>-t',(1-hsl.l/100) + '%');
				rootStyle.setProperty('--cp-tones-<?=$key?>-S',hsb.s + '%');
				rootStyle.setProperty('--cp-tones-<?=$key?>-B',hsb.b + '%');
<?php	if(!empty($conf['extend'])): ?>
				for(i=0;i<12;i++){
					rootStyle.setProperty('--cp-colors-<?=$key==='m'?'':$key?>'+(i+1),Catpow.util.hslToHex({h:i*30,s:hsl.s,l:hsl.l}));
				}
<?php	endif; ?>
			});
		});
<?php endforeach; ?>
	});
</script>
<?php
});
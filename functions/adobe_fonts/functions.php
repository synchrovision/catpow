<?php
use Catpow\util\style_config;

add_action('wp_head',function(){
	if($pid=get_option('cp_adobe_fonts_pid')){
	?>
		<script>
		  (function(d) {
			var config = {
			  kitId: '<?=$pid?>',
			  scriptTimeout: 3000,
			  async: true
			},
			h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
		  })(document);
		</script>
	<?php
	}
});

add_action('cp_scss_compiler_init',function($scssc){
	$vars=[];
	foreach(style_config::$font_roles as $role=>$conf){
		$vars["{$role}_font"]=get_option("cp_adobe_fonts_{$role}_font",$conf['default']);
	}
	$scssc->setVariables($vars);
});
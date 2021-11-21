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
	$fonts=[];
	if($f=\cp::get_file_path('json/fonts.json')){
		$vars=(array)json_decode(file_get_contents($f),true);
		foreach($vars[0] as $key=>$val){
			$fonts[$key]=implode(',',$val);
		}
	}
	else{
		// migration
		$vars=[[]];
		$f=get_stylesheet_directory().'/json/fonts.json';
		foreach(style_config::get_font_roles() as $role=>$conf){
			$fonts["{$role}_font"]=get_option("cp_adobe_fonts_{$role}_font",$conf['default']);
			$vars[0]["{$role}_font"]=explode(',',$fonts["{$role}_font"]);
		}
		file_put_contents($f,json_encode($vars,\JSON_UNESCAPED_UNICODE));
	}
	$scssc->setVariables($fonts);
});
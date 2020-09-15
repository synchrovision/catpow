<?php

add_filter('option_home_ref',function($url){
	static $cache;
	if(isset($cache)){return $cache;}
	$url=trim($url,'/');
	$maybe_locale=explode('/',trim(substr($_SERVER['REQUEST_URI'],strlen(parse_url($url,PHP_URL_PATH))),'/'))[0];
	$locales=\cp::get_meta('catpow','gtranslate','','locale');
	if(isset($locales) && in_array($maybe_locale,$locales,true)){
		setcookie('googtrans','/ja/'.$maybe_locale);
		add_filter('locale',function()use($maybe_locale){return $maybe_locale;});
		return $cache=$url.'/'.$maybe_locale.'/';
	}
	else{
		setcookie('googtrans','/ja/auto');
	}
	return $cache=$url;
},5);

add_action('wp_footer',function(){
	if($show_widget=\cp::get_meta('catpow','gtranslate',1,'show_widget',true)==1){
		echo('<div id="google_translate_element"></div>');
	}
?>
<script type="text/javascript">
	function googleTranslateElementInit() {
	  new google.translate.TranslateElement({
		  pageLanguage: 'ja',
		  layout: google.translate.TranslateElement.FloatPosition.TOP_RIGHT,
		  includedLanguages: '<?= implode(',',\cp::get_meta('catpow','gtranslate',1,'locale'))?>'
	  }<?=$show_widget?",'google_translate_element'":""?>);
	}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<?php
});
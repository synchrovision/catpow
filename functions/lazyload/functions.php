<?php
add_filter('the_content',function($content){
	$img=cp::get_file_url('images/spacer.gif');
	return preg_replace_callback('/<img (.+?)\/>/',function($matches)use($img){
		return preg_replace('/(src(set)?)=/','\1="'.$img.'" data-\1=',$matches[0]);
	},$content);
},100);
add_action('wp_print_footer_scripts',function(){
?>
<script>
	jQuery(function($){
		$('body').cp_lazy_load();
	});
</script>
<?php
});
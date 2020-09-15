<?php
add_filter('the_content',function($content){
	$img=cp::get_file_url('images/spacer.gif');
	return str_replace(' srcset=',' data-srcset=',str_replace(' src=',' src="'.$img.'" data-src=',$content));
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
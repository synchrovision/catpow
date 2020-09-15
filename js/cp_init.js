jQuery(function($){
	var $site_header=$('.site_header');
	if($site_header.length){
		cp.page_main_offset=$site_header.get(0).getBoundingClientRect().bottom;
	}
});

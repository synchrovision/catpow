jQuery(function($){
	$('#cp_search').cpform_conditioner();
	$('#cpcf_custom_box_button').on('click',function(){
		$(this).closest('#cpcf_custom_box').toggleClass('active');
	});
});
			
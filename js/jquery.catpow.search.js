jQuery(function($){
	$('#cp_search').cp_form_conditioner();
	$('#cpcf_custom_box_button').on('click',function(){
		$(this).closest('#cpcf_custom_box').toggleClass('active');
	});
});
			
jQuery(function($){
	$('#cp_log table').closest('td').prev('th').on('click',function(){
		$(this).closest('tr').toggleClass('close');
	});
});
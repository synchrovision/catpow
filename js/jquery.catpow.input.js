jQuery(function($){
	$(document).on('click','[data-role="cp-input-item-up"]',function(){
		var $tgt=$(this).closest('[data-role="cp-meta-unit"]');
		$tgt.insertBefore($tgt.prev());
		reset_multiple_input_attr($(this).closest('[data-role="cp-meta-item"]'));
		$(document).trigger(new $.Event('update_form'));
	});
	$(document).on('click','[data-role="cp-input-item-down"]',function(){
		var $tgt=$(this).closest('[data-role="cp-meta-unit"]');
		$tgt.insertAfter($tgt.next());
		reset_multiple_input_attr($(this).closest('[data-role="cp-meta-item"]'));
		$(document).trigger(new $.Event('update_form'));
	});
	$('.sort-input-buttons').closest('[data-role="cp-meta-item"]').sortable({
		update:function(){reset_multiple_input_attr($(this));},
		handle:'[data-role="cp-input-item-handle"]'
	});
});
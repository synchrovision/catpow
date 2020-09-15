jQuery(function($){
	$('form').on('click','[data-role="calendar-input-prepend"]',function(){
		var $tgt=$(this);
		$.ajax({
			url:wp_ajax_url,
			type:'GET',
			dataType:"jsonp",
			jsonpCallback:'ajax_calendar_callback',
			data:{action:'ajax_calendar',cals_id:$tgt.attr('data-cals_id'),range:$tgt.attr('data-range')}
		}).done(function(res){
			var $cnt=$tgt.closest('[data-role="calendar-container"]');
			var $new=$cnt.clone().insertAfter($cnt).find('[data-role="calendar-input-prepend"]').parent().html(res['html']);
			init_calendar($new.find('table.calendar'));
			$tgt.attr('data-range',res['range']+' -1 month');
		}).fail(function(e,ts,et){
			console.log('status:'+e.status);
			console.log(ts);
			console.log(et);
			if(e.status=='200'){
				console.log('data:');
				$.ajax({
					url:wp_ajax_url,
					type:'post',
					dataType:'html',
					data:fd,
					processData:false,
					contentType:false,
				}).done(function(res){
					console.log(res);
				});
			}
		});
	});
	$('form').on('click','[data-role="calendar-input-append"]',function(){
		var $tgt=$(this);
		$.ajax({
			url:wp_ajax_url,
			type:'GET',
			dataType:"jsonp",
			jsonpCallback:'ajax_calendar_callback',
			data:{action:'ajax_calendar',cals_id:$tgt.attr('data-cals_id'),range:$tgt.attr('data-range')}
		}).done(function(res){
			var $cnt=$tgt.closest('[data-role="calendar-container"]');
			var $new=$cnt.clone().insertBefore($cnt).find('[data-role="calendar-input-append"]').parent().html(res['html']);
			init_calendar($new.find('table.calendar'));
			$tgt.attr('data-range',res['range']+' +1 month');
		});
	});
	$('form').on('click','table.calendar div.event label',function(){
		if($(this).find('input:checked').length){
			$(this).closest('div.event').addClass('active').closest('td').addClass('active '+$(this).attr('data-rel-class'));
		}else{
			$(this).parents('div.event').removeClass('active').closest('td').removeClass($(this).attr('data-rel-class'));
			if($(this).closest('div.events').find('input:checked').length==0){
				$(this).closest('td').removeClass('active');
			}
		}
		
	});
        console.log('calendar script loaded');
	$('form').on('click','table.calendar td.in_month p.date',function(){
        console.log('calendar clicked');
		var $tgt=$(this).closest('td');
		if($tgt.hasClass('forcus')){
			$tgt.removeClass('forcus');
		}
		else{
			$tgt.closest('form').find('.forcus').removeClass('forcus');
			$tgt.addClass('forcus');
		}
	});
	init_calendar($('table.calendar'));
	$('form').on('after_cp_form_callback',function(){init_calendar($('table.calendar'));})
});
function init_calendar($cal){
	var $=jQuery;
	$cal.find('div.event label input:checked').parents('label').each(function(){
		$(this).closest('div.event').addClass('active').closest('td').addClass('active '+$(this).attr('data-rel-class'));
	});
}
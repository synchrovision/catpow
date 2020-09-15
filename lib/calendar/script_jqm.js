jQuery(function($){
	init_calendar();
	$(document).on('pagechange',function(){init_calendar();});
	function init_calendar(){
		$('table.calendar div.event label input').hide();
		$('table.calendar div.event label input:checked').parents('label').each(function(){
			$(this).parents('div.event').addClass('active').parents('td').addClass('active '+$(this).attr('data-rel-class'));
		});
		$('table.calendar div.event label').click(function(){
			if($(this).find('input:checked').length){
				$(this).parents('div.event').addClass('active').parents('td').addClass('active '+$(this).attr('data-rel-class'));
			}else{
				$(this).parents('div.event').removeClass('active').parents('td').removeClass($(this).attr('data-rel-class'));
				if($(this).parents('div.events').find('input:checked').length==0){
					$(this).parents('td').removeClass('active');
				}
			}
		});
	}
});
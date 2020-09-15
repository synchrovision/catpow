(function($){$.fn.extend({
	cp_menu:function(){
		var $menu,$menus,$crr,depth;
		$menu=this;
		if(!$menu.is('ul.menu')){$menu=$menu.find('ul.menu');}
		$crr=$menu;
		$menus=$('ul.sub-menu',$menu);
		$('li.menu-item-has-children > div.link',$menu).append('<span class="arrow next"></span>');
		$('ul.sub-menu',$menu).prepend('<li class="back"><span class="arrow back"></span></li>')
		$menu.back=function(){
			$menu.focus($crr.parent().closest('ul.menu,ul.sub-menu'));
		};
		$menu.focus=function($tgt){
			if(!$tgt.length){return;}
			if(!$tgt.is('ul.menu,ul.sub-menu')){
				$tgt=$tgt.closest('li.menu-item').children('ul.sub-menu');
			}
			$menus.removeClass('ancestor active');
			$menu.removeClass(function(index,className){return (className.match(/\bdepth\d/) || []).join(' ');});
			$tgt.addClass('active');
			$tgt.closest('ul.menu').addClass('depth'+$tgt.parents('ul.menu,ul.sub-menu').addClass('ancestor').length);
			$crr=$tgt;
		};
		$menu.focusCurrent=function(){
			$menu.focus($('li.current-menu-item',$menu).closest('ul.menu,ul.sub-menu'));
		};
		$('span.arrow.next',$menu).on('click',function(){$menu.focus($(this));})
		$('ul.sub-menu li.back',$menu).on('click',function(){$menu.back();});
		return $menu;
	}
});})(jQuery);
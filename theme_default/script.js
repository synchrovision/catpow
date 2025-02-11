jQuery(function($){
	var header_bnd=document.querySelector('.site_header').getBoundingClientRect();
	var offset=header_bnd.y+header_bnd.height;
	$('.page_header .image').cp_parallax();
	$('[srcset]').cp_loader();
	$('main.site_main').cp_observe('[srcset]',function($new){$new.cp_loader();});
	$('aside .article_nav_container').cp_article_nav($('.page_content'),offset).cp_scrollfix(offset);
	$('.site_header .back_to_top').on('click',function(){
		$('html,body').animate({scrollTop:0},500);
	});
	$('.site_header .menu_button').on('click',function(){
		var $tgt=$(this).add('body,.site_header');
		if($tgt.hasClass('open')){$tgt.addClass('close').removeClass('open');}
		else{$tgt.addClass('open').removeClass('close');}
	});
	$('.page_sidebar .sidebar_button').on('click',function(){
		var $tgt=$('.page_sidebar');
		if($tgt.hasClass('open')){$tgt.addClass('close').removeClass('open');}
		else{$tgt.addClass('open').removeClass('close');}
	});
	$('.page_content').on('click',function(){
		$('.page_sidebar').addClass('close').removeClass('open');
	});
	$('ul.menu').cp_menu().focusCurrent();
	$('.cp-lightbox').cp_lightbox();
	
});
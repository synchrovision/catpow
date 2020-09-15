(function($){$.fn.extend({
	cp_article_nav:function($article,offset){
		if(offset===undefined){offset=0;}
		else{offset=parseInt(offset);}
		var $nav=$(this);
		var $root_ul=$('<ul class="article_nav"></ul>').appendTo($nav);
		var path=[];
		var all_li=[];
		$('article,section',$article).each(function(){
			var $li=$('<li><h3>'+$('h1:eq(0),h2:eq(0),h3:eq(0),h4:eq(0),h5:eq(0),h6:eq(0)',this).first().text()+'</h3></li>');
			$li.article=$(this);
			if(this.dataset.icon){
				$li.addClass('hasIcon');
				$('h3',$li).prepend('<img class="icon" src="'+this.dataset.icon+'"/>');
			}
			$li.find('h3').on('click',function(){
				$li.article.trigger('expect');
				$('body,html').animate({scrollTop:parseInt($li.article.offset().top) - offset +10});
			});
			if(path[0] && $.contains(path[0].article.get(0),$li.article.get(0))){
				$li.ul=$('<ul></ul>').appendTo(path[0]);
			}
			else{
				while(path[0] && !$.contains(path[0].article.get(0),$li.article.get(0))){var $sibling=path.shift();}
				if(path[0]){$li.ul=$sibling.ul;}
				else{$li.ul=$root_ul;}
			}
			$li.appendTo($li.ul);
			path.unshift($li);
			all_li.push($li);
		});
		$nav.update=function(){
			all_li.map(function($li){
				var bnd=$li.article.get(0).getBoundingClientRect();
				if(bnd.top<offset && bnd.bottom>offset){$li.addClass('active');}
				else{$li.removeClass('active');}
			});
		};
		$(window).on('resize',function(){$nav.init();});
		$(window).on('scroll',function(){$nav.update();});
		$nav.init();
		return $nav;
	}
});})(jQuery);
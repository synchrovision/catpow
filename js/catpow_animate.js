jQuery.catpow=jQuery.catpow || {};
jQuery.catpow.set_page_top_offset=function(offset){
	$(window).off('.set_page_top_offset');
	if(window.location.hash){
		window.addEventListener('load',function(){
			window.scrollBy({top:-$.catpow.pageTopOffset});
		});
	}
	if(Number.isInteger(offset)){
		return $.catpow.pageTopOffset=offset;	
	}
	if(typeof offset === 'string'){offset=jQuery(offset);}
	if(offset instanceof jQuery){offset=offset.get(0);}
	if(offset instanceof HTMLElement){
		$(window).on('resize.set_page_top_offset scroll.set_page_top_offset',function(){
			$.catpow.pageTopOffset=Math.max(0,offset.getBoundingClientRect().bottom);
		});
		return $.catpow.pageTopOffset=offset.getBoundingClientRect().bottom;
	}
	$.catpow.pageTopOffset=0;
};
(function($){
	$.fn.extend({
		cp_scrollfix:function(){
			var $parent=$(this).parent(),$control=$(this),$window=$(window);
			var s=$window.scrollTop(),ts=0,ty=0,winh,winw;
			$control.init=function(){
				window.addEventListener('load',function(){
					if($parent.css('position')==='static'){$parent.css({"position":"relative"});}
				});
				$control.update();
			}
			$control.update=function(){
				winh=document.documentElement.clientHeight;
				winw=document.documentElement.clientWidth;
				ts=$window.scrollTop()-s;
				s=$window.scrollTop();
				$control.each(function(){
					var bnd1=this.getBoundingClientRect();
					var bnd2=this.parentNode.getBoundingClientRect();
					if(bnd2.top>$.catpow.pageTopOffset){
						$(this).css({transform:'translate3d(0,0,0)',position:'absolute',top:0,bottom:'auto',left:0,right:0});
					}
					else if(bnd2.bottom<Math.min(winh,$.catpow.pageTopOffset+bnd1.height)){
						$(this).css({transform:'translate3d(0,0,0)',position:'absolute',top:'auto',bottom:0,left:0,right:0});
					}
					else{
						ty-=ts;
						ty=Math.min(0,Math.max(winh-bnd1.height-$.catpow.pageTopOffset,ty));
						$(this).css({transform:'translate3d(0,'+ty+'px,0)',position:'fixed',top:$.catpow.pageTopOffset + 'px',bottom:'auto',left:bnd2.left,right:winw-bnd2.right});

					}
				});
				window.requestAnimationFrame($control.update);
			};
			$control.init();
			return this;
		},
		cp_parallax:function(){
			var $tgt=$(this);
			$tgt.css({overflow:'hidden'}).children().css({position:'absolute'});
			window.addEventListener('load',function(){
				if($tgt.css('position')==='static'){$tgt.css('position','relative');}
			});
			$tgt.tick=function(){
				var winh=document.documentElement.clientHeight;
				$tgt.each(function(){
					var bnd=this.getBoundingClientRect();
					var tgth=bnd.height;
					if(bnd.top > winh || bnd.top + tgth < 0){return;}
					var p1=bnd.top/(winh-tgth);
					var p2=(bnd.top+tgth)/(winh+tgth);
					$(this).children().each(function(){
						var chlh=this.getBoundingClientRect().height;
						if(tgth > chlh ^ chlh > winh){
							$(this).css({transform:this.orgTransform+'translate3d(0,'+(tgth-(tgth+chlh)*p2)+'px,0)'})
						}
						else{
							$(this).css({transform:this.orgTransform+'translate3d(0,'+((tgth-chlh)*p1)+'px,0)'})
						}
					});
				});
				window.requestAnimationFrame($tgt.tick);
			};
			$tgt.each(function(){
				$(this).children().each(function(){
					this.orgTransform=$(this).css('transform');
					if(this.orgTransform=='none'){this.orgTransform='';}
					else{this.orgTransform+=' ';}
				});
			});
			$tgt.tick();
			return $tgt;
		},
		cp_scrollspy:function(thr){
			if(thr===undefined){
				$(this).each(function(){
					$(this).cp_scrollspy($(this));
				});
			}
			var $tgt=$(this);
			if(thr instanceof jQuery){
				var wh,wc,bnd,t,b,rmv,add;
				thr=thr.get(0);
				$(window).on('load resize',function(){
					wh=$(this).height();
					wc=wh/2;
				});
				$(window).on('load scroll',function(){
					bnd=thr.getBoundingClientRect();
					t=bnd.top;
					b=bnd.bottom;
					rmv='';
					add='scrollspy';	
					if(t<wh && b>0){
						add+=' visible';
						if(t>0 && b<wh){add+=' apear';}else{rmv+=' apear';}
						if(t<0 && b>wh){add+=' filled';}else{rmv+=' filled';}
						if(t<wc && b>wc){add+=' active';}else{rmv+=' active';}
					}else{
						rmv='visible apear filled active';
					}
					if(t<0 && b>0){add+=' lead';}else{rmv+=' lead';}
					if(b<wh){add+=' complete';}else{rmv+=' complete';}
					if(t<wc){add+=' actived';}else{rmv+=' actived';}
					if(t+b>wh){add+=' upper';rmv+=' below';}else{add+=' below';rmv+=' upper';}
					$tgt.addClass(add).removeClass(rmv);
				});
			}else{
				var crr=0;
				$(window).scroll(function(){
					var s=$(this).scrollTop();
					var n=0;
					for(var t in thr){
						if(s<t){break;}
						n=t;
					}
					if(crr!==n){
						$tgt.removeClass(thr[crr]).addClass(thr[n]);
						crr=n;
					}
				});
			}
			return this;
		},
		cp_class_control:function($tgt,prm){
			var conf,$thumb,$control,$images,$contents,$dots,crr;
			if(prm===undefined){prm={};}
			if(!$tgt){
				if($(this).length>1){
					$(this).each(function(){
						$(this).cp_class_control($tgt,prm);
					});
					return;
				}
				$tgt=$(this).parent();
			}
			$tgt.addClass('init');
			$control=this;
			var prm_default={
				loop:$(this).hasClass('loop'),//繰り返し
				autoplay:$(this).hasClass('autoplay'),//自動再生
				flickable:$(this).hasClass('flickable'),//左右のフリック・ドラッグによる操作の受付
				scrollable:$(this).hasClass('scrollable'),//画面のスクロールによる操作の受付
				stopbyhover:$(this).hasClass('stopbyhover'),//マウスオーバーで一時停止
				closable:$(this).hasClass('closable'),//閉じることができる
				loopItems:$(this).hasClass('loopItems'),//サムネールとアイテムを２回繰り返して配置
				initialSlide:0,//初期表示スライド
				interval:500,//シーン切り替え時の操作無効の時間
				wait:4500,//自動再生有効時のシーン切り替えまでの時間
			};
			conf=$(this).attr('data-config');
			if(conf){prm=$.extend(prm_default,JSON.parse(conf));}
			prm=Object.assign(prm_default,prm);
			crr=-1;
			if($(this).is('.tab')){$thumb=$(this);}
			else{$thumb=$(this).find('.thumb,.thumbnail');}
			$images=$tgt.find('.images').first();
			$contents=$tgt.find('.contents').first();
			if($thumb.length===0){$thumb=$images;}
			$dots=$(this).find('.dots');
			if($dots.length){
				if($dots.children().length===0){$dots.append('<span class="dot"> </span>');}
				while(($images.children().length || $contents.children().length) > $dots.children().length){
					$dots.append($dots.children(':eq(0)').clone());
				}
				$dots.children().on('click',function(){$control.goto($dots.children().index(this));});
			}
			var $inc_tgt=$(this).add($tgt);
			var $prev=$(this).find('.prev');
			var $next=$(this).find('.next');
			var $close=$(this).find('.close');
			var closable=prm.closable || $close.length>0;
			var len=$thumb.children().length;
			var realLen=len;
			var max_n=prm.loopItems?len:Math.floor(len/2);
			var min_n=0-max_n;
			var in_interval=false;
			var by_scroll=false;
			var timer;
			$thumb.children().each(function(i){
				var cls=$(this).attr('data-class')?$(this).attr('data-class'):(($thumb.attr('data-class-prefix')?$thumb.attr('data-class-prefix'):'scene')+i);
				if(!$(this).attr('data-class')){$(this).attr('data-class',cls);}
			});
			if(prm.loopItems){
				$thumb.append($thumb.children().clone());
				if($thumb!==$images){$images.append($images.children().clone());}
				if($contents.length){$contents.append($contents.children().clone());}
				len=$thumb.children().length;
			}
			if(!$thumb.children('.active').length && $close.length===0){$thumb.children().eq(0).addClass('active');}
			$thumb.children().on('click',function(){
				if(closable && $(this).hasClass('active') && $tgt.hasClass('open')){$control.close();}
				else{$control.goto($thumb.children().index(this));}
			});
			$control.goto=function(to){
				this.open();
				if(prm.loop){to=(to+len)%len;}
				else{to=Math.min(Math.max(to,0),len-1);}
				if(to===crr){by_scroll=false;return false;}
				if(in_interval){by_scroll=false;return false;}
				in_interval=true;
				if(!prm.loop){
					if(to===0){$prev.addClass('disable');}
					else{$prev.removeClass('disable');}
					if(to===len-1){$next.addClass('disable');}
					else{$next.removeClass('disable');}
				}
				var $crr_thumb=$thumb.children().eq(crr);
				var $to_thumb=$thumb.children().eq(to);
				if($crr_thumb.attr('data-class')){
					$tgt.removeClass($crr_thumb.attr('data-class'));
				}
				else if($thumb.attr('data-class-prefix')){
					$tgt.removeClass($thumb.attr('data-class-prefix')+crr);
				}
				else{
					$tgt.removeClass('scene'+crr);
				}
				if($to_thumb.attr('data-class')){
					$tgt.addClass($to_thumb.attr('data-class'));
				}
				else if($thumb.attr('data-class-prefix')){
					$tgt.addClass($thumb.attr('data-class-prefix')+to);
				}
				else{
					$tgt.addClass('scene'+to);
				}
				$thumb.children().each(function(i){
					var cls;
					var n=i-to;
					var prev_n=i-crr;
					if(prm.loop){
						if(n>max_n){n-=len;}
						if(n<min_n){n+=len;}
						if(prev_n>max_n){prev_n-=len;}
						if(prev_n<min_n){prev_n+=len;}
					}
					if(n<0){cls='before';}
					else if(n>0){cls='after';}
					else{cls='active';}
					$(this).removeClass('thumb'+prev_n+' before after active').addClass(cls+' thumb'+n);
					if($images.length){
						$images.children(':eq('+i+')').removeClass('image'+prev_n+' before after active').addClass(cls+' image'+n);
					}
					if($contents.length){
						$contents.children(':eq('+i+')').removeClass('content'+prev_n+' before after active').addClass(cls+' content'+n);
					}
				});
				if($dots.length){
					$dots.children().removeClass('active').eq(to%realLen).addClass('active');
				}
				if(prm.scrollable && by_scroll===false){
					$('body,html').animate({scrollTop:($(document).height()-$(window).innerHeight())/len*(to+0.5)},500);
				}
				$('image0 img[data-src]',$images).each(function(){
					$(this).attr('src',$(this).attr('data-src'));
				});
				setTimeout(function(){in_interval=false;},prm.interval);
				crr=to;
				by_scroll=false;
			};
			$control.pause=function(){if(prm.autoplay){$control.stop();}};
			$control.resume=function(){if(prm.autoplay){$control.play();}};
			$control.stop=function(){if(timer){clearInterval(timer);}};
			$control.play=function(){$control.stop();timer=setInterval(function(){$control.next();},prm.interval+prm.wait);};
			$control.close=function(){
				$inc_tgt.addClass('close').removeClass('open');$control.pause();
			};
			$control.open=function(){
				$inc_tgt.removeClass('close').addClass('open');$control.resume();
			};
			$control.prev=function(){$control.goto(crr-1);};
			$control.next=function(){$control.goto(crr+1);};
			$prev.on('click touchend',$control.prev);
			$next.on('click touchend',$control.next);
			$close.on('click touchend',$control.close);
			if(prm.autoplay){
				$control.play();
			}
			if(prm.stopbyhover){
				$inc_tgt.mouseover($control.pause);
				$inc_tgt.mouseout($control.play);
			}
			if(prm.flickable){
				var org_x,is_flicking;
				$tgt.on('mousedown touchstart',function(e){
					if(e.type==='touchstart'){e=event.changedTouches[0];}
					is_flicking=true;
					org_x=e.clientX;
					setTimeout(function(){is_flicking=false;},1000);
				});
				$tgt.on('mouseup touchend',function(){is_flicking=false;});
				$tgt.on('mousemove touchmove',function(e){
					if(is_flicking){
						if(e.type==='touchmove'){e=event.changedTouches[0];}
						var s=e.clientX-org_x;
						if(s<-50){
							event.preventDefault();
							org_x=e.clientX;
							$control.goto(crr+1);
							is_flicking=false;
						}else if(s>50){
							event.preventDefault();
							org_x=e.clientX;
							$control.goto(crr-1);
							is_flicking=false;
						}
					}
				});
			}
			if(prm.scrollable){
				$(document).on('wheel,mousewheel,DOMMouseScroll,touchmove',function(e){if(in_interval){e.preventDefault();}});
				$(window).scroll(function(){
					by_scroll=true;
					$control.goto(Math.floor(len*$(window).scrollTop()/($(document).height()-$(window).innerHeight())));
				});
			}
			if(prm.initialSlide){$control.goto(prm.initialSlide);}
			else{$control.goto($thumb.children().index($thumb.children('.active')));}
			if(closable){$control.close();}
			setTimeout(function(){$tgt.removeClass('init');},1);
			return $control;
		},
		cp_scrollcallback:function(fnc){
			$(this).each(function(){
				var $tgt=$(this);
				$tgt.cp_scrollprogress_callback=fnc;
				$(window).on('resize load',function(){$tgt.cp_scrollprogress_origin=$tgt.offset().top+$tgt.outerHeight()*0.5-$(this).height()*0.5;});
				$(window).on('scroll load',function(){$tgt.cp_scrollprogress_callback($(this).scrollTop()-$tgt.cp_scrollprogress_origin);});
			});
		},
		cp_hashscroll:function(){
			var $hash_links=[];
			var s,prev_s;
			
			var cb=function(el){
				var $hash_link=$(el);
				$hash_link.tgt=$(el.hash);
				$hash_link.off('.hashscroll');
				$hash_link.on('click.hashscroll',function(){
					if($hash_link.tgt.length){
						$hash_link.tgt.trigger('expect');
						$('body,html').animate({scrollTop:$hash_link.tgt.offset().top - $.catpow.pageTopOffset},500);
					}
					else{
						$('body,html').animate({scrollTop:0},500);
					}
					return false;
				});
				$hash_links.push($hash_link);
			};
			var o=new MutationObserver(function(mutations){
				mutations.map(function(mutation){
					mutation.addedNodes.forEach(function(node){
						if(node.nodeType===1){
							node.querySelectorAll("a[href^='#']").forEach(cb);
						}
					});
				});
			});
			o.observe(this.get(0),{childList:true,subtree:true});
			$(this).each(function(){
				this.querySelectorAll("a[href^='#']").forEach(cb);
			});
			setInterval(function(){
				s=$(window).scrollTop();
				if(s!==prev_s){
					$.each($hash_links,function($i,$hash_link){
						if($hash_link.tgt.length < 1){return;}
						var bnd=$hash_link.tgt.get(0).getBoundingClientRect();
						if(bnd.top<$.catpow.pageTopOffset && bnd.bottom>$.catpow.pageTopOffset){
							$hash_link.addClass('active');$hash_link.tgt.addClass('active');
						}
						else{$hash_link.removeClass('active');$hash_link.tgt.removeClass('active');}
					});
					prev_s=s;
				}
			},200);
			return this;
		},
		cp_article_nav:function($article){
			if($article===undefined){
				$article=$(this).closest(':has(article,section)');
			}
			var $nav=$(this);
			var $root_ul=$('<ul class="index"></ul>').appendTo($nav);
			var path=[];
			var all_li=[];
			$('article,section',$article).each(function(){
				var $li=$('<li class="item"><h3 class="label">'+$(':header:eq(0)',this).first().text()+'</h3></li>');
				$li.article=$(this);
				if(this.dataset.icon){
					$li.addClass('hasIcon');
					$('h3',$li).prepend('<img class="icon" src="'+this.dataset.icon+'"/>');
				}
				$li.find('h3').on('click',function(){
					$li.article.trigger('expect');
					$('body,html').animate({scrollTop:parseInt($li.article.offset().top) - $.catpow.pageTopOffset +10});
				});
				if(path[0] && $.contains(path[0].article.get(0),$li.article.get(0))){
					$li.ul=$('<ul class="sub"></ul>').appendTo(path[0]);
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
					if(bnd.top<$.catpow.pageTopOffset && bnd.bottom>$.catpow.pageTopOffset){$li.addClass('active');}
					else{$li.removeClass('active');}
				});
			};
			$(window).on('resize',function(){$nav.init();});
			$(window).on('scroll',function(){$nav.update();});
			$nav.init();
			return $nav;
		}
	});
})(jQuery);

jQuery(function($){
	$('.scrollfix').cp_scrollfix();
	$('.parallax').cp_parallax();
	$('.scrollspy').cp_scrollspy();
	$('.slider .controls').cp_class_control();
	$('.tabs .tab').cp_class_control();
	$('body').cp_hashscroll();
	$('.article_nav').cp_article_nav();
});
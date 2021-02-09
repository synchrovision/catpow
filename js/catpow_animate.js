(function($){
	$.fn.extend({
		//親要素内でスクロールフィックス、offset値だけ上にマージンをとる
		cp_scrollfix:function(offset){
			var offsetObject;
			offset=offset?offset:0;
			if(offset instanceof jQuery){offsetObject=offset.get(0);}
			else if(offset instanceof HTMLElement){offsetObject=offset;}
			var $parent=$(this).parent(),$control=$(this),$window=$(window);
			var s=$window.scrollTop(),ts=0,ty=0,winh;
			$control.init=function(){
				if($parent.css('position')==='static'){$parent.css({"position":"relative"});}
				$(this).css({position:'static',width:'auto'});
				$(this).width($(this).width());
				$control.update();
			}
			$control.update=function(){
				winh=window.innerHeight;
				ts=$window.scrollTop()-s;
				s=$window.scrollTop();
				if(offsetObject){offset=offsetObject.getBoundingClientRect().bottom;}
				$control.each(function(){
					var bnd1=this.getBoundingClientRect();
					var bnd2=this.parentNode.getBoundingClientRect();
					if(bnd2.top>offset){
						$(this).css({transform:'translate3d(0,0,0)',position:'absolute',top:0,bottom:'auto'});
					}
					else if(bnd2.top+bnd2.height<offset+bnd1.height){
						$(this).css({transform:'translate3d(0,0,0)',position:'absolute',top:'auto',bottom:0});
					}
					else{
						ty-=ts;
						ty=Math.min(0,Math.max(winh-bnd1.height,ty));
						$(this).css({transform:'translate3d(0,'+ty+'px,0)',position:'fixed',top:offset + 'px',bottom:'auto'});

					}
				});
			};
			$(window).scroll(function(){$control.update();});
			$(window).resize(function(){$control.init();});
			$control.init();
			return this;
		},
		//子要素を自身のサイズと表示位置にあわせてスクロールさせる
		cp_parallax:function(){
			var $tgt=$(this);
			$tgt.css({overflow:'hidden'}).children().css({position:'absolute'});
			if($tgt.css('position')==='static'){$tgt.css('position','relative');}
			$tgt.update=function(){
				var winh=window.innerHeight;
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
			};
			$tgt.each(function(){
				$(this).children().each(function(){
					this.orgTransform=$(this).css('transform');
					if(this.orgTransform=='none'){this.orgTransform='';}
					else{this.orgTransform+=' ';}
				});
			});
			$(window).scroll(function(){$tgt.update();});
			$tgt.update();
			return $tgt;
		},
		//thrのキー値を閾値、値をclassとしてclassを付加
		//thrがjQueryオブジェクトならば
		//オブジェクトが一部でも画面に入っている=visible
		//オブジェクト全体が画面に入っている＝appear
		//オブジェクトが画面を占有している=filled
		//オブジェクトが画面中央に入っている=active
		//オブジェクトが画面上部に入っている=lead
		//オブジェクト下部が画面下部より上にある=complete
		//オブジェクト上部が画面中央より上にある=actived
		//オブジェクトの中央が画面中央より下にある=below
		//オブジェクトの中央が画面中央より上にある=upper
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
		//子要素をクラス名(prev,next,thumb)に応じて$tgtにクラスを付加するコントロールにする
		//.tabの場合は自身が.thumbの役割を担う
		//$tgtが空なら親要素を$tgtとする
		//.thumbの子要素にdata-classがあればそのクラスを
		//.thumbにdata-class-prefixがあればその連番、なければsceneの連番を付与
		//.thumbの子要素にはactiveクラスが付加される
		//.prev .nextはそれぞれ最初と最後のクラスで.disableが付加される
		//最初のクラス付与までは$tgtに.initが付加される
		//prmにはautoplay,flickable,scrollableのフラグとinterval,waitを指定
		cp_class_control:function($tgt,prm){
			var conf,$thumb,$control,$images,$dots,crr;
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
			$images=$tgt.find('.images,.contents').first();
			if($thumb.length===0){$thumb=$images;}
			$dots=$(this).find('.dots');
			if($dots.length){
				if($dots.children().length===0){$dots.append('<span class="dot"> </span>');}
				while($images.children().length > $dots.children().length){
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
		//画面に対してのオブジェクトの位置を
		//真ん中に来た時を0として
		//進捗率を引数として関数を実行する
		cp_scrollcallback:function(fnc){
			$(this).each(function(){
				var $tgt=$(this);
				$tgt.cp_scrollprogress_callback=fnc;
				$(window).on('resize load',function(){$tgt.cp_scrollprogress_origin=$tgt.offset().top+$tgt.outerHeight()*0.5-$(this).height()*0.5;});
				$(window).on('scroll load',function(){$tgt.cp_scrollprogress_callback($(this).scrollTop()-$tgt.cp_scrollprogress_origin);});
			});
		},
		//ハッシュリンクをスクロールにして、現在のスクロール位置に当たるリンクと対象要素にactiveクラスを付加する
		cp_hashscroll:function(mgn){
			mgn=mgn?mgn:0;
			var $hash_links=[];
			var s,prev_s;

			$(this).find("a[href^='#']").each(function(){
				var $hash_link=$(this);
				$hash_link.tgt=$(this.hash);
				$hash_link.click(function(){
					if($hash_link.tgt.length){
						$hash_link.tgt.trigger('expect');
						$('body,html').animate({scrollTop:$hash_link.tgt.offset().top-mgn},500);
					}
					else{
						$('body,html').animate({scrollTop:0},500);
					}
					return false;
				});
				$hash_links.push($hash_link);
			});
			setInterval(function(){
				s=$(window).scrollTop();
				if(s!==prev_s){
					$.each($hash_links,function($i,$hash_link){
						if($hash_link.tgt.length < 1){return;}
						var bnd=$hash_link.tgt.get(0).getBoundingClientRect();
						if(bnd.top<mgn && bnd.bottom>mgn){
							$hash_link.addClass('active');$hash_link.tgt.addClass('active');
						}
						else{$hash_link.removeClass('active');$hash_link.tgt.removeClass('active');}
					});
					prev_s=s;
				}
			},200);
			return this;
		}
	});
})(jQuery);


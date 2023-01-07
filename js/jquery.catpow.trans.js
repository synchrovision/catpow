(function($){$.fn.extend({
	//子孫要素をクラス名に応じてレイアウト
	//例1:ap_20_100=position:absolute;top:20px;left:100px;
	//例2:rp_20_100_br=position:relative;bottom:20px;right:100px;
	//例3:w_100=width:100px;
	//例4:h_200=height:200px;
	cp_layout:function(){
		$(this).find('[class^="ap_"],[class^="rp_"],[class^="w_"],[class^="h_"]').each(function(){
			if($(this).attr('class')!=null){
				var cls_arr=$(this).attr('class').split(' ');
				for(var i in cls_arr){
					var prm=cls_arr[i].split('_');
					if(prm.length<2)continue;
					if(prm[0]=='ap' || prm[0]=='rp'){
						if(prm[0]=='ap')$(this).css({'position':'absolute'});
						if(prm[0]=='rp')$(this).css({'position':'relative'});
						$(this).css({top:prm[1],left:prm[2]});
					}
					if(prm[0]=='w'){$(this).width(prm[1]);}
					if(prm[0]=='h'){$(this).height(prm[1]);}
				}
			}
		});
	},
	
	//子要素をクラス名に応じてトランジション
	//例1：fadein_1000_3000=１秒後に３秒かけてフェードインする
	//例2：slidein_200_-100_500_3000=左200px上-100pxから0.5秒後に３秒かけて移動して現在の位置に戻る
	//例3：zoomin_50_500_3000=50%から0.5秒後に３秒かけて100%の大きさに戻る
	//例4：rotatein_Z_60_500_3000=z軸60°から0.5秒後に３秒かけて0°に戻る
	cp_trans_in:function(complete){
		$(this).show();
		var $tgt=$(this);
		var max_dur=0;
		var cnt=0;
		var try_complete=function(){if(cnt--==0){if(complete)complete($tgt);}}
		$(this).children ().each(function(){
			if($(this).attr('class')!=null){
				var cls_arr=$(this).attr('class').split(' '),from,to,i,prm;
				if(cls_arr.some(function(v){return v=='transchildren'})){cnt++;$(this).cp_trans_in(try_complete);}
				for(i in cls_arr){
					prm=cls_arr[i].split('_');
					if(prm.length<2)continue;
					if(prm[0]=='fadein' || prm[0]=='fade'){
						prm[3]=prm[3]?prm[3]:'linear';
						max_dur=Math.max(max_dur,parseInt(prm[1])+parseInt(prm[2]));
						$(this).css({'opacity':0});
						$(this).stop().animate({'t':100},parseInt(prm[1]),'linear',function(){$(this).animate({'opacity':1},parseInt(prm[2]),prm[3],try_complete);});
						cnt++;
						break;
					}
					if(prm[0]=='slidein' || prm[0]=='fadeslidein' || prm[0]=='slide' || prm[0]=='fadeslide'){
						prm[5]=prm[5]?prm[5]:'swing';
						max_dur=Math.max(max_dur,parseInt(prm[3])+parseInt(prm[4]));
						from={'s':0};
						to={'s':1};
						$(this).css(from);
						$(this).css('transform','translate('+parseInt(prm[1])+'px,'+parseInt(prm[2])+')');
						if(prm[0]=='fadeslidein' || prm[0]=='fadeslide'){$(this).css('opacity',0);}
						$(this).stop().animate({'t':100},parseInt(prm[3]),'linear',function(){$(this).animate(to,{
							'duration':parseInt(prm[4]),
							'easing':prm[5],
							'step':function(s){
								if(prm[0]=='fadeslidein' || prm[0]=='fadeslide'){$(this).css('opacity',s);}
								$(this).css('transform','translate('+parseInt(prm[1]*(1-s))+'px,'+parseInt(prm[2]*(1-s))+'px)');
							},
							'complete':function(){
								$(this).css('s',0);
								try_complete();
							}
						});});
						cnt++;
						break;
					}
					if(prm[0]=='zoomin' || prm[0]=='fadezoomin' || prm[0]=='zoom' || prm[0]=='fadezoom'){
						prm[4]=prm[4]?prm[4]:'swing';
						max_dur=Math.max(max_dur,parseInt(prm[2])+parseInt(prm[3]));
						from={'s':0};
						to={'s':1};
						var stp=(prm[1]-100)/100;
						$(this).css(from);
						$(this).css('transform','scale('+parseInt(prm[1])/100+')');
						if(prm[0]=='fadezoomin' || prm[0]=='fadezoom'){$(this).css('opacity',0);}
						$(this).stop().animate({'t':100},parseInt(prm[2]),'linear',function(){$(this).animate(to,{
							'duration':parseInt(prm[3]),
							'easing':prm[4],
							'step':function(s){
								if(prm[0]=='fadezoomin' || prm[0]=='fadezoom'){$(this).css('opacity',s);}
								$(this).css('transform','scale('+(1+(1-s)*stp)+')');
							},
							'complete':function(){
								$(this).css('s',0);
								try_complete();
							}
						});});
						cnt++;
						break;
					}
					if(prm[0]=='rotatein' || prm[0]=='faderotatein' || prm[0]=='rotate' || prm[0]=='faderotate'){
						prm[5]=prm[5]?prm[5]:'swing';
						max_dur=Math.max(max_dur,parseInt(prm[3])+parseInt(prm[4]));
						from={'s':0};
						to={'s':1};
						$(this).css(from);
						$(this).css('transform','rotate'+prm[1]+'('+parseInt(prm[2])+'deg)');
						if(prm[0]=='faderotatein'){$(this).css('opacity',1);}
						$(this).stop().animate({'t':100},parseInt(prm[3]),'linear',function(){$(this).animate(to,{
							'duration':parseInt(prm[4]),
							'easing':prm[5],
							'step':function(s){
								if(prm[0]=='faderotatein' || prm[0]=='faderotate'){$(this).css('opacity',s);}
								$(this).css('transform','rotate'+prm[1]+'('+(1-s)*parseInt(prm[2])+'deg)');
							},
							'complete':function(){
								$(this).css('s',0);
								try_complete();
							}
						});});
						cnt++;
						break;
					}
				}
			}
		});
		try_complete();
		return $(this);
	},
	cp_trans_out:function(complete){
		$(this).show();
		var $tgt=$(this);
		var max_dur=0;
		var cnt=0;
		var try_complete=function(){if(cnt--==0){if(complete)complete($tgt);}}
		$(this).children ().each(function(){
			if($(this).attr('class')!=null){
				var cls_arr=$(this).attr('class').split(' '),from,to,i,prm;
				if(cls_arr.some(function(v){return v=='transchildren'})){cnt++;$(this).cp_trans_out(try_complete);}
				for(i in cls_arr){
					prm=cls_arr[i].split('_');
					if(prm.length<2)continue;
					if(prm[0]=='fadeout' || prm[0]=='fade'){
						prm[3]=prm[3]?prm[3]:'linear';
						max_dur=Math.max(max_dur,parseInt(prm[1])+parseInt(prm[2]));
						$(this).css({'opacity':1});
						$(this).stop().animate({'t':100},parseInt(prm[1]),'linear',function(){$(this).animate({'opacity':0},parseInt(prm[2]),prm[3],try_complete);});
						cnt++;
						break;
					}
					if(prm[0]=='slideout' || prm[0]=='fadeslideout' || prm[0]=='slide' || prm[0]=='fadeslide'){
						prm[5]=prm[5]?prm[5]:'swing';
						max_dur=Math.max(max_dur,parseInt(prm[3])+parseInt(prm[4]));
						from={'s':0};
						to={'s':1};
						$(this).css(from);
						$(this).css('transform','translate(0px,0px)');
						if(prm[0]=='fadeslideout' || prm[0]=='fadeslide'){$(this).css('opacity',1);}
						$(this).stop().animate({'t':100},parseInt(prm[3]),'linear',function(){$(this).animate(to,{
							'duration':parseInt(prm[4]),
							'easing':prm[5],
							'step':function(s){
								if(prm[0]=='fadeslideout' || prm[0]=='fadeslide'){$(this).css('opacity',1-s);}
								$(this).css('transform','translate('+parseInt(prm[1]*s)+'px,'+parseInt(prm[2]*s)+'px)');
							},
							'complete':function(){
								$(this).css('s',1);
								try_complete();
							}
						});});
						cnt++;
						break;
					}
					if(prm[0]=='zoomout' || prm[0]=='fadezoomout' || prm[0]=='zoom' || prm[0]=='fadezoom'){
						prm[4]=prm[4]?prm[4]:'swing';
						max_dur=Math.max(max_dur,parseInt(prm[2])+parseInt(prm[3]));
						from={'s':0};
						to={'s':1};
						var stp=(prm[1]-100)/100;
						$(this).css(from);
						$(this).css('transform','scale(1)');
						if(prm[0]=='fadezoomout' || prm[0]=='fadezoom'){$(this).css('opacity',1);}
						$(this).stop().animate({'t':100},parseInt(prm[2]),'linear',function(){$(this).animate(to,{
							'duration':parseInt(prm[3]),
							'easing':prm[4],
							'step':function(s){
								if(prm[0]=='fadezoomout' || prm[0]=='fadezoom'){$(this).css('opacity',1-s);}
								$(this).css('transform','scale('+(1+s*stp)+')');
							},
							'complete':function(){
								$(this).css('s',1);
								try_complete();
							}
						});});
						cnt++;
						break;
					}
					if(prm[0]=='rotateout' || prm[0]=='faderotateout' || prm[0]=='rotate' || prm[0]=='faderotate'){
						prm[5]=prm[5]?prm[5]:'swing';
						max_dur=Math.max(max_dur,parseInt(prm[3])+parseInt(prm[4]));
						from={'s':0};
						to={'s':1};
						$(this).css(from);
						$(this).css('transform','rotate(0deg)');
						if(prm[0]=='faderotateout' || prm[0]=='faderotate'){$(this).css('opacity',1);}
						$(this).stop().animate({'t':100},parseInt(prm[3]),'linear',function(){$(this).animate(to,{
							'duration':parseInt(prm[4]),
							'easing':prm[5],
							'step':function(s){
								if(prm[0]=='faderotateout' || prm[0]=='faderotate'){$(this).css('opacity',1-s);}
								$(this).css('transform','rotate'+prm[1]+'('+s*parseInt(prm[2])+'deg)');
							},
							'complete':function(){
								$(this).css('s',1);
								try_complete();
							}
						});});
						cnt++;
						break;
					}
				}
			}
		});
		try_complete();
		return $(this);
	},
	cp_trans_out_immediate:function(complete){
		$(this).children ().each(function(){
			if($(this).attr('class')!=null){
				var cls_arr=$(this).attr('class').split(' ');
				if(cls_arr.some(function(v){return v=='transchildren'})){$(this).cp_trans_out_immediate();}
				for(var i in cls_arr){
					var prm=cls_arr[i].split('_');
					if(prm.length<2)continue;
					if(prm[0]=='fadeout' || prm[0]=='fade'){$(this).css({'opacity':0});break;}
					if(prm[0]=='slideout' || prm[0]=='fadeslideout' || prm[0]=='slide' || prm[0]=='fadeslide'){
						$(this).css('transform','translate('+prm[1]+'px,'+prm[2]+'px)');
						if(prm[0]=='fadeslideout' || prm[0]=='fadeslide'){$(this).css('opacity',0);}
						break;
					}
					if(prm[0]=='zoomout' || prm[0]=='fadezoomout' || prm[0]=='zoom' || prm[0]=='fadezoom'){
						$(this).css('transform','scale('+(prm[1]/100)+')');
						if(prm[0]=='fadezoomout' || prm[0]=='fadezoom'){$(this).css('opacity',0);}
						break;
					}
					if(prm[0]=='rotateout' || prm[0]=='faderotateout' || prm[0]=='rotate' || prm[0]=='faderotate'){
						$(this).css('transform','rotate('+prm[1]+'deg)');
						if(prm[0]=='faderotateout' || prm[0]=='faderotate'){$(this).css('opacity',0);}
						break;
					}
				}
			}
		});
		if(complete)complete($(this));
		return $(this);
	},
	//子要素をクラス名に応じて$tgtの子要素を順番にcp_trans_[in|out]するコントロールにする
	//またintervalミリ秒間隔で自動で$tgtの表示を次に送る、空なら自動送りしない
	//prev,next,thum
	cp_trans_control:function($tgt,interval){
		var len=$tgt.children().length;
		var crr=0;
		var phase=2;
		var $thumb=$(this).find('.thumb');
		$tgt.children(':gt(0)').hide();
		$tgt.children().eq(0).cp_trans_in(function(){phase=0;});
		if($thumb.children().length==1){
			while($thumb.children().length<len){
				$thumb.children().eq(0).clone().appendTo($thumb);
			}
		}
		$thumb.children().eq(0).addClass('active');
		$thumb.children().click(function(){goto($thumb.children().index(this));});
		var goto=function(to){
			if(phase==0){
				to=(to+len)%len;
				if(to==crr)return;
				phase=1;
				$tgt.children().eq(crr).cp_trans_out(function(){
					phase=2;
					$tgt.children().eq(crr).hide();
					$tgt.children().eq(to).show().cp_trans_in(function(){phase=0;});
					$thumb.children().removeClass('active').eq(to).addClass('active');
					crr=to;
				});
			}
		}
		$(this).find('.prev').click(function(){goto(crr-1);});
		$(this).find('.next').click(function(){goto(crr+1);});
		if(interval){
			var timer=setInterval(function(){goto(crr+1);},interval);
			$tgt.mouseover(function(){clearInterval(timer);});
			$tgt.mouseout(function(){clearInterval(timer);timer=setInterval(function(){goto(crr+1);},interval);});
			$(this).mouseover(function(){clearInterval(timer);});
			$(this).mouseout(function(){clearInterval(timer);timer=setInterval(function(){goto(crr+1);},interval);});
		}
	},
	//マウスオーバーに応じてcp_trans_[in|out]する
	cp_hover_trans:function(fnc1,fnc2){
		var $tgt=$(this);
		$tgt.cp_trans_out_immediate(fnc2);
		$tgt.hover(function(){
			$(this).cp_trans_in(fnc1);
		},function(){
			$(this).cp_trans_out(fnc2);
		});
		return $(this);
	},
	//画面の底辺を境界にスクロールに応じてcp_trans_[in|out]する
	cp_scroll_trans:function(fnc1,fnc2,$cnt){
		var $tgt=$(this);
		var bps=[];
		if(!$cnt)$cnt=$(window);
		$tgt.each(function(){
			bps.push([$(this).offset().top,$(this).offset().top+$(this).height(),true]);
		});
		$tgt.children().each(function(){
			if($(this).css('position')=='static')$(this).css('position','relative');
		});
		$cnt.scroll(function(){
			var b1=$cnt.scrollTop()+$cnt.height();
			$.each(bps,function(i,bp){
				if(bp[1]<b1){
					if(!bp[2]){bp[2]=true;$tgt.eq(i).cp_trans_in(fnc1);}
				}else{
					if(bp[2]){bp[2]=false;$tgt.eq(i).cp_trans_out(fnc2);}
				}
			});
		});
		$(window).resize(function(){
			bps=[];
			$tgt.each(function(){
				bps.push([$(this).offset().top,$(this).offset().top+$(this).height(),true]);
			});
		});
		(function update(){
			var b1=$cnt.scrollTop()+$cnt.height();
			$.each(bps,function(i,bp){
				if(bp[1]<b1){
					if(!bp[2]){bp[2]=true;$tgt.eq(i).cp_trans_in(fnc1);}
				}else{
					if(bp[2]){bp[2]=false;$tgt.eq(i).cp_trans_out_immediate(fnc2);}
				}
			});
		})();
		return $(this);
	},
	//子要素の座標でスクロールを区切ってcp_trans_[in|out]する
	cp_scene_trans:function(){
		var $tgt=$(this);
		var bps=[];
		var crr=0;
		var phase=0;
		var len=$tgt.children().length;
		$tgt.children().each(function(){
			bps.push($(this).offset().top);
			if($(this).css('position')=='static')$(this).css('position','relative');
			$(this).cp_trans_out_immediate();
		});
		$(window).scroll(function(e){
			e.preventDefault();
			var b=$(window).scrollTop();
			if(b-bps[crr]>50){goto(crr+1);}else if(b-bps[crr]<-50){goto(crr-1);}
			else{$($.browser.webkit?'body':'html').stop().animate({scrollTop:bps[crr]},{easing:'easeOutCubic'});}
		});
		var goto=function(to){
			if(phase==0){
				to=Math.min(Math.max(to,0),len-1);
				if(to==crr){
					$($.browser.webkit?'body':'html').stop().animate({scrollTop:bps[to]});
				}else{
					phase=1;
					$('html,body').stop().animate({scrollTop:bps[to]},{
						complete:function(){
							phase=0;
							$tgt.children().eq(to).cp_trans_in();
							crr=to;
						}
					});
					$tgt.children().eq(crr).cp_trans_out();
				}
			}
		}
		goto(0);
		return $(this);
	},
	//リンクを$tgtのtransout処理が終わってから遷移するようにする
	cp_trans_link:function($tgt){
		$(this).each(function(){
			$(this).click(function(e){
				e.preventDefault();
				var url=$(this).attr('href');
				$tgt.cp_trans_out(function(){
					window.location.href=url;
				});
			});
		});
		return this;
	},
	//トランジション付きでcp_ajax_linkを行う
	//コンテンツ読み込み完了時にready、トランジション終了時にcompleteを実行
	cp_trans_ajax_link:function($tgt,ready,complete){
		$(this).each(function(){
			var url=$(this).attr('href');
			var data_url=url;
			if($(this).attr('data-ajax-url')!=null)data_url=$(this).attr('data-ajax-url');
			$(this).unbind('click.ajax');
			$(this).bind('click.ajax',function(e){
				e.preventDefault();
				$.ajax({
					url:data_url,
					success:function(data){
						window.history.pushState(null,null,url);
						$tgt.cp_trans_out(function(){
							$tgt.html(data);
							$(document).ready(function(){
								ready();
								$tgt.cp_trans_in(complete);
							});
						});
					}
				});
			});
		});
		return this;
	},
	//対象の子要素をスクロールが到達するまで非表示にしimgのsrcをdummyで置き換える
	//スクロールが到達したらその子要素にcp_trans_inを実行しながら表示を復帰する
	cp_trans_lazy_load:function(dummy){
		var $tgt=$(this);
		var cnt=0;
		$tgt.children().hide().find('img').each(function(){
			$(this).attr('data-org-src',$(this).attr('src')).attr('src',dummy);
		});
		$(window).scroll(function(){lazy_load();});
		function lazy_load(){
			if($tgt.length==0)return;
			if($tgt.offset().top+$tgt.height()<=$(window).scrollTop()+$(window).height()){
				$tgt.children().eq(cnt++).show().cp_trans_in().find('img').each(function(){
					$(this).attr('src',$(this).attr('data-org-src'));
				});
				lazy_load();
			}
		}
		lazy_load();
		return $(this);
	}
})})(jQuery);


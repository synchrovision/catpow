/* global cp Catpow*/

jQuery(function($){
	$.catpow.forms=[];
	$('form:has([name="_cp_form_nonce"])').each(function(){
		var $form=$(this);
		cp_form_init($form);
		$.catpow.forms.push($form);
	});
});
function cp_form_init($form){
    var $=jQuery;
    if($form.is('.cp_form')){$form.submit(function(){return false;});}
    $form.on('click','[data-role^="cp_form_submit_"]',function(){
        var param,$tgt;
        switch($(this).attr('data-role')){
            case "cp_form_submit_form":$tgt=$(this).closest('form');break;
            case "cp_form_submit_section":$tgt=$(this).closest('.cp_form_section');break;
            case "cp_form_submit_action":$tgt=$(this);break;
        }
        if(!$(this).attr('data-ignore-message') && $tgt.find('.message.task').length){
            $('html,body').animate({scrollTop:$tgt.find('.message.task').offset().top-100},500);
            throw 'Error message remain';
        }
        $('.cp_form_message .message',$(this).closest('form')).remove();
        if($(this).is('[data-param]')){param=JSON.parse($(this).attr('data-param'));}
        else{param=false;}
        cp_form_submit($tgt,$(this).attr('data-action'),$(this).attr('data-callback'),param);
    });
    $form.on('click','[data-role="cp_form_action_submit_group"] [data-param-value]',function(){
        var $cnt=$(this).closest('[data-role="cp_form_action_submit_group"]');
        var param={};
        param[$cnt.attr('data-param-key')]=$(this).attr('data-param-value');
        cp_form_submit($(this),$cnt.attr('data-action'),$cnt.attr('data-callback'),param);
    });
	
	$form.on('change',function(e){
		var changed_input_name=e.target.name;
		$('[data-watch]',$form).each(function(){
			var $watcher=$(this);
			$.each($watcher.attr('data-watch').split(','),function(i,target_name){
				if(changed_input_name.indexOf(target_name)===0){
					var callback,param;
					if($watcher.is('[data-param]')){param=JSON.parse($watcher.attr('data-param'));}else{param=false;}
					if($watcher.is('[data-callback]')){callback=$watcher.attr('data-callback');}else{callback='replace_item';}
					cp_form_submit($watcher,$watcher.attr('id'),callback,param);
				}
			});
		})
	});
    $form.cp_form_conditioner();
}

function cp_form_get_fd($item){
    var $=jQuery;
    var $form,$sec,fd;
    if($item.is('form')){
        fd=new FormData($item.get(0));
    }
    else{
        $form=$item.closest('form');
		$sec=$item.closest('.cp_form_section')
        fd=new FormData();
        fd.append('action','cp_form');
        fd.append('_cp_form_nonce',$form.find('[name="_cp_form_nonce"]').val());
        fd.append('_wp_http_referer',$form.find('[name="_wp_http_referer"]').val());
        fd.append('cp_form_id',$form.find('[name="cp_form_id"]').val());
        if($sec.length){
			fd.append('cp_form_section_id',$sec.attr('data-section-id'));
		}
		$item.cp_get_fd(fd);
		if($item.is('[data-watch]')){
			var watch_targets=$item.attr('data-watch').split(',');
			watch_targets.map(function(name){$(':input[name^="'+name+'"]',$form).cp_get_fd(fd);});
		}
    }
    return fd;
}
function cp_form_submit($item,action,callback,param){
    var $=jQuery;
    var $form,fd;
    var dfr=new $.Deferred();
    try{
        if($item.is('form')){$form=$item;}
        else{$form=$item.closest('form');}
        fd=cp_form_get_fd($item);
        fd.append('action','cp_form');
        if(action){fd.append('cp_form_action',action);}
        if(param){$.each(param,function(key,val){fd.append(key,val);});}
        var prm={
            url:cp.rest_url+'cp/v1/form/post',
            type:'post',
            data:fd,
            processData:false,
            contentType:false,
			headers:{
				'X-WP-Nonce':cp.wp_rest_nonce
			}
        };
        $('body').addClass('busy_mode');
        $.ajax(prm).done(function(res){
            $('body').removeClass('busy_mode');
            var cbs;
            cbs={};
            if(res.callback){
                if(!Array.isArray(res.callback)){
                    res.callback=res.callback.split(',');
                }
                $.each(res.callback,function(i,cb){
                    if(cb in $.catpow.cp_form.callback){
                        cbs[cb]=$.catpow.cp_form.callback[cb];
                    }
                    else{cbs[cb]=window[cb];}
                });
            }
            else{
				if(!callback){callback='replace'}
                if(typeof callback === 'function'){cbs.callback=callback;}
                else{
                    if(!Array.isArray(callback)){callback=callback.split(',');}
                    $.each(callback,function(cbn,cb){
                        if(typeof cb === 'function'){cbs[cbn]=cb;}
                        else{
                            if(cb in $.catpow.cp_form.callback){
                                cbs[cb]=$.catpow.cp_form.callback[cb];
                            }
                            else{cbs[cb]=window[cb];}
                        }
                    });
                }
            }
            $form.trigger('before_cp_form_callback',res);
			if(res.nonce){
				window.console.log('reset nonce : from '+$('[name="_cp_form_nonce"]',$form).val()+' to '+res.nonce);
				$('[name="_cp_form_nonce"]',$form).val(res.nonce);
			}
            $.each(cbs,function(cbn,cb){
                if(cbn){$form.trigger(new $.Event('before_'+cbn));}
                cb($item,res);
                if(cbn){$form.trigger(new $.Event('after_'+cbn));}
            });
            $form.trigger('after_cp_form_callback',res);
            $form.cp_update();
            dfr.resolve();
        }).fail(function(e,ts,et){
            $('body').removeClass('busy_mode');
            window.console.log('status:'+e.status);
            window.console.log(ts);
            window.console.log(et);
            if(parseInt(e.status)===200){
                window.console.log('data:');
                $.ajax({
                    url:cp.ajax_url,
                    type:'post',
                    dataType:'html',
                    data:fd,
                    processData:false,
                    contentType:false,
                }).done(function(res){
                    window.console.log(res);
                });
            }
            dfr.reject();
        });
    }
	catch(e){
        window.console.log(e);
    }
    return dfr.promise();
}

(function($){
    $.catpow.cp_form={
        callback:{
            message:function($form,data){
                
				var form_id;
				if(!$form.is('form,[data-role="cp_form_section"]')){$form=$form.closest('form,[data-role="cp_form_section"]');}
                if($form.is('form')){form_id=$form.attr('id');}
				else{form_id=$form.attr('data-section-id');}
				var $msgBox=$('[data-role="cp_form_message"][data-form-id="'+form_id+'"]',$form);
                if($msgBox.length===0){
					window.console.error('Messge Box for the form is not exists');
					window.console.error(data);
					return;
				}
				$msgBox.removeClass('has_task').children().remove();
                data.message.forEach(function(msg){
                    if(!msg.class){msg.class='';}
                    var $msg=$('<div class="message '+msg.class+'"><div class="text">'+msg.message+'</div></div>');
					if(msg.selector){
						if($form.is(msg.selector)){
							$tgt=$form;
							$msg.addClass('no_target');
							$msg.appendTo($msgBox);
						}
						else{
							var $tgt=$(msg.selector,$form);
							if($tgt.length===0){
								window.console.error('Invalid input "'+msg.selector+'" was not found in this form');
								window.console.error(msg.message);
								return;
							}
							$msg.addClass('has_target');
							$msg.appendTo($msgBox).cp_cling($tgt);
							$tgt.on('change',function(){$msg.cp_delay_remove();});
						}
					}
                    if($msgBox.find('.task').length){$msgBox.addClass('has_task');}
                });
				$.catpow.cp_cling.tick();
				var $tgt=$('.message',$form).sort(function(a,b){
					return a.getBoundingClientRect().top>b.getBoundingClientRect().top?1:-1;
				});
				var bnd=$tgt.get(0).getBoundingClientRect();
				if(bnd.top<0){
					return $('html,body').animate({scrollTop:$tgt.offset().top-120},500).promise();
				}
				if(bnd.top>window.innerHeight){
					return $('html,body').animate({scrollTop:$tgt.offset().bottom-window.innerHeight+50},500).promise();
				}
                $form.trigger('update');
                return true;
            },
            
            replace:function($form,data){
				var $tgt,sel;
				if(data.target){
					sel='[data-role="cp_form_'+data.target+'"]';
					if(data.target==='section' && data.section_id){
						$form=$form.closest('form');
						sel+='[data-section-id="'+data.section_id+'"]';
					}
					if($form.is('form')){$tgt=$(sel,$form);}
					else{
						switch(data.target){
							case 'content':
							case 'section':
								$tgt=$form.closest(sel);
								break;
							default:
								$form=$form.closest('form,[data-role="cp_form_section"]');
								$tgt=$(sel,$form);
						}
						
					}
				}
				else{
					if($form.is('form')){$tgt=$('[data-role="cp_form_content"]',$form);}
					else{$tgt=$form.closest('[data-role="cp_form_content"],[data-role="cp_form_section"]');}
				}
               
				if(data.deps){
					$.cp_require_styles(data.deps.styles);
					$.cp_require_scripts(data.deps.scripts).done(function(){
						if(data.delay){$tgt.cp_delay_replace(data.html);}
						else{$tgt.html(data.html)}
					});
				}
				else{
					if(data.delay){$tgt.cp_delay_replace(data.html);}
					else{$tgt.html(data.html)}
				}
				$tgt.trigger('replace');
				var bnd=$tgt.get(0).getBoundingClientRect();
				if(bnd.top<0){
					return $('html,body').animate({scrollTop:$tgt.offset().top-120},500).promise();
				}
				if(bnd.bottom>window.innerHeight && bnd.height*2<window.innerHeight){
					return $('html,body').animate({scrollTop:$tgt.offset().bottom-window.innerHeight+50},500).promise();
				}
				if(bnd.top>window.innerHeight){
					return $('html,body').animate({scrollTop:$tgt.offset().top-120},500).promise();
				}
            },
            insert:function($item,data){
				var $form,$tgt;
                $form=$item.closest('form');
				if(data.selector===undefined){$tgt=$item;}
				else{$tgt=$form.cp_find(data.selector);}
				if($tgt.length===0){window.console.error(data.selector+'" was not found in this form');}
				if(data.position===undefined){data.position='before';}
				var $new=$tgt[data.position](data.html);
				$form.trigger('update');
                if(data.scroll)return $('html,body').animate({scrollTop:$new.offset().top-100},500).promise();
            },
            remove:function($form,data){
				var $tgt;
                if(data.section_id){
					$tgt=$('[data-role="cp_form_section"][data-section-id="'+data.section_id+'"]',$form.closest('form'));
                }
				else{
					$tgt=$form.closest('form,[data-role="cp_form_section"]');
				}
				if(data.delay){$tgt.cp_delay_remove();}
				else{$tgt.remove();}
                return true;
            },
            replace_items:function($item,data){
                var $form=$item.closest('form');
                data.items.forEach(function(item){
                    var $tgt=$form.cp_find(item.selector);
                    if($tgt.length===0){
                        window.console.error(item.selector+'" was not found in this form');
                    }
					var $new=$(item.html);
                    $tgt.replaceWith($new);
                });
                $form.trigger('update');
                return true;
            },
            insert_items:function($item,data){
                var $form=$item.closest('form');
                var $tgt;
                data.items.forEach(function(item){
                    if(item.selector===undefined){$tgt=$item;}
                    else{
                        $tgt=$item.cp_find(item.selector);
                    }
                    if($tgt.length===0){
                        window.console.error(item.selector+'" was not found in this form');
                    }
                    if(item.position===undefined){item.position='before';}
                    $tgt[item.position](item.html);
                });
                $form.trigger('update');
                return true;
            },
			
            delay_replace:function($form,data){
				data.delay=true;
                return $.catpow.cp_form.replace($form,data)
            },
            delay_replace_items:function($form,data){
                $form=$form.closest('form');
                var dfr=new $.Deferred();
                var cnt=0;
                data.items.forEach(function(item){
                    var $tgt=$form.find(item.selector).closest('.cp-meta-item');
                    if($tgt.length===0){
                        window.console.log('Item to replace "'+item.selector+'" was not found in this form');
                    }
                    cnt++;
                    $tgt.cp_delay_replace(item.html).done(function(){
                        cnt--;
                        if(cnt<1){dfr.resolve();}
                    });
                });
                return dfr.promise();
            },
            delay_remove:function($form,data){
				data.delay=true;
                return $.catpow.cp_form.remove($form,data)
            },
			
            lightbox:function($item,data){
                var $cnt=$item.find('.cp_lightbox_container');
                var dfr=new $.Deferred();
                if($cnt.length===0){$cnt=$('<div class="cp_lightbox_container"><div class="cp_lightbox_content"></div></div>').appendTo($item);}
				var $body=$('.cp_lightbox_content',$cnt);
				
				if(data.deps){
					$.cp_require_styles(data.deps.styles);
					$.cp_require_scripts(data.deps.scripts).done(function(){
						$body.html(data.html).trigger('replace');
						setTimeout(function(){$cnt.cp_activate();},1);
						setTimeout(function(){dfr.resolve();},1000);
					});
				}
				else{
					$body.html(data.html).trigger('replace');
					setTimeout(function(){$cnt.cp_activate();},1);
					setTimeout(function(){dfr.resolve();},1000);
				}
                return dfr.promise();
            },
            lightbox_close:function($item){
                var $cnt=$item.find('.cp_lightbox_container');
                var dfr=new $.Deferred();
				var $body=$('.cp_lightbox_content',$cnt);
                $cnt.cp_inactivate();
                setTimeout(function(){$body.html('');dfr.resolve();},1000);
                return dfr.promise();
            },
            exlightbox:function($item,data){
                var $cnt=$('#cp_exlightbox.cp_lightbox_container');
                var dfr=new $.Deferred();
                if($cnt.length===0){
                    $cnt=$('<div id="cp_exlightbox" class="cp_lightbox_container"><div class="cp_lightbox_content"></div></div>').appendTo('.site_main .page_main .content');
                }
                $cnt.find('.cp_lightbox_content').html(data.html).trigger('replace');
                setTimeout(function(){$cnt.cp_activate();},1);
                setTimeout(function(){dfr.resolve();},1000);
                return dfr.promise();
            },
            exlightbox_close:function(){
                var dfr=new $.Deferred();
                $('#cp_exlightbox.cp_lightbox_container').cp_inactivate();
                setTimeout(function(){dfr.resolve();},1000);
                return dfr.promise();
            },
			
            feed:function($form,data){
                $form=$form.closest('form');
                data.message.forEach(function(msg){
                    $form.find(msg.selector).addClass('has_message '+msg.class).after('<span class="message '+msg.class+'">'+msg.message+'</span>');
                });
                $form.trigger('update');
                return true;
            },
            redirect:function($form,data){
                location.href=data.url;
                return true;
            },
            reload:function(){
                location.reload();
                return true;
            },
            download:function($form,data){
				return Catpow.util.download(data.html,data.name,data.type);
            },

            submit_again:function($item,data){
                var prm;
                if(data.submit===undefined){prm={delay:1000,action:'action'};}
                else{prm=data.submit;}
                if(prm.delay===undefined){
                    return cp_form_submit($item,prm.action,prm.callback,prm.param);
                }
                else{
                    var dfr=new $.Deferred();
                    setTimeout(function(){
                        cp_form_submit($item,prm.action,prm.callback,prm.param).done(function(){
                            dfr.resolve();
                        });
                    },prm.delay);
                    return dfr.promise();
                }
            },

            ticker:function($item,data){
                var fd,prm,dfr;
                dfr=new $.Deferred();
                fd=cp_form_get_fd($item);
                fd.append('cp_thread[path]',data.thread.path);
                fd.append('cp_thread[id]',data.tread.id);
                $item.on('change',function(){
                    fd=cp_form_get_fd($item);
                    fd.append('cp_thread[path]',data.thread.path);
                    fd.append('cp_thread[id]',data.tread.id);
                });
                if(data.timer===undefined){prm={interval:500};}
                else{prm=data.timer;}
                if(prm.interval===undefined){prm.interval=500;}
                var tick=function(){
                    $.ajax({
                        url:cp.plugins_url+'/catpow/callee/cp_form_tick.php',
                        type:'post',
                        dataType:'json',
                        data:fd,
                        processData:false,
                        contentType:false,
                    }).done(function(res){
                        if(res.callback){
                            try{
                                var rtn;
                                if(res.callback in $.catpow.cp_form.callback){
                                    rtn=$.catpow.cp_form.callback[res.callback]($item,res);
                                }
                                else{rtn=window[res.callback]($item,res);}
                                if(typeof rtn==='object'){
                                    rtn.done(function(){
                                        setTimeout(tick,prm.interval);
                                    });
                                }
                                else if(rtn===true){
                                    setTimeout(tick,prm.interval);
                                }
                            }
                            catch(e){window.console.error(e);dfr.reject();}
                        }
                        else{setTimeout(tick,prm.interval);}
                    }).fail(function(e,ts,et){
                        window.console.error('status:'+e.status);
                        window.console.error(ts);
                        window.console.error(et);
                        if(parseInt(e.status)===200){
                            window.console.log('data:');
                            $.ajax({
                                url:cp.plugins_url+'/catpow/callee/cp_form_tick.php',
                                type:'post',
                                dataType:'html',
                                data:fd,
                                processData:false,
                                contentType:false,
                            }).done(function(res){
                                window.console.error(res);
                            });
                        }
                    });
                };
                setTimeout(tick,prm.interval);
                return dfr.promise();
            },
            
            return_true:function(){
                return true;
            },
            return_false:function(){
                return false;
            },
            wait:function($item,data){
                var dfr=new $.Deferred();
                setTimeout(function(){dfr.resolve();},data.wait || 2000);
                return dfr.promise();
            }
        }
    };
})(jQuery);

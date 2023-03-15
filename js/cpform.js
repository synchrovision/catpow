/* exported cpform Catpow */
/* global cp wp console Promise*/

const cpform=(form)=>{
	if(form.classList.contains('cpform')){form.addEventListener('submit',(e)=>e.preventDefault());}
	form.addEventListener('click',(e)=>{
		var el;
		if(el=e.target.closest('[data-role^="cpform_submit_"]')){
			var target;
			switch(el.dataset.role){
				case "cpform_submit_form":target=form;break;
				case "cpform_submit_section":target=el.closest('.cpform_section');break;
				case "cpform_submit_action":target=el;break;
			}

			if(!el.dataset.ignoreMessage){
				const taskMessage=target.querySelector('.message.task');
				if(taskMessage){
					taskMessage.scrollIntoView({behavior:'smooth'});
					return;
				}
			}
			form.querySelectorAll('.cpform_message .message').forEach((el)=>el.remove());
			const param=el.dataset.param?JSON.parse(el.dataset.param):false;
			submit(target,el.dataset.action,el.dataset.callback,param);
		}
		else if(el=e.target.closest('[data-role="cpform_action_submit_group"] [data-param-value]')){
			const group=el.closest('[data-role="cpform_action_submit_group"]');
			const param={[group.dataset.paramKey]:el.dataset.paramValue};
			submit(el,group.dataset.action,group.dataset.callback,param);
		}
	});
	form.addEventListener('change',(e)=>{
		const changed_input_name=e.target.name;
		form.querySelectorAll('[data-watch]').forEach((el)=>{
			el.dataset.watch.split(',').forEach((target_name)=>{
				if(changed_input_name.indexOf(target_name)===0){
					const param=el.dataset.param?JSON.parse(el.dataset.param):false;
					const callback=el.dataset.callback || 'replace_item';
					submit(el,el.id,callback,param);
				}
			});
		});
		if(e.target.type==='checkbox'){
			const group=e.target.closest('[data-input-range]');
			if(group && group.querySelectorAll('input:checked:enabled').length > group.dataset.range){
				e.target.checked=false;
			}
			reflectCheckedState(e.target);
		}
		if(e.target.type==='radio'){
			form.querySelectorAll('input[name="'+e.target.name+'"]').forEach(reflectCheckedState);
		}
	});
	const observer=new MutationObserver((mutationList)=>{
		mutationList.forEach((mutation)=>{
			if(mutation.type==='childList' && mutation.addedNodes){
				mutation.addedNodes.forEach((addedNode)=>{
					if(addedNode.nodeType===Node.ELEMENT_NODE){
						addedNode.querySelectorAll('script').forEach(evalScript);
					}
				});
			}
		});
	});
	observer.observe(form,{childList:true,subtree:true});
	
	const reflectCheckedState=(el)=>{
		const label=el.closest('label');
		if(!label){return;}
		label.classList.toggle('active',el.checked);
		document.querySelectorAll('label[for="'+el.id+'"]').classList.toggle('active',el.checked);
	};
	form.querySelectorAll('input:checked').forEach(reflectCheckedState);

	const refine=function(){
		form.querySelectorAll('[data-refine-cond]').forEach((el)=>{
			if(!el.dataset.refineCond){return true;}
			const cond=JSON.parse(el.dataset.refineCond);
			const flag=Object.keys(cond).every((name)=>cond[name].some((val)=>(
				form.querySelectorAll('input[name^="'+name+'"][value="'+val+'"]:checked').length || 
				form.querySelector('select[name^="'+name+'"]').value===val
			)));
			el.classList.toggle('disabled',flag);
			el.querySelectorAll('input,textarea,select').forEach((el)=>{
				if(flag){el.removeAttribute('disabled');}
				else{el.setAttribute('disabled','disabled');}
			});
		});
		form.querySelectorAll('[data-refine-cond].disabled [data-refine-cond]').forEach((el)=>{
			el.classList.remove('disabled');
			el.querySelectorAll('input,textarea,select').forEach((el)=>{
				el.setAttribute('disabled','disabled');
			});
		});
	};
	form.addEventListener('change',refine,true);
	form.addEventListener('update',()=>{
		refine();
		form.querySelectorAll('input:checked').forEach(reflectCheckedState);
	});
	refine();
	
	const get_fd=(target)=>{
		if(form===target){
			return new FormData(form);
		}
		else{
			const sec=target.closest('.cpform_section')
			const fd=new FormData();
			fd.append('action','cpform');
			append_inputs_to_fd(fd,form.querySelectorAll('[name="_cpform_nonce"],[name="_wp_http_referer"],[name="cpform_id"]'));
			if(sec){
				fd.append('cpform_section_id',sec.dataset.sectionId);
			}
			append_inputs_to_fd(fd,target.querySelectorAll('input,select,textarea'));
			if(target.dataset.watch){
				target.dataset.watch.split(',').forEach((name)=>{
					append_inputs_to_fd(fd,form.querySelectorAll(':input[name^="'+name+'"]'));
				});
			}
			return fd;
		}
	};
	const append_inputs_to_fd=(fd,inputs)=>{
		inputs.forEach((input)=>{
			if(input.disabled){return;}
			if(input.type==='file'){
				if(input.files[0]){
					if(input.multiple){
						Array.prototype.forEach.call(input.files,file=>fd.append(input.name,file));
					}
					else{
						fd.append(input.name,input.files[0]);
					}
				}
			}
			else if(input.type==='checkbox' || input.type==="radio"){
				if(input.checked){fd.append(input.name,input.value);}
			}
			else{
				fd.append(input.name,input.value);
			}
		});
		return fd;
	};
	const submit=(target,action,callback,param)=>{
		return new Promise((resolve,reject)=>{
			try{
				const fd=get_fd(target);
				fd.append('action','cpform');
				if(action){fd.append('cpform_action',action);}
				if(param){
					Object.keys(param).forEach((key)=>fd.append(key,param[key]));
				}
				document.body.classList.add('busy_mode');

				wp.apiFetch({
					path:'/cp/v1/form/post',
					method: 'POST',
					body:fd,
				}).then(function(res){
					document.body.classList.remove('busy_mode');
					var cbs;
					cbs={};
					if(res.callback){
						if(!Array.isArray(res.callback)){
							res.callback=res.callback.split(',');
						}
						res.callback.forEach((cb)=>{
							if(cb in callbacks){
								cbs[cb]=callbacks[cb];
							}
							else{cbs[cb]=window[cb];}
						});
					}
					else{
						if(!callback){callback='replace'}
						if(typeof callback === 'function'){cbs.callback=callback;}
						else{
							if(!Array.isArray(callback)){callback=callback.split(',');}
							callback.forEach((cb,cbn)=>{
								if(typeof cb === 'function'){cbs[cbn]=cb;}
								else{
									if(cb in callbacks){
										cbs[cb]=callbacks[cb];
									}
									else{cbs[cb]=window[cb];}
								}
							});
						}
					}
					form.dispatchEvent(new CustomEvent('before_cpform_callback',res));
					if(res.nonce){
						const nonceInput=form.querySelector('[name="_cpform_nonce"]');
						window.console.log('reset nonce : from '+nonceInput.value+' to '+res.nonce);
						nonceInput.value=res.nonce;
					}
					Object.keys(cbs).forEach((cbn)=>{
						if(cbn){form.dispatchEvent(new CustomEvent('before_'+cbn));}
						cbs[cbn](target,res);
						if(cbn){form.dispatchEvent(new CustomEvent('after_'+cbn));}
					});
					form.dispatchEvent(new CustomEvent('after_cpform_callback',res));
					form.dispatchEvent(new CustomEvent('update'));
					resolve();
				}).catch(function(res){
					window.console.log(res);
					document.body.classList.remove('busy_mode');
					reject();
				});
			}
			catch(e){
				window.console.log(e);
				reject();
			}
		});
	}
	const el=(tag,props,children)=>{
		const el=document.createElement(tag);
		Object.keys(props).forEach((key)=>{
			el[key]=props[key];
		});
		if(Array.isArray(children)){
			children.forEach((child)=>{
				if(typeof child === 'string'){
					el.appendChild(document.createTextNode(child));
				}
				else{el.appendChild(child);}
			});
		}
		return el;
	};
	const cling=(el,target)=>{
		if(!('timer' in cling)){
			cling.targets=[];
			cling.tick=()=>{
				cling.targets.forEach((data,index)=>{
					const {el,target}=data;
					if(target.offsetParent){
						if(!el.offsetParent){el.style.visibility='visible';}
						var bnd1=el.getBoundingClientRect();
						var bnd2=target.getBoundingClientRect();
						if(
							bnd1.width !== bnd2.width ||
							bnd1.height !== bnd2.height ||
							bnd1.left !== bnd2.left ||
							bnd1.top !== bnd2.top
						){
							var pos=getComputedStyle(el);
							el.style.width=bnd2.width;
							el.style.height=bnd2.height;
							el.style.left=(parseFloat(pos.left)+bnd2.left-bnd1.left)+'px';
							el.style.top=(parseFloat(pos.top)+bnd2.top-bnd1.top)+'px';
						}
					}
					else{
						if(target.matches('body *')){el.style.visibility='hidden';}
						else{el.remove(); }
					}
					if(!el.matches('body *')){delete (cling.targets[index]);}
				});
			};
			cling.timer=setInterval(cling.tick,30);
		}
		el.style.position='absolute';
		cling.targets.push({el,target});
	};
	const delayRemove=(el,delay)=>{
		if(delay===undefined){delay=1000;}
		return new Promise((resolve)=>{
			el.classList.add('transition','from','del');
			setTimeout(()=>{
				el.classList.remove('from');
				el.classList.add('to');
			},1);
			setTimeout(()=>{
				el.remove();
				resolve();
			},delay);
		});
	};
	const delayReplace=(from,to,delay)=>{
		if(delay===undefined){delay=1000;}
		return new Promise((resolve)=>{
			from.classList.add('transition','from','org');
			to.classList.add('transition','from','new');
			from.after(to);
			setTimeout(()=>{
				from.classList.remove('from');
				from.classList.add('to');
				to.classList.remove('from');
				to.classList.add('to');
			},1);
			setTimeout(()=>{
				from.remove();
				resolve();
			},delay);
		});
	};
	
	const requireStyles=(styles)=>{
		styles.filter(function(href){
			for(let i=0;i<document.styleSheets.length;i++){
				if(document.styleSheets[i].href===href){return false;}
			}
			return true;
		}).map((href)=>{
			const el=document.createElement('link');
			el.setAttribute('rel','stylesheet');
			el.setAttribute('href',href);
			document.head.appendChild(el);
		});
	};
	const requireScripts=async(scripts)=>{
		var scriptsFlag={};
		for(let i=0;i<document.scripts.length;i++){
			scriptsFlag[document.scripts[i].src.split('?')[0]]=true;
		}
		for(const script of scripts){
			if(!scriptsFlag[script]){
				await loadScript(script);
			}
		}
	};
	const loadScript=(src)=>{
		return new Promise((resolve)=>{
			const el=document.createElement('script');
			el.setAttribute('type','text/javascript');
			el.setAttribute('src',src);
			document.body.appendChild(el);
			el.onload=el.onreadystatechange=function(_,isAbort){
				if(isAbort || !el.readyState || /loaded|complete/.test(el.readyState)) {
					el.onload=el.onreadystatechange=null;
					if(!isAbort){resolve();}
				}
			};
		});
	};
	const htmlStringToNode=(html)=>{
		const dummy=document.createElement('div');
		dummy.innerHTML=html;
		return dummy.children[0];
	};
	const evalScript=(el)=>{
		const script=document.createElement("script");
		script.type="text/javascript";
		script.appendChild(document.createTextNode(el.textContent));
		document.head.prepend(script);
		script.remove();
	};
	const getLightBox=(container)=>{
		const lightBox=container.querySelector('.cp_lightbox_container');
		if(lightBox){return lightBox;}
		const newLightBox=el('div',{className:'cp_lightbox_container'},[
			el('div',{className:'cp_lightbox_content'})
		]);
		container.append(newLightBox);
		return newLightBox;
	};
	const activateElement=(el)=>{
		el.classList.add('active');
		el.classList.remove('inactive');
		el.dispatchEvent(new CustomEvent('activate'));
	};
	const inactivateElement=(el)=>{
		el.classList.add('inactive');
		el.classList.remove('active');
		el.dispatchEvent(new CustomEvent('inactivate'));
	};
	const callbacks={
		message:function(target,data){
			const sec=(target===form && target.dataset.role==="cpform_section")?target:target.closest('form,[data-role="cpform_section"]');
			const id=(sec===form)?form.id:sec.dataset.sectionId;
			var msgBox=form.querySelector('[data-role="cpform_message"][data-form-id="'+id+'"]');
			if(!msgBox){
				window.console.error('Messge Box for the form is not exists');
				window.console.error(data);
				return;
			}
			msgBox.classList.remove('has_task');
			msgBox.replaceChildren();
			
			data.message.forEach(function(msg){
				if(!msg.class){msg.class='';}
				const msgEl=el('div',{className:'message '+msg.class},[
					el('div',{className:'text'},[msg.message])
				]);
				msgBox.append(msgEl);
				if(msg.selector){
					var tgt;
					if(form.matches(msg.selector)){
						tgt=form;
						msgEl.classList.add('no_target');
						msgBox.append(msgEl);
					}
					else{
						tgt=form.querySelector(msg.selector);
						if(!tgt){
							window.console.error('Invalid input "'+msg.selector+'" was not found in this form');
							window.console.error(msg.message);
							return;
						}
						msgEl.classList.add('has_target');
						cling(msgEl,tgt);
						tgt.addEventListener('change',()=>{
							delayRemove(msgEl);
						});
					}
				}
				if(msgBox.querySelector('.task')){msgBox.classList.add('has_task');}
			});
			cling.tick();
			const topMessage=Array.from(form.querySelectorAll('.message')).reduce((p,c)=>{
				p.getBoundingClientRect().top<c.getBoundingClientRect().top?p:c;
			});
			topMessage.scrollIntoView({behavior:'smooth',block:'center'});
			form.dispatchEvent(new CustomEvent('update'));
			return true;
		},
		replace:function(target,data){
			var tgt,sel;
			if(data.target){
				sel='[data-role="cpform_'+data.target+'"]';
				if(data.target==='section' && data.section_id){
					sel+='[data-section-id="'+data.section_id+'"]';
				}
				if(target.matches('form')){tgt=form.querySelector(sel);}
				else{
					switch(data.target){
						case 'content':
						case 'section':
							tgt=target.closest(sel);
							break;
						default:
							tgt=target.closest('form,[data-role="cpform_section"]').querySelector(sel);
					}

				}
			}
			else{
				tgt=target.matches('form')?
					target.querySelector('[data-role="cpform_content"]'):
					target.closest('[data-role="cpform_content"],[data-role="cpform_section"]');
			}
			const newItem=htmlStringToNode(data.html);

			if(data.deps){
				requireStyles(data.deps.styles);
				requireScripts(data.deps.scripts).then(()=>{
					if(data.delay){delayReplace(tgt,newItem);}
					else{tgt.innerHTML=data.html;}
				});
			}
			else{
				if(data.delay){delayReplace(tgt,newItem);}
				else{tgt.innerHTML=data.html;}
			}
			tgt.dispatchEvent(new CustomEvent('replace'));
			tgt.scrollIntoView({behavior:'smooth'});
		},
		insert:function(target,data){
			const tgt=data.selector?form.querySelector(data.selector):target;
			if(!tgt){window.console.error(data.selector+'" was not found in this form');}
			if(data.position===undefined){data.position='before';}
			const newItem=htmlStringToNode(data.html);
			tgt[data.position](newItem);
			form.dispatchEvent(new CustomEvent('update'));
			if(data.scroll){
				newItem.scrollIntoView({behavior:'smooth'});
			}
		},
		remove:function(target,data){
			const tgt=data.section_id?
				form.querySelector('[data-role="cpform_section"][data-section-id="'+data.section_id+'"]'):
				target.closest('form,[data-role="cpform_section"]');
			if(data.delay){delayRemove(tgt);}
			else{tgt.remove();}
			return true;
		},
		replace_items:function(target,data){
			data.items.forEach(function(item){
				var tgt=form.querySelector(item.selector);
				if(!tgt){
					window.console.error(item.selector+'" was not found in this form');
				}
				const newItem=htmlStringToNode(data.html);
				tgt.replaceWith(newItem);
			});
			form.dispatchEvent(new CustomEvent('update'));
			return true;
		},
		insert_items:function(target,data){
			data.items.forEach(function(item){
				const tgt=item.selector?target.querySelector(item.selector):target;
				if(!tgt){window.console.error(item.selector+'" was not found in this form');}
				if(item.position===undefined){item.position='before';}
				tgt[data.position](htmlStringToNode(item.html));
			});
			form.dispatchEvent(new CustomEvent('update'));
			return true;
		},

		delay_replace:function(target,data){
			data.delay=true;
			return callbacks.replace(target,data)
		},
		delay_replace_items:function($form,data){
			return new Promise((resolve)=>{
				var cnt=0;
				data.items.forEach(function(item){
					const tgt=form.querySelector(item.selector).closest('.cp-meta-item');
					if(!tgt){
						window.console.log('Item to replace "'+item.selector+'" was not found in this form');
					}
					cnt++;
					callbacks.delay_replace(tgt,htmlStringToNode(item.html)).then(()=>{
						cnt--;
						if(cnt<1){resolve();}
					});
				});
			});
		},
		delay_remove:function(target,data){
			data.delay=true;
			return callbacks.remove(target,data)
		},

		lightbox:function(target,data){
			return new Promise((resolve)=>{
				const lightbox=getLightBox(target);
				const body=lightbox.querySelector('.cp_lightbox_content');

				if(data.deps){
					callbacks.require_styles(data.deps.styles);
					callbacks.require_scripts(data.deps.scripts).then(()=>{
						body.innerHTML=data.html;
						body.dispatchEvent(new CustomEvent('replace'));
						setTimeout(()=>activateElement(lightbox),1);
						setTimeout(resolve,1000);
					});
				}
				else{
					body.innerHTML=data.html;
					body.dispatchEvent(new CustomEvent('replace'));
					setTimeout(()=>activateElement(lightbox),1);
					setTimeout(resolve,1000);
				}
			});
		},
		lightbox_close:function(target){
			return new Promise((resolve)=>{
				const lightbox=getLightBox(target);
				const body=lightbox.querySelector('.cp_lightbox_content');
				inactivateElement(lightbox);
				setTimeout(()=>{body.innerHTML='';resolve();},1000);
				
			});
		},

		feed:function(target,data){
			data.message.forEach(function(msg){
				form.querySelector(msg.selector).classList.add('has_message',msg.class)
					.after(el('span',{className:'message '+msg.class},msg.message));
			});
			form.dispatchEvent(new CustomEvent('update'));
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
		download:function(target,data){
			var blob=new Blob([data.html],{type:data.type||'text/plain'});
			var url=window.URL || window.webkitURL;
			var blobURL=url.createObjectURL(blob);

			var a=document.createElement('a');
			a.download=data.name||'undefined.txt';
			a.href=blobURL;
			a.click();
			a.remove();
			return true;
		},

		submit_again:function(target,data){
			var prm=data.submit || {delay:1000,action:'action'};
			if(prm.delay===undefined){
				return submit(target,prm.action,prm.callback,prm.param);
			}
			else{
				return new Promise((resolve)=>{
					setTimeout(function(){
						submit(target,prm.action,prm.callback,prm.param).then(resolve);
					},prm.delay);
				});
			}
		},

		ticker:function(target,data){
			return new Promise((resolve,reject)=>{
				var fd,prm;
				fd=get_fd(target);
				fd.append('cp_thread[path]',data.thread.path);
				fd.append('cp_thread[id]',data.tread.id);
				target.on('change',function(){
					fd=get_fd(target);
					fd.append('cp_thread[path]',data.thread.path);
					fd.append('cp_thread[id]',data.tread.id);
				});
				if(data.timer===undefined){prm={interval:500};}
				else{prm=data.timer;}
				if(prm.interval===undefined){prm.interval=500;}
				var tick=function(){
					fetch(cp.plugins_url+'/catpow/callee/cpform_tick.php',{
						method:'POST',
						body:fd
					}).then((res)=>res.json()).then((res)=>{
						if(res.callback){
							try{
								var rtn;
								if(res.callback in callbacks){
									rtn=callbacks[res.callback](target,res);
								}
								else{rtn=window[res.callback](target,res);}
								if(typeof rtn==='object'){
									rtn.done(function(){
										setTimeout(tick,prm.interval);
									});
								}
								else if(rtn===true){
									setTimeout(tick,prm.interval);
								}
							}
							catch(e){window.console.error(e);reject();}
						}
						else{setTimeout(tick,prm.interval);}
					}).catch(function(e,ts,et){
						window.console.error('status:'+e.status);
						window.console.error(ts);
						window.console.error(et);
						if(parseInt(e.status)===200){
							fetch(cp.plugins_url+'/catpow/callee/cpform_tick.php',{
								method:'post',
								body:fd
							}).then((res)=>{
								window.console.error(res);
							});
						}
					});
				};
				setTimeout(tick,prm.interval);
			});
		},

		return_true:function(){
			return true;
		},
		return_false:function(){
			return false;
		},
		wait:function(target,data){
			return new Promise((resolve)=>{
				setTimeout(resolve,data.wait || 2000);
			});
		}
	}
};

(async()=>{
	if(document.readyState==='loading'){
		await new Promise((resolve)=>{document.addEventListener('DOMContentLoaded',resolve);});
	}
	document.querySelectorAll('form [name="cpform_id"]').forEach((el)=>{
		const form=el.closest('form');
		if(form){cpform(form);}
	});
})();
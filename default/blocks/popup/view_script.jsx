import {ready,lookup} from 'util';

/* global Promise console */
ready(()=>{
	const blocks=Array.from(document.querySelectorAll('.wp-block-catpow-popup'));
	const openBlock=(block)=>{
		return new Promise((resolve)=>{
			if(block.classList.contains('is-open')){return resolve();}
			block.classList.remove('is-hidden');
			window.requestAnimationFrame(()=>{
				window.requestAnimationFrame(()=>{
					block.classList.add('is-open');
					block.classList.remove('is-close');
				});
			});
			const cb=()=>{
				block.removeEventListener('transitionend',cb);
				resolve();
			}
			block.addEventListener('transitionend',cb);
		});
	};
	const closeBlock=(block)=>{
		return new Promise((resolve)=>{
			if(block.classList.contains('is-hidden')){return resolve();}
			block.classList.add('is-close');
			block.classList.remove('is-open');
			const cb=()=>{
				block.removeEventListener('transitionend',cb);
				if(block.classList.contains('is-close')){
					block.classList.add('is-hidden');
				}
				resolve();
			}
			block.addEventListener('transitionend',cb);
		});
	};
	const closeBlocks=(blocks)=>{
		return Promise.all(blocks.map((block)=>closeBlock(block)));
	};
	blocks.forEach(function(block){
		lookup('a[href="#'+block.id+'"]',(el)=>{
			el.addEventListener('click',(e)=>{
				e.preventDefault();
				closeBlocks(blocks).then(()=>openBlock(block))
			});
		});
		block.querySelectorAll(':scope>.bg, :scope>.body>.close').forEach(function(el){
			el.addEventListener('click',()=>closeBlock(block));
		});
		document.body.append(block);
	});
});
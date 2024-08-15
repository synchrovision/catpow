/* global Catpow*/

Catpow.util.ready(()=>{
	document.querySelectorAll('.wp-block-catpow-slider').forEach((el)=>{
		const slider=Catpow.class_control(el.querySelector('.controls'),el.querySelector('.contents'));
	});
});
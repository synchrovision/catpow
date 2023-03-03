/* global Catpow wp */
Catpow.util.ready(()=>{
	document.querySelectorAll('.wp-block-catpow-instagramfeed').forEach((el)=>{
		wp.element.render(wp.element.createElement(Catpow.InstagramFeed,el.dataset),el);
	});
});
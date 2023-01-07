jQuery(function($){
	var $img,$input;
	$('form').on('click','.ajax_upload_media',function(e) {
		e.preventDefault();
		$img=$(this);
		$input=$(this).next('input');
		media_uploader.open();
	});
	var media_uploader = wp.media({
		title: 'Select Image',
		button: { text: 'Select' },  
		multiple: false,
		type:'video'
	}); 
	media_uploader.on('select', function() {
		var media = media_uploader.state().get('selection').first().toJSON();
		console.log(media);
		switch(media.type){
			case 'image':$img.replaceWith('<img src="'+media.url+'" class="ajax_upload_media is-type-image"/>');break;
			case 'video':$img.replaceWith('<video src="'+media.url+'" class="ajax_upload_media is-type-video"/>');break;
			case 'audio':$img.replaceWith('<audio src="'+media.url+'" class="ajax_upload_media is-type-audio"/>');break;
			case 'application':$img.replaceWith('<span class="ajax_upload_media is-type-application is-subtype-'+media.subtype+'">'+media.filename+'</span>');break;
		}
		$input.attr('value',media.id);
	});
});
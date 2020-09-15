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
		switch(media.type){
			case 'image':$img.replaceWith('<img src="'+media.url+'" class="ajax_upload_media"/>');break;
			case 'video':$img.replaceWith('<video src="'+media.url+'" class="ajax_upload_media"/>');break;
			case 'audio':$img.replaceWith('<audio src="'+media.url+'" class="ajax_upload_media"/>');break;
		}
		$input.attr('value',media.id);
	});
});
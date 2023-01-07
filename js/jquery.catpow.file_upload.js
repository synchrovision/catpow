jQuery(function($){
	var $img,$input;
	var $file_input = $('<input type="file" accept="image/*"/>');
	$('form').on('click','.ajax_upload_file',function(e) {
		e.preventDefault();
		$img=$(this);
		$input=$(this).next('input');
		$file_input.click();
	});
	$file_input.on('change', function() {
		var fd=new FormData();
		var f=$file_input.prop('files')[0];
		fd.append('action','upload-attachment');
		fd.append('name',f.name);
		fd.append('_wpnonce',$img.attr('data-nonce'));
		fd.append('async-upload',f);
		$.ajax({
			url:cp.upload_url,
            type:'post',
            dataType:'json',
            data:fd,
            processData:false,
            contentType:false
		}).done(function(res){
			$input.val(res.data.id);
			$img.attr('src',res.data.url);
		});
	});
});
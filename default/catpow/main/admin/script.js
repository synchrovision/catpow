jQuery(function($){
	var url=cp.plugins_url+'/catpow/admin/action.php';
	$('form.catpow_admin_form').on('change','label.file',function(){
		$('span',this).text($(':input',this).prop('files')[0].name);
	});
	$('form.catpow_admin_form').submit(function(){
		$('div.result_boad').addClass('active').find('.result').html('処理中...');
		try{
			var fd=new FormData($(this).get(0));
			var prm={
				url:url,
				type:'post',
				dataType:'jsonp',
				data:fd,
				processData:false,
				contentType:false,
			};
			$.ajax(prm).done(function(res){
				$('div.result_boad').find('.result').html(res.html);
			}).fail(function(e,ts,et){
				var err_log='status:'+e.status;
				console.log(ts);
				console.log(et);
				if(e.status=='200'){
					err_log+='data:';
					$.ajax({
						url:url,
						type:'post',
						dataType:'html',
						data:fd,
						processData:false,
						contentType:false,
					}).done(function(res){
						console.log(res);
						err_log+=res;
						$('div.result_boad').find('.result').html(err_log);
					});
				}
				$('div.result_boad').find('.result').html(err_log);
			});
		}catch(e){
			console.log(e);
		}
		return false;
	});
	$('div.result_boad .btn_close').click(function(){$('div.result_boad').removeClass('active');});
});
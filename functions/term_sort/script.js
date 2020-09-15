jQuery(function($){
	var $tgt=$('.wp-list-table.tags tbody');
	var $form=$tgt.closest('form');
	$tgt.sortable({
		start:function(e,ui){
		},
		update:function(e,ui){
			var sort_data=[];
			$('input[name="delete_tags[]"]',$tgt).each(function(i,e){
				sort_data.push($(this).val());
			});
			var fd=new FormData();
			fd.append('action','cp_term_sort');
			fd.append('_wpnonce',$form.find('[name="_wpnonce"]').val());
			fd.append('_wp_http_referer',$form.find('[name="_wp_http_referer"]').val());
			fd.append('sort_data',sort_data);
			$.ajax({
				url:cp.ajax_url,
				type:'post',
				dataType:'jsonp',
				data:fd,
				processData:false,
				contentType:false
			}).done(function(res){
				console.log(res);
			}).fail(function(e,ts,et){
				console.log('status:'+e.status);
				console.log(ts);
				console.log(et);
				if(e.status=='200'){
					console.log('data:');
					$.ajax({
						url:cp.ajax_url,
						type:'post',
						dataType:'html',
						data:fd,
						processData:false,
						contentType:false,
					}).done(function(res){
						console.log(res);
					});
				}
			});
		}
	});
});
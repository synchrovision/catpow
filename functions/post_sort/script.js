jQuery(function($){
	var $tgt=$('.wp-list-table tbody');
    var $header=$('.wp-list-table thead tr');
	var $form=$tgt.closest('form');
	$tgt.sortable({
        helper:function(e,ui){
            var $helper=ui.clone();
            ui.children().each(function(i,e){
                $helper.children().eq(i).width($(this).width());
                $header.children().eq(i).width($(this).width());
            });
            return $helper;
        },
		start:function(e,ui){
		},
		update:function(e,ui){
			var sort_data=[];
			$('input[name="post[]"]',$tgt).each(function(i,e){
				sort_data.push($(this).val());
			});
			var fd=new FormData();
			fd.append('action','cp_post_sort');
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
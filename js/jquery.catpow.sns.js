jQuery(function($){
	$('[data-widget-sns]').each(function(){
		try{
			var $tgt = $(this);
			var sns_json=JSON.parse($tgt.attr('data-widget-sns'));
			var data ={
					action:'cp_get_sns_dly',
					sns:sns_json['sns'],
					account:sns_json['account'],
					nonce:sns_json['nonce']
				}
			var prm={
				url:wp_ajax_url,
				type:'post',
				dataType:'jsonp',
				data:data
			};
			jQuery.ajax(prm).done(function(res){
				$tgt.append(res["html"]);
			}).fail(function(e,ts,et){
				console.log("status:"+e.status);
				console.log(ts);
				console.log(et);
				if(e.status=="200"){
					console.log("data:");
					$.ajax({
						url:wp_ajax_url,
						type:"post",
						dataType:"html",
						data:data,
					}).done(function(res){
						console.log(res);
					});
				}
			});
		}catch(a){
			console.log(e);
		}
	});
});
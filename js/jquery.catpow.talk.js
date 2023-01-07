(function($){$.fn.extend({
	cp_talk:function(id,cbs){
		var $talk=$(this);
		var url=cp.plugins_url+'/catpow/callee/talk.php';
		$.extend($talk,cbs);
		$talk.start=function(){$talk.active=true;$talk.tick();};
		$talk.stop=function(){$talk.active=false;};
		$talk.tick=function(req){
			$.ajax({
				url,
				dataType:'json',
				data:{id,req},
				success:function(res){
					var req=res.map(function(re){return $talk[re.cb](re.arg);})
					if($talk.active){$talk.tick(req);}
				}
			});
		};
		return $talk;
	}
});})(jQuery);
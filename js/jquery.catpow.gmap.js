(function($){$.fn.extend({
	cp_gmap:function(map_data){
		if(!('cp_gmap' in $.catpow)){
			$.catpow.cp_gmap={
				init:function(cb){
					if($.catpow.cp_gmap.loaded === false){
						if($.catpow.cp_gmap.loading === false){
							$.catpow.cp_gmap.loading=true;
							var dfr=new $.Deferred();
							$.catpow.cp_gmap.promise=dfr.promise();
							$.getScript('https://maps.googleapis.com/maps/api/js?key='+map_data['api_key'],function(){
								$.catpow.cp_gmap.loaded=true;
								$.catpow.cp_gmap.loading=false;
								$.catpow.cp_gmap.geocoder=new google.maps.Geocoder();
								dfr.resolve();
							});
						}
						$.catpow.cp_gmap.promise.done(cb);
					}
					else{cb();}
				},
				loaded:false,
				loading:false,
				geocoder:false,
				promise:false,
				datas:[]
			};
		}
		var tgt=this.get(0);
		if('id' in map_data){$.catpow.cp_gmap.datas[map_data.id]=map_data;}
		
		$.catpow.cp_gmap.init(function(){
			var map=new google.maps.Map(tgt,map_data.mapOptions);
			var mapBounds=false;
			$.each(map_data.markers,function(i,marker){
				var q={}
				if(marker['placeId']){q['placeId']=marker['placeId'];}
				else{q['address']=marker['address'];}
				$.catpow.cp_gmap.geocoder.geocode(q,function(results,status) { 
					if (status == google.maps.GeocoderStatus.OK) {
						marker['marker']=new google.maps.Marker(jQuery.extend(marker,map_data.markerOptions,{
							position:results[0].geometry.location,
							map:map
						}));
						if(mapBounds === false){
							map.setCenter(results[0].geometry.location);
							mapBounds=map.getBounds();
						}else{
							mapBounds.extend(results[0].geometry.location);
							map.fitBounds(mapBounds);
						}
					}else{
						console.log('Google Map failed to load geocode :'+status);
					}
				});
			});
		});
	},
});})(jQuery);
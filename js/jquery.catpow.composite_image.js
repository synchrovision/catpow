/**
* canvasに画像を合成して描画する
*/
(function($){
	$.fn.extend({
		cp_composite_image:function(layers){
			var $canvas=$(this);
			var canvas=$canvas.get(0);
			var w=canvas.width,h=canvas.height,ctx=$canvas.get(0).getContext('2d');
			$canvas.render=function(layers){
				var i=0;
				var cd=new $.Deferred();
				var renderLayer=function(){
					var ld=new $.Deferred();
					if(layers.length <= i){
						cd.resolve();
						ld.resolve();
						return ld.promise();
					}
					var layer=layers[i];
					if(Array.isArray(layer.src)){
						var subCanvas=document.createElement('canvas');
						subCanvas.width=layer.w || w;
						subCanvas.height=layer.h || h;
						$(subCanvas).cp_composite_image().render(layer.src).then(function(){
							ctx.globalCompositeOperation=layer.type || 'source-over';
							ctx.drawImage(subCanvas,layer.x || 0,layer.y || 0,layer.w || w,layer.h || h);
							ld.resolve();
						});
					}
					else{
						var img=new Image();
						img.onload=function(){
							window.console.log('image loaded');
							ctx.globalCompositeOperation=layer.type || 'source-over';
							ctx.drawImage(img,layer.x || 0,layer.y || 0,layer.w || w,layer.h || h);
							ld.resolve();
						}
						img.src=layer.src;
					}
					ld.promise().then(renderLayer);
					i++;
				};
				renderLayer();
				return cd.promise();
			};
			$canvas.clear=function(){
				ctx.clearRect(0,0,w,h);
			};
			if(layers){$canvas.render(layers);}
			return $canvas;
		}
	});
})(jQuery);
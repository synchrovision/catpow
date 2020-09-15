jQuery(function($){
	var tgt=document.getElementById('compose');
	var path=tgt.dataset.apiPath;
	wp.apiFetch.use(wp.apiFetch.createNonceMiddleware(tgt.dataset.nonce));
	wp.apiFetch({path:path+'/init'}).then(function(data){
		data.path=path;
		wp.element.render(wp.element.createElement(Compose,data),tgt);
	});
});
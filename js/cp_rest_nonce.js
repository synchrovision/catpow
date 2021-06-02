/* global wp console cp_rest_nonces*/
wp.apiFetch.use(function(options,next){
	if(cp_rest_nonces && options.path.substr(0,7)==='/cp/v1/'){
		const chunks=options.path.substr(7).split('/');
		const class_path=chunks.slice(0,2).join('/');
		if(cp_rest_nonces[class_path]){
			if(!options.headers){options.headers={};}
			options.headers['X-CP-Nonce']=cp_rest_nonces[class_path];
			return next(options);
		}
		const content_path=chunks.slice(0,3).join('/');
		if(cp_rest_nonces[content_path]){
			if(!options.headers){options.headers={};}
			options.headers['X-CP-Nonce']=cp_rest_nonces[content_path];
			return next(options);
		}
	}
	return next(options);
});
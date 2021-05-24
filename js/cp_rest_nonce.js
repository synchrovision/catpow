/* global wp console cp_rest_nonces*/
wp.apiFetch.use(function(options,next){
	if(cp_rest_nonces && options.path.substr(0,7)==='/cp/v1/'){
		const content_path=options.path.substr(7).split('/').slice(0,3).join('/');
		if(cp_rest_nonces[content_path]){
			if(!options.headers){options.headers={};}
			options.headers['X-CP-Nonce']=cp_rest_nonces[content_path];
		}
	}
	return next(options);
});
/* global wp console*/
window.Catpow.nonces=window.Catpow.nonces || {};

wp.apiFetch.use(function(options,next){
	const nonces=window.Catpow.nonces;
	if(options.path && options.path.substr(0,7)==='/cp/v1/'){
		const chunks=options.path.substr(7).split('/');
		const class_path=chunks.slice(0,2).join('/');
		if(nonces[class_path]){
			if(!options.headers){options.headers={};}
			options.headers['X-CP-Nonce']=nonces[class_path];
			return next(options);
		}
		const content_path=chunks.slice(0,3).join('/');
		if(nonces[content_path]){
			if(!options.headers){options.headers={};}
			options.headers['X-CP-Nonce']=nonces[content_path];
			return next(options);
		}
	}
	return next(options);
});
<?php
add_filter('rest_allowed_cors_headers',function($allow_headers){
	$allow_headers[]='X-CP-Nonce';
	return $allow_headers;
});
register_rest_route(
	'cp/v1',
	'/(?P<content_path>(?P<data_type>[a-z]\w*)(?:/(?P<data_name>[a-z]\w*))?(?:/(?P<tmp>(?P<tmp_name>[a-z]\w*)(?:\-(?P<tmp_slug>[a-z]\w*))?))?)(?:/(?P<data_id>\d+))?(?:/(?P<action>[a-z]\w*))?(?:/(?P<param>.+))?/?',
	[
		'methods'=>WP_REST_Server::ALLMETHODS,
		'permission_callback'=>function($req){
			cp::session_start();
			$api_class=cp::get_class_name('api',$req['data_type'],$req['data_name']);
			if(class_exists($api_class)){
				return $api_class::permission($req);
			}
			if($f=cp::get_file_path(
				$req['content_path'].'/api'.
				(empty($req['action'])?'':'-'.$req['action']).'-permission.php',
				cp::FROM_THEME|cp::FROM_CONFIG
			)){
				return include $f;
			}
			elseif($f=cp::get_file_path(
				$req['content_path'].'/api-permission.php',
				cp::FROM_THEME|cp::FROM_CONFIG
			)){
				return include $f;
			}
			session_write_close();
			return wp_verify_nonce($_SERVER['HTTP_X_WP_NONCE']??'','wp_rest') && wp_verify_nonce($_SERVER['HTTP_X_CP_NONCE']??'',$req['content_path']);
		},
		'callback'=>function($req){
			cp::session_start();
			$res=new WP_REST_Response([],200);
			try{
				if(!empty($req['tmp'])){
					$conf=$GLOBALS[cp::get_conf_data_name($req['data_type'])][$req['data_name']]??null;
					if(
						isset($conf) && (in_array($req['tmp'],$conf['template']??[]) || in_array($req['tmp'],$conf['alias_template']??[])) ||
						wp_verify_nonce($_SERVER['HTTP_X_CP_NONCE']??'',$req['content_path'])
					){
						cp::get_template_part(
							$req['content_path'].'/api'.
							(empty($req['action'])?'':'-'.$req['action']).'.php',
							['req'=>$req,'res'=>$res,'conf'=>$conf]
						);
						return $res;
					}
				}
				$api_class=cp::get_class_name('api',$req['data_type'],$req['data_name']);
				if(class_exists($api_class)){
					$api_class::call($req,$res);
					return $res;
				}
			}
			catch(Exception $e){
				return new WP_REST_Response(['message'=>$e->getMessage()],500);
			}
			session_write_close();
			return new WP_REST_Response(['message'=>__('無効なリクエストです','catpow')],404);
		}
	]
);
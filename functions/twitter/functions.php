<?php
namespace Catpow;
add_action('body_start',function(){
?>
	<script>window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
		t = window.twttr || {};
		if (d.getElementById(id)) return t;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);

		t._e = [];
		t.ready = function(f) {
		t._e.push(f);
		};

		return t;
	}(document, "script", "twitter-wjs"));</script>
<?php
});


function tw_parts($type,$param=false){
	printf('<a class="twitter-%s"',$type);
	foreach((array)$param as $key=>$val){
		if(is_null($val))continue;
		printf(' %s="%s"',$key=='href'?$key:'data-'.$key,$val);
	}
	echo('></a>');
}

function tw_share($param=false){
	$default_param=array(
		'href'=>null,
		'text'=>null,
		'url'=>null,
		'hashtags'=>null,
		'via'=>null,
		'lang'=>get_locale()
	);
	tw_parts('share-button',array_merge($default_param,(array)$param));
}
		   

function tw_timeline($href,$param=false){
	$default_param=array(
		'href'=>$href,
		'width'=>300,//180~520
		'height'=>400,//70~
		'chrome'=>null,//[noheader,nofooter,noborders,noscrollbar,transparent]
	);
	tw_parts('timeline',array_merge($default_param,(array)$param));
}

/*twitterログイン*/
add_action('init',function(){
	if(!isset($_GET['tw_login']))return;
	if(!session_id()) {session_start();}
	if(!isset($_SESSION['tw_name'])){
		$_SESSION['tw_consumer_key']=get_option('tw_consumer_key');
		$_SESSION['tw_consumer_secret']=get_option('tw_consumer_secret');
		$_SESSION['redirect_url']='http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		wp_redirect(plugins_url('callee/oauth_redirect.php',__FILE__));
		exit;
	}
		
	get_template_part('config/twitter');
	if($_GET['tw_login']=='login'){
		$user=get_user_by('login',$_SESSION['tw_name']);
		if(count($user)>0){wp_set_auth_cookie($user->ID);}
	}
	if($_GET['tw_login']=='connect'){
		if($user_id=get_current_user_id()){
			update_user_option($user_id,'tw_name',$_SESSION['tw_name']);
			update_user_option($user_id,'tw_oauth_token',$_SESSION['oauth_token']);
			update_user_option($user_id,'tw_oauth_token_secret',$_SESSION['oauth_token_secret']);
		}
	}
	if($_GET['tw_login']=='register'){
		$user_id=wp_create_user($_SESSION['tw_name'],wp_generate_password());
		update_user_option($user_id,'tw_name',$_SESSION['tw_name']);
		update_user_option($user_id,'tw_oauth_token',$_SESSION['oauth_token']);
		update_user_option($user_id,'tw_oauth_token_secret',$_SESSION['oauth_token_secret']);
		wp_set_auth_cookie($user_id);
	}
	wp_redirect(remove_query_arg('tw_login'));
	exit;
},8);
/*Twitterボタン*/
function tw_login_link($text=false,$format='<a title="sign in with twitter" href="%s">%s</a>'){
	$text=$text?$text:get_image('twitter/login.png',"sign in with twitter");
	printf($format,add_query_arg('tw_login','login'),$text);
}
function tw_connect_link($text=false,$format='<a title="connect with twitter" href="%s">%s</a>'){
	$text=$text?$text:get_image('twitter/connect.png',"connect with twitter");
	printf($format,add_query_arg('tw_login','connect'),$text);
}
function tw_register_link($text=false,$format='<a title="register with twitter" href="%s">%s</a>'){
	$text=$text?$text:get_image('twitter/register.png',"register with twitter");
	printf($format,add_query_arg('tw_login','register'),$text);
}
/*基本*/
function tw_get_connection($user_id=false){
	//user_idを指定
	//指定がなければログインユーザの
	//いずれもなければコンシューマーキーのみのコネクションを返す
	include(__DIR__.'/classes/Codebird/Codebird.php');
	\Codebird\Codebird::setConsumerKey(
		get_option('tw_consumer_key'),
		get_option('tw_consumer_secret')
	); 
	$cb = \Codebird\Codebird::getInstance();
	if($user_id || $user_id=get_current_user_id()){
		if(
			$tw_oauth_token=get_user_option('tw_oauth_token',$user_id) &&
			$tw_oauth_token_secret=get_user_option('tw_oauth_token_secret',$user_id)
		){
			$cb->setToken($tw_oauth_token,$tw_oauth_token_secret);
		}
	}
	return $cb;
}
?>
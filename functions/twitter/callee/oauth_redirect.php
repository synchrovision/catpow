<?php
/*
Twitter認証にリダイレクトし
$_SESSION['tw_name']（=screen_name）
$_SESSION['oauth_token']
$_SESSION['oauth_token_secret']
をセットして
$_SESSION['redirect_url']
もしくはもと来たページに返す
*/
if(!session_id()) {session_start();}
include('../lib/codebird.php');
Codebird\Codebird::setConsumerKey($_SESSION['tw_consumer_key'], $_SESSION['tw_consumer_secret']); 
$cb = Codebird\Codebird::getInstance();
if (! isset($_GET['oauth_verifier'])) {
	unset($_SESSION['oauth_verified']);
	// gets a request token
	$reply = $cb->oauth_requestToken(array('oauth_callback' => 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']));
	// stores it
	$cb->setToken($reply->oauth_token, $reply->oauth_token_secret);
	$_SESSION['oauth_token'] = $reply->oauth_token;
	$_SESSION['oauth_token_secret'] = $reply->oauth_token_secret;
	// gets the authorize screen URL
	$auth_url = $cb->oauth_authorize();
	if(!isset($_SESSION['redirect_url']))$_SESSION['redirect_url']=$_SERVER['HTTP_REFERER'];
	header('Location:'.$auth_url);
	die();

} elseif (! isset($_SESSION['oauth_verified'])) {
	// gets the access token
	$cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
	$reply = $cb->oauth_accessToken(array('oauth_verifier' => $_GET['oauth_verifier']));
	// store the authenticated token, which may be different from the request token (!)
	$_SESSION['oauth_token'] = $reply->oauth_token;
	$_SESSION['oauth_token_secret'] = $reply->oauth_token_secret;
	$_SESSION['oauth_verified'] = true;
}
$cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$reply = (array) $cb->account_settings();
$_SESSION['tw_name']=$reply['screen_name'];
if(isset($_SESSION['redirect_url'])){
	header('Location:'.$_SESSION['redirect_url']);
}else{
	header('Location:'.$_SERVER['HTTP_REFERER']);
}
?>
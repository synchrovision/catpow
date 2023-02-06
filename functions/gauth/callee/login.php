<?php
use Catpow\gauth\cpgc;
if(!empty($_GET['code'])){
	cpgc::authenticate($_GET['code']);
}
cpgc::login();
wp_redirect(home_url());
exit;
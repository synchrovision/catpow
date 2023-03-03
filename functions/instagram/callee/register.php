<?php
use Catpow\instagram\cpig;
if(!empty($_GET['code'])){
	cpig::authenticate($_GET['code']);
}
wp_redirect(home_url());
exit;
<?php
use Catpow\gauth\cpgc;
cpgc::authenticate($_GET['code']);
cpgc::login();
wp_redirect(home_url());
exit;
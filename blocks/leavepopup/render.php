<?php
namespace Catpow;
if($attr['target']==='site' && $_SERVER['SERVER_NAME'] === parse_url($_SERVER['HTTP_REFERER']??'', PHP_URL_HOST)){
	return;
}
echo $content;
<?php
namespace Catpow;
$config=json_decode(file_get_contents(CP::get_file_path(CP::$content->path.'/config.json',CP::FROM_THEME|CP::FROM_DEFAULT|CP::FROM_CONFIG)),true);
HTML::render([
	'.cp-mainvisual--',
	['._contents',['h1._logo',BlockComponent::ResponsiveImage($logo,$config['options']['logo'])]],
	['._bg',BlockComponent::ResponsiveImage($bg,$config['options']['bg'])]
]);
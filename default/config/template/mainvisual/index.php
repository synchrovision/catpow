<?php
namespace Catpow;
$config=json_decode(file_get_contents(CP::get_file_path(CP::$content->path.'/config.json',CP::FROM_THEME|CP::FROM_DEFAULT|CP::FROM_CONFIG)),true);
?>
<div class="cp-mainvisual">
	<div class="contents">
		<h1 class="logo"><?=BlockComponent::ResponsiveImage($logo,$config['options']['logo'])?></h1>
	</div>
	<div class="bg">
		<?=BlockComponent::ResponsiveImage($bg,$config['options']['bg'])?>
	</div>
</div>
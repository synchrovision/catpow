<?php
include __DIR__.'/classes/autoload.php';
session_start();
list($id,$file)=explode('/',$_GET['path']);
if(empty($id) || empty(\cp::$data['allowed_protected_media'][$id])){
	header('Content-type: image/svg+xml');
	?>
	<svg
		 xmlns="http://www.w3.org/2000/svg"
		 xmlns:xlink="http://www.w3.org/1999/xlink"
		 viewBox="0 0 300 300"
	>
		<defs>
			<style>
				.bg{
					fill:#cccccc;
				}
				.text{
					fill:#aaaaaa;
					font-size:20px;
					text-anchor:middle;
					dominant-baseline:middle;
				}
			</style>
		</defs>
		<rect class="bg" x="0" y="0" width="300" height="300"></rect>
		<text class="text" x="150" y="150">Access Denied</text>
	</svg>
	<?php
	die();
}
$path=\cp::$data['allowed_protected_media'][$id]['path'];
header('Content-type: '.mime_content_type($path.'/'.$file));
readfile($path.'/'.$file);

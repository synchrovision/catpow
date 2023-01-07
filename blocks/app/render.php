<?php
if(empty($attr['content_path'])){
	echo('Content Path was not defined');
	return;
}
$path=dirname($attr['content_path']);
$path_url=cp::get_file_path_url($path.'/app.js',cp::FROM_THEME|cp::FROM_CONFIG);
if(empty($path_url)){
	printf('Directory for %s was not found',$path);
	return;
}
$dir=dirname(key($path_url));
$url=dirname(reset($path_url));
$required_files=['app.js','config.json'];
foreach($required_files as $required_file){
	if(!file_exists($dir.'/app.js')){
		printf('Required file %s/%s was not found',$path,$required_file);
		return;
	}
}
$deps=['wp-i18n','wp-api-fetch','wp-element'];
$props=json_decode($attr['props'],true);
$config=json_decode(file_get_contents($dir.'/config.json'),true);
$app_name=$config['name']??'BlockApp';
if(isset($config['useComponent'])){
	cp::use_components($config['useComponent']);
}
if(isset($config['deps'])){
	$deps=array_merge($deps,$config['deps']);
}

if(file_exists($f=$dir.'/init.php')){include $f;}
if(file_exists($dir.'/style.scss')){cp::enqueue_style($path.'/style.css');}
if($is_preview){
	if(file_exists($f=$dir.'/preview.php')){return include $f;}
}
wp_enqueue_script($app_name,$url.'/app.js',$deps);
?>
<div id="<?=$app_name?>"></div>
<script type="text/javascript">
window.addEventListener('DOMContentLoaded',function(){
	wp.element.render(
		wp.element.createElement(<?=$app_name?>,<?=json_encode($props,0700)?>),
		document.getElementById("<?=$app_name?>")
	);
});
</script>
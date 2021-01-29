<?php
$path=dirname($attr['content_path']);
if($is_preview){
	if($f=cp::get_file_path($path.'/preview.php',cp::FROM_THEME|cp::FROM_CONFIG)){
		return include $f;
	}
}

$id=uniqid('app-');
if($f=cp::get_file_path($path.'/init.php',cp::FROM_THEME|cp::FROM_CONFIG)){include $f;}
$appFile=\cp::get_file_path($path.'/app.js',cp::FROM_THEME|cp::FROM_CONFIG);
cp::use_component('AppManager');
cp::enqueue_style($path.'/style.css');
?>
<div id="<?=$id?>"></div>
<script type="text/javascript">
jQuery(function($){
<?php include $appFile; ?>
wp.element.render(
	wp.element.createElement(app,<?=$attr['props']?>),
	document.getElementById("<?=$id?>")
);
});
</script>
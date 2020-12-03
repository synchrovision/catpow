<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<?php wp_head(); ?>
	<link rel="manifest" href="manifest.json">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;">
	<meta name="theme-color" content="#<?=get_theme_mod('background_color')?>"/>
	<script type="text/javascript">
		if('serviceWorker' in navigator) {
			navigator.serviceWorker.register('sw.js');
		};
	</script>
</head>

<body>
	PWA test
	<?php wp_footer(); ?>
</body>
</html>

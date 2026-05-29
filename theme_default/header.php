<?php namespace Catpow; ?>
<!DOCTYPE html>
<html>
	<head <?php language_attributes(); ?>>
		<meta charset="<?= bloginfo('charset');?>"/>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class('base') ?>>
		<?php wp_body_open(); ?>
		<header class="site-header">
			<div class="contents">
				<h1 class="logo">
					<?php the_custom_logo(); ?>
					<small><?= bloginfo('description');?></small>
				</h1>
			</div>
			<?php menu('primary'); ?>
			<?php menu('header'); ?>
			
			<div class="menu_button">
				<div class="line1"> </div>
				<div class="line2"> </div>
				<div class="line3"> </div>
			</div>
			<div class="back_to_top"></div>
		</header>
		<main class="<?php site_main_class(); ?>">	
<?php namespace Catpow; ?>
<header id="siteHeader" class="wp-block-catpow-siteheader">
	<div class="contents">
		<h1 class="logo">
			<?php the_custom_logo(); ?>
			<small><?= bloginfo('description');?></small>
		</h1>
	</div>
	<?php menu('primary'); ?>
	<?php menu('header/nav_menu'); ?>

	<div class="menu_button">
		<div class="icon"> </div>
	</div>
	<div class="back_to_top"></div>
	<script type="text/javascript">
		document.addEventListener('DOMContentLoaded',function(){
			var reseizeObserver=new ResizeObserver(function(entries){
				document.documentElement.style.setProperty('--cp-visible-area-top',entries[0].target.getBoundingClientRect().bottom+'px');
			});
			reseizeObserver.observe(document.getElementById('siteHeader'));
		});
	</script>
</header>
<?php
namespace Catpow;
$cls="wp-block-catpow-siteheader";
?>
<header id="siteHeader" class="<?=$cls?>">
	<div class="<?=$cls?>__contents">
		<h1 class="<?=$cls?>__contents-logo">
			<?php the_custom_logo(); ?>
			<small class="<?=$cls?>__contents-logo-catch"><?= bloginfo('description');?></small>
		</h1>
	</div>
	<div class="<?=$cls?>__menu has-color-scheme-inverted">
		<?php menu('header/nav_menu'); ?>
	</div>
	<div class="<?=$cls?>__contact">
		<?php menu('primary'); ?>
	</div>

	<button class="<?=$cls?>__button">
		<span class="<?=$cls?>__button-icon"> </span>
	</button>
	<button class="<?=$cls?>__back"></button>
	<script type="text/javascript">
		document.addEventListener('DOMContentLoaded',function(){
			const siteHeader=document.getElementById('siteHeader');
			siteHeader.querySelector('.<?=$cls?>__button').addEventListener('click',()=>{
				siteHeader.classList.toggle('is-open');
			});
			var reseizeObserver=new ResizeObserver(function(entries){
				document.documentElement.style.setProperty('--cp-page-top-offset',siteHeader.getBoundingClientRect().bottom+'px');
			});
			reseizeObserver.observe(siteHeader);
		});
	</script>
</header>
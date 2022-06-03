<?php namespace Catpow; ?>
<header id="siteHeader" class="wp-block-catpow-siteheader">
	<div class="contents">
		<h1 class="logo">
			<?php the_custom_logo(); ?>
			<small><?= bloginfo('description');?></small>
		</h1>
	</div>
	<?php menu('primary'); ?>
	
	<ul class="nav-menu">
	<?php foreach(loop('nav/header') as $id=>$menu_item): ?>
		<li class="<?=implode(' ',$menu_item->classes)?>">
			<a class="link" href="<?=$menu_item->url?>">
				<span class="icon"><?php output('icon');?></span>
				<h3 class="title">
					<?=$menu_item->title?>
				</h3>
			</a>
			<?php if(!children()->is_empty()): ?>
			<div class="children">
				<div class="contents">
					<div class="header">
						<div class="text">
							<span class="icon"><?php output('icon');?></span>
							<h3 class="title">
								<?=$menu_item->title?>
							</h3>
						</div>
						<div class="image">
							<?php output('image');?>
						</div>
					</div>
					<div class="body">
						<ul class="sub-menu depth1">
							<?php foreach(children()->loop() as $id_l1=>$menu_item_l1): ?>
							<li class="<?=implode(' ',$menu_item_l1->classes)?>">
								<a class="link" href="<?=$menu_item_l1->url?>">
									<span class="icon"><?php output('icon');?></span>
									<?=$menu_item_l1->title?>
								</a>
								<?php if(!children()->is_empty()): ?>
								<ul class="sub-menu depth2">
									<?php foreach(children()->loop() as $id_l2=>$menu_item_l2): ?>
									<li class="<?=implode(' ',$menu_item_l2->classes)?>">
										<a class="link" href="<?=$menu_item_l2->url?>">
											<?=$menu_item_l2->title?>
										</a>
									</li>
									<?php endforeach; ?>
								</ul>
								<?php endif; ?>
							</li>
							<?php endforeach; ?>
						</ul>
					</div>
				</div>
			</div>
			<?php endif; ?>
		</li>
	<?php endforeach; ?>
	</ul>

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
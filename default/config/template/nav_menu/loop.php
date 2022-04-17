<?php namespace Catpow; ?>
<ul class="nav-menu depth0">
<?php foreach(loop() as $id=>$menu_item): ?>
	<li class="<?=implode(' ',$menu_item->classes)?>">
		<a class="link" href="<?=$menu_item->url?>">
			<!--@icon-->
			<h3 class="title">
				<?=$menu_item->title?>
			</h3>
		</a>
		<?php if(!children()->is_empty()): ?>
		<div class="children">
			<div class="contents">
				<div class="header">
					<div class="text">
						<!--@icon-->
						<h3 class="title">
							<?=$menu_item->title?>
						</h3>
					</div>
					<!--@image-->
				</div>
				<div class="body">
					<ul class="sub-menu depth1">
						<?php foreach(children()->loop() as $id_l1=>$menu_item_l1): ?>
						<li class="<?=implode(' ',$menu_item_l1->classes)?>">
							<a class="link" href="<?=$menu_item_l1->url?>">
								<!--@icon-->
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
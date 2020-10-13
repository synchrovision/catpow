<?php
namespace Catpow;
?>

<ul class="collected">
	<?php foreach(\cp::$content->collect('<!--@meta_name select-->') as $label=>$loop): ?>
	<li class="collected_group">
		<h3 class="collected_label"><?=$label?></h3>
		<ul class="collected_items">
		<?php foreach($loop as $obj): ?>
			<li class="collected_item">
				<!--@image vga-->
				<div class="collected_item_text">
					<h3 class="collected_item_title"><!--@title--></h3>
					<p class="collected_item_desc"><!--@desc--></p>
				</div>
				<!--@link-->
			</li>
		<?php endforeach; ?>
		</ul>
	</li>
	<?php endforeach; ?>
</ul>

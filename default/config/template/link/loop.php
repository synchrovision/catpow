<?php
namespace Catpow;
cp::enqueue_style('blocks/listed/front_style.css');
?>
<ul class="wp-block-catpow-listed menu hasImage hasTitle hasText hasLink">
	<?php foreach(loop() as $obj): ?>
	<li class="item">
		<!--@image vga-->
		<div class="text">
			<h3><!--@title--></h3>
			<p><!--@desc--></p>
		</div>
		<!--@link-->
	</li>
	<?php endforeach; ?>
</ul>

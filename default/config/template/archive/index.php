<?php namespace Catpow; ?>
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


<?php namespace Catpow; ?>
<div class="cp-app-sample">
	<div class="cp-app-sample-header">
		<?= $props['title'];?>
	</div>
	<div class="cp-app-sample-body">
		<ul class="cp-app-sample-body-items">
			<?php foreach(loop('<!--path-->') as $id=>$object): ?>
			<li class="cp-app-sample-body-items__item">
				<!--@title-->
			</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<div class="cp-app-sample-footer">
	</div>
</div>

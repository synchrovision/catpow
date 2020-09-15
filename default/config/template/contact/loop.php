<?php namespace Catpow; ?>
<ul class="contact">
<?php foreach(loop() as $obj): ?>
	<li class="item">
		<h3><!--@title--></h3>
		<!--if:tel-->
		<div class="tel"><?php output('tel'); ?></div>
		<!--/if-->
		<!--if:email-->
		<div class="email"><?php output('email'); ?></div>
		<!--/if-->
		<!--if:business_day-->
		<div class="business_day"><?php output('business_day'); ?></div>
		<!--/if-->
		<!--if:business_hours-->
		<div class="business_hours"><?php output('business_hours'); ?></div>
		<!--/if-->
	</li>
<?php endforeach; ?>
</ul>
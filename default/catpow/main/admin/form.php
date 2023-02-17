<?php
namespace Catpow;
?>
<div class="cpform_section">
	<ul class="cp-admin-functions">
		<?php foreach(\cp::$use_functions??[] as $i=>$fnc):?>
		<li class="item"><?php §sec('catpow/'.$fnc.'/admin/sec_item.php',1); ?></li>
		<?php endforeach; ?>
	</ul>
</div>
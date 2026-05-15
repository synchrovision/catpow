<?php
namespace Catpow;
?>
<ul class="cp-admin-functions">
	<?php foreach(\cp::$use_functions??[] as $i=>$fnc):?>
	<li class="cp-admin-functions__item"><?php §sec('catpow/'.$fnc.'/admin/sec_item.php',1); ?></li>
	<?php endforeach; ?>
</ul>
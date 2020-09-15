<?php
namespace Catpow;
$fnc=this()->data_name;
this()->clear();
?>
<?php if($f=cp::get_file_url('functions/'.$fnc.'/image.svg')): ?>
<div class="image">
    <img src="<?=$f?>" alt="<?=$fnc?>">
</div>
<?php endif; ?>
<h2><?=$fnc;?></h2>
<?php if($f=cp::get_file_path('functions/'.$fnc.'/panel.php')): ?>
<ul class="buttons">
	<li><?php button('<i class="fas fa-list-alt"></i>パネルを開く','panel','lightbox'); ?></li>
</ul>
<?php endif; ?>
<?php if($f=cp::get_file_path('functions/'.$fnc.'/desc.php')): ?>
<div class="desc">
    <?php include $f; ?>
</div>
<?php endif; ?>
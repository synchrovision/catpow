<?php $cb=function($attr)use(&$cb){?>
<!-- wp:list -->
<<?=empty($attr['ordered'])?'ul':'ol'?> class="<?=$attr['classes']??'is-style-caret'?>">
<?php foreach($attr['items'] as $item): ?>
<!-- wp:list-item -->
<li><?=$item['content']??''?><?=empty($item['child'])?'':$cb($item['child'])?></li>
<!-- /wp:list-item -->
<?php endforeach; ?>
</<?=empty($attr['ordered'])?'ul':'ol'?>>
<!-- /wp:list -->
<?php }; ?>
<?=$cb($attr)?>
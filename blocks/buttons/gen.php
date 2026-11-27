<?php
use Catpow\util\BlockCode;

$name='catpow/buttons';
$comment=BlockCode::commentAttributes($name,$attr,['doLoop','loopParam','loopCount','content_path','query','isTemplate','vars']);
$attr=BlockCode::defaults($name,$attr);
$attr['classes']=BlockCode::classes($attr['classes']??'is-level3 has-item-size-medium','cp-buttons');
ob_start();
?>
<ul<?=BlockCode::root('buttons',$attr)?>>
<?php foreach($attr['items']??[] as $item): ?>
	<?=BlockCode::button($name,$item,false)?>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

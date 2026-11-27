<?php
use Catpow\util\BlockCode;

$name='catpow/formbuttons';
$comment=BlockCode::commentAttributes($name,$attr,['doLoop','loopParam','loopCount','content_path','query','isTemplate','vars']);
$attr=BlockCode::defaults($name,$attr);
$attr['classes']=BlockCode::classes($attr['classes']??'is-level3 has-item-size-medium','cp-buttons');
ob_start();
?>
<ul<?=BlockCode::root('formbuttons',$attr)?>>
<?php foreach($attr['items']??[] as $item): ?>
	<?=BlockCode::button($name,$item,true)?>
<?php endforeach; ?>
</ul>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

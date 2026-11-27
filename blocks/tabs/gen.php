<?php
use Catpow\util\BlockCode;

$name='catpow/tabs';
$prefix='wp-block-catpow-tabs';
$attr+=['classes'=>'is-level3 is-type-panel is-style-flat'];
$items=array_values($attr['items']??[]);
$vars=array_merge((array)($attr['vars']??[]),['--current-index'=>0,'--length'=>count($items)]);
$comment=BlockCode::commentAttributes($name,$attr,['vars','HeadingTag']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('tabs',$attr,BlockCode::context('catpow/tabs',['currentIndex'=>0,'currentTabId'=>'{$uid}-0','length'=>count($items)],[
	'data-wp-init'=>'callbacks.initBlock','style'=>BlockCode::style($vars)
]))?>><ul class="<?=$prefix?>__tab" role="tablist">
<?php foreach($items as $index=>$item): ?>
	<li id="{$uid}-tab-<?=$index?>" class="<?=$prefix?>__tab-item" data-wp-class--is-active="callbacks.isActiveTab" aria-controls="{$uid}-<?=$index?>"
		data-wp-bind--aria-selected="callbacks.isActiveTab" data-wp-on--click="actions.onClickTab" style="--index:<?=$index?>" data-index="<?=$index?>" role="tab">
		<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__tab-item-title',$item['title']??'')?>
	</li>
<?php endforeach; ?>
</ul>
<div class="<?=$prefix?>__contents"><?=$children?></div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

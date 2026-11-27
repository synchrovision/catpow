<?php
use Catpow\util\BlockCode;

$name='catpow/accordion';
$prefix='wp-block-catpow-accordion';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','isTemplate','vars']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('accordion',$attr,BlockCode::context('catpow/accordion',['accordionId'=>'{$uid}'],[
	'id'=>'{$uid}','data-wp-init'=>'callbacks.initBlock','data-wp-class--is-open'=>'callbacks.isOpen'
]))?>><div id="{$uid}-header" class="<?=$prefix?>__header" role="button" data-wp-on--click="actions.onClickToggle"
	data-wp-bind--aria-expanded="callbacks.isOpen" aria-controls="{$uid}-contents" tabindex="0">
	<?php if($has('has-image')): ?>
		<div class="<?=$prefix?>__header-image"><?=BlockCode::templateImage($attr,$attr,'cp-responsiveimage','image')?></div>
	<?php endif; ?>
	<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__header-title',$attr['title']??'')?>
	<span class="<?=$prefix?>__header-icon"></span>
</div>
<div id="{$uid}-contents" class="<?=$prefix?>__contents" data-wp-bind--aria-hidden="!callbacks.isOpen">
	<div class="<?=$prefix?>__contents-body"><?=$children?></div>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

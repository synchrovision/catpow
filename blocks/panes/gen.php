<?php
use Catpow\util\BlockCode;

$name='catpow/panes';
$prefix='wp-block-catpow-panes';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('panes',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<div class="<?=$prefix?>__item-image">
			<?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','image',false)?>
		</div>
		<div class="<?=$prefix?>__item-contents">
			<div class="<?=$prefix?>__item-contents-text">
				<?php if($has('has-symbol')): ?>
					<?=BlockCode::icon($prefix.'__item-contents-text-symbol',$item)?>
				<?php endif; ?>
				<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-contents-text-title',$item['title']??'')?>
				<?=BlockCode::element('p',$prefix.'__item-contents-text-caption',$item['titleCaption']??'')?>
			</div>
		</div>
		<?php if($has('has-link')): ?>
			<?=BlockCode::link($prefix.'__item-link',$item,'linkText')?>
		<?php endif; ?>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

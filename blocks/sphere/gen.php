<?php
use Catpow\util\BlockCode;

$name='catpow/sphere';
$prefix='wp-block-catpow-sphere';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('sphere',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<?php if($has('has-image')): ?>
			<div class="<?=$prefix?>__item-image">
				<?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','',false)?>
			</div>
		<?php endif; ?>
		<div class="<?=$prefix?>__item-texts">
			<?php if($has('has-icon')): ?>
				<?=BlockCode::icon($prefix.'__item-texts-icon',$item)?>
			<?php endif; ?>
			<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-texts-title',$item['title']??'')?>
			<?php if($has('has-caption')): ?>
				<?=BlockCode::element('p',$prefix.'__item-texts-caption',$item['caption']??'')?>
			<?php endif; ?>
			<?php if($has('has-text')): ?>
				<?=BlockCode::element('p',$prefix.'__item-texts-text',$item['text']??'')?>
			<?php endif; ?>
		</div>
	</li>
<?php endforeach; ?>
</ul>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

<?php
use Catpow\util\BlockCode;

$name='catpow/pricelist';
$prefix='wp-block-catpow-pricelist';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('pricelist',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
	$hasItem=static fn($flag)=>BlockCode::has($itemClass,$flag);
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<?php if($hasItem('has-image')): ?>
			<div class="<?=$prefix?>__item-image">
				<?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','image',false)?>
			</div>
		<?php endif; ?>
		<?=BlockCode::element('div',$prefix.'__item-title',$item['title']??'')?>
		<?php if(!$hasItem('is-heading')): ?>
			<?=BlockCode::element('div',$prefix.'__item-line','')?>
			<?=BlockCode::element('div',$prefix.'__item-price',$item['price']??'')?>
		<?php endif; ?>
		<?php if($hasItem('has-caption')): ?>
			<?=BlockCode::element('div',$prefix.'__item-caption',$item['caption']??'')?>
		<?php endif; ?>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

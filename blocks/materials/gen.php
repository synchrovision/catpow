<?php
use Catpow\util\BlockCode;

$name='catpow/materials';
$prefix='wp-block-catpow-materials';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('materials',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
	$hasItem=static fn($flag)=>BlockCode::has($itemClass,$flag);
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
<?php if($hasItem('has-label')): ?><?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-label',$item['label']??'')?><?php endif; ?>
		<ul class="<?=$prefix?>__item-items">
		<?php foreach($item['items']??[] as $sub):
			$class=BlockCode::classes($prefix.'__item-items-item',$sub['classes']??'');
		?>
			<li class="<?=esc_attr($class)?>">
				<?=BlockCode::element(BlockCode::tag($attr['SubHeadingTag']??'h4','h4'),$prefix.'__item-items-item-title',$sub['title']??'')?>
				<div class="<?=$prefix?>__item-items-item-line"></div>
				<?=BlockCode::element('div',$prefix.'__item-items-item-amount',$sub['amount']??'')?>
				<?php if(BlockCode::has($class,'has-caption')): ?><?=BlockCode::element('div','caption',$sub['caption']??'')?><?php endif; ?>
			</li>
		<?php endforeach; ?>
		</ul>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

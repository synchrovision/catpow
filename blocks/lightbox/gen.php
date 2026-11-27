<?php
use Catpow\util\BlockCode;

$name='catpow/lightbox';
$prefix='wp-block-catpow-lightbox';
$comment=BlockCode::commentAttributes($name,$attr,['vars','sliderVars','HeadingTag','SliderHeadingTag','isTemplate','doLoop','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
$items=array_values($attr['items']??[]);
$has=static fn($flag)=>BlockCode::has($attr['classes']??'',$flag);
$sliderClass=$attr['sliderClasses']??$prefix.'__slider';
$sliderBase=$prefix.'__slider';
$sliderHas=static fn($flag)=>BlockCode::has($sliderClass,$flag);
$context=BlockCode::context('catpow/lightbox',['blockId'=>'{$uid}','length'=>count($items)],[
	'data-wp-init'=>'callbacks.initBlock','data-wp-style----current'=>'callbacks.getCurrentIndex',
	'style'=>BlockCode::style(array_merge((array)($attr['vars']??[]),['--length'=>count($items),'--current'=>-1]))
]);
ob_start();
?>
<div<?=BlockCode::root('lightbox',$attr,$context)?>>
	<ul class="<?=$prefix?>__items">
	<?php foreach($items as $index=>$item): ?>
		<li class="<?=esc_attr(BlockCode::classes($prefix.'__items-item',$item['classes']??''))?>" data-index="<?=$index?>" data-wp-on--click="actions.open"
			data-wp-class--is-active="callbacks.isCurrent" aria-controls="{$uid}-slide-<?=$index?>" data-wp-bind--aria-selected="callbacks.isCurrent">
			<div class="<?=$prefix?>__items-item-image"><?=BlockCode::templateImage($item,$attr,$prefix.'__items-item-image-img','thumbnail')?></div>
			<?php if($has('has-title')): ?>
				<div class="<?=$prefix?>__items-item-text">
					<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__items-item-text-title',$item['title']??'')?>
					<?php if($has('has-caption')): ?><?=BlockCode::element('p',$prefix.'__items-item-text-caption',$item['caption']??'')?><?php endif; ?>
				</div>
			<?php endif; ?>
			<div class="<?=$prefix?>__contents">
				<?php if($sliderHas('has-title')): ?><?=BlockCode::element(BlockCode::tag($attr['SliderHeadingTag']??'h4','h4'),$prefix.'__contents-title',$item['subTitle']??$item['sliderTitle']??'')?><?php endif; ?>
				<?php if($sliderHas('has-image')): ?><div class="<?=$prefix?>__contents-image"><?=BlockCode::templateImage($item,$attr,$prefix.'__contents-image-img')?></div><?php endif; ?>
				<?php if($sliderHas('has-text')): ?><?=BlockCode::element('div',$prefix.'__contents-text',$item['text']??$item['sliderText']??'')?><?php endif; ?>
			</div>
		</li>
	<?php endforeach; ?>
	</ul>
	<div<?=BlockCode::attrs(['id'=>'{$uid}','class'=>$sliderClass,'style'=>BlockCode::style($attr['sliderVars']??[])])?>>
		<ul class="<?=$sliderBase?>-items">
		<?php foreach($items as $index=>$item): ?>
			<li id="{$uid}-slide-<?=$index?>" class="<?=$sliderBase?>-items-item" data-index="<?=$index?>" data-wp-class--is-active="callbacks.isCurrent" data-wp-bind--inert="!callbacks.isCurrent"></li>
		<?php endforeach; ?>
		</ul>
		<div class="<?=$sliderBase?>-control">
			<div class="<?=$sliderBase?>-control-prev" data-wp-class--is-active="callbacks.hasPrev" data-wp-on--click="actions.prev"></div>
			<ul class="<?=$sliderBase?>-control-dots" data-wp-class--is-active="callbacks.hasDots">
			<?php foreach($items as $index=>$item): ?>
				<li class="<?=$sliderBase?>-control-dots-dot" data-index="<?=$index?>" data-wp-class--is-active="callbacks.isCurrent" data-wp-on--click="actions.goto"
					aria-controls="{$uid}-slide-<?=$index?>" data-wp-bind--aria-selected="callbacks.isCurrent" style="--index:<?=$index?>"></li>
			<?php endforeach; ?>
			</ul>
			<div class="<?=$sliderBase?>-control-next" data-wp-class--is-active="callbacks.hasNext" data-wp-on--click="actions.next"></div>
		</div>
	</div>
</div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

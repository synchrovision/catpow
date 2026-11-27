<?php
use Catpow\util\BlockCode;

$name='catpow/listed';
$prefix='wp-block-catpow-listed';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('listed',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'',$attr['commonItemClasses']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass,'data-class'=>$item['classes']??null])?>>
<?php if($has('has-image')): ?><div class="<?=$prefix?>__item-image"><?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','',false)?></div><?php endif; ?><?php if($has('has-header')): ?><header<?=BlockCode::attrs(['class'=>BlockCode::classes($prefix.'__item-header',$attr['commonItemHeaderClasses']??'')])?>>
		<?php if($has('has-counter')): ?>
			<?=BlockCode::counter($prefix.'__item-header-counter',$index+(1),$attr['countPrefix']??'',$attr['countSuffix']??'')?>
		<?php endif; ?>
		<?php if($has('has-header-image')): ?>
			<div class="<?=$prefix?>__item-header-image">
				<?=BlockCode::templateImage($item,$attr,$prefix.'__item-header-image-img','headerImage',false)?>
			</div>
		<?php endif; ?>
		<div class="<?=$prefix?>__item-header-text">
			<?php if($has('has-title')): ?>
				<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-header-text-title',$item['title']??'')?>
				<?php if($has('has-title-caption')): ?>
					<?=BlockCode::element('p',$prefix.'__item-header-text-caption',$item['titleCaption']??'')?>
				<?php endif; ?>
			<?php endif; ?>
		</div>
		</header>
		<?php endif; ?>
		<?php if($has('has-sub-image')||$has('has-sub-title')||$has('has-text')||$has('has-link')): ?>
			<div class="<?=$prefix?>__item-contents">
				<?php if($has('has-sub-counter')): ?>
					<?=BlockCode::counter($prefix.'__item-contents-subcounter',$index+(1),$attr['subCountPrefix']??'',$attr['subCountSuffix']??'')?>
				<?php endif; ?>
				<?php if($has('has-sub-image')): ?>
					<div class="<?=$prefix?>__item-contents-image">
						<?=BlockCode::templateImage($item,$attr,$prefix.'__item-contents-image-img','subImage',false)?>
					</div>
				<?php endif; ?>
				<?php if($has('has-sub-title')): ?>
					<?=BlockCode::element('p',$prefix.'__item-contents-subtitle',$item['subTitle']??'')?>
				<?php endif; ?>
				<?php if($has('has-text')): ?>
					<?=BlockCode::element('p',$prefix.'__item-contents-text',$item['text']??'')?>
				<?php endif; ?>
				<?php if($has('has-link')): ?>
					<?=BlockCode::button($name,$item,false,'div')?>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

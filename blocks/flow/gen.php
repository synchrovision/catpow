<?php
use Catpow\util\BlockCode;

$name='catpow/flow';
$prefix='wp-block-catpow-flow';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('flow',$attr)?>>
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
			<header class="<?=$prefix?>__item-texts-header">
				<?php if($has('has-counter')): ?>
					<?=BlockCode::counter($prefix.'__item-texts-header-counter',$index+(1),$attr['countPrefix']??'',$attr['countSuffix']??'')?>
				<?php endif; ?>
				<div class="<?=$prefix?>__item-texts-header-text">
					<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-texts-header-text-title',$item['title']??'')?>
					<?php if($has('has-title-caption')): ?>
						<?=BlockCode::element('p',$prefix.'__item-texts-header-text-caption',$item['titleCaption']??'')?>
					<?php endif; ?>
				</div>
			</header>
			<?=BlockCode::element('div',$attr['contentsClasses']??$prefix.'__item-texts-contents',BlockCode::flowContents($attr,$item,$prefix))?>
			<?php if($has('has-link')): ?>
				<?=BlockCode::link($prefix.'__item-texts-link',$item,null)?>
			<?php endif; ?>
		</div>
	</li>
<?php endforeach; ?>
</ul>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

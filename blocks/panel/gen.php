<?php
use Catpow\util\BlockCode;

$name='catpow/panel';
$prefix='wp-block-catpow-panel';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('panel',$attr)?>><ul class="<?=$prefix?>__items">
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
	$hasItem=static fn($flag)=>BlockCode::has($itemClass,$flag);
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<?php if($hasItem('has-image')): ?>
			<div class="<?=$prefix?>__item-image">
				<?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','',false)?>
			</div>
		<?php endif; ?>
		<div class="<?=$prefix?>__item-texts">
			<?php if($hasItem('has-icon')): ?>
				<?=BlockCode::icon($prefix.'__item-texts-icon',$item)?>
			<?php endif; ?>
			<?php if($hasItem('has-title')): ?>
				<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-texts-title',$item['title']??'')?>
			<?php endif; ?>
			<?php if($hasItem('has-text')): ?>
				<?=BlockCode::element('p',$prefix.'__item-texts-text',$item['text']??'')?>
			<?php endif; ?>
			<?php if($hasItem('has-link')): ?>
				<div class="<?=$prefix?>__item-texts-link">
					<?=BlockCode::element('a',null,' ',['href'=>$item['linkUrl']??null,'target'=>$hasItem('link-external')?'_brank':null,'rel'=>$hasItem('link-external')?'noopener noreferrer':'bookmark'])?>
				</div>
			<?php endif; ?>
		</div>
	</li>
<?php endforeach; ?>
</ul></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

<?php
use Catpow\util\BlockCode;

$name='catpow/slider';
$prefix='wp-block-catpow-slider';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['vars','HeadingTag','doLoop','isTemplate','content_path','query','loopCount']);
$attr=BlockCode::defaults($name,$attr);
$items=array_values($attr['items']??[]);
$config=$attr['config']??'{}';
if(!is_string($config)){$config=wp_json_encode($config);}
ob_start();
?>
<div<?=BlockCode::root('slider',$attr,['data-wp-interactive'=>'catpow/slider','data-wp-context'=>$config,'data-wp-init'=>'callbacks.initBlock'])?>><ul class="<?=$prefix?>__contents">
<?php foreach($items as $item): ?>
	<li<?=BlockCode::attrs(['class'=>BlockCode::classes($prefix.'__contents-item',$item['classes']??'')])?>>
		<div class="<?=$prefix?>__contents-item-body">
			<?php if($has('has-image')): ?><div class="<?=$prefix?>__contents-item-body-image">
				<?=BlockCode::templateImage($item,$attr,$prefix.'__contents-item-body-image-img')?>
			</div><?php endif; ?>
			<?php if($has('has-texts')): ?><div class="<?=$prefix?>__contents-item-body-texts">
				<?php if($has('has-title')): ?><?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__contents-item-body-texts-title',$item['title']??'')?><?php endif; ?>
				<?php if($has('has-caption')): ?><?=BlockCode::element('p',$prefix.'__contents-item-body-texts-caption',$item['caption']??'')?><?php endif; ?>
				<?php if($has('has-text')): ?><?=BlockCode::element('p',$prefix.'__contents-item-body-texts-text',$item['text']??'')?><?php endif; ?>
				<?php if($has('has-link')): ?><?=BlockCode::link($prefix.'__contents-item-body-texts-link',$item,'linkText')?><?php endif; ?>
			</div><?php endif; ?>
		</div>
	</li>
<?php endforeach; ?>
</ul>
<div<?=BlockCode::attrs(['class'=>$attr['controlClasses']??$prefix.'__control','data-config'=>$config])?>>
	<?php if($has('has-arrows')): ?><div class="<?=$prefix?>__control-arrow is-arrow-prev" data-wp-on--click="actions.prev"></div><?php endif; ?>
	<?php if($has('has-dots')): ?><ul class="<?=$prefix?>__control-dots">
		<?php foreach($items as $index=>$item): ?>
			<li class="<?=$prefix?>__control-dots-dot" data-wp-on--click="actions.onClickItem" data-wp-class--is-active="callbacks.isActive" data-index="<?=$index?>"></li>
		<?php endforeach; ?>
	</ul><?php endif; ?>
	<?php if($has('has-arrows')): ?><div class="<?=$prefix?>__control-arrow is-arrow-next" data-wp-on--click="actions.next"></div><?php endif; ?>
</div></div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

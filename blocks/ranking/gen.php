<?php
use Catpow\util\BlockCode;

$name='catpow/ranking';
$prefix='wp-block-catpow-ranking';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('ranking',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
<div class="<?=$prefix?>__item-image"><?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','',false)?></div><header class="<?=$prefix?>__item-header"><?php if($has('has-rank')): ?>
		<div class="<?=$prefix?>__item-header-rank">
			<?php $rank=$index+(int)($attr['rankStart']??1); ?>
			<?php if(!empty($attr['rankPrefix'])): ?><?=BlockCode::element('span',$prefix.'__item-header-rank-prefix',esc_html($attr['rankPrefix']))?><?php endif; ?>
			<?=BlockCode::element('data',$prefix.'__item-header-rank-number',$rank,['value'=>$rank])?>
			<?php if(!empty($attr['rankSuffix'])): ?><?=BlockCode::element('span',$prefix.'__item-header-rank-suffix',esc_html($attr['rankSuffix']))?><?php endif; ?>
		</div><?php endif; ?><?php if($has('has-rate')): ?>
		<div class="<?=$prefix?>__item-header-rate">
			<?php $rate=(float)($item['rate']??0); ?>
			<?php if(!empty($attr['rateLabel'])): ?><?=BlockCode::element('span',$prefix.'__item-header-rate-label',esc_html($attr['rateLabel']))?><?php endif; ?>
			<data class="<?=$prefix?>__item-header-rate-data" value="<?=$rate?>" style="--rate:<?=$rate?>">
				<span class="<?=$prefix?>__item-header-rate-data-number"><?=number_format($rate,1)?></span><span class="<?=$prefix?>__item-header-rate-data-stars"></span>
			</data>
		</div>
		<?php endif; ?>
		<div class="<?=$prefix?>__item-header-text">
			<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-header-text-title',$item['title']??'')?>
			<?php if($has('has-title-caption')): ?>
				<?=BlockCode::element('p',$prefix.'__item-header-text-caption',$item['titleCaption']??'')?>
			<?php endif; ?>
		</div>
		</header>
		<div<?=BlockCode::attrs(['class'=>$attr['contentsClasses']??$prefix.'__item-contents'])?>>
		<?php if($has('has-lead')): ?>
			<?=BlockCode::element(BlockCode::tag($attr['SubHeadingTag']??'h3','h3'),$prefix.'__item-contents-lead',$item['lead']??'')?>
		<?php endif; ?>
		<?=BlockCode::element('p',$prefix.'__item-contents-text',$item['text']??'')?>
		<?php if($has('has-link')): ?>
			<?=BlockCode::link($prefix.'__item-contents-link',$item,'linkText')?>
		<?php endif; ?>
		</div>
	</li>
<?php endforeach; ?>
</ul>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

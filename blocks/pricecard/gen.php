<?php
use Catpow\util\BlockCode;

$name='catpow/pricecard';
$prefix='wp-block-catpow-pricecard';
$itemBase=$prefix.'__item';
$comment=BlockCode::commentAttributes($name,$attr,['vars','HeadingTag','SubHeadingTag','doLoop','isTemplate','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
$has=static fn($flag)=>BlockCode::has($attr['classes']??'',$flag);
$priceBase=$itemBase.'-header-text-price';
$price=static function($type,$value)use($has,$attr,$priceBase){
	$class=$priceBase.'-'.$type;
	$unit=BlockCode::element('span',$class.'-unit',esc_html($attr['priceUnit']??'¥'));
	return BlockCode::element('span',$class,
		($has('has-unit-before')?$unit:'').
		BlockCode::element('span',$class.'-number',esc_html($value)).
		($has('has-unit-after')?$unit:'')
	);
};
ob_start();
?>
<ul<?=BlockCode::root('pricecard',$attr)?>>
<?php foreach($attr['items']??[] as $item):
	$class=BlockCode::classes($itemBase,$item['classes']??'');
?>
	<li class="<?=esc_attr($class)?>">
		<?php if($has('has-image')): ?><div class="<?=$itemBase?>-image"><?=BlockCode::templateImage($item,$attr)?></div><?php endif; ?>
		<header<?=BlockCode::attrs(['class'=>$attr['headerClasses']??$itemBase.'-header'])?>>
			<div class="<?=$itemBase?>-header-text">
				<?php if($has('has-title')): ?>
					<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$itemBase.'-header-text-title',$item['title']??'')?>
					<?php if($has('has-title-caption')): ?><?=BlockCode::element('p',$itemBase.'-header-text-caption',$item['titleCaption']??'')?><?php endif; ?>
				<?php endif; ?>
				<div class="<?=$priceBase?>">
					<?php if(BlockCode::has($class,'is-discount')): ?><?=$price('listprice',$item['listPrice']??'')?><?php endif; ?>
					<?=$price('saleprice',$item['salePrice']??'')?>
					<?=BlockCode::element('span',$priceBase.'-caption',$attr['priceCaption']??'')?>
				</div>
			</div>
		</header>
		<?php if($has('has-sub-title')||$has('has-text')||$has('has-spec')||$has('has-link')): ?>
			<div<?=BlockCode::attrs(['class'=>$attr['contentsClasses']??$itemBase.'-contents'])?>>
				<?php if($has('has-sub-title')): ?><?=BlockCode::element(BlockCode::tag($attr['SubHeadingTag']??'h4','h4'),$itemBase.'-contents-subtitle',$item['subTitle']??'')?><?php endif; ?>
				<?php if($has('has-text')): ?><?=BlockCode::element('p',$itemBase.'-contents-text',$item['text']??'')?><?php endif; ?>
				<?php if($has('has-spec')): ?>
					<dl class="<?=$itemBase?>-contents-spec">
					<?php foreach($item['specLabels']??[] as $index=>$label): ?>
						<?=BlockCode::element('dt',$itemBase.'-contents-spec-label',$label['text']??'')?>
						<?=BlockCode::element('dd',$itemBase.'-contents-spec-value',$item['specValues'][$index]['text']??'')?>
					<?php endforeach; ?>
					</dl>
				<?php endif; ?>
				<?php if($has('has-link')): ?><?=BlockCode::link($itemBase.'-contents-link',['linkUrl'=>$item['linkUrl']??'','text'=>esc_html($attr['linkText']??'')],'text')?><?php endif; ?>
			</div>
		<?php endif; ?>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

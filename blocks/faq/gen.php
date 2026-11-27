<?php
use Catpow\util\BlockCode;

$name='catpow/faq';
$prefix='wp-block-catpow-faq';
$comment=BlockCode::commentAttributes($name,$attr,['vars']);
$attr=BlockCode::defaults($name,$attr);
$has=static fn($flag)=>BlockCode::has($attr['classes']??'',$flag);
$questions=[];
$context=BlockCode::context('faq',['openItems'=>(object)[]],['data-wp-init'=>'callbacks.initBlock']);
ob_start();
?>
<ul<?=BlockCode::root('faq',$attr,$context)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$id='{$uid}-'.($index+1);
	$itemBase=$prefix.'__item';
	$title=BlockCode::rich($item['title']??'');
	$subtitle=BlockCode::rich($item['subTitle']??'');
	$text=BlockCode::rich($item['text']??'');
	$questions[]=[
		'@type'=>'Question','name'=>html_entity_decode(strip_tags($title),ENT_QUOTES|ENT_HTML5,'UTF-8'),
		'acceptedAnswer'=>['@type'=>'Answer','text'=>($has('has-sub-title') && $subtitle!==''?'<h4>'.$subtitle.'</h4>':'').$text]
	];
?>
	<li id="<?=$id?>" class="<?=esc_attr(BlockCode::classes($itemBase,$item['classes']??''))?>" data-wp-class--is-open="callbacks.isOpen" data-index="<?=$index?>">
		<header id="<?=$id?>-header" class="<?=$itemBase?>-header" data-wp-on--click="actions.onClickToggle" data-index="<?=$index?>">
			<?php if($has('has-counter')): ?><?=BlockCode::counter($itemBase.'-header-counter',$index+1,$attr['counterPrefix']??'',$attr['counterSuffix']??'')?><?php endif; ?>
			<?php if($has('has-image')): ?>
				<div class="<?=$itemBase?>-header-image"><img<?=BlockCode::attrs(['class'=>$itemBase.'-header-image-img','src'=>$item['src']??null,'alt'=>$item['alt']??null])?>/></div>
			<?php endif; ?>
			<div class="<?=$itemBase?>-header-text">
				<?=BlockCode::element('h3',$itemBase.'-header-text-title',$title)?>
				<?php if($has('has-title-caption')): ?><?=BlockCode::element('p',$itemBase.'-header-text-caption',$item['titleCaption']??'')?><?php endif; ?>
			</div>
			<?php if($has('is-accordion')): ?>
				<button class="<?=$itemBase?>-header-button" data-wp-bind--aria-expanded="callbacks.isOpen" data-wp-on--click="actions.onClickToggle" aria-controls="<?=$id?>-contents" data-index="<?=$index?>"></button>
			<?php endif; ?>
		</header>
		<div id="<?=$id?>-contents" class="<?=$itemBase?>-contents" data-wp-bind--aria-hidden="!callbacks.isOpen" data-index="<?=$index?>">
			<div class="<?=$itemBase?>-contents-body">
				<?php if($has('has-sub-title')): ?><?=BlockCode::element('h4',$itemBase.'-contents-body-subtitle',$subtitle)?><?php endif; ?>
				<?=BlockCode::element('p',$itemBase.'-contents-body-text',$text)?>
			</div>
		</div>
	</li>
<?php endforeach; ?>
</ul>
<?=BlockCode::jsonLd(['@context'=>'https://schema.org','@type'=>'FAQPage','mainEntity'=>$questions])?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

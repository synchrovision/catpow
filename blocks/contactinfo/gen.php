<?php
use Catpow\util\BlockCode;

$name='catpow/contactinfo';
$prefix='wp-block-catpow-contactinfo';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','vars','doLoop','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('contactinfo',$attr)?>><?php
$tag=BlockCode::tag($attr['HeadingTag']??'h3','h3');
$subtag='h'.min(6,((int)substr($tag,1))+1);
$itemsClass=$attr['itemsClasses']??$prefix.'__items';
$itemClass=explode(' ',$itemsClass)[0].'-item';
?>
<?php if($has('has-title')): ?><?=BlockCode::element($tag,$prefix.'__title',$attr['title']??'')?><?php endif; ?>
<?php if($has('has-lead')): ?><?=BlockCode::element('p',$prefix.'__lead',$attr['lead']??'')?><?php endif; ?>
<ul class="<?=esc_attr($itemsClass)?>">
<?php foreach($attr['items']??[] as $item): ?>
	<li class="<?=esc_attr($itemClass)?>">
		<?php if($has('has-item-title')): ?><?=BlockCode::element($subtag,$itemClass.'-title',$item['title']??'')?><?php endif; ?>
		<?php if($has('has-item-lead')): ?><?=BlockCode::element('p',$itemClass.'-lead',$item['lead']??'')?><?php endif; ?>
		<?php
		$link=BlockCode::element('span',$itemClass.'-link-text',$item['link']??'');
		if($has('has-icon')){$link=BlockCode::icon($itemClass.'-link-icon',$attr).$link;}
		echo BlockCode::element('a',$itemClass.'-link cp-link',$link,['href'=>$item['linkHref']??$item['linkUrl']??'']);
		?>
		<?php if($has('has-item-caption')): ?><?=BlockCode::element('small',$itemClass.'-caption',$item['caption']??'')?><?php endif; ?>
	</li>
<?php endforeach; ?>
</ul>
<?php if($has('has-lead')): ?><?=BlockCode::element('small',$prefix.'__caption',$attr['caption']??'')?><?php endif; ?></div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

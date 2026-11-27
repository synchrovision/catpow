<?php
use Catpow\util\BlockCode;

$name='catpow/accessmap';
$prefix='wp-block-catpow-accessmap';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('accessmap',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<div<?=BlockCode::attrs(['class'=>$itemClass])?>>
<?php
$url=BlockCode::mapUrl($attr,$item);
?>
<div class="<?=$prefix?>__item-map">
	<iframe<?=BlockCode::attrs(['class'=>$prefix.'__item-map-gmap','src'=>$url,'data-ll'=>$item['ll']??null,'data-q'=>$item['q']??null])?>></iframe>
		</div>
		<div class="<?=$prefix?>__item-access">
			<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-access-title',$item['title']??'')?>
			<?=BlockCode::element('div',$prefix.'__item-access-address',$item['address']??'')?>
			<?php if($has('has-tel')): ?>
				<?=BlockCode::element('div',$prefix.'__item-access-tel',$item['tel']??'')?>
			<?php endif; ?>
			<?php if($has('has-mail')): ?>
				<?=BlockCode::element('div',$prefix.'__item-access-mail',$item['mail']??'')?>
			<?php endif; ?>
			<?php if($has('has-site')): ?>
				<?=BlockCode::element('div',$prefix.'__item-access-site',$item['site']??'')?>
			<?php endif; ?>
			<?=BlockCode::element('div',$prefix.'__item-access-info',$item['info']??'')?>
		</div>
	</div>
<?php endforeach; ?>
</div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

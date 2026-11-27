<?php
use Catpow\util\BlockCode;

$name='catpow/graphics';
$prefix='wp-block-catpow-graphics';
$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
$id=$attr['id']??'';
if(!preg_match('/^[a-zA-Z_][a-zA-Z0-9_-]*$/D',$id)){$id='graphics-'.\cp::rand_id(4);}
$hasBase=BlockCode::has($attr['classes']??'','has-base-image');
$heights=$attr['heights']??'60,80,120';
$css=['','',''];
if(!$hasBase){
	foreach(array_slice(explode(',',$heights),0,3) as $device=>$height){
		$css[$device].='#'.$id.' .base{padding-top:'.(float)$height.'%;}';
	}
}
ob_start();
?>
<div<?=BlockCode::root('graphics',$attr,['id'=>$id,'data-heights'=>$heights])?>>
	<div class="<?=$prefix?>__base"><?= $hasBase?BlockCode::image($attr,'cp-responsiveimage','',true):'' ?></div>
	<?php foreach(array_values($attr['items']??[]) as $index=>$item):
		$itemId=$id.'_item_'.$index;
		$rect=$item['rect']??'';
		foreach(array_slice(explode(',',$rect),0,3) as $device=>$bounds){
			$values=preg_split('/\s+/',trim($bounds));
			if(count($values)!==4){continue;}
			[$left,$top,$width,$height]=array_map('floatval',$values);
			$css[$device].="#{$itemId}{left:{$left}%;top:{$top}%;width:{$width}%;height:{$height}%;}";
		}
		$class=BlockCode::classes($prefix.'__item',$item['classes']??'');
		$tag=empty($item['link'])?'span':'a';
	?>
		<<?=$tag?><?=BlockCode::attrs(['id'=>$itemId,'class'=>$class,'href'=>$item['link']??null,'data-rect'=>$rect])?>>
		<?php if(BlockCode::has($class,'is-text')): ?>
			<span class="<?=$prefix?>__item-body">
			<?php foreach(['title'=>'h3','lead'=>'h4','text'=>'p'] as $key=>$element): ?>
				<?php if(BlockCode::has($class,'has-'.$key)): ?><?=BlockCode::element($element,$prefix.'__item-body-'.$key,$item[$key]??'')?><?php endif; ?>
			<?php endforeach; ?>
			</span>
		<?php else: ?>
			<?=BlockCode::image($item,'cp-responsiveimage','',true)?>
		<?php endif; ?>
		</<?=$tag?>>
	<?php endforeach; ?>
	<style><?=$css[0]?>@media(max-width:1280px){<?=$css[1]?>}@media(max-width:640px){<?=$css[2]?>}</style>
</div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

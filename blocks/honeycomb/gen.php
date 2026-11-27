<?php
use Catpow\util\BlockCode;

$name='catpow/honeycomb';
$prefix='wp-block-catpow-honeycomb';
$comment=BlockCode::commentAttributes($name,$attr,['vars']);
$id=$attr['id']??'';
if(!preg_match('/^[a-zA-Z_][a-zA-Z0-9_-]*$/D',$id)){$id='honeycomb-'.\cp::rand_id(4);}
$breakpoints=array_merge([0],array_map('intval',explode(',',$attr['breakpoints']??'480,960')));
$grid=explode(',',$attr['grid']??'4 6,6 4,8 3');
$css=[];
foreach($breakpoints as $index=>$breakpoint){
	[$columns,$rows]=array_pad(preg_split('/\s+/',trim($grid[$index]??'')),2,1);
	$columns=max(1,min(100,(int)$columns));
	$rows=max(1,min(100,(int)$rows));
	$css[$index]='#'.$id.'{display:grid; display:-ms-grid;-ms-grid-columns:'.str_repeat('1fr ',$columns).
		';grid-template-columns:repeat('.$columns.',1fr);-ms-grid-rows:'.str_repeat('1fr ',$rows).
		';grid-template-rows:repeat('.$rows.',1fr);}';
}
ob_start();
?>
<div<?=BlockCode::root('honeycomb',$attr,['id'=>$id,'data-breakpoints'=>implode(',',$breakpoints),'data-grid'=>implode(',',$grid)])?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemId=$id.'_item_'.$index;
	$class=BlockCode::classes($prefix.'__item',$item['classes']??'');
	$order=$item['order']??'';
	foreach(array_slice(explode(',',$order),0,count($breakpoints)) as $device=>$bounds){
		$values=preg_split('/\s+/',trim($bounds));
		if(count($values)<2){continue;}
		[$column,$row,$width,$height]=array_pad(array_map('intval',$values),4,1);
		$style=['-ms-grid-column'=>$column,'-ms-grid-row'=>$row,'grid-column'=>(string)$column,'grid-row'=>(string)$row];
		if($width>1){$style['grid-column'].=' / span '.$width;$style['-ms-grid-column-span']=$width;}
		if($height>1){$style['grid-row'].=' / span '.$height;$style['-ms-grid-row-span']=$height;}
		$css[$device].='#'.$itemId.'{'.BlockCode::style($style).';}';
	}
?>
	<div<?=BlockCode::attrs(['id'=>$itemId,'class'=>$class,'data-order'=>$order])?>>
		<div class="<?=$prefix?>__item-contents">
			<?php if(BlockCode::has($class,'has-title')): ?><?=BlockCode::element('h3',$prefix.'__item-contents-title',$item['title']??'')?><?php endif; ?>
			<?php if(BlockCode::has($class,'has-text')): ?><?=BlockCode::element('p',$prefix.'__item-contents-text',$item['text']??'')?><?php endif; ?>
		</div>
		<?php if(BlockCode::has($class,'has-image')): ?><img<?=BlockCode::attrs(['class'=>$prefix.'__item-image','src'=>$item['src']??null,'alt'=>''])?>/><?php endif; ?>
	</div>
<?php endforeach; ?>
<style><?php
foreach($breakpoints as $index=>$breakpoint){
	echo $breakpoint?'@media(min-width:'.$breakpoint.'px){'.$css[$index].'}':$css[$index];
}
?></style>
</div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

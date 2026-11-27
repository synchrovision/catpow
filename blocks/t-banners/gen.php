<?php
use Catpow\util\BlockCode;

$name='catpow/t-banners';
$prefix='wp-block-catpow-t-banners';
$attr+=['width'=>'100%','align'=>'center','columns'=>2,'gapX'=>10,'gapY'=>10,'marginTop'=>1,'marginBottom'=>1];
$columns=max(1,(int)$attr['columns']);
$comment=BlockCode::commentAttributes($name,$attr,['isTemplate','marginTop','marginBottom','columns','gapX','gapY']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-banners',$attr,['width'=>$attr['width']??'100%','align'=>$attr['align']??null])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'rem',$columns*2-1)?>
<?php foreach(array_chunk($attr['items']??[],$columns) as $row=>$items): ?>
	<?= $row?BlockCode::spacer($prefix,$attr['gapY'],'px',$columns*2-1):'' ?>
	<tr class="<?=$prefix?>__tbody-tr">
	<?php foreach($items as $index=>$item): ?>
		<?php if($index): ?><td class="<?=$prefix?>__tbody-tr-td is-spacer-cell" style="width:<?=esc_attr($attr['gapX'])?>px"></td><?php endif; ?>
		<td class="<?=$prefix?>__tbody-tr-td"><a class="<?=$prefix?>__tbody-tr-td-link"<?=BlockCode::attrs(['href'=>$item['url']??''])?>><?php
			if(!empty($attr['isTemplate'])){echo esc_html($item['loopImage']??'[output image]');}
			else{echo '<img width="100%" height="auto"'.BlockCode::attrs(['src'=>$item['src']??null,'alt'=>$item['alt']??null]).'/>';}
		?></a></td>
	<?php endforeach; ?>
	<?php for($empty=count($items);$empty<$columns;$empty++): ?>
		<td class="<?=$prefix?>__tbody-tr-td is-spacer-cell"></td>
	<?php endfor; ?>
	</tr>
<?php endforeach; ?>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'rem',$columns*2-1)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

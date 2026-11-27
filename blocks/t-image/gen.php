<?php
use Catpow\util\BlockCode;

$name='catpow/t-image';
$prefix='wp-block-catpow-t-image';
$attr+=['width'=>'100%','marginTop'=>0,'marginBottom'=>0];
$comment=BlockCode::commentAttributes($name,$attr,['isTemplate','marginTop','marginBottom']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-image',$attr,['width'=>$attr['width']??'100%','align'=>$attr['align']??null])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'rem',null)?>
		<tr class="<?=$prefix?>__tbody-tr">
			<td class="<?=$prefix?>__tbody-tr-td">
				<?php if(!empty($attr['isTemplate'])): ?>
					<?=esc_html($attr['loopImage']??'[output image]')?>
					<?php else: ?>
					<img width="100%" height="auto"<?=BlockCode::attrs(['src'=>$attr['src']??\cp::get_file_url('images/dummy.jpg'),'alt'=>$attr['alt']??null])?>/>
				<?php endif; ?>
			</td>
		</tr>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'rem',null)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

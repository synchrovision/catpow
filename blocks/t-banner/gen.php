<?php
use Catpow\util\BlockCode;

$name='catpow/t-banner';
$prefix='wp-block-catpow-t-banner';
$attr+=['width'=>'100%','align'=>'center','marginTop'=>1,'marginBottom'=>1];
$comment=BlockCode::commentAttributes($name,$attr,['isTemplate','marginTop','marginBottom']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-banner',$attr,['width'=>$attr['width']??'100%','align'=>$attr['align']??null])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'rem',null)?>
		<tr class="<?=$prefix?>__tbody-tr">
			<td class="<?=$prefix?>__tbody-tr-td">
				<a class="<?=$prefix?>__tbody-tr-td-link"<?=BlockCode::attrs(['href'=>$attr['url']??home_url('/')])?>>
					<?php if(!empty($attr['isTemplate'])): ?>
						<?=esc_html($attr['loopImage']??'[output image]')?>
						<?php else: ?>
						<img width="100%" height="auto"<?=BlockCode::attrs(['src'=>$attr['src']??\cp::get_file_url('images/dummy.jpg'),'alt'=>$attr['alt']??null])?>/>
					<?php endif; ?>
				</a>
			</td>
		</tr>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'rem',null)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

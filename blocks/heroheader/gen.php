<?php
use Catpow\util\BlockCode;

$name='catpow/heroheader';
$prefix='wp-block-catpow-heroheader';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['element','params','HeadingTag','vars','buttonsVars']);
$attr=BlockCode::defaults($name,$attr);
$tag=BlockCode::tag($attr['element']??'div');
$module=$tag==='div'?null:\cp::get_file_url('elements/'.$tag.'/element.mjs');
ob_start();
?>
<?php if($module): ?><script type="module" src="<?=esc_attr($module)?>"></script><?php endif; ?>
<div<?=BlockCode::root('heroheader',$attr)?>>
<<?=$tag?><?=BlockCode::attrs(['class'=>$prefix.'__bg']+(array)($attr['params']??[]))?>>
<?php foreach($attr['images']??[] as $image): ?>
	<?=BlockCode::image($image,$prefix.'__bg-picture','',true)?>
<?php endforeach; ?>
</<?=$tag?>>
<div<?=BlockCode::attrs(['class'=>$attr['bodyClasses']??$prefix.'__body'])?>>
	<div class="<?=$prefix?>__body-texts">
		<?php if($has('has-text-background')): ?><div class="<?=$prefix?>__body-texts-bg is-primary-part"></div><?php endif; ?>
		<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h1','h1'),$prefix.'__body-texts-title is-primary-part',$attr['title']??'')?>
		<?php if($has('has-lead')): ?><?=BlockCode::element('p',$prefix.'__body-texts-text is-secondary-part',$attr['text']??'')?><?php endif; ?>
		<?php if($has('has-buttons')): ?>
			<ul<?=BlockCode::attrs(['class'=>$attr['buttonsClasses']??$prefix.'__body-texts-buttons cp-buttons','style'=>BlockCode::style($attr['buttonsVars']??[])])?>>
			<?php foreach($attr['buttons']??[] as $button): ?>
				<?=BlockCode::button($name,$button)?>
			<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
</div>
</div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

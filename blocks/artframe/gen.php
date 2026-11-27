<?php
use Catpow\util\BlockCode;

$name='catpow/artframe';
$prefix='wp-block-catpow-artframe';
$comment=BlockCode::commentAttributes($name,$attr,['element','params','HeadingTag','vars','buttonsVars']);
$attr=BlockCode::defaults($name,$attr);
$tag=BlockCode::tag($attr['element']??'div');
$module=$tag==='div'?null:\cp::get_file_url('elements/'.$tag.'/element.mjs');
ob_start();
?>
<?php if($module): ?><script type="module" src="<?=esc_attr($module)?>"></script><?php endif; ?>
<div<?=BlockCode::root('artframe',$attr)?>>
<<?=$tag?><?=BlockCode::attrs((array)($attr['params']??[]))?>>
<div<?=BlockCode::attrs(['class'=>$attr['contentsClasses']??$prefix.'__contents'])?>>
	<div<?=BlockCode::attrs(['class'=>$attr['contentsBodyClasses']??$prefix.'__contents-body'])?>><?=$children?></div>
</div>
</<?=$tag?>>
</div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

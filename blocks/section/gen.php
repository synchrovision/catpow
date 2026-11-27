<?php
use Catpow\util\BlockCode;

$name='catpow/section';
$prefix='wp-block-catpow-section';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$attr['classes']=BlockCode::legacySectionClasses($attr['classes']??'article level3 center headline');
$attr['anchor']=$attr['anchor']??$attr['id']??'sec-'.\cp::rand_id(4);
$attr['HeadingTag']=$attr['HeadingTag']??(preg_match('/\bis-level([1-6])\b/',$attr['classes'],$matches)?'h'.$matches[1]:'h3');
$tag=BlockCode::tag($attr['SectionTag']??'section','section');
$heading=BlockCode::tag($attr['HeadingTag'],'h3');
$comment=BlockCode::commentAttributes($name,$attr,['SectionTag','HeadingTag','anchor','isTemplate','vars','headerVars','bodyVars','color']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<<?=$tag?><?=BlockCode::root('section',$attr,['id'=>$attr['anchor'],'data-icon'=>$attr['navIcon']??null])?>>
<div<?=BlockCode::attrs(['class'=>$attr['bodyClasses']??$prefix.'__body has-content-width','style'=>BlockCode::style($attr['bodyVars']??[])])?>>
	<?php if($has('has-decoration')): ?><?=BlockCode::decorations($prefix.'__decoration',$attr['decoration']??[])?><?php endif; ?>
	<header<?=BlockCode::attrs(['class'=>$attr['headerClasses']??$prefix.'__header','style'=>BlockCode::style($attr['headerVars']??[])])?>>
		<?php if($has('has-header-image')): ?><div class="<?=$prefix?>__header-image"><?=BlockCode::templateImage($attr,$attr,$prefix.'__header-image-picture','headerImage',true)?></div><?php endif; ?>
		<div<?=BlockCode::attrs(['class'=>$attr['titleClasses']??$prefix.'__header-title'])?>>
			<?php if($has('has-icon')): ?><?=BlockCode::icon($prefix.'__header-title-icon',$attr)?><?php endif; ?>
			<<?=$heading?> class="<?=$prefix?>__header-title-<?=$has('has-title-image')?'titleimage':'heading'?>"><?=
				$has('has-title-image')?BlockCode::templateImage($attr,$attr,$prefix.'__header-title-titleimage-image','titleImage',true):BlockCode::rich($attr['title']??'Title')
			?></<?=$heading?>>
			<?php if($has('has-lead')): ?><?=BlockCode::element('div',$prefix.'__header-title-lead',$attr['lead']??'')?><?php endif; ?>
		</div>
	</header>
	<div class="<?=$prefix?>__contents"><?=$children?></div>
</div>
</<?=$tag?>>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

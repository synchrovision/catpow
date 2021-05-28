<?php
$attr=array_merge([
	'SectionTag'=>'section',
	'classes'=>'article level3 center headline',
	'title'=>'Title'
],$attr);
$SectionTag=$attr['SectionTag']??'section';
$level=preg_match('/\blevel(\d+)\b/',$attr['classes'],$matches)?$matches[1]:'3';
$HeadingTag='h'.$level;
$states=[];
foreach(explode(' ',$attr['classes']) as $name){$states[$name]=true;}
?>
<!-- wp:catpow/section -->
<<?=$SectionTag?> id="<?=$attr['id']?>" class="wp-block-catpow-section <?=$attr['classes']?>" data-icon="<?=$attr['navIcon']?>">
<?php if($states['hasImage']): ?>
		<div class="image"><?=$attr['image']?></div>
<?php endif; ?>
	<div class="contents">
		<header class='header'>
			<div class="title">
<?php if($states['hasIcon']): ?>
				<div class="icon"><?=$attr['icon']?></div>
<?php endif; ?>
<?php if($states['hasPrefix']): ?>
				<div class="prefix"><?=$attr['prefix']?></div>
<?php endif; ?>
<?php if($states['hasHeaderImage']): ?>
				<div class="image"><?=$attr['headerImage']?></div>
<?php endif; ?>
				<<?=$HeadingTag?> class="heading">
					<?=$attr['title']?>
				</<?=$HeadingTag?>>
<?php if($states['hasLead']): ?>
				 <p class="lead"><?=$attr['lead']?></p>
<?php endif; ?>
			</div>
<?php if($states['hasHeaderBackgroundImage']): ?>
			<div class="background"><?=$attr['headerBackgroundImage']?></div>
<?php endif; ?>
		</header>
		<div class="text"><?=$children?></div>
	</div>
<?php if($states['hasBackgroundImage']): ?>
	<div class="background">
		<div class="background"><?=$attr['backgroundImage']?></div>
	</div>
<?php endif; ?>
<?php if($states['hasPatternImage']): ?>
	<style class="patternImageCss"><?=$attr['patternImageCss']?></style>
<?php endif; ?>
<?php if($states['hasHeaderPatternImage']): ?>
	<style class="headerPatternImageCss"><?=$attr['headerPatternImageCss']?></style>
<?php endif; ?>
<?php if($states['hasBorderImage']): ?>
	<style class="borderImageCss"><?=$attr['borderImageCss']?></style>
<?php endif; ?>
<?php if($states['hasFrameImage']): ?>
	<style class="frameImageCss"><?=$attr['frameImageCss']?></style>
<?php endif; ?>
</<?=$SectionTag?>>
<!-- /wp:catpow/section -->
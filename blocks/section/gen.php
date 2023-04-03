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
<!-- wp:catpow/section <?=json_encode(compact('HeadingTag'))?> -->
<<?=$SectionTag?> id="<?=$attr['id']??'sec-'.cp::rand_id(4)?>" class="wp-block-catpow-section <?=$attr['classes']??'article level3 headline'?>" data-icon="<?=$attr['navIcon']??''?>">
<?php if($states['hasImage']??false): ?>
		<div class="image"><?=$attr['image']??''?></div>
<?php endif; ?>
	<div class="contents">
		<header class='header'>
			<div class="title">
<?php if($states['hasIcon']??false): ?>
				<div class="icon"><?=$attr['icon']??''?></div>
<?php endif; ?>
<?php if($states['hasPrefix']??false): ?>
				<div class="prefix"><?=$attr['prefix']??''?></div>
<?php endif; ?>
<?php if($states['hasHeaderImage']??false): ?>
				<div class="image"><?=$attr['headerImage']??''?></div>
<?php endif; ?>
				<<?=$HeadingTag?> class="heading"><?=$attr['title']??''?></<?=$HeadingTag?>>
<?php if($states['hasLead']??false): ?>
				 <p class="lead"><?=$attr['lead']??''?></p>
<?php endif; ?>
			</div>
<?php if($states['hasHeaderBackgroundImage']??false): ?>
			<div class="background"><?=$attr['headerBackgroundImage']??''?></div>
<?php endif; ?>
		</header>
		<div class="text"><?=$children?></div>
	</div>
<?php if($states['hasBackgroundImage']??false): ?>
	<div class="background">
		<div class="background"><?=$attr['backgroundImage']??''?></div>
	</div>
<?php endif; ?>
<?php if($states['hasPatternImage']??false): ?>
	<style class="patternImageCss"><?=$attr['patternImageCss']??''?></style>
<?php endif; ?>
<?php if($states['hasHeaderPatternImage']??false): ?>
	<style class="headerPatternImageCss"><?=$attr['headerPatternImageCss']??''?></style>
<?php endif; ?>
<?php if($states['hasBorderImage']??false): ?>
	<style class="borderImageCss"><?=$attr['borderImageCss']??''?></style>
<?php endif; ?>
<?php if($states['hasFrameImage']??false): ?>
	<style class="frameImageCss"><?=$attr['frameImageCss']??''?></style>
<?php endif; ?>
</<?=$SectionTag?>>
<!-- /wp:catpow/section -->
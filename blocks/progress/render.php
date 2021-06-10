<?php
$meta_name='_progress_block_settings';
$default_settings=[
	'classes'=>'hasCounter medium',
	'countPrefix'=>'Step.',
	'countSuffix'=>'',
	'items'=>[
		['label'=>'入力','classes'=>''],
		['label'=>'確認','classes'=>''],
		['label'=>'送信','classes'=>''],
	]
];
if($attr['post']==='default'){
	$settings=$default_settings;
}
else{
	$post_data=cp::get_post_data($attr['post']);
	$settings=$post_data['meta'][$meta_name][0]??$default_settings;
}
$hasCounter=preg_match('/\bhasCounter\b/',$settings['classes']);
?>

<div class="wp-block-catpow-progress <?=$settings['classes']?>">
	<ul class="items">
	<?php foreach($settings['items'] as $index=>$item):?>
		<li class="item <?=$item['classes']?><?=($attr['step']==$index)?' active':''?>">
			<?php if($hasCounter): ?>
			<div class='counter'>
				<?php if(!empty($settings['countPrefix'])):?><span class="prefix"><?=$settings['countPrefix']?></span><?php endif;?>
				<span class="number"><?=$index+1?></span>
				<?php if(!empty($settings['countSuffix'])):?><span class="suffix"><?=$settings['countSuffix']?></span><?php endif;?>
			</div>
			<?php endif; ?>
			<div class='label'><?=$item['label']?></div>
		</li>
	<?php endforeach;?>
	</ul>
</div>
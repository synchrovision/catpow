<?php
namespace Catpow;
$className='wp-block-catpow-pagenavigation';
$post=get_post();
$post_type=$post->post_type;
$ancestors=get_post_ancestors($post);
if(count($ancestors)<$attr['level']){return;}
$active_items=[$post->ID=>true];
foreach($ancestors as $ancestor){
	$active_items[$ancestor]=true;
}
$ancestors[]=0;
$ancestors=array_reverse($ancestors);

$cond=new util\cond(shortcode::do_shortcode(do_shortcode($attr['query'])));
$query=$cond->get_query("post/{$post_type}");
$query['post_type']=$post_type;
$query['nopaging']=true;

$item_attr='data-wp-class--is-active="callbacks.isItemActive" data-wp-class--is-open="callbacks.isItemOpen"';

$context=['activeItems'=>$active_items,'openItems'=>$active_items];

$get_nav_items=function($query,$depth=0)use(&$get_nav_items){
	$items=[];
	foreach(get_posts($query) as $post){
		$items[$post->ID]=['post'=>$post];
		if($depth>0){
			$items[$post->ID]['children']=$get_nav_items(array_merge($query,['post_parent'=>$post->ID]),$depth-1);
		}
	}
	return $items;
};
$items_d1=$get_nav_items(array_merge($query,['post_parent'=>$ancestors[$attr['level']]]),$attr['depth']);

$states=[];
foreach(explode(' ',$attr['classes']) as $stateClass){$states[$stateClass]=true;}
$has_image=$states['is-style-card']??$states['is-style-grid']??false;

$dummy_image_url=CP::get_file_url('images/dummy.jpg');

$style='';
foreach($attr['vars'] as $key=>$val){$style.="{$key}:{$val};";}

?>

<ul class="<?=$className?> <?=$attr['classes']?>" style="<?=$style?>" data-wp-interactive="pagenavigation" data-wp-context='<?=json_encode($context,0540)?>'>
	<?php foreach($items_d1 as $id_d1=>$item_d1): ?>
		<li class="<?=$className?>__item<?=!empty($item_d1['children'])?' has-children':''?>" data-post-id="<?=$id_d1?>" <?=$item_attr?>>
			<?php if($has_image): ?>
				<img src="<?=wp_get_attachment_image_src(get_post_thumbnail_id($id_d1),'full')[0]??$dummy_image_url?>" alt="<?=$item_d1['post']->title?>" class="<?=$className?>__item-image"/>
			<?php endif; ?>
			<div class="<?=$className?>__item-contents">
				<a href="<?=get_permalink($id_d1)?>" class="<?=$className?>__item-contents-link"><?=$item_d1['post']->post_title?></a>
				<?php if(!empty($item_d1['children'])): ?>
					<span class="<?=$className?>__item-contents-toggle" data-wp-on--click="actions.onClickToggle">+</span>
					<ul class="<?=$className?>-submenu">
						<?php foreach($item_d1['children'] as $id_d2=>$item_d2): ?>
						<li class="<?=$className?>-submenu__item<?=!empty($item_d2['children'])?' has-children':''?>" data-post-id="<?=$id_d2?>" <?=$item_attr?>>
							<a href="<?=get_permalink($id_d2)?>" class="<?=$className?>-submenu__item-link"><?=$item_d2['post']->post_title?></a>
							<?php if(!empty($item_d2['children'])): ?>
								<span class="<?=$className?>-submenu__item-toggle" data-wp-on--click="actions.onClickToggle">+</span>
								<ul class="<?=$className?>-endmenu">
									<?php foreach($item_d2['children'] as $id_d3=>$item_d3): ?>
										<li class="<?=$className?>-endmenu__item" data-post-id="<?=$id_d3?>" <?=$item_attr?>>
											<a href="<?=get_permalink($id_d3)?>" class="<?=$className?>-endmenu__item-link"><?=$item_d3['post']->post_title?></a>
										</li>
									<?php endforeach; ?>
								</ul>
							<?php endif; ?>
						</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>
		</li>
	<?php endforeach; ?>
</ul>
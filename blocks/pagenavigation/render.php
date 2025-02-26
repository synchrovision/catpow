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
$items=$get_nav_items(array_merge($query,['post_parent'=>$ancestors[$attr['level']]]),$attr['depth']);

$states=[];
foreach(explode(' ',$attr['classes']) as $stateClass){$states[$stateClass]=true;}
$has_image=$states['is-style-card']??$states['is-style-grid']??false;

$dummy_image_url=CP::get_file_url('images/dummy.jpg');

HTML::render([
	'ul.wp-block-catpow-pagenavigation--',
	'class'=>$attr['classes'],
	'style'=>$attr['vars'],
	'data-wp-interactive'=>"pagenavigation",
	'data-wp-context'=>$context,
	'children'=>array_map(fn($item)=>[
		'li._item',
		'class'=>['has-children'=>!empty($item['children'])],
		'data-post-id'=>$item['post']->ID,
		'data-wp-class--is-active'=>"callbacks.isItemActive",
		'data-wp-class--is-open'=>"callbacks.isItemOpen",
		$has_image?[
			'img._image',
			'src'=>wp_get_attachment_image_src(get_post_thumbnail_id($id_d1),'full')[0]??$dummy_image_url,
			'alt'=>$item['post']->title
		]:'',
		[
			'._contents',
			['a._link','href'=>get_permalink($item['post']),$item['post']->post_title],
			isset($item['children'])?['._toggle','data-wp-on--click'=>"actions.onClickToggle",'+']:'',
			isset($item['children'])?[
				'ul.submenu-',
				'children'=>array_map(fn($item)=>[
					'li._item',
					'data-post-id'=>$item['post']->ID,
					'data-wp-class--is-active'=>"callbacks.isItemActive",
					'data-wp-class--is-open'=>"callbacks.isItemOpen",
					['a._link','href'=>get_permalink($item['post']),$item['post']->post_title],
					isset($item['children'])?['._toggle','data-wp-on--click'=>"actions.onClickToggle"]:'',
					isset($item['children'])?[
						'ul.endmenu-',
						'children'=>array_map(fn($item)=>[
							'li._item',
							'data-post-id'=>$item['post']->ID,
							'data-wp-class--is-active'=>"callbacks.isItemActive",
							'data-wp-class--is-open'=>"callbacks.isItemOpen",
							['a._link',$item['post']->post_title]
						],$item['children'])
					]:''
				],$item['children'])
			]:''
		]
	],$items)
]);
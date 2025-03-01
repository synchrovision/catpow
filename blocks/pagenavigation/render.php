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
$root_post_id=$ancestors[$attr['level']];
$root_post=$root_post_id===0?((object)['post_title'=>get_bloginfo('name')]):get_post($root_post_id);
$items=$get_nav_items(array_merge($query,['post_parent'=>$root_post_id]),$attr['depth']);



$states=[];
foreach(explode(' ',$attr['classes']) as $stateClass){$states[$stateClass]=true;}
$has_image=$states['is-style-card']??$states['is-style-grid']??false;

$dummy_image_url=CP::get_file_url('images/dummy.jpg');

HTML::render([
	'.wp-block-catpow-pagenavigation--',
	'class'=>$attr['classes'],
	'style'=>$attr['vars'],
	'data-wp-interactive'=>"pagenavigation",
	'data-wp-context'=>$context,
	[
		'h3.title-',
		[
			'a._link',
			'href'=>$root_post_id==0?home_url():get_permalink($root_post),
			$attr['hasOwnTitle']?$attr['title']:$root_post->post_title
		]
	],
	[
		'ul.menu-',
		'data-wp-init'=>'callbacks.onInitMenu',
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
				!empty($item['children'])?['._arrow','data-wp-on--click'=>"actions.onClickToggle",['span._graphic']]:['._spacer'],
				['a._link','href'=>get_permalink($item['post']),$item['post']->post_title],
				!empty($item['children'])?['._toggle','data-wp-on--click'=>"actions.onClickToggle",['span._graphic']]:['._spacer'],
				!empty($item['children'])?[
					'ul.submenu-',
					'data-wp-init'=>'callbacks.onInitMenu',
					'children'=>array_map(fn($item)=>[
						'li._item',
						'data-post-id'=>$item['post']->ID,
						'data-wp-class--is-active'=>"callbacks.isItemActive",
						'data-wp-class--is-open'=>"callbacks.isItemOpen",
						!empty($item['children'])?['._arrow','data-wp-on--click'=>"actions.onClickToggle",['span._graphic']]:['._spacer'],
						['a._link','href'=>get_permalink($item['post']),$item['post']->post_title],
						!empty($item['children'])?['._toggle','data-wp-on--click'=>"actions.onClickToggle",['span._graphic']]:['._spacer'],
						!empty($item['children'])?[
							'ul.endmenu-',
							'data-wp-init'=>'callbacks.onInitMenu',
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
	]
]);
<?php
namespace Catpow;
$prm=shortcode_atts([0=>'name'],$atts);
switch($prm[0]){
	case 'id':the_ID();break;
	case 'title':the_title();break;
	case 'name':
		echo ucwords(str_replace(['_','-'],' ',$GLOBALS['post']->post_name));
		break;
	case 'slug':echo $GLOBALS['post']->post_name;break;
	case 'content':echo do_blocks($GLOBALS['post']->post_content);break;
	case 'excerpt':the_excerpt();break;
	case 'date':the_date();break;
	case 'author':the_author();break;
	case 'url':the_permalink();break;
	case 'href':echo substr(get_the_permalink(),strpos(get_the_permalink(),'://')+3);break;
	case 'class':echo get_post_class();break;
	case 'thumbnail':the_post_thumbnail();break;
	case 'tags':
		global $post;
		$confs=CP::get_conf_data('post/'.$post->post_type)['taxonomies']??null;
		if(empty($confs)){break;}
		$tax_names=$atts[1]??array_keys($confs);
		echo '<div class="cpsc-tags">';
		foreach($tax_names as $tax_name){
			foreach(get_the_terms($post,$tax_name)?:[] as $term){
				printf(
					'<a class="cpsc-tags__tag %s" href="%s">%s</a>',
					implode(' ',get_term_meta($term->term_id,'term_class')?:['color0']),
					get_term_link($term),
					$term->name
				);
			}
		}
		echo '</div>';
		break;
	default: echo $GLOBALS['post']->{$prm[0]};
}
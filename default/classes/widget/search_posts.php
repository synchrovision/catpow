<?php
namespace Catpow\widget;
use cp;
class search_posts extends \WP_Widget {

	function __construct() {
		$widget_ops = array('classname' => 'widget_search_custom_entries', 'description' => "カスタム投稿検索");
		parent::__construct('search-costom-posts', "カスタム投稿検索", $widget_ops);
		$this->alt_option_name = 'widget_search_custom_entries';
	}

	function widget($args, $instance) {
		global $page_cft;

		if ( !is_array($cache) )
			$cache = array();

		if ( ! isset( $args['widget_id'] ) )
			$args['widget_id'] = $this->id;

		if ( isset( $cache[ $args['widget_id'] ] ) ) {
			echo $cache[ $args['widget_id'] ];
			return;
		}
		ob_start();
		extract($args);

		query_posts(array('post_type'=>array($instance['type'])) );
		
		echo $before_widget;
		if ( !empty($instance['title']) ) echo $before_title . $instance['title'] . $after_title;
		echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['post_type'] = $new_instance['post_type'];
		$instance['cat'] = $new_instance['cat'];
		$instance['tag'] = $new_instance['tag'];
		$instance['tax'] = $new_instance['tax'];
		$instance['meta'] = $new_instance['meta'];

		return $instance;
	}

	function form( $instance ) {
		/*
		ウィジェットでの検索条件設定フォーム
		title
		post_type
		cat[form_type,operator]
		tag[form_type,operator]
		tax[(name)][form_type,operator]
		meta[(name)][form_type,type,compare]
		*/
		global $page_cft;
		$title = isset($instance['title']) ? esc_attr($instance['title']) : '';
		$type = isset($instance['post_type']) ? $instance['post_type'] : array();
		$cat = isset($instance['cat']) ? $instance['cat'] : array();
		$tag = isset($instance['tag']) ? $instance['tag'] : array();
		$tax = isset($instance['tax']) ? $instance['tax'] : array();
		$meta = isset($instance['meta']) ? $instance['meta'] : array();
		
		$title_fid=$this->get_field_id('title');$title_fname=$this->get_field_name('title');
		$type_fid=$this->get_field_id('post_type');$type_fname=$this->get_field_name('post_type');
		$cat_fid=$this->get_field_id('cat');$cat_fname=$this->get_field_name('cat');
		$tag_fid=$this->get_field_id('tag');$tag_fname=$this->get_field_name('tag');
		$tax_fid=$this->get_field_id('tax');$tax_fname=$this->get_field_name('tax');
		$meta_fid=$this->get_field_id('meta');$meta_fname=$this->get_field_name('meta');
		
		printf('<p><label for="%1$s">タイトル</label>'.chr(10),$title_fid);
		printf('<input class="widefat" id="%s" name="%s" type="text" value="%s"/></p>'.chr(10),$title_fid,$title_fname,$title);
		
		printf('<p><label for="%s">検索する投稿タイプ</label>'.chr(10),$type_fid);
		printf('<select class="widefat" id="%s" name="%s">'.chr(10),$type_fid,$type_fname);
		foreach(cp::$config['post_types'] as $post_type=>$type_vals){
			if(isset($type_vals['name']))printf('<option value="%1$s">%2$s</option>'.chr(10),$post_type,$type_vals['name']);
		}
		echo('</select></p>');
		
		$form_types=array('text'=>'テキスト入力','radio'=>'ラジオボタン','checkbox'=>'チェックボックス','select'=>'セレクト');
		$val_types=array('chr'=>'文字','chrarr'=>'文字配列','num'=>'数値','numarr'=>'数値配列');
		$cmp_for_chr=array('=','!=','LIKE','NOT LIKE');
		$cmp_for_chrarr=array('IN','NOT IN');
		$cmp_for_num=array('=','!=','>','>=','<','<=');
		$cmp_for_numarr=array('BETWEEN','NOT BETWEEN');
		foreach(cp::$config['post_types'] as $post_type=>$post_type_vals){
			printf('<h3>%s</h3>',$post_type_vals['name']?$post_type_vals['name']:$post_type);
			if(isset($post_type_vals['taxonomies'])){foreach($post_type_vals['taxonomies'] as $tax_name => $tax_prm){
				printf('<p>%s</p>',$tax_prm['label']?$tax_prm['label']:$tax_name);
			}}
			if(isset($post_type_vals['meta'])){foreach($post_type_vals['meta'] as $cf_name => $cf_prm){
				printf('<h3 class="cf_label">%s</h3>',$cf_prm['label']?$cf_prm['label']:$cf_name);
				printf('<div><p><label for="%1$s">タイプ</label><select id="%1$s" name="%2$s[%3$s][form_type]">',$meta_fid.'_form_type',$meta_fname,$cf_name);
				foreach($form_types as $type=>$label){printf('<option value="%s">%s</option>',$type,$label);}
				echo('</select></p>');
				printf('<p><label for="%1$s">値の型</label><select id="%1$s" name="%2$s[%3$s][type]">',$meta_fid.'_type',$meta_fname,$cf_name);
				foreach($val_types as $type=>$label){printf('<option value="%s">%s</option>',$type,$label);}
				echo('</select></p>');
				printf('<p><label for="%1$s">判定方法</label><select id="%1$s" name="%2$s[%3$s][compare]">',$meta_fid.'_cmp',$meta_fname,$cf_name);
				foreach($cmp_for_chr as $i=>$cmp){printf('<option class="cmp_for_chr" value="%1$s">%1$s</option>',$cmp);}
				foreach($cmp_for_chrarr as $i=>$cmp){printf('<option class="cmp_for_chrarr" value="%1$s">%1$s</option>',$cmp);}
				foreach($cmp_for_num as $i=>$cmp){printf('<option class="cmp_for_num" value="%1$s">%1$s</option>',$cmp);}
				foreach($cmp_for_numarr as $i=>$cmp){printf('<option class="cmp_for_numarr" value="%1$s">%1$s</option>',$cmp);}
				echo('</select></p></div>');
			}}
		}
	}
}

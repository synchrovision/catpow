<?php
namespace Catpow;


global $post_types;
$post_type=$_GET['post_type']??'post';
if(isset($post_types[$post_type]['bulk'])){
	$post_type_label=isset($post_types[$post_type]['label'])?$post_types[$post_type]['label']:$post_type;
	$bulks=$post_types[$post_type]['bulk'];
	add_filter("bulk_actions-edit-{$post_type}",function($bulk_actions)use($bulks){
		$rtn=array();
		foreach($bulks as $bulk_name=>$bulk){
			$rtn[$bulk_name] = isset($bulk['label'])?$bulk['label']:$bulk_name;
		}
		return array_merge($rtn,$bulk_actions);
	});
	add_filter("handle_bulk_actions-edit-{$post_type}",function($redirect_to,$doaction,$post_ids)use($bulks,$post_type){
		if(isset($bulks[$doaction])){
			if(isset($bulks[$doaction]['callback'])){
				foreach($post_ids as $post_id){$bulks[$doaction]['callback']($post_id);}
			}
			if(isset($bulks[$doaction]['bulk'])){
				if(is_callable($bulks[$doaction]['bulk']))$bulks[$doaction]['bulk']($post_ids);
				elseif(is_string($bulks[$doaction]['bulk'])){
					if($f=\cp::get_file_path("post/{$post_type}/admin/{$bulks[$doaction]['bulk']}.php"))include $f;
				}
			}
			$redirect_to=add_query_arg('cp_bulk_action',$doaction,$redirect_to);
			$redirect_to=add_query_arg('cp_bulk_action_user_count',count($post_ids),$redirect_to);
		}
		return $redirect_to;
	},10,3);
	add_action('admin_notices',function()use($bulks,$post_type_label){
		if(empty($_REQUEST['cp_bulk_action']) or empty($bulks[$_REQUEST['cp_bulk_action']])){return;}
		$bulk=$bulks[$_REQUEST['cp_bulk_action']];
		if(isset($bulk['message'])){$message=$bulk['message'];}
		else{$message=sprintf('%%d個の%sを%sしました',$post_type_label,$bulk['label']?$bulk['label']:$_REQUEST['cp_bulk_action']);}
		printf('<div id="message" class="updated fade">'.$message.'</div>',intval($_REQUEST['cp_bulk_action_user_count']));
	});
}
add_action('admin_notices',function($wp_admin_bar)use($post_type){
	if($post_type==='page'){return false;}
	$path="post/{$post_type}/admin/search";
	$form_id=str_replace('/','--',$path);
	if(isset(\cp::$forms[$form_id])){
		$form=CP::$content=\cp::$forms[$form_id];
		$form->is_receiver=true;
		$form->receive();
		$form->is_receiver=false;
	}
	else{
		$class_name=CP::get_class_name('content','form');
		$form=CP::$content=new $class_name([
			'file_path'=>$path.'.php',
			'form_type'=>4,
			'data'=>['s'=>CP::get_the_query_value()]
		]);
	}
	if(empty($_GET['page']) && $content=cp::get_template_contents($path.'.php')){
		wp_enqueue_script('cp_search');
		?>
		<form id="cp_search">
			<div id="cpcf_custom_box" class="cpform_section">
				<input type="hidden" name="post_type" value="<?=$post_type?>">
				<input type="hidden" name="cp_page_type" value="search">
				<input type="hidden" name="cp_data_type" value="post">
				<input type="hidden" name="cp_mode" value="search">
				<input type="hidden" name="cp_data_name" value="<?=$post_type?>">
				<div id="cpcf_custom_box_button" class="button"></div>
				<div class="inside">
					<?= $content ?>
					<ul class="buttons center">
						<li class="item"><div class="button"><?=__('検索','catpow')?></div></li>
					</ul>
				</div>
			</div>
		</form>
		<?php
	}
});

if(isset($post_types[$post_type]['meta']) and $metas=$post_types[$post_type]['meta']){
	add_filter( 'manage_edit-'.$post_type.'_sortable_columns',function($columns)use($post_type,$metas){
		global $wp_query;
		$columns['ID']=['ID',(isset($wp_query->query['order']) and $wp_query->query['order']!=='desc')];
		$columns['modified']=[__('変更日','catpow'),(isset($wp_query->query['order']) and $wp_query->query['order']!=='desc')];
		foreach($metas as $name=>$prm){
			$meta_class=\cp::get_class_name('meta',$prm['type']);
			if($meta_class::$is_database || $meta_class::$has_children && !$meta_class::$is_unit_output){continue;}
			$order_data=['orderby'=>'','desc_first'=>true];
			if(!$meta_class::reflect_to_order($order_data,'post',$post_type,$name,$prm)){continue;}
			$columns[$name]=array_values($order_data);
		}
		return $columns;
	});
	add_filter( 'manage_'.$post_type.'_posts_columns',function($columns)use($metas){
		$columns['ID']='ID';
		$columns['modified']=__('変更日','catpow');
		foreach($metas as $name=>$prm){
			$meta_class=\cp::get_class_name('meta',$prm['type']);
			if($meta_class::$is_database || $meta_class::$has_children && !$meta_class::$is_unit_output){continue;}
			$columns[$name]=$prm['label'];
		}
		return $columns;
	});
	add_action('manage_'.$post_type.'_posts_custom_column',function($column_name,$post_id)use($metas){
		if($column_name=='ID'){echo $post_id; return;}
		if($column_name=='modified'){echo $GLOBALS['post']->post_modified; return;}
		if(isset($metas[$column_name])){
			global $wp_query,$post;
			$class_name=cp::get_class_name('content','meta');
			$meta_class=cp::get_class_name('meta',$metas[$column_name]['type']);
			if($meta_class::$is_database || $meta_class::$has_children && !$meta_class::$is_unit_output){return;}
			\cp::$content=new $class_name([
				'data_path'=>'post/'.get_post_type($post_id).'/'.$post_id.'/'.$column_name,
				'tmp'=>'admin',
				'meta'=>$metas[$column_name],
			]);
			echo('<div class="cp-meta-item">');
			output();
			echo('</div>');
		}
	},10,2);
}

<?php
namespace Catpow;


global $user_datas;
$role=$_REQUEST['role']??'common';

add_filter('users_list_table_query_args',function($arg){
	if(isset($_REQUEST['role'])){
		return array_merge($arg,\cp::extract_query(false,"user/{$_REQUEST['role']}/s"));
	}
	return $arg;
});
add_action('admin_notices',function($wp_admin_bar)use($role){
	$path="user/{$role}/admin/search";
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
			<div id="cpcf_custom_box" class="cp_form_section">
				<input type="hidden" name="cp_page_type" value="search">
				<input type="hidden" name="cp_data_type" value="user">
				<input type="hidden" name="cp_mode" value="search">
				<?php if(isset($_REQUEST['role'])): ?>
				<input type="hidden" name="role" value="<?=$_REQUEST['role']?>">
				<input type="hidden" name="cp_data_name" value="<?=$_REQUEST['role']?>">
				<?php endif; ?>
				<div id="cpcf_custom_box_button" class="button"></div>
				<div class="inside">
					<?= $content ?>
					<ul class="buttons center">
						<li><button class="button"><?=__('検索','catpow')?></button></li>
					</ul>
				</div>
			</div>
		</form>
		<?php
	}
});
if(isset($user_datas[$role]['bulk'])){
	$bulks=$user_datas[$role]['bulk'];
	add_filter('bulk_actions-users',function($bulk_actions)use($bulks){
		foreach($bulks as $bulk_name=>$bulk){
			$bulk_actions[$bulk_name] = isset($bulk['label'])?$bulk['label']:$bulk_name;
		}
		return $bulk_actions;
	});
	add_filter('handle_bulk_actions-users',function( $redirect_to,$doaction,$user_ids)use($bulks,$role){
		if(isset($bulks[$doaction])){
			if(isset($bulks[$doaction]['callback'])){
				foreach($user_ids as $user_id){$bulks[$doaction]['callback']($user_id);}
			}
			if(isset($bulks[$doaction]['bulk'])){
				if(is_callable($bulks[$doaction]['bulk']))$bulks[$doaction]['bulk']($user_ids);
				elseif(is_string($bulks[$doaction]['bulk'])){
					if($f=\cp::get_file_path("user/{$role}/admin/{$bulks[$doaction]['bulk']}.php"))include $f;
				}
			}
			$redirect_to=add_query_arg('cp_bulk_action',$doaction,$redirect_to);
			$redirect_to=add_query_arg('cp_bulk_action_user_count',count($user_ids),$redirect_to);
		}
		return $redirect_to;
	},10,3);
	add_action('admin_notices',function()use($bulks){
		if(empty($_REQUEST['cp_bulk_action']) or empty($bulks[$_REQUEST['cp_bulk_action']])){return;}
		$bulk=$bulks[$_REQUEST['cp_bulk_action']];
		if(isset($bulk['message'])){$message=$bulk['message'];}
		else{$message=sprintf('%%d名に%sをしました',$bulk['label']?$bulk['label']:$_REQUEST['cp_bulk_action']);}
		printf('<div id="message" class="updated fade">'.$message.'</div>',intval($_REQUEST['cp_bulk_action_user_count']));
	});
}
/*新規登録通知*/
add_filter('bulk_actions-users',function($bulk_actions){
	$bulk_actions['new_user_notification'] = '新規登録通知';
	return $bulk_actions;
});
add_filter('handle_bulk_actions-users',function( $redirect_to,$doaction,$user_ids){
	if($doaction!=='new_user_notification'){return $redirect_to;}
	foreach($user_ids as $user_id){
		wp_new_user_notification($user_id,null,'user');
	}
	$redirect_to = add_query_arg( 'new_user_notification_count',count($user_ids),$redirect_to );
	return $redirect_to;
},10,3);
add_action('admin_notices',function() {
	if(empty($_REQUEST['new_user_notification_count']))return;
	printf('<div id="message" class="updated fade">%d名に新規登録通知メールを送信しました</div>',intval($_REQUEST['new_user_notification_count']));
});


//columns
add_filter('manage_users_columns',function($columns){
	unset($columns['name']);
	$columns=array_merge(array_splice($columns,0,2),array('display_name'=>'名前'),$columns);
	return $columns;
},10);
add_filter('manage_users_custom_column',function($val,$column_name,$user_id){
	if($column_name == 'display_name'){$val=get_user($user_id)->display_name;}
	return $val;
},10,3);

if(isset($user_datas[$role]['meta']) and $metas=$user_datas[$role]['meta']){
	add_filter( 'manage_users_columns',function($columns)use($metas){
		$columns['ID']='ID';
		foreach($metas as $name=>$prm){
			$meta_class=\cp::get_class_name('meta',$prm['type']);
			if($meta_class::$is_database || $meta_class::$has_children && !$meta_class::$is_unit_output){continue;}
			$columns[$name]=$prm['label'];
		}
		return $columns;
	},20);
	add_filter('manage_users_custom_column',function($val,$column_name,$user_id)use($metas){
		if($column_name=='ID'){return $user_id;}
		if(isset($metas[$column_name])){
			ob_start();
			$class_name=cp::get_class_name('content','meta');
			$meta_class=cp::get_class_name('meta',$metas[$column_name]['type']);
			if($meta_class::$is_database || $meta_class::$has_children && !$meta_class::$is_unit_output){return;}
			\cp::$content=new $class_name([
				'data_path'=>'user/'.get_user_role($user_id).'/'.$user_id.'/'.$column_name,
				'tmp'=>'admin',
				'meta'=>$metas[$column_name],
			]);
			echo('<div class="cp-meta-item">');
			output();
			echo('</div>');
			return ob_get_clean();
		}
		return $val;
	},20,3);
}
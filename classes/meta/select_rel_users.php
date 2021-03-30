<?php
namespace Catpow\meta;

class select_rel_users extends select{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)';
	
	public static function output($meta,$prm){
		$val=$meta->value;
		$rtn=array();
		if(empty($val)){
			if(in_array($prm,[false,'name','login','url'])){return [];}
			if(is_string($meta->conf['value'])){$role=$meta->conf['value'];}
			elseif(isset($meta->conf['value']['role'])){$role=$meta->conf['value']['role'];}
			else{return [];}
			global $user_datas;
			if(in_array($prm,$user_datas[$role]['template'])){
				$class_name=\cp::get_class_name('content');
				ob_start();
				$class_name::from_object(get_post($val))->render($prm,'notfound');
				return ob_get_clean();
			}
		}

		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$addition=[0=>$meta->conf['addition']];}
			else{$addition=array_flip($meta->conf['addition']);}
		}
		else{$addition=false;}
		if(is_numeric($val) && $val>0){
			switch($prm){
				case false:
				case 'name':
					return get_userdata($val)->display_name;
				case 'login':
					return get_userdata($val)->user_login;
				case 'url':
					return home_url(sprintf('/%s/%d',get_user_role($val),$val));
				default:
					global $user_datas;
					$role=get_user_role($val);
					if(in_array($prm,$user_datas[$role]['template'])){
						$class_name=\cp::get_class_name('content');
						ob_start();
						$class_name::from_object(get_post($val))->render($prm);
						return ob_get_clean();
					}
					elseif(isset($user_datas[$role]['meta'][$prm])){
						$rel_users_meta=$user_datas[$role]['meta'][$prm];
						return \cp::get_output($rel_users_meta,get_post_meta($val,$prm));
					}
			}

		}
		elseif($addition){
			return isset($addition[$val])?$addition[$val]:reset($addition);
		}
	}
	public static function get_selections($meta){
		$q=empty($meta->conf['value'])?false:(is_callable($meta->conf['value'])?$meta->conf['value']():$meta->conf['value']);
		$rtn=array();
		if(empty($q)){$q=new \WP_User_Query(['exclude'=>0]);}
		elseif(is_string($q)){$q=new \WP_User_Query(array('role'=>$q));}
		elseif(is_array($q)){$q=new \WP_User_Query($q);}
		elseif(is_object($q) and is_a($q,\cp::get_class_name('query','user'))){$q=$q->query;}
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$rtn[$meta->conf['addition']]=0;}
			else{$rtn=$meta->conf['addition'];}
		}
		if(isset($meta->conf['sortby'])){
			global $user_datas;
			$sortby=$meta->conf['sortby'];
			$sortby_meta=$user_datas[$q->query_vars['role']]['meta'][$sortby];
		}
		if(empty($meta->conf['input_loop'])){
			if(isset($sortby)){
				foreach($q->results as $i=>$user){
					$rtn[reset(\cp::get_output($sortby_meta,get_user_meta($user->ID,$sortby,true)))][$user->display_name]=$user->ID;
				}
			}
			else{foreach($q->results as $i=>$user){$rtn[$user->display_name]=$user->ID;}}
			
		}
		else{
			if(is_array($meta->conf['input_loop'])){$type=$meta->conf['input_loop'][0];$name=$meta->conf['input_loop'][1];}
			elseif(is_string($meta->conf['input_loop'])){$type=$meta->conf['input_loop'];$name='loop';}
			else{$type='list';$name='loop';}
			$class_name=\cp::get_class_name('content');
			foreach($q->results as $i=>$user){
				ob_start();
				$class_name::from_object($user)->render($type,$name);
				if(isset($sortby)){$rtn[reset(\cp::get_output($sortby_meta,get_user_meta($user->ID,$sortby,true)))][ob_get_clean()]=$user->ID;}
				else{$rtn[ob_get_clean()]=$user->ID;}
			}
		}
		if(isset($sortby)){ksort($rtn);}
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>
<?php
namespace Catpow\setup;

class roles implements iSetup{
	static function exec(){
		global $user_datas;
		$cnt1=$cnt2=0;
		$role_datas=get_option('wp_user_roles');
		foreach($user_datas as $role_name=>$user_data){
			if($role_name==='guest' || $role_name==='common'){continue;}
			if(isset($user_data['capabilities'])){
				if(is_array($user_data['capabilities'])){
					$cap=[];
					foreach($user_data['capabilities'] as $c){
						if(isset($role_datas[$c])){
							$cap=array_merge($cap,$role_datas[$c]['capabilities']);
						}
						else{$cap[$c]=true;}
					}
				}
				else{
					$cap=get_role($user_data['capabilities'])->capabilities;
				}
			}
			else{$cap=get_role('subscriber')->capabilities;}
			$role=get_role($role_name);
			if(is_null($role)){
				add_role($role_name,$user_data['label'],$cap);
				printf('create %s(%s)<br/>',$user_data['label'],$role_name);
				$cnt1++;
			}
			elseif(isset($user_data['capabilities'])){
				$cap_to_add=array_diff_assoc($cap,$role->capabilities);
				foreach($cap_to_add as $key=>$val){
					$role->add_cap($key);
					printf('add cap %s(%s) %s <br/>',$key,$user_data['label'],$role_name);
					$cnt2++;
				}
				$cap_to_remove=array_diff_assoc($role->capabilities,$cap);
				foreach($cap_to_remove as $key=>$val){
					$role->remove_cap($key);
					printf('remove cap %s(%s) %s<br/>',$key,$user_data['label'],$role_name);
					$cnt2++;
				}
			}
		}
		printf('%d roles created<br/>',$cnt1);
		printf('%d role capabilities update',$cnt2);
	}
}
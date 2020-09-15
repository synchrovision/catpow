<?php
namespace Catpow;
receive();
$fake_user_id=value('fake_user_id');
if(empty($fake_user_id)){
	unset(cp::$data['fake_user_id']);
	print('サイト閲覧時のログイン情報の上書きを解除しました');
}
else{
	cp::$data['fake_user_id']=$fake_user_id;
	printf('サイト閲覧時のログイン情報を「%s」で上書きされるようにしました',get_user($fake_user_id)->display_name);
}
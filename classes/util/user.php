<?php
/**
* WordPressのユーザー登録などに関するメソッド
*/
namespace Catpow\util;
class user{
	/**
	* パスワードリセットのURLを発行する
	* 結果をキャッシュして同プロセス中に複数回パスワードリセットのURLを出力しても
	* キーが上書きされないようにする
	* @param WP_USER|int $user パスワードをリセットするユーザー
	* @return string パスワードリセットのURL　失敗した場合は空の文字列
	**/
	public static function get_reset_password_url($user=null){
		static $urls;
		if(empty($user)){$user=get_user();}
		if(!is_numeric($user)){$user=get_user($user);}
		if(isset($urls[$user->ID])){return $urls[$user->ID];}
		$key=get_password_reset_key($user);
		if(is_wp_error($key)){
			error_log($key->get_error_message());
			return $urls[$user->ID]='';
		}
		return $urls[$user->ID]=network_site_url("wp-login.php?action=rp&key=$key&login=".rawurlencode($user->user_login));
	}
}

?>
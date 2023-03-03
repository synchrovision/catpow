<?php
namespace Catpow\api\instagram;
use Catpow\instagram\cpig;

/**
* サイトに登録したInstagramユーザーの投稿画像を検索・取得します。
*/

class media extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=false;
	public static function call($req,$res){
		$users=cpig::get_users();
		$medias=[];
		if(!empty($req['reflesh']) || empty($data=get_transient('ig_user'))){
			foreach($users as $id=>$user){
				$user_medias=cpig::req('get',"https://graph.instagram.com/{$id}/media",[
					'fields'=>'media_type,username,thumbnail_url,media_url,permalink,caption,timestamp',
					'access_token'=>$user['access_token']
				])['data'];
				foreach($user_medias as $i=>$media){
					if($media['media_type']==='CAROUSEL_ALBUM'){
						$user_medias[$i]['children']=cpig::req('get',"https://graph.instagram.com/{$media['id']}/children",[
							'fields'=>'media_type,media_url',
							'access_token'=>$user['access_token']
						])['data'];
					}
				}
				$medias=array_merge($medias,$user_medias);
			}
			$data=['medias'=>$medias];
			set_transient('ig_user',$data,\DAY_IN_SECONDS);
		}
		$res->set_data($data);
	}
}
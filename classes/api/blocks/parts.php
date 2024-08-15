<?php
namespace Catpow\api\blocks;

/**
* CP.ServerSideRenderPart用のエンドポイント
* SSRで用いる各種パーツのプレビューのHTMLを返す
* レスポンスの構造はblocks/renderに倣う
* 各パーツの出力はblocks/render/[パーツ名]クラスの
* previewとrenderメソッドによって定義される
*/

class parts extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=false;
	public static function call($req,$res){
		if(!empty($req['post_id'])){
			$GLOBALS['post']=get_post($req['post_id']);
		}
		$rendered=$req['tmp_name'].' SSR';
		$class_name="Catpow\\api\\blocks\\parts\\{$req['tmp_name']}";
		ob_start();
		$class_name::preview($req);
		$rendered=ob_get_clean();
		
		//dequeue style and scripts that should already loaded.
		wp_dequeue_script('catpow');
		
		$deps=\Catpow\util\wp::get_deps();
		$res->set_data(compact('rendered','deps'));
	}
}

?>
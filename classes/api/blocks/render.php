<?php
namespace Catpow\api\blocks;

/**
* CP.ServerSideRender用のエンドポイント
* renderedに加えてdepsの配列を返す
*/

class render extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=false;
	public static function call($req,$res){
		if(!empty($req['post_id'])){
			$GLOBALS['post']=get_post($req['post_id']);
		}
		$block_name='catpow/'.$req['tmp_name'];
		
		$registry=\WP_Block_Type_Registry::get_instance();
		$registered=$registry->get_registered($block_name);

		if(empty($registered)){
			throw new Exception(sprintf('block %s was not registered',$block_name));
		}
		if(!$registered->is_dynamic()){
			throw new Exception(sprintf('block %s is not dynamic block',$block_name));
		}
		
		$block=[
			'blockName'=>$block_name,
			'attrs'=>$req->get_param('attributes'),
			'innerHTML'=>'',
			'innerContent'=>[],
		];
		$rendered=render_block($block);
		$deps=\Catpow\util\wp::get_deps();
		$res->set_data(compact('rendered','deps'));
	}
}

?>
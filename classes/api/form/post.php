<?php
namespace Catpow\api\form;
use Catpow\content\form_exception;
/**
* APIのエンドポイントのクラス
*/

class post extends \Catpow\api{
	public static 
		$method='POST',
		$check_nonce=true;
	public static function call($req,$res){
		add_action('set_logged_in_cookie',function($logged_in_cookie){
			$_COOKIE[LOGGED_IN_COOKIE]=$logged_in_cookie;
		});
		ob_start();
		try{
			$form=\cp::get_the_form();
			\cp::$content=$form;
			$form->is_receiver=true;
			
			$GLOBALS['res']=array();
			if($req->has_param('cpform_action')){
				$cpform_action=$req->get_param('cpform_action');
				if(isset($form->allowed_inputs[$cpform_action])){
					$meta=$form->allowed_inputs[$cpform_action];
					$class_name=\cp::get_class_name('meta',$meta->conf['type']);
					$class_name::response($meta);
				}
				else{
					if(!in_array($cpform_action,$form->allowed_actions)){
						error_log('not allowed form action : '.$cpform_action);
						$form->error('不正なリクエストです','not allowed form action : '.$cpform_action);
					}
					if(
						\cp::get_template_part(
							$form->path.'/'.$form->file_name.'-'.$cpform_action.'.php',
							['action'=>$cpform_action]
						) ||
						\cp::get_template_part(
							$form->path.'/'.$form->file_name.'.php',
							['action'=>$cpform_action]
						)
					){
						$GLOBALS['res']['action']=$cpform_action;
					}
					else{
						$form->error('無効なリクエストです');
					}
				}
			}
			else{
				$cpform_action=$form->file_slug??false;
				$file=$form->file;
				\cp::get_template_part($form->path.'/'.$file);
				$GLOBALS['res']['action']=$cpform_action;
			}
		}
		catch(form_exception $e){
			if(isset($e->data['message'])){
				$GLOBALS['res']['callback']='message';
				foreach($e->data['message'] as $input_id=>$message){
					$GLOBALS['res']['message'][]=[
						'selector'=>'#'.$input_id,
						'message'=>$message
					];
				}
			}
			if(isset($e->data['detail'])){
				$GLOBALS['res']['error_detail']=$e->data['detail'];
			}
			$GLOBALS['res']['action']=$e->action;
		}
		finally{
			if(isset($form)){$form->is_receiver=false;}
		}
		$GLOBALS['res']['html']=ob_get_clean();
		$res->set_data($GLOBALS['res']);
	}
}

?>
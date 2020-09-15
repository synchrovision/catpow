<?php
namespace Catpow\template_item\php;
/**
* ページヘッダー
*/

class page_header extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$rtn=[''];
		if($conf_data['path']==='page/home'){
			return false;
		}
		else{
			$type=$param[0]??'archive';
			$has_template=in_array('template',$conf_data['template']??[]);
			if($conf_data['path']==='post/page'){
				$rtn['cond_start']='<?php if(!is_front_page()): ?>';
			}
			if($has_template){
				$template_conf_data=\cp::get_conf_data("post/{$path_data['data_name']}_tmpl");
				$rtn['template_start']="<?php foreach(loop('post/{$path_data['data_name']}_tmpl',['name'=>'{$type}']) as \$post): ?>";
				$rtn['title']=['div.title',['div.text',['h1','@page_title',['small','@page_slug']]]];
				if(isset($template_conf_data['meta']['title_image'])){
					$rtn['title'][]=['div.image',"<?php output('title_image'); ?>"];
				}
				elseif(isset($template_conf_data['meta']['image'])){
					$rtn['title'][]=['div.image',"<?php output('image'); ?>"];
				}
				else{
					$rtn['title'][]=['div.image',['img[src="<?=header_image();?>"]']];
				}
				$rtn['template_end']="<?php endforeach; ?>";
			}
			else{
				$rtn['title']=['div.title',['div.text',['h1','@page_title',['small','@page_slug']]]];
				if($type==='single'){
					if(isset($conf_data['meta']['title_image'])){
						$rtn['title'][]=['div.image',"<?php output('title_image'); ?>"];
					}
					elseif(isset($conf_data['meta']['image'])){
						$rtn['title'][]=['div.image',"<?php output('image'); ?>"];
					}
					else{
						$rtn['title'][]=['div.image',['img[src="<?=header_image();?>"]']];
					}
				}
				else{
					$rtn['title'][]=['div.image',['img[src="<?=header_image();?>"]']];
				}
			}
			$rtn[]='@menu page_header';
			$rtn[]='@breadcrumb';
			if($conf_data['path']==='post/page'){
				$rtn['cond_end']='<?php endif; ?>';
			}
		}
		return $rtn;
	}
}

?>
<?php
namespace Catpow\template_item\php;
/**
* 画像
*/

class image extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(isset($conf_data['meta']['image'])){
			if($param){return ['div.image',"<?php output('image',['size'=>'".$param[0]."']); ?>"];}
			return ['div.image',"<?php output('image'); ?>"];
		}
		if($path_data['data_type']==='post' && post_type_supports($path_data['data_name'],'thumbnail')){
			if($param){return ['div.image',"<?php the_post_thumbnail('".$param[0]."'); ?>"];}
			return ['div.image',"<?php the_post_thumbnail(); ?>"];
		}
		return false;
	}
}

?>
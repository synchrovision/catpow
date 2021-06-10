<?php
namespace Catpow\article_type;

class contractconf extends mailconf{
	public static function get_default_post_datas($conf_data){
		return [
			$conf_data['data_name'].'/entry'=>[],
			$conf_data['data_name'].'/notice'=>[],
			$conf_data['data_name'].'/thanks'=>[],
		];
	}
}

?>
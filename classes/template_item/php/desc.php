<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class desc extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(isset($conf_data['meta']['desc'])){return "<?php output('desc'); ?>";}
		switch($path_data['data_type']){
			case 'post':
				if(post_type_supports($path_data['data_name'],'excerpt')){return '<?php the_excerpt(); ?>';}
				$rtn='';
				foreach($conf_data['meta'] as $name=>$conf){
					$rtn.="{$conf['label']}：<?php output('{$name}'); ?><br/>";
				}
				return $rtn;
			case 'page':
			case 'nav':
				return '<?php the_excerpt(); ?>';
			case 'term':
				return '<?= obj()->description ?>';
		}
		return false;
	}
}

?>
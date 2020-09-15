<?php
namespace Catpow\template_item\php;
/**
* zip,prefecture,city,address,
* tel,fax,email,
* business_day,business_hours,
* parking,access
*/

class access extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$rtn=[
			'',
			'address'=>['div.address']
		];
		if(isset($conf_data['meta']['zip'])){$rtn['address'][]="〒<?php output('zip'); ?>";}
		if(isset($conf_data['meta']['prefecture'])){$rtn['address'][]="<?php output('prefecture'); ?>";}
		if(isset($conf_data['meta']['city'])){$rtn['address'][]="<?php output('city'); ?>";}
		if(isset($conf_data['meta']['address'])){$rtn['address'][]="<?php output('address'); ?>";}
		
		$rtn['info']=['dl.info'];
		foreach(['tel','fax','email','business_day','business_hours','parking','access'] as $name){
			if(isset($conf_data['meta'][$name])){
				$rtn['info'][]=['dt.'.$name,$conf_data['meta'][$name]['label']];
				$rtn['info'][]=['dd.'.$name,"<?php output('{$name}'); ?>"];
			}
		}
		return $rtn;
	}
}

?>
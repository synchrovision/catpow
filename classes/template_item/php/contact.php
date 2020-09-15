<?php
namespace Catpow\template_item\php;
/**
* zip,prefecture,city,address,
* tel,fax,email,
* business_day,business_hours,
* parking,access
*/

class contact extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$rtn=[''];
		if(isset($conf_data['meta']['tel'])){$rtn[]=['.tel',"<?php output('tel'); ?>"];}
		if(isset($conf_data['meta']['email'])){$rtn[]=['.email',"<?php output('email'); ?>"];}
		if(isset($conf_data['meta']['business_day'])){$rtn[]=['.business_day',"<?php output('business_day'); ?>"];}
		if(isset($conf_data['meta']['business_hours'])){$rtn[]=['.business_hours',"<?php output('business_hours'); ?>"];}
		return $rtn;
	}
}

?>
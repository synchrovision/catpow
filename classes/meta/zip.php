<?php
namespace Catpow\meta;

class zip extends meta{
	public static
		$input_type='zip',
		$validation=['text','zip'];
	
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		$val=$meta->value;
		$rtn=sprintf('<div%s>',\cp::get_item_attr($path,$meta->conf));
		$rtn.=self::get_input($path,$meta,$val);
		$rtn.='</div>';
		return $rtn;
	}
	public static function get_input($path,$meta,$val){
		if(empty($meta->conf['address'])){
			$adrs=[];
			$parent_metas=\cp::get_conf_data(dirname($meta->conf['path']))['meta'];
			if(isset($parent_metas['prefecture'])){$adrs[]='prefecture';}
			elseif(isset($parent_metas['todouhuken'])){$adrs[]='todouhuken';}
			if(isset($parent_metas['city'])){$adrs[]='city';}
			elseif(isset($parent_metas['sikuchouson'])){$adrs[]='sikuchouson';}
			if(isset($parent_metas['address'])){$adrs[]='address';}
			if(isset($parent_metas['address1'])){$adrs[]='address1';}
			if(isset($parent_metas['address2'])){$adrs[]='address2';}
		}
		else{$adrs=(array)$meta->conf['address'];}
		foreach($adrs as $i=>$adr){
			$adrs[$i]=\cp::get_input_name(dirname($path,2).'/'.$adr.'/0');
		}
		if(!isset($adrs[1])){$adrs[1]=$adrs[0];}
		
		return sprintf(
			'<input type="text" name="%s" value="%s" onChange="console.log(\'%3$s\');AjaxZip3.zip2addr(this,\'\',\'%s\');"%s/>'.
			'<script>jQuery(function($){if(!("AjaxZip3" in window)){$.getScript("https://ajaxzip3.github.io/ajaxzip3.js");}});</script>',
			\cp::get_input_name($path),$val,
			implode("','",$adrs),\cp::get_input_attr($path,$meta->conf)
		);
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='zip';}
		return $conf;
	}
}
?>
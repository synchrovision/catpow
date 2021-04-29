<?php
namespace Catpow\meta;

class ZipCode extends UI{
	public static $output_type='zip';
	
	public static function input($meta,$prm){
		$prm=array_merge((array)$prm,['value'=>$meta->value,'name'=>\cp::get_input_name($meta->the_data_path)]);
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
			$adrs[$i]=\cp::get_input_name(dirname($meta->the_data_path,2).'/'.$adr.'/0');
		}
		if(!isset($adrs[1])){$adrs[1]=$adrs[0];}
		
		$prm['pref']=$adrs[0];
		$prm['addr']=$adrs[1];
		
		return self::get_input($meta->the_data_path,$meta->conf,$prm,$meta->value);
	}
}
?>
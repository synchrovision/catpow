<?php
namespace Catpow\meta;

class ZipCode extends UI{
	public static $output_type='zip';
	
	public static function input($meta,$prm){
		$prm=array_merge((array)$prm,['value'=>$meta->value,'name'=>\cp::get_input_name($meta->the_data_path)]);
		if(empty($meta->conf['address'])){
			$adrs=[];
			$parent_metas=\cp::get_conf_data(dirname($meta->conf['path']))['meta'];
			$pref=preg_match('/^(\w+_)zip/i',$meta->conf['name'],$matches)?$matches[1]:'';
			$suff=preg_match('/zip(?:code)?(_\w+)$/i',$meta->conf['name'],$matches)?$matches[1]:'';
			
			foreach(zip::$effect_targets as $target){
				$n=$pref.$target.$suff;
				if(isset($parent_metas[$n])){$adrs[]=$n;}
			}
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
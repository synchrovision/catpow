<?php
namespace Catpow\meta;

class place extends meta{
	public static
		$is_bulk_output=true;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return [[
			'lat'=>call_user_func(['\\Catpow\\data_type\\'.$data_type,'get_meta'],$data_name,$id,'lat'),
			'lng'=>call_user_func(['\\Catpow\\data_type\\'.$data_type,'get_meta'],$data_name,$id,'lng')
		]];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		call_user_func(['\\Catpow\\data_type\\'.$data_type,'delete_meta'],$data_name,$id,'lat');
		call_user_func(['\\Catpow\\data_type\\'.$data_type,'delete_meta'],$data_name,$id,'lng');
		foreach((array)$vals as $val){
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,'lat',$val['lat']);
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,'lng',$val['lng']);
		}
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach((array)$vals as $val){
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,'lat',$val['lat']);
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,'lng',$val['lng']);
		}
	}
	
	public static function output($meta,$prm){
		return $meta->value;
	}
	public static function input($meta,$prm){
		if(true || $prm=='here'){
			return sprintf(
				'<input id="%1$s_lat" type="hidden" name="%2$s" value="1"/>'.
				'<input id="%1$s_lng" type="hidden" name="%3$s" value="1"/>'.
				'<script>navigator.geolocation.getCurrentPosition(function(position){'.
				'document.getElementById("%1$s_lat").value=position.coords.latitude;'.
				'document.getElementById("%1$s_lng").value=position.coords.longitude;'.
				'});</script>',
				\cp::get_input_id($meta->the_data_path),
				\cp::get_input_name($meta->meta('lat')->the_data_path),
				\cp::get_input_name($meta->meta('lng')->the_data_path)
			);
		}
		return sprintf(
			'<input type="%s" name="%s" value="%s"%s/>',
			isset(static::$input_type)?static::$input_type:static::get_type(),
			\cp::get_input_name($meta->the_data_path),$meta->value,
			\cp::get_input_attr($meta->the_data_path,$meta->conf)
		);
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty(array_filter($input['value']))){return false;}
		
		$lat=$input['value'][0]['lat'][0];
		$lng=$input['value'][0]['lng'][0];
		$dst=$input['value'][0]['dst'][0]??1;
		$query['meta_query']['dst']=[
			'keys'=>['lat','lng'],
			'alias'=>'dst',
			'compute'=>"(SQRT(POW(lat.meta_value　- {$lat},2) + POW(lng.meta_value - {$lng},2))",
			'compare'=>'<=',
			'where'=>"lat.meta_value <= {$dst} AND lng.meta_value <= {$dst}"
		];
		$query['orderby']['dst']='ASC';
	}
	public static function fill_conf(&$conf){
		$conf['meta']=array_merge([
			'lat'=>['type'=>'number'],
			'lng'=>['type'=>'number'],
			'dst'=>['type'=>'number']
		],(array)$conf['meta']);
	}
}


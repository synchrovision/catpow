<?php

/*download*/
function cp_download($fname,$content){
	cp::download($fname,$content);
}

/*ファイル取得*/
function cp_get_file_path($name,$deep=false){
    return \cp::get_file_path($name,$deep);
}
function cp_get_file_url($name,$deep=false){
    return \cp::get_file_url($name,$deep);
}
function cp_include_plugin_files($name,$vars=false){
    \cp::include_plugin_files($name,$vars);
}
function cp_get_template_part($slug,$name=false,$vars=false){
    \cp::get_template_part($slug,$vars);
}
function cp_get_template_contents($slug,$name=false,$vars=false){
    return \cp::get_template_content($slug,$vars);
}


/*スクリプト・スタイル登録*/
function cp_enqueue_script($handle,$src=false,$depth=array(),$ver=false,$in_footer=false){
	cp::enqueue_script($src,$depth,$ver,$in_footer);
}
function cp_enqueue_style($handle,$src=false,$depth=array(),$ver=false,$in_footer=false){
	cp::enqueue_style($src,$depth,$ver,$in_footer);
}

/*基本情報入出力*/
function cp_get_value($type,$name){
	global $cp_meta_value_source,${'cp_loop_'.$type.'_id'},$cp_data_stock_name,$cp_data_stock;
	
	$rtn=false;
	foreach((array)$cp_meta_value_source as $i=>$source){
		switch($source){
			case 'post':if($rtn=call_user_func('get_'.$type,${'cp_loop_'.$type.'_id'}))return $rtn->{$name};
			case 'stock':if($cp_data_stock->has($cp_data_stock_name,$type,${'cp_loop_'.$type.'_id'},$name,'value'))
				return $cp_data_stock->get($cp_data_stock_name,$type,${'cp_loop_'.$type.'_id'},$name,'value');
			case 'request':if(isset($_REQUEST[$type][${'cp_loop_'.$type.'_id'}][$name]['value']))
				return $_REQUEST[$type][${'cp_loop_'.$type.'_id'}][$name]['value'];
		}
	}
	return array();
}


/*input output 基礎*/
function cp_get_meta($data_type,$id,$meta_name,$single=false){
	return \cp::get_meta($data_type,cp::get_data_name($data_type,$id),$meta_name,$id,$single);
}
function cp_set_meta($data_type,$id,$meta_name,$vals){
	return \cp::set_meta($data_type,cp::get_data_name($data_type,$id),$meta_name,$id,$vals);
}

function cp_get_data_name($type,$id){
	return cp::get_data_name($type,$id);
}

function cp_get_meta_name($data_type){
	return cp::get_meta_name($data_type);
}
function cp_get_data_type_name($data_type){
	return cp::get_data_type_name($data_type);
}
function cp_get_data_type_id_name($data_type){
	return cp::get_data_id_name($data_type);
}
function cp_get_conf_data_name($data_type){
	return cp::get_conf_data_name($data_type);
}

function &cp_get_conf_data($data_type,$data_name){
	return cp::get_conf_data($data_type.'/'.$data_name);
}
function cp_get_available_data_types(){
	return cp::$data_types;
}
function cp_is_available_data_type($data_type){
	return in_array($data_type,cp::$data_types);
}

/*コンテンツ*/
function cp_page_header($name=false,$vars=false){
	cp::page_header($name,$vars);
}
function cp_page_sidebar($name=false,$vars=false){
	cp::page_sidebar($name,$vars);
}
function cp_page_content($name=false,$vars=false){
	cp::page_content($name,$vars);
}
function cp_page_footer($name=false,$vars=false){
	cp::page_footer($name,$vars);
}

/*scss*/
function cp_scss_compile($scss_names){
	cp::scss_compile($scss_names);
}

?>

<?php
/*補助関数*/
function _a($check,$message){
	if(false===$check)throw new Exception($message);
}
function _d($val){
	static $is_first=true;
	if($is_first){
		printf('<link rel="stylesheet" href="%s"/>',cp::get_file_url('debug.css'));
		printf('<script src="%s"></script>',cp::get_file_url('debug.js'));
		$is_first=false;
	}
	echo '<div id="cp_log">';
	$bt=debug_backtrace()[0];
	printf('<small>%s(%s)</small><br/>',basename($bt['file']),$bt['line']);
	$fnc_dump_as_table=function($vals,$refs=[])use(&$fnc_dump_as_table){
		if(is_array($vals) || is_object($vals)){
			if(is_object($vals)){
				if(in_array($vals,$refs)){echo '...';return;}
				else{$refs[]=$vals;}
			}
			echo '<table>';
			foreach($vals as $key=>$val){
				printf('<tr><th>%s<span class="type">(%s)</span></th><td>',$key,is_object($val)?get_class($val):gettype($val));
				$fnc_dump_as_table($val,$refs);
				echo('</td></tr>');
			}
			echo '</table>';
		}
		else{
			var_export($vals);
		}
	};
	$fnc_dump_as_table($val);
	echo('</div>');
}
function _h($str){
	return htmlspecialchars($str,ENT_QUOTES,mb_internal_encoding());
}
function array_get(){
	$args=func_get_args();
	$val=array_shift($args);
	while(isset($args[0])){
		$key=array_shift($args);
		if(!isset($val[$key])){
			if(empty($key) and count($val)){
				$val=reset($val);
			}else{
				return null;
			}
		}else{
			$val=$val[$key];
		}
	}
	return $val;
}
function &array_get_ref(&$arr,$names){
	if(isset($names[0])){
		$rtn=&array_get_ref($arr[array_shift($names)],$names);
		return $rtn;
	}
	else{
		return $arr;
	}
}
function array_isset($arr,$names){
	$name=array_shift($names);
	if(!isset($arr[$name])){return false;}
	if(isset($names[0])){
		if(!is_array($arr[$name])){return false;}
		return array_isset($arr[$name],$names);
	}
	return true;
}
function is_hash($array){
	$i=0;
	if(!is_array($array))return false;
	foreach($array as $key=>$val)if($key!==$i++)return true;
	return false;
}
/*wp補助*/
function get_the_slug($id=null){
	if(isset($id)){return get_post($id)->post_name;}
	global $post;
	return $post->post_name;
}
function the_slug($id=false){
	echo get_the_slug($id);
}

?>
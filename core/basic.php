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
function is_hash(&$array){
	$i=0;
	if(!is_array($array))return false;
	foreach($array as $key=>$val)if($key!==$i++)return true;
	return false;
}
function dir_copy($dir_name, $new_dir){
	if (!is_dir($new_dir)) { mkdir($new_dir); }
	if (is_dir($dir_name)) {
		if ($dh = opendir($dir_name)) {
			while (($file = readdir($dh)) !== false) {
				if ($file == "." || $file == "..") { continue; }
				if (is_dir($dir_name . "/" . $file)) {dir_copy($dir_name . "/" . $file, $new_dir . "/" . $file);}
				else {copy($dir_name . "/" . $file, $new_dir . "/" . $file);}
			}
			closedir($dh);
		}
	}
	return true;
}
function dir_delete($dir){
	foreach(scandir($dir) as $file) {
		if ('.' === $file || '..' === $file) continue;
		if (is_dir("$dir/$file")) dir_delete("$dir/$file");
		else unlink("$dir/$file");
	}
	rmdir($dir);
}
function dir_create($dir){
	if(!is_dir(dirname($dir))){dir_create(dirname($dir));}
	if(!is_dir($dir)){mkdir($dir);}
}
function counter($id,$val=0,$ope='+'){
	static $data;
	if(empty($data))$data=array();
	if(empty($data[$id]))$data[$id]=0;
	switch($ope){
		case '+':$data[$id]+=(int)$val;break;
		case '-':$data[$id]-=(int)$val;break;
		case '*':$data[$id]*=(int)$val;break;
		case '/':$data[$id]/=(int)$val;break;
	}
	return $data[$id];
}
function cp_log($log=false){
	static $logs,$req_mtime;
	if(!isset($logs)){
		$logs=array();
		$req_mtime=$_SERVER['REQUEST_TIME_FLOAT'];
	}
	if($log===false){_d($logs);}
	else{$logs[(string)(microtime(true)-$req_mtime)]=$log;}
}

function cp_word_gen($chunk=2,$use_mark=false,$digit=4){
	static $v,$sv,$c1,$c2,$m1,$m2;
	if(!isset($v)){
		$c1=array(
			'b','by','bl','br',
			'c','cy','ch','cl',
			'd','dy','dh','dl','dr',
			'f','fl','fr',
			'g','gy','gl','gr',
			'j',
			'k','ky','kn',
			'l',
			'm','my',
			'n','ny',
			'p','py','ph','ps','pr','pl',
			'q',
			'r','rh',
			's','sy','sh','sl','sr',
			't','ty','th','tw','tl','tr',
			'v',
			'y','yh',
			'w','wh','wr',
			'z','zy','zh'
		);
		$v=array(
			'a','ar','ae','au','air','are','ah',
			'e','er','ea','ear','ee','ey','ew',
			'i','ir','ie',
			'o','or','ou','our','ore','oo','ow','oy','oh',
			'u','ur','ue',
		);
		$c2=array(
			'b',
			'c','ck','ch',
			'd',
			'g','gh',
			'k','ks',
			'l','ll',
			'm','mn',
			'n','ng',
			'p','ps','pt',
			'q',
			's','sh',
			't','th','ts',
			'z','zz',
			'x'
		);
		$m1='!@#$%^&*()';
		$m2='-_ []{}<>~`+=,.;:/?|';
	}
	$rtn='';
	for($i=0;$i<$chunk;$i++){
		$c=$c1[array_rand($c1)];
		if(rand(0,1)==1)$c[0]=strtoupper($c[0]);
		$rtn.=$c;
		$rtn.=$v[array_rand($v)];
	}
	if(rand(0,2)==1)$rtn.=$c2[array_rand($c2)];
	$rtn=str_replace('yi','i',$rtn);
	if($use_mark)$rtn.=$m1[rand(0,count($m1))];
	$rtn.=rand(pow(10,$digit-1),pow(10,$digit)-1);
	return $rtn;
}



/*ajax*/
function get_ajax_url($action,$prm=null){
	$prm=(array)$prm;
	$prm['action']=$action;
	return sprintf('%s?%s',admin_url().'/admin-ajax.php',http_build_query($prm));
}
function ajax_url($action,$prm){
	echo(get_ajax_url($action,$prm));
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
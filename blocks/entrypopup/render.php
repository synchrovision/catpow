<?php
namespace Catpow;
do{
	if($attr['target']!=='every'){
		$key='prevent_entrypopup';
		if($attr['target']==='page'){
			$key.='_'.$_SERVER['REQUEST_URI'];
		}
		if(!empty($_SESSION[$key])){break;}
		$_SESSION[$key]=true;
	}
	echo $content;
}while(false);
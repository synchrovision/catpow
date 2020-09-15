<?php
if(!empty($wp->query_vars['cp_callee'])){
	$param=explode('/',$wp->query_vars['cp_callee']);
	cp::include_plugin_file('functions/'.$param[0].'/callee/'.$param[1],['action'=>$param[2]??null]);
	die();
}
<?php
/*css生成*/
if(current_user_can('edit_themes')){
	cp::scss_compile(array(
		'style','content','layout','mail','debug',
		cp::get_the_content_path().'/style',
		cp::get_the_content_path().'/layout',
		cp::get_the_content_path().'/mail'
	));
}
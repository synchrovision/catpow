<?php
/*migration*/
if(
	$hook_extra['action']!=='update' || 
	$hook_extra['type']!=='plugin' || 
	!in_array('catpow/catpow.php',$hook_extra['plugins'],true)
){return;}

if(!get_theme_mod('colors')){
	$color_roles=style_config::get_color_roles();
	$colors=[
		'background'=>get_theme_mod('background_color')?'#'.get_theme_mod('background_color'):$color_roles['background_color']['default']
	];
	foreach($color_roles as $color_role=>$color_role_settings){
		if(isset($colors[$color_role])){continue;}
		$colors[$color_role]=get_theme_mod($color_role.'_color',$color_role_settings['default']);
	}
	set_theme_mod('colors',$colors);
}
if(!get_theme_mod('fonts')){
	if($f=\cp::get_file_path('json/fonts.json')){
		$fonts=(array)json_decode(file_get_contents($f),true);
		if(is_array($fonts[0]??null)){
			$fonts=$fonts[0];
			foreach($fonts as $key=>$val){
				if(is_array($val)){$fonts[$key]=implode(',',$val);}
			}
		}
	}
	else{
		$f=get_stylesheet_directory().'/json/fonts.json';
		foreach(style_config::get_font_roles() as $role=>$conf){
			$fonts["{$role}_font"]=get_option("cp_adobe_fonts_{$role}_font",$conf['default']);
		}
	}
	file_put_contents($f,json_encode($fonts,0700));
	set_theme_mod('fonts',$fonts);
	$results[]=['text'=>'update fonts data structure'];
}
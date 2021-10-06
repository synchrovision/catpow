<?php
namespace Catpow;

class git_theme{
	public static function init(){
		chdir(get_stylesheet_directory());
		if(is_dir($d='/Applications/MAMP/Library/bin') && strpos(getenv('PATH'),$d)===false){putenv('PATH='.getenv('PATH').':'.$d);}
	}
	public static function create(){
		if(self::is_theme_repo()){return false;}
		self::init();
		$dir=get_stylesheet_directory();
		passthru("git init && git add . && git commit -m 'init' && git config receive.denyCurrentBranch ignore");
		$hook_file=$dir.'/.git/hooks/post-receive';
		file_put_contents($hook_file,"#!/bin/sh\ncd {$dir};\ngit --git-dir=.git reset --hard");
		chmod($hook_file,0755);
	}
	public static function is_theme_repo(){
		return is_dir(get_stylesheet_directory().'/.git');
	}
	public static function dashboard_widget_content(){
		if(!empty($_REQUEST['catpow_git_action'])){
			if(wp_verify_nonce($_REQUEST['_catpow_git_nonce'],'catpow_git_action')){
				switch($_REQUEST['catpow_git_action']){
					case 'create':self::create();break;
				}
			}
			else{
				echo '<p>invalid request</p>';
			}
		}
		$format='<p><a class="button button-primary" href="%s">%s</a></p>';
		if(self::is_theme_repo()){
			echo get_stylesheet_directory().'/.git';
		}
		else{
			echo '<form action="./" method="POST">';
			printf('<button type="submit" name="catpow_git_action" class="button button-primary" value="create">CREATE</button>');
			wp_nonce_field('catpow_git_action','_catpow_git_nonce');
			echo '</form>';
		}
	}
}

?>
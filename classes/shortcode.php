<?php
namespace Catpow;

class shortcode{
	public static function init(){
		add_shortcode('home_url',function(){return home_url();});
		add_shortcode('home_href',function(){static $cache;return $cache??($cache=explode('://',home_url())[1]);});
		add_shortcode('home_path',function(){static $cache;return $cache??($cache=ltrim(parse_url(home_url('/'),PHP_URL_PATH),'/'));});
		add_shortcode('theme_url',function(){return get_stylesheet_directory_uri();});
		add_filter('render_block_core/template-part',[self::class,'do_shortcode']);
		add_filter('the_content',[self::class,'do_shortcode']);
	}
	public static function callback($atts,$content='',$tag=''){
		if($f=CP::get_file_path('shortcode/'.$tag.'/output.php')){
			ob_start();
			include $f;
			return ob_get_clean();
		}
		return false;
	}
	public static function get_tags(){
		static $tags=[];
		if(!empty($tags)){return $tags;}
		foreach(cp::get_file_paths('shortcode') as $sc_dir){
			foreach(glob($sc_dir.'/*/output.php') as $sc_file){
				$tags[]=substr($sc_file,strrpos($sc_file,'/',-12)+1,-11);
			}
		}
		return $tags;
	}
	public static function do_shortcode($content){
		if(false===strpos($content,'[')){return $content;}

		preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@',$content,$matches);
		$tags=array_intersect(self::get_tags(),$matches[1]);

		if(empty($tags)){return $content;}
		
		foreach($tags as $tag){
			CP::enqueue_script('shortcode/'.$tag.'/script.js');
			CP::enqueue_style('shortcode/'.$tag.'/style.css');
		}

		$pattern=get_shortcode_regex($tags);
		$content=preg_replace_callback("/$pattern/",[self::class,'do_shortcode_tag'],$content);

		return $content;
	}
	public static function do_shortcode_tag($m){
		if('['===$m[1] && ']'===$m[6]){
			return substr( $m[0], 1, -1 );
		}

		$tag=$m[2];
		$attr=shortcode_parse_atts( html_entity_decode($m[3]) );
		$return=apply_filters('pre_do_shortcode_tag',false,$tag,$attr,$m);
		if(false !== $return){
			return $return;
		}

		$content=$m[5]??null;

		$output=$m[1].self::callback($attr,$content,$tag).$m[6];
		return apply_filters('do_shortcode_tag',$output,$tag,$attr,$m);
	}
}
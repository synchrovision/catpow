<?php
namespace Catpow\util;

class shortcode{
	public static function callback($content){
		global $shortcode_tags;

		if(false===strpos($content,'[')){return $content;}
		if(empty($shortcode_tags) || !is_array($shortcode_tags)){return $content;}

		preg_match_all( '@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches );
		$tagnames = array_intersect( array_keys( $shortcode_tags ), $matches[1] );

		if(empty($tagnames)){return $content;}

		$pattern=get_shortcode_regex($tagnames);
		$content=preg_replace_callback("/$pattern/",'do_shortcode_tag',$content);

		$content=unescape_invalid_shortcodes( $content );

		return $content;
	}
}
<?php
namespace Catpow\meta;

class picture extends responsive_image{
	public static
		$can_search=false,
		$has_children=true;
	
	public static function output($meta,$prm){
		$rtn='<picture>';
		$vals=$meta->value;
		if(empty($vals)){return '';}
		uksort($vals,function($a,$b){if($a==0)return 1;if($b==0)return -1;return $b-$a;});
		foreach($vals as $bp=>$vs){
			$img_data=wp_get_attachment_image_src(reset($vs),$meta->conf['meta'][$bp]['size']??'full');
			if(empty($img_data)){continue;}
			if($bp!=0){
				$rtn.=sprintf(
					'<source srcset="%s" media="(%s-width:%dpx)"/>',
					$img_data[0],($bp<0)?"max":"min",abs($bp)
				);
			}
			else{
				$rtn.=sprintf(
					'<img src="%s" alt="%s"/>',
					$img_data[0],
					trim(strip_tags(get_post_meta(reset($vs),'_wp_attachment_image_alt',true)))
				);
			}
		}
		$rtn.='</picture>';
		return $rtn;
	}
}

?>
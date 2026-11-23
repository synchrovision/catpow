<?php
namespace Catpow\meta;

class picture extends responsive_image{
	public static
		$can_search=false,
		$has_children=true;
	
	public static function output($meta,$prm){
		return static::get_picture($meta,$prm,false);
	}
	public static function get_output_html_data($meta,$prm){
		return static::get_picture($meta,$prm,true);
	}
	protected static function get_picture($meta,$prm,$structured){
		$rtn='<picture>';
		$children=[];
		$vals=$meta->value;
		if(empty($vals)){return $structured?null:'';}
		uksort($vals,function($a,$b){if($a==0)return 1;if($b==0)return -1;return $b-$a;});
		foreach($vals as $bp=>$vs){
			$img_data=wp_get_attachment_image_src(reset($vs),$meta->conf['meta'][$bp]['size']??'full');
			if(empty($img_data)){continue;}
			if($bp!=0){
				$media=sprintf('(%s-width:%dpx)',$bp<0?'max':'min',abs($bp));
				if($structured){
					$children[]=['source','srcset'=>$img_data[0],'media'=>$media];
					continue;
				}
				$rtn.=sprintf(
					'<source srcset="%s" media="%s"/>',
					$img_data[0],$media
				);
			}
			else{
				$alt=trim(strip_tags(get_post_meta(reset($vs),'_wp_attachment_image_alt',true)));
				if($structured){
					$children[]=['img','src'=>$img_data[0],'alt'=>$alt];
					continue;
				}
				$rtn.=sprintf(
					'<img src="%s" alt="%s"/>',
					$img_data[0],
					$alt
				);
			}
		}
		if($structured){return ['picture','class'=>$prm['class']??null,'children'=>$children];}
		$rtn.='</picture>';
		return $rtn;
	}
}

?>
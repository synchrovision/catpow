<?php
namespace Catpow\meta;

class responsive_image extends media{
	public static
		$has_children=true;
	
	public static function output($meta,$prm){
		$id=uniqid('responsive_image');
		return sprintf('<div id="%s" class="responsive_image"><style type="text/css">%s</style></div>',$id,static::get_background_styles($meta,$prm,$id));
	}
	public static function get_output_html_data($meta,$prm){
		$id=uniqid('responsive_image');
		return ['div.responsive_image','class'=>$prm['class']??null,'id'=>$id,['style','type'=>'text/css',static::get_background_styles($meta,$prm,$id)]];
	}
	protected static function get_background_styles($meta,$prm,$id){
		$position=$prm['position']??'50% 50%';
		$size=$prm['size']??'cover';
		$styles='';
		$vals=(array)$meta->value;
		uksort($vals,function($a,$b){if($a==0)return -1;if($b==0)return 1;return $a-$b;});
		foreach($vals as $bp=>$vs){
			$img_data=wp_get_attachment_image_src(reset($vs),$meta->conf['meta'][$bp]['size']??'full');
			if(empty($img_data[1])){continue;}
			if($bp<0)$styles.=sprintf("@media(max-width:%dpx){",abs($bp));
			if($bp>0)$styles.=sprintf("@media(min-width:%dpx){",$bp);
			$styles.=sprintf("#%s{background:url('%s') %s / %s no-repeat;}",$id,$img_data[0],$position,$size);
			$styles.=sprintf("#%s:before{display:block;content:' ';padding-top:%s%%;}",$id,$img_data[2]/$img_data[1]*100);
			if($bp!=0)$styles.='}';
		}
		return $styles;
	}
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		$val=$meta->value;
		$rtn='<ul class="inputs">';
		foreach($meta->conf['meta'] as $bp=>$child_meta){
			$rtn.=sprintf('<li><h3>%s</h3>',$child_meta['label']??($bp.'px'));
			$rtn.=media::get_input($path.'/'.$bp.'/0',$child_meta,$val[$bp][0]??null);
			$rtn.='</li>';
		}
		$rtn.='</ul>';
		return $rtn;
	}
	public static function fill_conf(&$conf){
		if(empty($conf['meta'])){
			$conf['meta']=[
				0=>['label'=>'PC版画像'],
				-640=>['label'=>'SP版画像','size'=>'medium_large']
			];
		}
		foreach($conf['meta'] as $bp=>$child_meta){
			$conf['meta'][$bp]['type']=$conf['meta'][$bp]['type']??'media';
		}
	}
}
?>
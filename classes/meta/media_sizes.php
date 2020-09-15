<?php
namespace Catpow\meta;

class media_sizes extends media_set{
	public static
		$has_children=true,
		$is_unit_output=true,
		$is_unit_input=true;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$data=wp_get_attachment_metadata($id);
		$rtn=[];
		foreach(get_intermediate_image_sizes() as $size){
			$rtn[0][$size][]=(isset($data['alt_image'][$size]))?$data['alt_image'][$size]:$id;
		}
		return $rtn;
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$data=wp_get_attachment_metadata($id);
		$data['alt_image']=[];
		foreach(get_intermediate_image_sizes() as $size){
			if(!empty($vals[0][$size][0]) && $vals[0][$size][0]!==$id){
				$data['alt_image'][$size]=$vals[0][$size][0];
			}
		}
		wp_update_attachment_metadata($id,$data);
	}
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		$val=$meta->value;
		$rtn='<ul class="inputs">';
		foreach($meta->conf['meta'] as $w=>$child_meta){
			$rtn.=sprintf('<li><h3>%s</h3>',$child_meta['label']);
			$rtn.=media::get_input($path.'/'.$w.'/0',$child_meta,$val[$w][0]?:null);
			$rtn.='</li>';
		}
		$rtn.='</ul>';
		return $rtn;
	}
	
	public static function fill_conf(&$conf){
		if(!isset($conf['meta'])){
			foreach(get_intermediate_image_sizes() as $size){
				$conf['meta'][$size]=['type'=>'media'];
			}
		}
	}
}
?>
<?php
namespace Catpow\meta;

class media_set extends media{
	public static
		$has_children=true,
		$is_unit_output=true;
	
	public static function output($meta,$prm){
		$vals=$meta->value;
		if(empty($vals)){return false;}
		krsort($vals);
		$prm=(array)$prm;
		
		$srcset=[];
		foreach($vals as $w=>$vs){
			$url=wp_get_attachment_url(reset($vs));
			if(empty($w)){$srcset[]=$url;}
			else{$srcset[]=$url.' '.$w.'w';}
		}
		$post=get_post(reset($vs));
		$media=substr($post->post_mime_type,0,5);
		if($media==='image'){
			return sprintf(
				'<img id="%s" srcset="%s"/><script>jQuery(function($){$("#%1$s").cp_loader().update();});</script>',
				$meta->input_id,
				implode(',',$srcset)
			);
		}
		return sprintf(
			'<%s id="%s" srcset="%s"%s></%1$s><script>jQuery(function($){$("#%2$s").cp_loader().update();});</script>',
			$media,
			$meta->input_id,
			implode(',',$srcset),
			static::get_player_attr(array_merge($meta->conf,$prm))
		);
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
			if(isset($conf['bp'])){
				foreach($conf['bp'] as $bp){
					$conf['meta'][$w]=['type'=>'media'];
				}
			}
			else{
				$conf['meta']=[
					'0'=>['type'=>'media','label'=>__('PC','catpow')],
					'480'=>['type'=>'media','label'=>__('SP','catpow')]
				];
			}
		}
	}
}
?>
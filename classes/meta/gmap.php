<?php
namespace Catpow\meta;

class gmap extends data{
	public static
		$is_bulk_output=true;
	
	public static function output($meta,$prm){
		return static::get_map_output($meta,$prm,false);
	}
	public static function get_output_html_data($meta,$prm){
		return static::get_map_output($meta,$prm,true);
	}
	protected static function get_map_output($meta,$prm,$as_html_data){
		$val=$meta->value;
		static $token,$mapOptions_default,$markerOptions_default,$is_called;
		
		if($prm === 'url'){
			return 'google.com/maps/search/?api=1&query='.($val[0]['address'][0]??'');
		}
		
		wp_enqueue_script('jquery.catpow.gmap');
		
		if(empty($token)){
			$gauth_conf=get_option('gauth_conf');
			if(empty($gauth_conf['api_key'][0])){
				$message=__('gmapを使うにはGoogleAPIキーが必要です','Catpow');
				if($as_html_data){return ['p.caution','class'=>$prm['class']??null,$message];}
				return '<p class="caution">'.$message.'</p>';
			}
			$token=$gauth_conf['api_key'][0];
		}
		if(empty($mapOptions_default)){
			$mapOptions_default=['zoom'=>16];
		}
		if(empty($markerOptions_default)){
			$markerOptions_default=[];
		}
		$map_id=uniqid('gmap');
		$cp_gmap_data=[
			'id'=>$map_id,
			'api_key'=>$token,
			'markers'=>[],
			'mapOptions'=>isset($meta->conf['mapOptions'])?array_merge($mapOptions_default,$meta->conf['mapOptions']):$mapOptions_default,
			'markerOptions'=>isset($meta->conf['markerOptions'])?array_merge($markerOptions_default,$meta->conf['markerOptions']):$markerOptions_default,
		];
		foreach($val as $i=>$v){
			foreach($v as $j=>$vv){
				$type=$meta->conf['meta'][$j]['type'];
				if($type=='image' or $type=='media'){
					$image=wp_get_attachment_image_src(reset($vv),'full');
					$val[$i][$j]=$image[0];
				}
				else{$val[$i][$j]=reset($vv);}
			}
		}
		$cp_gmap_data['markers']=$val;
		
		if($as_html_data){
			$options=json_encode($cp_gmap_data,JSON_HEX_TAG);
			return ['div.gmap','class'=>$prm['class']??null,'id'=>$map_id,
				['script',sprintf('jQuery(function($){$("#%s").cp_gmap(%s)});',$map_id,$options)]
			];
		}

		ob_start();
		?>
			<div class="gmap" id="<?=$map_id?>"></div>
			<script>jQuery(function($){$('#<?=$map_id?>').cp_gmap(<?=json_encode($cp_gmap_data)?>)});</script>
		<?php
		return ob_get_clean();
	}
	public static function fill_conf(&$conf){
		if(!isset($conf['meta'])){
			$conf['meta']=[
				'address'=>['type'=>'text']
			];
		}
	}
}


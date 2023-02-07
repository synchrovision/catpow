<?php
namespace Catpow\meta;

class gmap extends data{
	public static
		$is_bulk_output=true;
	
	public static function output($meta,$prm){
		$val=$meta->value;
		static $token,$mapOptions_default,$markerOptions_default,$is_called;
		
		if($prm === 'url'){
			return 'google.com/maps/search/?api=1&query='.($val[0]['address'][0]??'');
		}
		
		wp_enqueue_script('jquery.catpow.gmap');
		
		if(empty($token)){
			$gauth_conf=get_option('gauth_conf');
			if(empty($gauth_conf[0]['api_key'][0])){
				return '<p class="caution">'.__('gmapを使うにはGoogleAPIキーが必要です','Catpow').'</p>';
			}
			$token=$gauth_conf[0]['api_key'][0];
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


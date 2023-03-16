<?php
namespace Catpow\api\images;
/**
* ボーダー画像一覧を取得
*/

class border extends icon{
	public static $param_pattern='(?P<repeat>s|r)?(?P<slice>\d+(_\d+)*)?',$param_default=['repeat'=>'round','slice'=>null,'ext'=>null];
	public static function fill_data($data){
		foreach($data as $index=>$image){
			$conf=&$data[$index]['conf'];
			if(empty($conf['name'])){
				$conf['name']=str_replace('.','_',basename($image['url']));
			}
			if(empty($conf['slice'])){
				if($conf['ext']=='.svg'){
					$code=file_get_contents($image['path']);
					if(empty($image['width'])){
						preg_match('|width="(?P<width>\d+)|',$code,$matches);
						$image['width']=$matches['width'];
					}
					if(empty($image['heigth'])){
						preg_match('|height="(?P<height>\d+)|',$code,$matches);
						$image['height']=$matches['height'];
					}
				}
				$conf['slice']=floor($image['width']/3).' '.floor($image['height']/3);
			}
			if(empty($conf['width'])){
				$conf['width']=implode(' ',array_map(function($w){return $w.'px';},explode(' ',$conf['slice'])));
			}
			$conf['repeat']=['s'=>'stretch','r'=>'repeat'][$conf['repeat']]?:$conf['repeat'];
		}
		return $data;
	}
}

?>
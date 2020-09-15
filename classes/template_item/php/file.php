<?php
namespace Catpow\template_item\php;
/**
* 指定されたfileディレクトリのファイルをコードデータにして返す
*/

class file extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$lines=file(\cp::get_file_path('classes/template_item/php/file/'.$param[0].'.php'),\FILE_IGNORE_NEW_LINES);
		$rtn=['_'];
		$keys=[];
		$current_depth=0;
		$ref=&$rtn;
		foreach($lines as $line){
			preg_match('/^(\t*)(.*)$/',$line,$matches);
			if(preg_match('/^\/\*\[(.+)\]\*\/$/',$matches[2],$sub_matches)){
				$label=$sub_matches[1];
				continue;
			}
			$matches[2]=preg_replace_callback('|/\*=(.+?)=\*/|',function($matches)use($path_data,$conf_data){
				if($matches[1][0]==='@'){
					ob_start();
					parent::render($path_data,$conf_data,['',$matches[1]]);
					return trim(ob_get_clean());
				}
				eval('$rtn='.$matches[1].';');
				return $rtn;
			},$matches[2]);
			$next_depth=strlen($matches[1]);
			if($current_depth!==$next_depth){
				if($current_depth>$next_depth){
					$keys=array_slice($keys,0,$next_depth);
				}
				else{
					if(empty($label)){
						$keys[]=count($ref);
					}
					else{
						$keys[]=$label;
						unset($label);
					}
					array_pad($keys,$next_depth,0);
				}
				if($next_depth===0){
					$ref=&$rtn;
				}
				else{
					eval('$ref = &$rtn["'.implode('"]["',$keys).'"];');
				}
				$current_depth=$next_depth;
			}
			if(empty($ref)){$ref[]='_';}
			if(empty($label)){
				$ref[]=$matches[2];
			}
			else{
				$ref[$label]=$matches[2];
				unset($label);
			}
		}
		return $rtn;
	}
}

?>
<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

abstract class template_type{
	public static
		$label=null,
		$permalinks=[];
	
	public static function preview($path_data,$conf_data,$vars){
		if($f=static::get_preview_file($path_data,$conf_data)){
			if($vars){extract($vars);}
			include $f;
			unlink($f);
			return true;
		}
		return false;
	}
	public static function get_preview_file($path_data,$conf_data){
		$file_name=$path_data['file_name'];
		if(isset($path_data['file_slug'])){$file_name.='-'.$path_data['file_slug'];}
		$template_files=static::get_template_files($conf_data);
		
		if(isset($template_files[$file_name.'.php'])){
			$class_name=\cp::get_class_name('template_item','php');
			ob_start();
			\Catpow\template_creator::render_code_data($template_files[$file_name.'.php'],$path_data,$conf_data);
			$contents=ob_get_clean();
			if(empty($contents)){return false;}
			$tmp=tempnam(sys_get_temp_dir(),'preview');
			$fh=fopen($tmp,'w');
			fwrite($fh,$contents);
			return $tmp;
		}
		return false;
	}
	
	public static function get_embeddables($path,$conf_data){return [];}
	public static function get_rest_routes($path,$conf_data){return [];}
	public static function get_menus($path,$conf_data){return [];}
	public static function get_nav_menu_items($path,$conf_data){return [];}
	public static function get_template_files($conf_data){
		static $cache;
		$template=static::get_template_name();
		if(isset($cache[$template])){return $cache[$template];}
		$files=[];
		$tempate_dir=\cp::get_file_path('config/template/'.$template);
		if(!empty($tempate_dir)){
			foreach(scandir($tempate_dir) as $fname){
				if(in_array($fname[0],['.','_'],1)){continue;}
				$files[$fname]='default';
			}
		}
		return $cache[$template]=$files;
	}
	public static function before_create_template_files($conf_data){}
	public static function fill_conf_data(&$conf_data){}
	public static function get_default_post_datas($conf_data){return [];}
	public static function get_rewrite_rule($path){
		if(empty(static::$permalinks)){return [];}
		$rtn=[];
		$path_data=\cp::parse_conf_data_path($path);
		$tmp_name=static::get_template_name();
		foreach(static::$permalinks as $permalink){
			$link_data=explode('-',$permalink);
			$reg='';
			$rep="index.php?cp_mode={$tmp_name}&cp_data_type={$path_data['data_type']}";
			$matches_index=1;
			
			switch($link_data[0]){
				case 'task':
					$reg.=$path_data['data_name'].'/'.$tmp_name.'/([0-9a-f]{16})\-([0-9a-f]{16})';
					$rep.="&cp_page_type=task&cp_data_name={$path_data['data_name']}&cp_token=\$matches[{$matches_index}]";
					$matches_index++;
					$rep.="&cp_token_key=\$matches[{$matches_index}]";
					$matches_index++;
					break;
				case 'single':
					$reg.=$path_data['data_name'];
					if($tmp_name!=='single'){$reg.='/'.$tmp_name;}
					$reg.='/([0-9]+)';
					$rep.="&cp_page_type=single&cp_data_name={$path_data['data_name']}&cp_data_id=\$matches[{$matches_index}]";
					$matches_index++;
					break;
				case 'file':
				case 'finder':
				case 'archive':
					$reg.=$path_data['data_name'];
					if($tmp_name!=='archive'){$reg.='/'.$tmp_name;}
					$rep.="&cp_page_type={$link_data[0]}&cp_data_name={$path_data['data_name']}";
					break;
				default:
					$rep.="&cp_page_type=me";
					$reg.=$tmp_name;
			}
			
			if(!empty($path_data['meta_path'])){
				foreach($path_data['meta_path'] as $i=>$meta){
					$reg.='/'.$meta['meta_name'];
					$rep.="&cp_meta_path[{$i}][meta_name]={$meta['meta_name']}";
					if($link_data[0]==='single'){
						$reg.='/([0-9]+)';
						$rep.="&cp_meta_path[{$i}][meta_id]=\$matches[{$matches_index}]";
						$matches_index++;
					}
				}
			}
			if(isset($link_data[1])){
				$reg.='/'.$link_data[1];
				$rep.='&cp_file_slug='.$link_data[1];
			}
			switch($link_data[0]){
				case 'file':
					$reg.="/([\w\-_\/]*\.\w{2,4})?";
					$rep.="&cp_file_path=\$matches[{$matches_index}]";
					$matches_index++;
					break;
				case 'finder':
					$reg.="(/.*)?";
					$rep.="&cp_finder_path=\$matches[{$matches_index}]";
					$matches_index++;
					break;
			}
			$rtn[]=compact('reg','rep');
			if($link_data[0]==='archive'){
				$reg.='/page/([0-9]+)';
				$rep.="&paged=\$matches[{$matches_index}]";
				$matches_index++;
				$rtn[]=compact('reg','rep');
			}
		}
		return $rtn;
	}
	
	public static function get_template_name(){
		return substr(static::class,strrpos(static::class,'\\')+1);
	}
	public static function get_form_type($file){
		switch(true){
			case strpos($file,'post')!==false:
			case strpos($file,'add')!==false:
			case strpos($file,'mail')!==false:
				return 1;
			case strpos($file,'edit')!==false:
				return 2;
			case strpos($file,'search')!==false:
				return 4;
			default:
				return 8;
		}
	}
}

?>
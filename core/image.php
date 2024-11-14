<?php
namespace Catpow;

/*画像*/
function get_images($dir,$alt=false,$class=''){
	$alt=$alt?:$dir;
	$rtn=array();
	if(is_dir(get_stylesheet_directory().'/images/'.$dir)){
		$dir=dir(get_stylesheet_directory().'/images/'.$dir);
		while($f = $dir->read()){
			if(preg_match('/\.(png)|(gif)|(jpg)$/',$f)!=0){
				array_push($rtn,sprintf('<img src="%s" alt="%s" class="%s"/>',get_stylesheet_directory_uri().'/images/'.$dir.'/'.$f,$alt,$class));
			}
		}
	}elseif(is_dir(get_template_directory().'/images/'.$dir)){
		$dir=dir(get_temlate_directory().'/images/'.$dir);
		while($f = $dir->read()){
			if(preg_match('/\.(png)|(gif)|(jpg)$/',$f)!=0){
				array_push($rtn,sprintf('<img src="%s" alt="%s" class="%s"/>',get_template_directory_uri().'/images/'.$dir.'/'.$f,$alt,$class));
			}
		}
	}else{
		return array();
	}
	return $rtn;
}
function get_image($name,$alt=false,$class='',$x2=true){
	$attr='';
	if($alt){$attr.=sprintf(' alt="%s"',$alt);}else{$attr.=sprintf(' alt="%s"',$name);}
	if($class)$attr.=sprintf(' class="%s"',$class);
	if($path_url=cp::get_file_path_url('images/'.$name,\cp::FROM_CONTENT_DIR|\cp::FROM_THEME|\cp::FROM_DEFAULT)){
		$f=key($path_url);
		$url=reset($path_url);
	}
	else{return false;}
	$sz=getimagesize($f);
	if($x2){$attr.=sprintf(' width="%spx" height="%spx"',floor($sz[0]/2),floor($sz[1]/2));}
	else{$attr.=sprintf(' width="%spx" height="%spx"',$sz[0],$sz[1]);}
	return sprintf('<img src="%s" %s/>',$url,$attr);
}
function get_embed_image($name,$alt=false,$class='',$x2=true){
	$attr='';
	if($alt){$attr.=sprintf(' alt="%s"',$alt);}else{$attr.=sprintf(' alt="%s"',$name);}
	if($class)$attr.=sprintf(' class="%s"',$class);
	if($f=cp::get_file_path('images/'.$name)){$type=substr($f,-3);$data=base64_encode(file_get_contents($f));}
	else{return false;}
	$sz=getimagesize($f);
	if($x2){$attr.=sprintf(' width="%spx" height="%spx"',floor($sz[0]/2),floor($sz[1]/2));}
	else{$attr.=sprintf(' width="%spx" height="%spx"',$sz[0],$sz[1]);}
	return sprintf('<img src="data:image/%s;base64,%s" %s/>',$type,$data,$attr);
}
function images($dir,$alt=false,$class=''){
	echo(implode(chr(10),get_images($dir,$alt,$class)));
}
function embed_image($name,$alt=false,$class='',$x2=true){
	echo(get_embed_image($name,$alt,$class,$x2));
}
function get_picture($dir,$alt=false,$class=''){
	//[file_name].[min-width].[ext]
	static $has_called;
	if(empty($has_called)){$has_called=true;}
	$dir_path=cp::get_file_path('images/'.$dir);
	$dir_url=cp::get_file_url('images/'.$dir);
	$dir_obj=dir($dir_path);
	$srcs=array();
	while($fname=$dir_obj->read()){
		if(!@is_array(getimagesize($dir_path.'/'.$fname)))continue;
		$fname_data=explode('.',$fname);
		if(is_numeric($bp=$fname_data[1])){
			$srcs[$bp]=sprintf(
				'<source srcset="%s" media="(%s-width:%dpx)"/>',
				$dir_url.'/'.$fname,
				$bp>0?'min':'max',
				abs($bp)
			);
		}
		else{
			$srcs[0]=sprintf('<img src="%s" alt="%s"/>',$dir_url.'/'.$fname,$alt);
		}
	}
	uksort($srcs,function($a,$b){if($a==0)return 1;if($b==0)return -1;return $b-$a;});
	return sprintf('<picture class="%s">%s</picture>',$class,implode('',$srcs));
}
?>
<?php
/**
* 
*/
namespace Catpow\util;
class password{
	public static function generate($chunk=2,$use_mark=false,$digit=4){
		static $v,$sv,$c1,$c2,$m1,$m2;
		if(!isset($v)){
			$c1=array(
				'b','by','bl','br',
				'c','cy','ch','cl',
				'd','dy','dh','dl','dr',
				'f','fl','fr',
				'g','gy','gl','gr',
				'j',
				'k','ky','kn',
				'l',
				'm','my',
				'n','ny',
				'p','py','ph','ps','pr','pl',
				'q',
				'r','rh',
				's','sy','sh','sl','sr',
				't','ty','th','tw','tl','tr',
				'v',
				'y','yh',
				'w','wh','wr',
				'z','zy','zh'
			);
			$v=array(
				'a','ar','ae','au','air','are','ah',
				'e','er','ea','ear','ee','ey','ew',
				'i','ir','ie',
				'o','or','ou','our','ore','oo','ow','oy','oh',
				'u','ur','ue',
			);
			$c2=array(
				'b',
				'c','ck','ch',
				'd',
				'g','gh',
				'k','ks',
				'l','ll',
				'm','mn',
				'n','ng',
				'p','ps','pt',
				'q',
				's','sh',
				't','th','ts',
				'z','zz',
				'x'
			);
			$m1='!@#$%^&*()';
			$m2='-_ []{}<>~`+=,.;:/?|';
		}
		$rtn='';
		for($i=0;$i<$chunk;$i++){
			$c=$c1[array_rand($c1)];
			if(rand(0,1)==1)$c[0]=strtoupper($c[0]);
			$rtn.=$c;
			$rtn.=$v[array_rand($v)];
		}
		if(rand(0,2)==1)$rtn.=$c2[array_rand($c2)];
		$rtn=str_replace('yi','i',$rtn);
		if($use_mark)$rtn.=$m1[rand(0,count($m1))];
		$rtn.=rand(pow(10,$digit-1),pow(10,$digit)-1);
		return $rtn;
	}
}

?>
<?php
class Cals_loop_format{
	/*
	loopで使用されるフォーマットです
	beforeには $class loop-(post_type)
	before_loopには (post_type)-(get_the_ID()),(get_post_class()) item-(index)
	の値が入ります
	*/
	public static $plain=array(
		'before'=>'',
		'before_loop'=>'',
		'between_loop'=>'',
		'after_loop'=>'',
		'after'=>''
	);
	public static $div=array(
		'before'=>'<div>',
		'before_loop'=>'<div>',
		'between_loop'=>'<div></div>',
		'after_loop'=>'</div>',
		'after'=>'</div>'
	);
	public static $li=array(
		'before'=>'<ul>',
		'before_loop'=>'<li>',
		'between_loop'=>'',
		'after_loop'=>'</li>',
		'after'=>'</ul>'
	);
	public static $table=array(
		'before'=>'<table><tbody><tr>',
		'before_loop'=>'<td>',
		'between_loop'=>'</tr><tr>',
		'after_loop'=>'</td>',
		'after'=>'</tr></tbody></table>'
	);
	public static function create($format){
		/*
		要素の数によって定義されるフォーマットが変わります
		１＝between_loop
		２＝before_loop,after_loop
		３＝before_loop,between_loop,after_loop
		４＝before,before_loop,after_loop,after
		５＝before,before_loop,between_loop,after_loop,after
		*/
		$rtn=array('before'=>'','before_loop'=>'','between_loop'=>'','after_loop'=>'','after'=>'');
		switch(count($format)){
			case 1:
				$rtn['between_loop']=$format[0];
				break;
			case 2:
				$rtn['before_loop']=$format[0];
				$rtn['after_loop']=$format[1];
				break;
			case 3:
				$rtn['before_loop']=$format[0];
				$rtn['between_loop']=$format[1];
				$rtn['after_loop']=$format[2];
				break;
			case 4:
				$rtn['before']=$format[0];
				$rtn['before_loop']=$format[1];
				$rtn['after_loop']=$format[2];
				$rtn['after']=$format[3];
				break;
			case 5:
				$rtn['before']=$format[0];
				$rtn['before_loop']=$format[1];
				$rtn['between_loop']=$format[2];
				$rtn['after_loop']=$format[3];
				$rtn['after']=$format[4];
				break;
		}
		return $rtn;
	}
	
}
?>
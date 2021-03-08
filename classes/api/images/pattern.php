<?php
namespace Catpow\api\images;
/**
* パターン画像一覧を取得
*/

class pattern extends icon{
	public static
		$param_pattern='(s(?P<size>[fci]))?(w(?P<width>\d+))?(h(?P<height>\d+))?(r(?P<repeat>x|y|n))?(x(?P<x>\d+))?(y(?P<y>\d+))?',
		$param_default=['size'=>null,'width'=>null,'height'=>null,'repeat'=>null,'x'=>null,'y'=>null];
}

?>
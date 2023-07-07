<?php
$blockAttr=array_diff_key($attr,['src'=>1,'alt'=>1]);
$classNames=array_merge(['wp-block-image'],explode(' ',$attr['className']??''));
if(isset($attr['align'])){$classNames[]='align'.$attr['align'];}
$classNames=array_unique($classNames);
$imgAtts=array_merge(
	['src'=>\cp::get_file_url('images/dummy.jpg'),'alt'=>''],
	array_intersect_key($attr,['src'=>1,'alt'=>1,'width'=>1,'height'=>1])
);
if(isset($attr['id'])){$imgAtts['class']=sprintf(' class="wp-image-%d"',$attr['id']);}
$imgAttr=implode(' ',array_map(function($key)use($imgAtts){
	return sprintf('%s="%s"',$key,$imgAtts[$key]);
},array_keys($imgAtts)));
?>
<!-- wp:image<?=!empty($blockAttr)?' '.json_encode($blockAttr,0500):''?> -->
<figure class="<?=implode(' ',$classNames)?>"><img <?=$imgAttr?>/></figure>
<!-- /wp:image -->
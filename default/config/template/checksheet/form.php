<?php
namespace Catpow;
$path=$post_data_path;
if(!empty($action)){$path.='/'.$action;}
$post_data=cp::get_post_data($path);
if($post_data['meta']['receive'][0]==1){receive();}
if($post_data['meta']['push'][0]==1){push();}
if(isset($post_data['meta']['clear'])){clear(array_sum($post_data['meta']['clear']));}
content($path);
?>
<ul class="buttons">
	<li class="primary next"><?php button('送信','step2'); ?></li>
</ul>

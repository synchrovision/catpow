<?php
$conf=[
	'cat'=>'primary',
	'meta'=>[
		'use_functions'=>['type'=>'checkbox','value'=>function(){
			$sels=[];
			foreach(\cp::get_all_functions() as $fnc){
				if(in_array($fnc,['catpow','config'],true)){continue;}
				ob_start();
?>
<div class="image">
	<img src="<?=cp::get_file_url('functions/'.$fnc.'/image.svg')?>"/>
</div>
<div class="text">
	<h4><?=$fnc?></h4>
	<p><?php include(cp::get_file_path('functions/'.$fnc.'/desc.php')); ?></p>
</div>
<?php
				$sels[ob_get_clean()]=$fnc;
			}
			return $sels;
		}],
	]
];
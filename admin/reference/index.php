<?php

$fnc_dir=dir(WP_PLUGIN_DIR.'/catpow/functions');
while($fn=$fnc_dir->read()){
	if($fn[0]!='.' and substr($fn,-4)=='.php')include_once(WP_PLUGIN_DIR.'/catpow/functions/'.$fn);
}
$ref_data=array();
foreach(get_defined_functions()['user'] as $fnc){
	$ref=new ReflectionFunction($fnc);
	if(strpos($fn=$ref->getFileName(),WP_PLUGIN_DIR.'/catpow/')===0){
		$ref_data[substr(basename($fn),0,-4)][$fnc]=parse_refrection($ref);
	}
	else{
		//$ref_data[substr(basename($fn),0,-4)][$fnc]=parse_refrection($ref);
	}
}
function parse_refrection(ReflectionFunction $ref){
	$rtn=[];
	if($comment=$ref->getDocComment()){
		foreach(explode("\n",substr($comment,4,-3)) as $line){
			$line=preg_replace('/^\*\s*/','',$line);
			if(substr($line,0,1)=='@'){
				preg_match('/^@(\w+)\s(([\w|]+)\s)?(\$([\w_-]+)\s)?(.+)$/',$line,$matches);
				if($matches[2]){
					$rtn[$matches[1]][]=[
						'type'=>$matches[3],
						'name'=>$matches[5],
						'desc'=>$matches[6],
					];
				}
				else{
					$rtn[$matches[1]][]=$matches[6];
				}
			}
			else{$rtn['comment'][]=$line;}
		}
	}
	else{
		foreach($ref->getParameters() as $param_ref){
			$rtn['param'][]=array(
				'type'=>'',
				'name'=>$param_ref->getName(),
				'desc'=>''
			);
		}
	}
	$rtn['file']=basename(dirname($ref->getFileName())).'/'.basename($ref->getFileName());
	$rtn['line']=$ref->getStartLine();
	return $rtn;
}
?>
<div class="reference">
<?php foreach($ref_data as $dirname=>$refs): ?>
	<h2><?= $dirname ?></h2>
	<?php foreach($refs as $fn=>$ref): ?>
	<article>
		<h1><?= $fn ?></h1>
		<?php if(!empty($ref['comment'])):?><p><?= implode('<br/>',$ref['comment']) ?></p><?php endif; ?>
		<h2>引数</h2>
		<ul>
		<?php if(!empty($ref['param'])):foreach($ref['param'] as $param):?>
			<li>
				<h3><?= $param['name'] ?><small><?= $param['type'] ?></small></h3>
				<p><?= $param['desc'] ?></p>
			</li>
		<?php endforeach;endif; ?>
		</ul>
		<h2>戻り値</h2>
		<ul>
		<?php if(!empty($ref['return'])):foreach($ref['return'] as $param):?>
			<li>
				<h3><?= $param['name'] ?><small><?= $param['type'] ?></small></h3>
				<p><?= $param['desc'] ?></p>
			</li>
		<?php endforeach;endif; ?>
		</ul>
		<p><?= $ref['file'] ?>:<?= $ref['line'] ?></p>
	</article>
	<?php endforeach; ?>
<?php endforeach; ?>
</div>
<?php wp_enqueue_script('catpow', plugins_url('/catpow/lib/catpow.js'));?>
<?php wp_enqueue_script('cp_admin_script', plugins_url('/catpow/admin/reference/script.js'));?>
<?php wp_enqueue_style('cp_admin_style', plugins_url('/catpow/admin/reference/style.css'));?>
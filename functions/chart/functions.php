<?php
function cp_chart($type,$data,$prm=false,$opt=false){
	$chart_id=uniqid('cp_chart');
	if(empty($data)){return false;}
	wp_enqueue_script('chartjs','https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.js');
	//wp_enqueue_script('cp_chart_script',plugins_url('catpow/lib/cp_chart/cp_chart_script.js'));
	
	//stackedかどうか
	if(substr($type,0,8)=='stacked_'){$stacked=true;$type=substr($type,8);}
	else{$stacked=false;}
	$param=['type'=>$type,'data'=>[
		'labels'=>array_keys(reset($data)),
		'datasets'=>[]
	]];
	
	//オプション
	if($opt){$param['options']=$opt;}
	
	$index=0;
	$total=count($data);
	
	if($stacked){
		$param['options']['scales']['yAxes'][]=['stacked'=>true];
		$param['options']['scales']['xAxes'][]=['stacked'=>true];
	}
	if(!isset($param['options']['elements']['line']['tension'])){
		$param['options']['elements']['line']['tension']=0.000001;
	}
	
	foreach($data as $key=>$val){
		//class
		if(is_callable($prm)){$tmp=$prm($key,$val,$index,$total);}
		//配列
		elseif(is_array($prm)){$tmp=isset($prm[$key])?$prm[$key]:$prm[$index];}
		//初期値
		else{$tmp=[
			'backgroundColor'=>sprintf('hsl(%d,60%%,80%%)',floor(360*$index/$total)),
			'borderColor'=>sprintf('hsl(%d,60%%,60%%)',floor(360*$index/$total))
		];}
		//レイダーチャート
		if(!isset($tmp['fill'])){
			if(in_array($type,['radar'])){$tmp['fill']=false;}
			elseif($stacked){$tmp['fill']=$index>0?'-1':'start';}
		}
		
		//最終代入
		$tmp['label']=$key;
		$tmp['data']=array_values($val);
		$param['data']['datasets'][]=$tmp;
		$index++;
	}
	?>
	<canvas class="cp_chart" id="<?=$chart_id?>"></canvas>
	<script>
		jQuery(function($){
			var cnv=$("#<?=$chart_id?>").get(0);
			cnv.chart=new Chart(cnv,<?=json_encode($param)?>);
		});
	</script>
	<?php
}

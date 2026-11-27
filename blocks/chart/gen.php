<?php
use Catpow\util\BlockCode;

$name='catpow/chart';
$attr+=['classes'=>'BarChart'];
$comment=BlockCode::commentAttributes($name,$attr);
$graph=$attr['graph'][0]??[];
$rows=array_values($graph['rows']??[]);
$columns=array_values($graph['cols']??[]);
$classes=$attr['classes'];
$type='BarChart';
foreach(['PieChat'=>'PieChart','PieChart'=>'PieChart','LineChart'=>'LineChart','RadarChart'=>'RadarChart'] as $flag=>$chart){
	if(BlockCode::has($classes,$flag)){$type=$chart;break;}
}
$width=max(1,(float)($graph['width']??300));
$height=max(1,(float)($graph['height']??300));
$padding=max(0,(float)($graph['padding']??50));
$chartWidth=max(0,$width-2*$padding);
$chartHeight=max(0,$height-2*$padding);
$rowWidth=$chartWidth/max(1,count($rows));
$radius=min($chartWidth,$chartHeight)/2;
$cx=$width/2;
$cy=$height/2;
$hasValue=BlockCode::has($classes,'hasValue')||BlockCode::has($classes,'has-value');
$values=static fn($row)=>array_map(static fn($val)=>(float)($val['value']??0),$row['vals']??[]);
$totals=array_map(static fn($row)=>array_sum($values($row)),$rows);
$total=(float)($graph['total']??0)?:max(array_merge([1],$totals));
if($type==='PieChart'){$rows=array_slice($rows,0,1);$total=($totals[0]??0)?:1;}
$point=static function($angle,$r)use($cx,$cy){return [$cx+cos($angle)*$r,$cy+sin($angle)*$r];};
$labels='';
ob_start();
?>
<div<?=BlockCode::root('chart',$attr)?>><div class="cpui-<?=strtolower($type)?>">
<svg<?=BlockCode::attrs(['viewBox'=>"0 0 {$width} {$height}"])?>>
	<g class="graph">
	<?php if($type!=='PieChart'): ?>
		<g class="cols">
		<?php foreach($columns as $column): ?>
			<?=BlockCode::element('g',$column['classes']??'col','',['data-label'=>$column['label']??null])?>
		<?php endforeach; ?>
		</g><g class="rows">
	<?php endif; ?>
	<?php foreach($rows as $r=>$row):
		$y=$height-$padding;
		$angle=-M_PI/2;
		$points=[];
	?>
		<g<?=BlockCode::attrs(['class'=>$row['classes']??'row','data-label'=>$row['label']??null])?>>
		<?php foreach(array_values($values($row)) as $c=>$value):
			$class=preg_replace('/\bcol\b/','val',$columns[$c]['classes']??'val',1);
			$rawValue=$row['vals'][$c]['value']??$value;
			$position=['class'=>$class,'data-value'=>$rawValue];
			if($type==='BarChart'){
				$h=max(0,$value*$chartHeight/$total);
				$y-=$h;
				$x=$padding+$r*$rowWidth+$rowWidth/8;
				$shape='rect';
				$position+=['x'=>$x,'y'=>$y,'width'=>$rowWidth*0.75,'height'=>$h];
				$labelPoint=[$x+$rowWidth*0.375,$y+$h/2];
			}
			elseif($type==='PieChart'){
				$next=$angle+$value/$total*2*M_PI;
				[$x1,$y1]=$point($angle,$radius);
				[$x2,$y2]=$point($next,$radius);
				$shape='path';
				$arc=$value*2>$total?1:0;
				if($value===$total){
					[$mx,$my]=$point($angle+M_PI,$radius);
					$position['d']="M {$x1} {$y1} A {$radius} {$radius} 0 0 1 {$mx} {$my} A {$radius} {$radius} 0 0 1 {$x1} {$y1} Z";
				}
				else{$position['d']="M {$cx} {$cy} L {$x1} {$y1} A {$radius} {$radius} 0 {$arc} 1 {$x2} {$y2} L {$cx} {$cy}";}
				$labelPoint=$point(($angle+$next)/2,$radius*0.625);
				$angle=$next;
			}
			else{
				$labelPoint=$type==='RadarChart'
					?$point($angle+$c*2*M_PI/max(1,count($row['vals'])),$radius*$value/$total)
					:[$padding+$chartWidth*$c/max(1,count($row['vals'])-1),$height-$padding-$chartHeight*$value/$total];
				$points[]=implode(',',$labelPoint);
				$shape='circle';
				$position+=['cx'=>$labelPoint[0],'cy'=>$labelPoint[1],'r'=>2];
			}
			echo '<'.$shape.BlockCode::attrs($position).'></'.$shape.'>';
			if($hasValue){$labels.=BlockCode::element('text','value',esc_html($rawValue),['x'=>$labelPoint[0],'y'=>$labelPoint[1]]);}
		endforeach; ?>
		<?php if($points):
			$shape=$type==='RadarChart'?'polygon':'polyline';
			echo BlockCode::element($shape,'line','',['points'=>implode(' ',$points),'fill'=>'none','stroke'=>'currentColor']);
		endif; ?>
		</g>
	<?php endforeach; ?>
	<?php if($type!=='PieChart'): ?></g><?php endif; ?>
	</g>
	<g class="ChartText">
		<?php foreach(['title','unit','rowTitle','rowUnit'] as $index=>$field): ?>
			<?php if(isset($graph[$field])): ?><?=BlockCode::element('text',$field,esc_html($graph[$field]),['x'=>$padding,'y'=>15+$index*12])?><?php endif; ?>
		<?php endforeach; ?>
		<?=$labels?>
	</g>
</svg>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

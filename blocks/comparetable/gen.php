<?php
use Catpow\util\BlockCode;

$name='catpow/comparetable';
$prefix='wp-block-catpow-comparetable';
$comment=BlockCode::commentAttributes($name,$attr,['vars','isTemplate','doLoop','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
$classes=$attr['classes']??'';
$rows=array_values($attr['rows']??[]);
$cols=array_values($attr['cols']??[]);
$first=$rows[0]['cells']??[];
$transpose=BlockCode::has($classes,'do-transposition');
$corner=BlockCode::has($classes,'has-header-column');
$headerRow=!$transpose||$corner;
$headerColumn=$transpose||$corner;
$headerClass=$attr['headerColClasses']??'';
$firstClass=$attr['firstCellClasses']??'';
$tagCells=$transpose?array_map(static fn($row)=>$row['cells'][0]??[],$rows):$first;
$context=BlockCode::context('comparetable',['current'=>0,'isActive'=>true,'showTags'=>false,'hasHeaderColumn'=>$corner],[
	'data-wp-init'=>'callbacks.initBlock','data-wp-class--is-showing-tags'=>'context.showTags','data-header-col-class'=>$headerClass
]);
ob_start();
?>
<div<?=BlockCode::root('comparetable',$attr,$context)?>>
	<?php if(BlockCode::has($classes,'has-tags')): ?>
	<ul class="<?=$prefix?>__tags">
	<?php foreach($tagCells as $index=>$cell): ?>
		<?php if($corner && $index===0){continue;} ?>
		<?=BlockCode::element('li',BlockCode::classes($prefix.'__tags-tag',$cell['classes']??''),$cell['text']??'',[
			'data-wp-on--click'=>'actions.onClickTag','data-wp-class--is-active'=>'callbacks.isTagActive','data-index'=>$index
		])?>
	<?php endforeach; ?>
	</ul>
	<?php endif; ?>
	<div class="<?=$prefix?>__box"><div class="<?=$prefix?>__box-body">
		<table class="<?=$prefix?>__table" style="--cp-row-count:<?=count($rows)?>;--cp-column-count:<?=count($first)?>">
			<colgroup class="<?=$prefix?>__table-colgroup">
			<?php foreach($cols as $col): ?>
				<col<?=BlockCode::attrs(['class'=>BlockCode::classes($prefix.'__table-colgroup-col',$col['classes']??''),'data-col-class'=>$col['classes']??null])?>/>
			<?php endforeach; ?>
			</colgroup>
			<?php if($headerRow && $rows): ?><thead class="<?=$prefix?>__table-thead"><?php else: ?><tbody class="<?=$prefix?>__table-tbody"><?php endif; ?>
			<?php foreach($rows as $r=>$row):
				$isHead=$headerRow && $r===0;
				$rowClass=$row['classes']??'';
				$rowBase=$prefix.'__table-'.($isHead?'thead':'tbody').'-tr';
			?>
				<tr<?=BlockCode::attrs(['class'=>BlockCode::classes($rowBase,$isHead?$rowClass:''),'data-row-class'=>$rowClass])?>>
				<?php foreach(array_values($row['cells']??[]) as $c=>$cell):
					$isCorner=$isHead && $corner && $c===0;
					$isSide=!$isHead && $headerColumn && $c===0;
					$tag=($isHead && !$isCorner)||$isSide?'th':'td';
					$cellBase=$rowBase.'-'.$tag;
					$cellClass=$cell['classes']??'';
					$colClass=$cols[$c]['classes']??'';
					$line=($transpose?$c:$r)%2?'is-odd-line':'is-even-line';
					$class=$isCorner
						?BlockCode::classes($cellBase,$rowClass,$headerClass,$firstClass)
						:BlockCode::classes($cellBase,$rowClass,$isSide?$headerClass:($isHead?'':$colClass),$cellClass,$line);
				?>
					<<?=$tag?><?=BlockCode::attrs(['class'=>$class,'data-cell-class'=>$cellClass,'data-index'=>$isHead&&!$isCorner?$c:null,
						'style'=>BlockCode::style(['--cp-row-index'=>$r+1,'--cp-column-index'=>$c+1])])?>>
					<?php if(!$isCorner && BlockCode::has($cellClass,'has-label')): ?>
						<?=BlockCode::element('div',$cellBase.'-label',$cell['label']??'',['data-role'=>'label'])?>
					<?php endif; ?>
					<?php if(!$isHead && !$isSide && BlockCode::has($colClass,'is-image')): ?>
						<div class="<?=$cellBase?>-image" data-role="image"><?=BlockCode::templateImage($cell,$attr,$cellBase.'-image-img')?></div>
					<?php elseif(!$isCorner || !BlockCode::has($firstClass,'is-spacer')): ?>
						<?=BlockCode::element('div',$cellBase.'-contents',$cell['text']??'',['data-role'=>'contents'])?>
					<?php endif; ?>
					</<?=$tag?>>
				<?php endforeach; ?>
				</tr>
				<?php if($isHead): ?></thead><tbody class="<?=$prefix?>__table-tbody"><?php endif; ?>
			<?php endforeach; ?>
			</tbody>
		</table>
	</div></div>
</div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

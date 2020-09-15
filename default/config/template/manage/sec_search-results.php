<?php
namespace Catpow;
if(isset($_REQUEST['paged'])){
	set('paged',(int)$_REQUEST['paged']);
}
else{receive();}
pagenate();
if(isset($action)){
	res(['target'=>'results']);
}
?>
<div class="table_wrapper">
	<table class="manage">
		<thead>
			<tr>
				<th class="control"><?=_('操作')?></th>
				<!--meta-->
				<th><!--label--></th>
				<!--/meta-->
			</tr>
		</thead>
		<tbody>
			<?php foreach(loop() as $id=>$obj){§sec('manage_item@tr',$id);} ?>
		</tbody>
	</table>
</div>

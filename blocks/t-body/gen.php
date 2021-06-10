<?php
$attr['classes']=$attr['classes']??'hasHeader hasFooter';
$isHtmlMail=$attr['isHtmlMail']??true;
?>
<!-- wp:catpow/t-body<?=$isHtmlMail?' {"isHtmlMail":true}':''?> -->
<textmail><?=$attr['textMail']?></textmail>
<table width="100%" align="center" class="wp-block-catpow-t-body <?=$attr['classes']?>">
<?php if(preg_match('/\bhasHeader\b/',$attr['classes'])):?>
	<thead class="wp-block-catpow-t-body__header">
		<tr>
			<th><?=$attr['headerText']??get_blog_info('title')?></th>
		</tr>
	</thead>
<?php endif; ?>
	<tbody class="wp-block-catpow-t-body__body">
		<tr>
			<td><div class="wp-block-catpow-t-body__body__contents"><?=$children?></div></td>
		</tr>
	</tbody>
<?php if(preg_match('/\bhasFooter\b/',$attr['classes'])):?>
	<tfoot class="wp-block-catpow-t-body__footer">
		<tr>
			<td><?=$attr['footerText']??home_url()?></td>
		</tr>
	</tfoot>
<?php endif; ?>
</table>
<!-- /wp:catpow/t-body -->
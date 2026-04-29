<?php
$attr['classes']=$attr['classes']??'has-header has-footer';
$isHtmlMail=$attr['isHtmlMail']??true;
?>
<!-- wp:catpow/t-body<?=$isHtmlMail?' {"isHtmlMail":true}':''?> -->
<textmail><?=$attr['textMail']?></textmail>
<table width="100%" align="center" class="wp-block-catpow-t-body <?=$attr['classes']?>">
<?php if(preg_match('/\bhas-header\b/',$attr['classes'])):?>
	<thead class="wp-block-catpow-t-body__thead">
		<tr class="wp-block-catpow-t-body__thead-tr">
			<td class="wp-block-catpow-t-body__thead-tr-td is-spacer-cell" style="height:1rem"></td>
		</tr>
		<tr class="wp-block-catpow-t-body__thead-tr">
			<th class="wp-block-catpow-t-body__thead-tr-th is-text-cell" align="center"><?=$attr['headerText']??get_blog_info('title')?></th>
		</tr>
		<tr class="wp-block-catpow-t-body__thead-tr">
			<td class="wp-block-catpow-t-body__thead-tr-td is-spacer-cell" style="height:1rem"></td>
		</tr>
	</thead>
<?php endif; ?>
	<tbody class="wp-block-catpow-t-body__tbody">
		<tr class="wp-block-catpow-t-body__tbody-tr">
			<td class="wp-block-catpow-t-body__tbody-tr-td" align="center"><div class="wp-block-catpow-t-body-contents"><?=$children?></div></td>
		</tr>
	</tbody>
<?php if(preg_match('/\bhas-footer\b/',$attr['classes'])):?>
	<tfoot class="wp-block-catpow-t-body__tfoot">
		<tr class="wp-block-catpow-t-body__tfoot-tr">
			<td class="wp-block-catpow-t-body__tfoot-tr-td is-spacer-cell" style="height:1rem"></td>
		</tr>
		<tr class="wp-block-catpow-t-body__tfoot-tr">
			<td class="wp-block-catpow-t-body__tfoot-tr-td is-text-cell" align="center"><?=$attr['footerText']??home_url()?></td>
		</tr>
		<tr class="wp-block-catpow-t-body__tfoot-tr">
			<td class="wp-block-catpow-t-body__tfoot-tr-td is-spacer-cell" style="height:1rem"></td>
		</tr>
	</tfoot>
<?php endif; ?>
</table>
<!-- /wp:catpow/t-body -->
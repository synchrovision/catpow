<?php
namespace Catpow;
\cp::enqueue_style('blocks/section/front_style.css');
wp_enqueue_script('cp_search');
def('limit',[10]);
?>
<div id="cp_search">
	<div id="cpcf_custom_box">
		<div id="cpcf_custom_box_button"></div>
		<div class="inside">
			<table class="inputs">
				<!--meta:can_search-->
				<tr>
					<th><!--label--></th>
					<td><!--@input_search {$name}--></td>
				</tr>
				<!--/meta-->
				<tr>
					<th>表示数</th>
					<td><?php input(['name'=>'limit','type'=>'limit','size'=>2]); ?></td>
				</tr>
			</table>
			<ul class="buttons center">
				<li class="item search primary">
					<?php button(_('検索'),'results','replace'); ?>
				</li>
			</ul>
		</div>
	</div>
</div>
<?php §results(); ?>
<?php §message(); ?>

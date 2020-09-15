<?php namespace Catpow; ?>
<div class="panel_body">
<?php if($f=cp::get_file_path('functions/'.this()->data_name.'/panel.php')){include $f;}?>
</div>
<?php §results(); ?>
<div class="button_close_panel"><?php button('','close','lightbox_close'); ?></div>

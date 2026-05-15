<?php namespace Catpow; ?>
<div class="cp-admin-lightbox">
    <div class="cp-admin-lightbox__body">
        <?php if($f=cp::get_file_path('functions/'.this()->data_name.'/panel.php')){include $f;}?>
    </div>
    <div class="cp-admin-lightbox__results">
        <?php §results(); ?>
    </div>
    <div class="cp-admin-lightbox__close">
        <?php button('','close','lightbox_close'); ?>
    </div>
</div>

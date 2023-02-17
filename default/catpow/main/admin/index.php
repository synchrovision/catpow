<?php namespace Catpow;?>
<div id="cpcf_custom_box">
    <div class="inside">
        <div class="cp-admin">
            <?php §form(); ?>
        </div>
    </div>
</div>
<?php
cp::enqueue_script('catpow/main/admin/script.js');
cp::enqueue_style('catpow/main/admin/style.css',['wp-format-library','dashicons']);

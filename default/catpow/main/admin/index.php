<?php namespace Catpow;?>
<div id="cpcf_custom_box">
    <div class="inside">
        <div class="cp-admin">
            <?php §form(); ?>
        </div>
    </div>
</div>
<?php
cp::enqueue_script('catpow/main/admin/script.js',['catpow.multiple_input']);
cp::enqueue_style('catpow/main/admin/style.css',['wp-format-library','dashicons','font_awesome']);

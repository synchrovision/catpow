<?php namespace Catpow; ?>
<ul>
    <li>
        <ul class="cp-admin-buttons">
            <li class="item refresh">
                <?php button('htaccess生成','action','replace',['setup_type'=>'htaccess']);?>
            </li>
        </ul>
    </li>
    <li>
        <ul class="cp-admin-buttons">
            <li class="item plus">
                <?php button('圧縮ファイル生成','action','replace',['setup_type'=>'create_gzip']);?>
            </li>
        </ul>
    </li>
    <li>
        <ul class="cp-admin-buttons">
            <li class="item times danger">
                <?php button('圧縮ファイル削除','action','replace',['setup_type'=>'delete_gzip']);?>
            </li>
        </ul>
    </li>
</ol>
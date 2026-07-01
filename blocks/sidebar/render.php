<?php
$uid=wp_unique_id('sidebar-block-');
echo str_replace('{$uid}',$uid,$content);

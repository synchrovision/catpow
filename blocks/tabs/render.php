<?php
$uid=wp_unique_id('tabs-block-');
echo str_replace('{$uid}',$uid,$content);

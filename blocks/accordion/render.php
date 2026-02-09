<?php
$uid=wp_unique_id('accordion-block-');
echo str_replace('{$uid}',$uid,$content);

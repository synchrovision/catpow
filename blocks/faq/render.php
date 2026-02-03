<?php
$uid=wp_unique_id('faq-block-');
echo str_replace('{$uid}',$uid,$content);

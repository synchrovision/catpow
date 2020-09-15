<?php
namespace Catpow;
global $pagenow;

\cp::$content_path=\cp::get_the_content_path();
\cp::$content=\cp::get_the_content();

if(file_exists(__DIR__.'/admin_init-'.$pagenow)){include __DIR__.'/admin_init-'.$pagenow;}
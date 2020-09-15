<?php
add_filter('upload_mimes',function($types){return array_merge($types,['svg'=>'image/svg+xml']);});
add_filter('ext2type',function($types){$types['image'][]='svg';return $types;});
<?php namespace Catpow;?>
<?php
//$ref=new \ReflectionFunction('rest_validate_value_from_schema');
$ref=new \ReflectionClass('WP_post');
?>
<pre>
<?php var_dump($ref->getDocComment())?>
</pre>
<?php
use Catpow\util\BlockConfig;
$block_class="wp-block-catpow-picture";
$attributes=[
	'classes'=>["source"=>'attribute',"selector"=>".{$block_class}","attribute"=>'class','default'=>"{$block_class}"],
	'vars'=>['type'=>'object','default'=>[]],

	"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb'],'picture','dummy.jpg'),
	"mime"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'data-mime'],
	"src"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'src',"default"=>cp::get_file_url('images/dummy.jpg')],
	"alt"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'alt'],
	"code"=>["source"=>'text'],
];
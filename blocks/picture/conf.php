<?php
use Catpow\util\BlockConfig;
$attributes=[
	"classes"=>["type"=>'string','default'=>''],
	'vars'=>['type'=>'object','default'=>[]],

	"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb'],'picture','dummy.jpg'),
	"mime"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'data-mime'],
	"src"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'src',"default"=>cp::get_file_url('images/dummy.jpg')],
	"alt"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'alt'],
	"code"=>["source"=>'text'],
];
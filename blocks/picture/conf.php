<?php
use Catpow\util\BlockConfig;
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'div',"attribute"=>'class',"default"=>'wp-block-catpow-picture'],

	"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb'],'picture','dummy.jpg'),
	"mime"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'data-mime'],
	"src"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'src',"default"=>cp::get_file_url('images/dummy.jpg')],
	"alt"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'alt'],
	"code"=>["source"=>'text'],
];
<?php
namespace Catpow;

function csv_table($name,$row_head=1,$col_head=1,$class="csv_table"){
	$csv=new CSV(get_stylesheet_directory().'/csv/'.$name);
	$csv->write_table($row_head,$col_head,$class);
}
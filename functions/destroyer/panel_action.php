<?php
/*DB destroy*/
global $wpdb;
foreach(['posts','postmeta','comments','commentmeta','terms','termmeta'] as $i =>$name){
	$wpdb->query(sprintf('DELETE FROM %s%s;',$wpdb->prefix,$name));
}
?>
全ての投稿データを削除しました
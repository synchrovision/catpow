<?php
namespace Catpow;

add_shortcode('share_buttons',function($atts){
	share_buttons();
});

function share_buttons($prm=[]){
	static $formats;
	if(empty($formats)){
		$formats=[
			'tw'=>['name'=>'twitter','url'=>'http://twitter.com/share?url=%s&text=%s&via=&tw_p=tweetbutton&related=','popup'=>true],
			'fb'=>['name'=>'facebook','url'=>'//www.facebook.com/sharer/sharer.php?u=%s','popup'=>true],
			'ln'=>['name'=>'line','url'=>'line://msg/text/%s','popup'=>false],
			'ht'=>['name'=>'hatena','url'=>'http://b.hatena.ne.jp/add?mode=confirm&url=%s','popup'=>true],
			'pc'=>['name'=>'pocket','url'=>'http://getpocket.com/edit?url=%s&;title=%s','popup'=>false],
			'rs'=>['name'=>'rss','url'=>get_feed_link(),'popup'=>false],
			'pn'=>['name'=>'pinterest','url'=>'https://www.pinterest.com/pin/create/button/?url=%s&media=%s&description=%s','popup'=>false],
		];
	}
	$prm=array_merge(
		cp::get_meta('catpow','share',0,'config',1),
		['url'=>$_SERVER['REQUEST_URI'],'text'=>urlencode(wp_get_document_title())],
		$prm
	);
	echo '<ul class="share_buttons">';
	foreach($prm['target'] as $tgt){
		printf(
			'<li class="%s"><a href="'.$formats[$tgt]['url'].'"%s/></li>',
			$formats[$tgt]['name'],
			$prm['url'],
			$prm['text'],
			$prm['popup']?' onclick="javascript:window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600\');return false;"':''
		);
	}
	echo ('</ul>');
}
?>
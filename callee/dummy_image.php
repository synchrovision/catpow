<?php
include __DIR__.'/classes/autoload.php';
$sizes=[
	'hero_banner'=>[1920,1080],
	'regular_banner'=>[1200,628],
	'leader_board'=>[728,90],
	'mobile_banner'=>[320,100],
	'half_page_banner'=>[300,600],
	'thumbnail'=>[150,150],
	'medium'=>[300,300],
	'medium_large'=>[768,1024],
	'large'=>[1000,750],
	'vga'=>[640,480],
	'xga'=>[1024,768],
	'hd'=>[1280,720]
];
$size=$sizes[$_GET['size']??'vga']??$sizes['vga'];
if(is_string($size)){
	if(preg_match('/(\d++)\D+(\d++)/',$size,$matches)){
		$size=[$matches[1],$matches[2]];
	}
	else{
		$size=[640,480];
	}
}
$text=htmlspecialchars($_GET['text']??"{$size[0]}×{$size[1]}");
$fontSize=min($size[1]/2,$size[0]/strlen($text)*2);
header('Content-type: image/svg+xml');
?>
<svg
	 xmlns="http://www.w3.org/2000/svg"
	 xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 <?=$size[0]?> <?=$size[1]?>"
>
	<defs>
		<style>
			.bg{
				fill:#cccccc;
			}
			.text{
				fill:#aaaaaa;
				font-size:<?=$fontSize?>px;
				text-anchor:middle;
				dominant-baseline:middle;
			}
		</style>
	</defs>
	<rect class="bg" x="0" y="0" width="<?=$size[0]?>" height="<?=$size[1]?>"></rect>
	<text class="text" x="<?=$size[0]/2?>" y="<?=$size[1]/2?>"><?=$text?></text>
</svg>
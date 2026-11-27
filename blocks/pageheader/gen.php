<?php
use Catpow\util\BlockCode;

$name='catpow/pageheader';
$prefix='wp-block-catpow-pageheader';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['vars']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('pageheader',$attr)?>><div class="<?=$prefix?>__body">
	<?=BlockCode::element('h1',$prefix.'__body-title',$attr['title']??'')?>
	<?php if($has('has-breadcrumb')): ?>
		<div class="<?=$prefix?>__body-breadcrumb">[ssr_parts name=breadcrumb container_class=<?=$prefix?>__body-breadcrumb-body]</div>
	<?php endif; ?>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

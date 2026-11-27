<?php
use Catpow\util\BlockCode;

$name='catpow/sticky';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$attr+=['classes'=>'topLeft small label'];
$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('sticky',$attr)?>><?php if($has('collapsible')): ?>
	<div class="stickyButton"><div class="stickyButtonIcon">
		<?php if($has('label-button')): ?><?=BlockCode::element('div','label',$attr['labelText']??'')?><?php endif; ?>
		<?php if($has('image-button')): ?><?=BlockCode::image($attr,'open','openButtonImage')?><?=BlockCode::image($attr,'close','closeButtonImage')?><?php endif; ?>
	</div></div>
<?php endif; ?>
<div class="content">
	<?php if($has('label')): ?><?=BlockCode::element('div','label',$attr['labelText']??'')?><?php endif; ?>
	<?php if($has('container')||$has('collapsible')): ?><?=$children?><?php endif; ?>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

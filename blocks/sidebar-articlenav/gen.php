<?php
use Catpow\util\BlockCode;

$name='catpow/sidebar-articlenav';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('sidebar-articlenav',$attr,BlockCode::context('catpow/sidebar-articlenav',['activeItems'=>(object)[],'items'=>[]],['data-wp-init'=>'callbacks.initBlock']))?>><?php
$drawItems=static function($class,$levels)use(&$drawItems){
	[$key,$collection,$directive]=array_shift($levels);
	$item=$class.'-item';
	$link=BlockCode::element('a',$item.'-link','',[
		'data-wp-bind--href'=>'context.'.$key.'.href','data-wp-bind--data-section-id'=>'context.'.$key.'.id',
		'data-wp-on--click'=>'actions.onClickItem','data-wp-class--is-active'=>'callbacks.isItemActive','data-wp-text'=>'context.'.$key.'.label'
	]);
	if($levels){$link.=$drawItems($item.(count($levels)===2?'-subitems':'-enditems'),$levels);}
	return BlockCode::element('ul',$class,BlockCode::element('template',null,BlockCode::element('li',$item,$link),[$directive=>$collection]));
};
echo $drawItems('wp-block-catpow-sidebar-articlenav__items',[
	['item','context.items','data-wp-each'],
	['subitem','context.item.items','data-wp-each--subitem'],
	['enditem','context.subitem.items','data-wp-each--enditem']
]);
?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

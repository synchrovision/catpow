<?php
use Catpow\util\BlockCode;

$renderList=function($list,$inner='')use(&$renderList){
	$comment=array_intersect_key($list,array_fill_keys(['ordered','start','reversed','className','type'],true));
	$comment['className']=$comment['className']??$list['classes']??'is-style-caret';
	$tag=empty($comment['ordered'])?'ul':'ol';
	foreach($list['items']??[] as $item){
		$content=$item['content']??'';
		if(!empty($item['child'])){$content.=$renderList($item['child']);}
		$inner.=BlockCode::serialize('core/list-item',[],'<li>'.$content.'</li>');
	}
	$html='<'.$tag.BlockCode::attrs([
		'class'=>BlockCode::classes('wp-block-list',$comment['className']),
		'start'=>$tag==='ol'?($comment['start']??null):null,
		'reversed'=>$tag==='ol'&&!empty($comment['reversed']),
		'type'=>$tag==='ol'?($comment['type']??null):null
	]).'>'.$inner.'</'.$tag.'>';
	return BlockCode::serialize('core/list',$comment,$html);
};
echo $renderList($attr,(string)$children);

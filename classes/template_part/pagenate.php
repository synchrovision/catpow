<?php
namespace Catpow\template_part;

abstract class pagenate extends template_part{
	public static function render(array $param=[]):void{
		if(\cp::$content->form){
			$q=\cp::$content->form->get_query();
			$param=array_merge([
				'current'=>$q->paged,
				'prev_text'=>'＜',
				'next_text'=>'＞',
				'total'=>$q->max_num_pages
			],$param);
			?>
			<ul class="pagenate" <?=_buttons('results')?>>
				<?php for($i=1;$i<=$param['total'];$i++): ?>
				<li class="item<?=$param['current']===$i?' active':''?>" <?=_buttons_item($i);?>><?=$i?></li>
				<?php endfor; ?>
			</ul>
			<?php
		}
		else{
			global $wp_query;
			$url=preg_replace('/\/page\/\d+\/?/','',remove_query_arg('paged'));
			$param_default=array(
				'base'=>$url.'%_%',
				'type'=>'list',
				'format'=>(strpos($url,'?')?'&':'?').'paged=%#%',
				'current'=>max(1,get_query_var('paged')),
				'prev_text'=>'＜',
				'next_text'=>'＞',
				'total'=>$wp_query->max_num_pages
			);
			echo paginate_links(array_merge($param_default,$param));
		}
	}
}

?>
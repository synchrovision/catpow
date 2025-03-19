<?php
namespace Catpow;
cp::enqueue_script('alpine');
?>
<div class="cp-news" x-data="{current:'ALL'}" x-cloak>
	<ul class="tabs">
		<li
			class="tab is-tab-all"
			:class="{'is-active':current=='ALL'}"
			@click="current='ALL'"
		>ALL</li>
		<?php foreach(loop('term/label') as $term): ?>
		<li
			class="tab"
			:class="{'is-active':current=='<?=$term->slug?>'}"
			style="--label-color:<?php output('color')?>"
			@click="current='<?=$term->slug?>'"
		><?=$term->name?></li>
		<?php endforeach; ?>
	</ul>
	<div class="contents">
		<ul class="items is-items-all" x-show="current=='ALL'">
			<?php foreach(loop('<!--path-->',['limit'=>6]) as $obj): ?>
			<li class="item" style="--label-color:<?php output('label->color')?>">
				<div class="label"><?php output('label->name')?></div>
				<div class="date"><!--@date--></div>
				<div class="text">
					<a class="title" href="<?=url()?>"><!--@title--></a>
					<span class="desc"><!--@desc--></span>
				</div>
			</li>
			<?php endforeach; ?>
		</ul>
		<?php foreach(loop('term/label') as $term): ?>
		<ul class="items" x-show="current=='<?=$term->slug?>'">
			<?php foreach(loop('<!--path-->',['limit'=>6,'tax_query'=>[['taxonomy'=>'label','terms'=>$term->term_id]]]) as $term): ?>
			<li class="item" style="--label-color:<?php output('label->color')?>">
				<div class="label"><?php output('label->name')?></div>
				<div class="date"><!--@date--></div>
				<div class="text">
					<a class="title" href="<?=url()?>"><!--@title--></a>
					<span class="desc"><!--@desc--></span>
				</div>
			</li>
			<?php endforeach; ?>
		</ul>
		<?php endforeach; ?>
	</div>
</div>

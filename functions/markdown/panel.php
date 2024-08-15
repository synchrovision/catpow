<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>MarkDownをアップロード</h3>
		<p>
			 「[投稿タイプ]-[投稿ID].md」のファイル名（eg: post-1.md）でマークダウンのファイルをアップロードして、記事の本文を更新します。
		</p>
		<label class="file" for="cp_admin_md_upload">
			<span>アップロードするMarkDownファイルを選択</span>
			<input id="cp_admin_md_upload" type="file" name="md[]" accept="text/markdown" multiple/>
		</label>
		<ul class="cp-admin-buttons">
			<li class="item">
				<?php button('<i class="fas fa-upload"></i>アップロード','action','replace',['md_action'=>'upload'],'section');?>
			</li>
		</ul>
	</li>
</ul>
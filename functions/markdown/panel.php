<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>MarkDownをアップロード</h3>
		<p>
			
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
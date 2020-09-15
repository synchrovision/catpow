<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>CSVをアップロード</h3>
		<p>
			所定のフォーマットのCSVファイルから投稿もしくはユーザ登録を行います。<br>
			文字エンコードがUTF-8のCSVのみ受け付けます。
		</p>
		<label class="file" for="cp_admin_csv_upload">
			<span>アップロードするCSVを選択</span>
			<input id="cp_admin_csv_upload" type="file" name="csv" accept="text/csv"/>
		</label>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-upload"></i>アップロード','action','update_results',['csv_action'=>'upload'],'section');?>
			</li>
		</ul>
	</li>
	<li>
		<h3>CSVをダウンロード</h3>
		<p>指定したデータのCSVをダウンロードします。</p>
		<?php input('conf_data_path'); ?>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-download"></i>ダウンロード','action','download',['csv_action'=>'download'],'section');?>
			</li>
		</ul>	
	</li>
</ul>
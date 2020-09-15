<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>テーマ</h3>
		<p>新規のCatpow対応テーマを作成、または設定ファイルからテーマのファイルを生成します。</p>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-folder-plus"></i>新規テーマ作成','action','replace',['setup_type'=>'theme']);?>
				<small>新規のcatpowテーマを作成します</small>
			</li>
			<li>
				<?php button('<i class="fas fa-file-code"></i>テンプレート生成','action','replace',['setup_type'=>'template']);?>
				<small>設定ファイルからテンプレートファイルを生成します。</small>
			</li>
		</ul>
	</li>
	<li>
		<h3>データ</h3>
		<p>テーマの設定ファイルの設定をWordPressの投稿・設定に反映します。</p>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-file"></i>投稿生成','action','replace',['setup_type'=>'posts']);?>
				<small>$post_typesの設定を元に投稿を生成します</small>
			</li>
			<li>
				<?php button('<i class="fas fa-users"></i>ロール生成','action','replace',['setup_type'=>'role']);?>
				<small>$user_datasの設定を元にユーザのロールを更新します</small>
			</li>
			<li>
				<?php button('<i class="fas fa-bars"></i>メニュー生成','action','replace',['setup_type'=>'menu']);?>
				<small>$menu_datasの設定を元にメニューを更新します</small>
			</li>
		</ul>
	</li>
	<li>
		<h3>データベース</h3>
		<p>
			system_config.phpの設定を元にデータベーステーブルを生成・削除・更新します。
			この操作はsystem_config.phpにおいて削除されたデータベースのテーブル、あるいはカラムを削除します。
		</p>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-database"></i>データベース更新','action','replace',['setup_type'=>'database']);?>
			</li>
		</ul>
	</li>
</ul>
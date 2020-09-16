<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>テーマ作成</h3>
		<p>新規のCatpow対応テーマを作成します。</p>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-folder-plus"></i>新規テーマ作成','action','replace',['setup_type'=>'theme']);?>
			</li>
		</ul>
	</li>
	<li>
		<h3>セットアップ</h3>
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
			<li>
				<?php button('<i class="fas fa-database"></i>データベース更新','action','replace',['setup_type'=>'database']);?>
				<small>拡張データベースを生成・削除・更新します。</small>
			</li>
		</ul>
	</li>
	<li>
		<h3>テンプレート生成</h3>
		<p>テーマの設定ファイルからテンプレートを生成します。</p>
		<ul class="buttons">
			<li>
				<?php button('<i class="fas fa-file-code"></i>テンプレート生成','action','replace',['setup_type'=>'template']);?>
			</li>
		</ul>
	</li>
</ul>
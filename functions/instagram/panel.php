<dl>
	<dt><i class="fa fa-instagram-square"></i>app ID</dt>
	<dd><input type="text" name="app_id" value="<?=get_option('cp_instagram_app_id');?>"/></dd>
</dl>
<dl>
	<dt><i class="fa fa-instagram-square"></i>app secret</dt>
	<dd><input type="text" name="app_secret" value="<?=get_option('cp_instagram_app_secret');?>"/></dd>
</dl>
<ul>
	<li>
		<p class="caption">
			<a href="https://www.instagram.com/developer/" target="_blank">instagramAPIコンソール</a>で
			必要なサービスへのアクセスを有効にしたプロジェクトの認証情報に<br>
			承認済みの JavaScript 生成元として<input type="text" readonly value="<?=home_url()?>"/>
			リダイレクト先として<input type="text" readonly value="<?=home_url()?>/wp-content/plugins/catpow/lib/instagram/oauth_callback.php"/>を指定して
			crient IDとcrient secretを取得して入力したのち、登録ボタンを押してください。
		</p>
	</li>
</ul>
<ul>
	<li><button type="submit"><i class="fa fa-pencil"></i>登録</button></li>
</ul>
<ul>
	<li>
		<?php cpig_button(); ?>
	</li>
</ul>
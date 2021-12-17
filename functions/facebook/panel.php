<?php namespace Catpow; ?>
<dl>
	<dt><i class="fa fa-facebook-square"></i>app ID</dt>
	<dd><?php input('fb_app_id'); ?></dd>
</dl>
<dl>
	<dt><i class="fa fa-facebook-square"></i>app secret</dt>
	<dd><?php input('fb_app_secret'); ?></dd>
</dl>
<dl>
	<dt><i class="fa fa-facebook-square"></i>access token</dt>
	<dd><?php input('fb_access_token'); ?></dd>
</dl>
<ul>
	<li>
		<p class="caption">
			<a href="https://developers.facebook.com/apps/" target="_blank">Facebookのアプリ登録</a>で
			アプリの追加を行い、必要な情報を入力した後、登録ボタンを押してください。
		</p>
	</li>
</ul>
<ul>
	<li class="edit"><?php button('登録','action'); ?></li>
</ul>

<p>Facebookログインの設定で必要な処理に応じて有効なOAuthリダイレクトURIに以下を設定してください。</p>
<dl>
	<dt>ログイン</dt>
	<dd>
		<textarea cols="100" rows="1" readonly><?=facebook\cpfb::get_login_callback_url()?></textarea>
	</dd>
</dl>
<dl>
	<dt>ログアウト</dt>
	<dd>
		<textarea cols="100" rows="1" readonly><?=facebook\cpfb::get_logout_callback_url()?></textarea>
	</dd>
</dl>
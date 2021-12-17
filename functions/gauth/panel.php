<?php
namespace Catpow;
use Catpow\gauth\cpgc;

?>
<?php foreach(loop('gauth_conf') as $meta): ?>
<dl>
	<dt><i class="fab fa-google"></i>API key</dt>
	<dd><?php input('api_key'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-google"></i>Application Name</dt>
	<dd><?php input('application_name'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-google"></i>client ID</dt>
	<dd><?php input('client_id'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-google"></i>client secret</dt>
	<dd><?php input('client_secret'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-google"></i>scopes</dt>
	<dd><?php input('scopes'); ?></dd>
</dl>
<?php endforeach; ?>
<ul>
	<li>
		<p class="caption">
			<a href="https://console.developers.google.com" target="_blank">googleAPIコンソール</a>で
			必要なサービスへのアクセスを有効にしたプロジェクトの認証情報に承認済みの JavaScript 生成元として<br>
			<input type="text" readonly value="<?=home_url()?>" size="50"/><br>
			リダイレクト先として<br>
			<input type="text" readonly value="<?=cpgc::get_login_callback_url()?>" size="50"/><br>
			を指定してclient IDとclient secretを取得して入力し、登録ボタンを押してください。
		</p>
	</li>
</ul>
<ul class="buttons">
	<li><?php button('<i class="fas fa-sync-alt"></i>登録','action'); ?></li>
</ul>
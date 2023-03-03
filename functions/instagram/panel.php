<?php
namespace Catpow;
use Catpow\instagram\cpig;
?>
<?php foreach(loop('instagram_conf') as $meta): ?>
<dl>
	<dt><i class="fab fa-instagram"></i>App ID</dt>
	<dd><?php input('app_id'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-instagram"></i>App Secret</dt>
	<dd><?php input('app_secret'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-instagram"></i>scopes</dt>
	<dd><?php input('scopes'); ?></dd>
</dl>
<?php if(!empty(cpig::get_users())): ?>
<dl>
	<dt><i class="fab fa-wordpress"></i>Primary User</dt>
	<dd><?php input('primary_users'); ?></dd>
</dl>
<?php endif; ?>
<?php endforeach; ?>
<ul>
	<li>
		<p class="caption">
			<a href="https://developers.facebook.com/apps/" target="_blank">Metaアプリ管理ページ</a>で製品にInstagram Basic APIが設定されたアプリを作成し、<br>
			製品の設定で有効なOAuthリダイレクトURIに<br>
			<input type="text" readonly value="<?=cpig::get_register_callback_url()?>" size="50"/><br>
			を指定してApp IDとApp Secretを取得して入力し、登録ボタンを押してください。<br><br>
			<?php if(!empty($url=cpig::get_register_url('register'))):?>
			以下のURLにアクセスしてInstagramのアカウントをサイトに登録してください<br>
			<textarea readonly cols="50" rows="5"><?=$url?></textarea>
			<?php endif?>
		</p>
	</li>
</ul>
<ul class="cp-admin-buttons">
	<li class="item"><?php button('<i class="fas fa-sync-alt"></i>登録','action'); ?></li>
</ul>
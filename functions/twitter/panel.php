<?php namespace Catpow; ?>
<dl>
	<dt><i class="fab fa-twitter"></i>ConsumerKey</dt>
	<dd><?php input('tw_consumer_key'); ?></dd>
	<dt><i class="fab fa-twitter"></i>ConsumerSecret</dt>
	<dd><?php input('tw_consumer_secret'); ?></dd>
</dl>
<ul>
	<li>
		<p class="caption">
			<a href="https://developer.twitter.com/en/apps" target="_blank">developer.twitter.com</a>で、リダイレクト先として<br>
			<input type="text" readonly value="<?=plugins_url()?>/catpow/callee/tw_oauth_callback.php" size="50"/><br>
			を指定したappを作成してコンシューマーキー・コンシューマーシークレットを取得して入力してください
		</p>
	</li>
</ul>
<ul class="buttons">
	<li class="edit"><?php button('登録','action','message'); ?></li>
</ul>
<?php §message(); ?>
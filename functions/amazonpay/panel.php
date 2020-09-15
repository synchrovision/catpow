<?php namespace Catpow;?>
<h3><i class="fab fa-amazon-pay"></i>MWSアクセスキー</h3>
<?php foreach(loop('cp_amazonpay_keys') as $vals): ?>
<dl>
	<dt>環境</dt>
	<dd><?php input('sandbox'); ?></dd>
</dl>
<dl>
	<dt>配送先選択</dt>
	<dd><?php input('addressbook'); ?></dd>
</dl>
<?php foreach(['merchant_id','access_key','secret_key','client_id','client_secret','color','size'] as $prm_name): ?>
<dl>
	<dt><?=$prm_name?></dt>
	<dd><?php input($prm_name); ?></dd>
</dl>
<?php endforeach;endforeach; ?>
<p>
	<a href="https://sellercentral-japan.amazon.com/home" target="_blank">AmazonSellerCentral</a>にてアプリケーションを登録し
	ウェブ設定のJavaScriptの種類に<code><?=home_url();?></code>、リダイレクトURLに<code><?=home_url('/callback/amazonpay/checkout/');?></code>を設定し
	各キー取得して入力してください
</p>
<ul class="wp-block-catpow-buttons m center">
	<li class="item edit"><?php button('登録','action','message'); ?></li>
</ul>
<?php §message(); ?>
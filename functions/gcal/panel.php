<?php if(!in_array('gauth',cp::$use_functions)):?>
	<ul>
		<li>
			<p class="caption">
				gcalの使用にはgauthを有効にしてcrient IDとcrient secretを登録してください
			</p>
		</li>
	</ul>
<?php elseif(get_option('cp_gauth_crient_secret')): ?>
	<ul>
		<li>
			<?php cp_gauth_button('Access Token 登録','record_gcal_token','https://www.googleapis.com/auth/calendar openid profile email'); ?>
		</li>
	</ul>
	<?php if(get_option('cp_gcal_token')):$profile=cp_gauth_get_profile(get_option('cp_gcal_access_token')); ?>
	<ul>
		<li>
			<p class="caption"><a href="<?=$profile->link?>" target="_blank"><?=$profile->email; ?></a>のaccess tokenが登録されています</p>
		</li>
	</ul>
	<?php else: ?>
	<ul>
		<li>
			<p class="caption">access tokenが登録されていません。このサイトからアクセスしたいカレンダーを持つGoogleアカウントでログインした状態でAccess Token 登録ボタンを押してください。</p>
		</li>
	</ul>
	<?php endif;?>
<?php else: ?>
	<ul>
		<li>
			<p class="caption">
				gcalの使用にはgauthパネルでcrient IDとcrient secretを登録してください
			</p>
		</li>
	</ul>
<?php endif;?>

<?php _d(cp_gcal_refresh_token()); ?>
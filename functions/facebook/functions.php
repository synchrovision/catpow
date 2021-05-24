<?php
use Catpow\facebook\cpfb;

add_action('body_start',function(){
	?>
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.8";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
	<?php
});

add_action('login_form',function(){
	?>
	<p>
		<a class="button sns_login facebook" href="<?=cpfb::get_login_url()?>">
			<?php \Catpow\image('sns/facebook.png','Facebook'); ?>
			<?=__('Facebookでログイン','Catpow')?>
		</a>
	</p>
	<?php
});
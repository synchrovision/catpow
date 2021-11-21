<?php
namespace Catpow;
use Catpow\util\style_config;
?>
<dl>
	<dt><i class="fas fa-language"></i>プロジェクトID</dt>
	<dd><?php input('cp_adobe_fonts_pid'); ?></dd>
</dl>
<?php foreach(loop('fonts') as $val):foreach(style_config::get_font_roles() as $role=>$conf):?>
<dl>
	<dt><i class="fas fa-font"></i><?=$conf['label']?></dt>
	<dd><?php input($role.'_font'); ?></dd>
</dl>
<?php endforeach;endforeach; ?>
<ul>
	<li>
		<p class="caption">
			<a href="https://fonts.adobe.com/my_fonts#web_projects-section" target="_blank">AdobeFonts WEBプロジェクト</a>で
			使いたいプロジェクトのIDを入力し、各箇所に使用するフォントを設定してください。
		</p>
	</li>
</ul>
<ul class="buttons">
	<li><?php button('<i class="fas fa-sync-alt"></i>登録','action','message'); ?></li>
</ul>
<?php §message(); ?>
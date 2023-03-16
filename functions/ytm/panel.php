<?php namespace Catpow;?>
<dl>
	<dt><i class="fab fa-yahoo"></i>検索広告ID</dt>
	<dd><?php input('cp_yss_id'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-yahoo"></i>検索広告リターゲティング</dt>
	<dd><?php input('cp_yss_use_retargeting'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-yahoo"></i>ディスプレイ広告ID</dt>
	<dd><?php input('cp_yjad_id'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-yahoo"></i>ディスプレイ広告リターゲティングID</dt>
	<dd><?php input('cp_yjad_retargeting_id'); ?></dd>
</dl>
<ul class="cp-admin-buttons">
	<li class="item"><?php button('<i class="fas fa-sync-alt"></i>登録','action'); ?></li>
</ul>
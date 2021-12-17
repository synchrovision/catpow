<?php namespace Catpow; ?>
<table class="inputs">
	<tr>
		<th>
			ユーザーを選択
		</th>
		<td>
		<?php
			input([
				'name'=>'fake_user_id',
				'type'=>'select_rel_users',
				'label'=>'ユーザーを選択',
				'addition'=>['解除'=>0],
				'value'=>[],
				'default'=>cp::$data['fake_user_id']?:null
			]);
		?>
		</td>
	</tr>
</table>
<ul class="buttons">
	<li>
		<?php button('ユーザー切り替え','action');?>
		<small>
			管理画面以外のページにおけるユーザーのログイン情報を一時的に書き換えます。
		</small>
	</li>
</ul>
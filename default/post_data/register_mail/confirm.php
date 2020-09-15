<?php
$post_data['post_title']='確認メール';
$post_data['meta']=[
	'to'=>'[output email]',
	'from'=>get_option('admin_email'),
	'type'=>'html'
];
ob_start();
?>
<div class="frame" style="margin:10px;padding:10px;border:solid 3px #eee;border-radius:10px;text-align:center;">
<h3 style="font-size: 24px;font-weight: 800;color:#666;margin-bottom: 10px;">登録申請を受け付けました。</h3>
<p style="font-size: 12px;color:#666;">下記のURLにアクセスして登録手続きを続行してください。</p>

<a href="[task url]" style="display:block;text-align: center;color:#fff;font-size:18px;font-weight: 800;text-decoration: none;margin:30px auto;padding:5px;width:200px;background: #008;border-radius: 3px;">登録フォーム</a>
</div>


<?php $post_data['post_content']=ob_get_clean(); ?>
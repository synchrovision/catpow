<h3>config.php設定項目一覧</h3>

<dl>
	<dt>post_types</dt>
	<dd>
		ポストタイプの名前をキー値に各パラメータを指定
		<dl>
			<dt>name</dt>
			<dd>ポストタイプの名前</dd>	
			<dt>taxonomies</dt>
			<dd>
				ポストタイプの名前
				<dl>
					<dt>meta</dt>
					<dd>カスタム分類のカスタムフィールドを設定</dd>
				</dl>
			</dd>	
			<dt>meta	</dt>
			<dd>カスタムフィールドを設定</dd>
			<dt>template</dt>
			<dd>書き出すテンプレートを指定しておく事でSETUP_MODE時に各テンプレートファイルを書き出す<br>
							指定テンプレートで以下は特別な意味を持ち、対応するcontent+js+sass+qissが作成される<br>
							add=投稿　form<br>
							edit=編集　form<br>
							search=検索　loop+form<br>
							archive=一覧　loop<br>
							single=個別　loop<br>
							これら以外の指定はloopのみを書き出す<br>
							またlistというテンプレート名を指定すると<br>
							最低限のリンクのみのloopを書き出し,homeに最新投稿一覧が書き出される<br>
							archiveについても同じく,homeに一覧ページのリンクが書き出される<br>
							指定がなければlist,column,archive,search,single,add,editの７つの各テンプレートを書き出す<br>
							<br>
							_ 区切りで別タイプの同名テンプレートを<br>
							- 区切りで同タイプの別名テンプレートを書き出す<br>
							例：<br>
							single-a = single　と同じ　single-a-posttype.php<br>
							single_a = single_a　の　single-posttype.php<br>
							single_b-a = single_b　の　single-a-posttype.php
			</dd>
			<dt>action</dt>
			<dd>
				template_redirect時に実行するアクションをsingle,search,archive,add,edit毎に指定、
				主にリダイレクトやwp_headのアクションを登録するアクションを登録する
			</dd>
		</dl>
	</dd>
	<dt>pages</dt>
	<dd>
		スラッグをキー値に作成する固定ページを指定、ここで作成指定した固定ページには対応するcontentファイルが作成される
		基本的にはwp_insert_postに渡す引数の配列を指定、ただし初期値でpost_typeはpage、post_nameはキー値になる
		<dl>
			<dt>action</dt>
			<dd>template_redirect時に実行するアクションを指定</dd>
		</dl>
	</dd>
</dl>
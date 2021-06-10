<p align="center">
  <img src="https://raw.githubusercontent.com/synchrovision/catpow/master/theme_default/images/logo.png">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-7.4-45A?logo=php">
  <img src="https://img.shields.io/badge/WordPress-5.6-blue?logo=wordpress">
</p>

概要
=

CatpowはWordPressでサイト固有のオリジナルCMSのテーマを制作するためのプラグインです。

カスタム投稿・カスタムフィールド・カスタムカテゴリ・カスタムロール等の設定情報をテーマが設定ファイルとして持つことで、サイト固有のデザインと機能が一体になったテーマの開発を効率化します。

導入
=

[このページ](https://github.com/synchrovision/catpow/releases)から最新のリリースzipファイルをダウンロードしてWordPressの管理画面からプラグインとしてインストールしてください

機能
=

設定ファイルでカスタム投稿等を簡単設定
-

テーマ内の``config/system_config.php``に以下のように配列でカスタム投稿・カスタムフィールド・カスタムカテゴリの構成を記述することで簡単にそれらを設定できます

```php
$post_types=[
	'my_post_type'=>[
		'label'=>'カスタムポスト',
		'taxonomies'=>[
			'my_taxonomy'=>['label'=>'カスタム分類']
		],
		'meta'=>[
			'my_custom_field'=>['type'=>'textarea','label'=>'カスタムフィールド'],
		]
	]
];
```

テーマ内のSCSSを自動でコンパイル
-

SCSSのコンパイルにコマンドを実行する必要はありません、管理者としてログインしている時にページを閲覧した時、そのページに使われているcssに対応するscssファイルに更新があればそのscssはコンパイルされ、cssは更新されます。

Catpow対応テーマ・拡張プラグインのJSXをコンパイル
-

カスタムブロックの開発するのであれば、CatpowにはJSXと翻訳JSONファイルのコンパイラが備えられています。プラグイン内の``jsx_compiler``ディレクトで``npm run watch``を実行することで``catpow``から始まる名前を持つテーマとプラグインの中にあるJSXファイルとブロックの翻訳ファイルの更新を監視してコンパイルします。JSXはWordPressが内蔵するReactを利用するものとしてコンパイルされます。

テーマからプラグインの機能を簡単に拡張
-

Catpowの多くの機能が**テーマかプラグインに特定のファイルやクラスが存在する**ことをトリガーにしています。カスタムブロック、カスタムフィールドのタイプ、APIのエンドポイントなどの追加・拡張に登録の処理を行う必要はありません。テーマ内に所定の命名規則でファイル・クラスを作成するだけこれらを拡張することができます。

沢山のブロックからサイトに必要なものだけ有効に
-

Catpowには50以上ブロックが実装されていますがこの中から有効化されるのは**テーマに``blocks/[ブロック名]``のディレクトリが存在するもの**だけであり、このディレクトリに置かれた``front_style.css``がページ内でそのブロックが使われている時だけ読み込まれるようになります。また、ほとんどのブロックはテーマでcssを定義することを前提としており、プラグインからcssが読み込まれることはなく、CSSのセレクタの優先度をプラグインと競うことはありません。
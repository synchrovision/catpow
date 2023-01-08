<?php
namespace Catpow\template_type;
/**
* 外部サイトに埋め込み可能なフォームを提供するテンプレートです
* article_type/mailformのmailのtemplateとして使用されることを想定します。
* cpformのIDの要素にフォームをレンダリングするjsをnonce付きで動的に出力します。
*/

class embedableform extends template_type{
	public static $permalinks=['file'];
}

?>
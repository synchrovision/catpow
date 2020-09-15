<?php
namespace Catpow\content;

/**
* ユーザー入力の検証、inputsへの入力、フォームの出力を担う
* 固定のloop_idを持つ、完全なfile_pathの情報を保持し
* 同フォルダ内の許容されたfile_slugのファイルのincludeだけを許容する
*/
class form extends content{
	use formTrait;
}

?>
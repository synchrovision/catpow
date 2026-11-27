<?php
namespace Catpow\util;

class RTF {
	public static function format($text,$level=3){
		$text=str_replace(["\r\n","\r"],"\n",(string)$text);
		$text=self::blocks($text,max(1,min(6,$level)));
		$text=preg_replace('~</(dl|ul|ol)>\s*<\1 class="cp-rtf-\1.*?">~u','',$text);
		$text=preg_replace('~</(dl|ul|ol)><!--/(\w+?)-->\s*<\1 class="cp-rtf-\2.*?">~u','',$text);
		$text=self::inline($text);
		$text=preg_replace('~\s*(<(?:h\d|div|dl|dt|dd|ul|ol|li) .+?>|</(?:h\d|div|dl|dt|dd|ul|ol|li)>)\s*~u','$1',$text);
		return preg_replace('~\n[　\t]*~u','<br/>',$text);
	}

	private static function blocks($text,$level,$indent=0){
		$head=$indent?'^([　\t]{'.$indent.'})':'^()';
		$tail='(.+((\n'.($indent?'\1':'').'[　\t]).+)*)$';
		$class=' is-level'.$level.($indent?' is-indent'.$indent:'');
		if($indent && !preg_match('~'.$head.'~um',$text)){return $text;}
		if($indent){
			$text=preg_replace('~((\n[　\t]{'.$indent.'}[^\n]*)+)~u','<div class="cp-rtf-indent'.$class.'">$1</div>',$text,1);
		}
		$replacements=[
			'\^([^\s　].{0,20}?) [:：] '=>'<dl class="cp-rtf-notes'.$class.'"><dt class="cp-rtf-notes__dt">$2</dt><dd class="cp-rtf-notes__dd">$3</dd></dl><!--/notes-->',
			'([^\s　].{0,20}?) [:：] '=>'<dl class="cp-rtf-dl'.$class.'"><dt class="cp-rtf-dl__dt">$2</dt><dd class="cp-rtf-dl__dd">$3</dd></dl>',
			'[※*] '=>'<span class="cp-rtf-annotation'.$class.'">$2</span>',
			'[■#] '=>'<h'.$level.' class="cp-rtf-title'.$class.'">$2</h'.$level.'>',
			'[-・] '=>'<ul class="cp-rtf-ul'.$class.'"><li class="cp-rtf-ul__li">$2</li></ul>',
			'\d{1,2}\. '=>'<ol class="cp-rtf-ol'.$class.'"><li class="cp-rtf-ol__li">$2</li></ol>',
			'([①-⑳]|[^\s　]\.) '=>'<dl class="cp-rtf-listed'.$class.'"><dt class="cp-rtf-listed__dt">$2</dt><dd class="cp-rtf-listed__dd">$3</dd></dl><!--/listed-->'
		];
		foreach($replacements as $pattern=>$html){$text=preg_replace('~'.$head.$pattern.$tail.'~um',$html,$text);}
		return $level<6?self::blocks($text,$level+1,$indent+1):$text;
	}

	private static function inline($text){
		$replacements=[
			'\(\((.+?)\)\)'=>'<small class="cp-rtf-small">$1</small>',
			'\*{4}(.+?)\*{4}'=>'<strong class="cp-rtf-strongest">$1</strong>',
			'\*{3}(.+?)\*{3}'=>'<strong class="cp-rtf-stronger">$1</strong>',
			'\*{2}(.+?)\*{2}'=>'<strong class="cp-rtf-strong">$1</strong>',
			'##(.+?)##'=>'<em class="cp-rtf-em">$1</em>',
			'\~\~(.+?)\~\~'=>'<del class="cp-rtf-del">$1</del>',
			'``(.+?)``'=>'<code class="cp-rtf-code">$1</code>',
			'\[\[(.+?):(\w+)\]\]'=>'<span class="cp-rtf-tag is-tag-$2"><span class="cp-rtf-tag__label">$1</span></span>'
		];
		foreach($replacements as $pattern=>$html){$text=preg_replace('~'.$pattern.'~u',$html,$text);}
		$text=preg_replace_callback('~!\[(.+?)\]\((.+?)\)~u',static fn($m)=>'<img'.BlockCode::attrs(['class'=>'cp-rtf-image','src'=>$m[2],'alt'=>$m[1]]).'/>',$text);
		$text=preg_replace('~\[tel:(\d+)-(\d+)-(\d+)\]~u','<a class="cp-rtf-tel" href="tel:$1$2$3" target="_blank" rel="noopener">$1-$2-$3</a>',$text);
		$text=preg_replace_callback('~\[mail:(.+?@.+?)\]~u',static fn($m)=>BlockCode::element('a','cp-rtf-mailto',$m[1],['href'=>'mailto:'.$m[1],'target'=>'_blank','rel'=>'noopener']),$text);
		$text=preg_replace_callback('~\[\[(.+?)\]\]\((.+?)\)~u',static fn($m)=>BlockCode::element('a','cp-rtf-button',
			BlockCode::element('span','cp-rtf-button__label',$m[1]),['href'=>$m[2],'target'=>'_blank','rel'=>'noopener']),$text);
		$text=preg_replace('~\[\[(.+?)\]\]~u','<span class="cp-rtf-tag"><span class="cp-rtf-tag__label">$1</span></span>',$text);
		return preg_replace_callback('~\[(.+?)\]\((.+?)\)~u',static function($m){
			$type=str_ends_with($m[2],'.pdf')?'pdf':(preg_match('~^https?://~',$m[2])?'external':null);
			return BlockCode::element('a','cp-rtf-link'.($type?' is-link-'.$type:''),$m[1],
				['href'=>$m[2],'target'=>$type?'_blank':null,'rel'=>'noopener']);
		},$text);
	}
}

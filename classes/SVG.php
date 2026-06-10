<?php
namespace Catpow;

class SVG{
	// 許可するSVGタグのホワイトリスト
	private static array $allowed_tags = [
		'svg', 'g', 'defs', 'desc', 'title', 'symbol', 'use', 'image', 'switch',
		'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
		'text', 'tspan', 'textPath', 'a', 'view', 'animate', 'animateMotion',
		'animateTransform', 'set', 'mpath', 'marker', 'mask', 'pattern', 'clipPath',
		'filter', 'foreignObject', 'linearGradient', 'radialGradient', 'stop',
		'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix',
		'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage',
		'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence',
		'font', 'font-face', 'glyph', 'missing-glyph', 'metadata'
	];

	// 許可する属性のホワイトリスト
	private static array $allowed_attributes = [
		'id', 'class', 'style', 'data-*', 'aria-*',
		'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
		'width', 'height', 'd', 'points', 'viewBox', 'preserveAspectRatio',
		'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
		'stroke-dasharray', 'stroke-dashoffset', 'opacity', 'fill-opacity',
		'stroke-opacity', 'transform', 'href', 'xlink:href', 'target',
		'font-size', 'font-family', 'font-weight', 'text-anchor', 'text-decoration',
		'word-spacing', 'letter-spacing', 'paint-order', 'clip-path', 'clip-rule',
		'fill-rule', 'font-style', 'font-variant', 'text-rendering', 'mask',
		'marker-start', 'marker-mid', 'marker-end', 'baseline-shift', 'dominant-baseline',
		'glyph-orientation-horizontal', 'glyph-orientation-vertical',
		'stop-color', 'stop-opacity', 'offset', 'gradientUnits', 'gradientTransform',
		'x', 'y', 'fx', 'fy', 'r', 'spreadMethod'
	];

	// 危険な属性値パターン（スクリプト注入などを検出）
	private static array $dangerous_protocols = [
		'javascript:', 'data:', 'vbscript:', 'file:'
	];

	/**
	 * SVGコードをサニタイズして安全なコードに変換
	 * 
	 * @param string $svg_code SVGコード
	 * @return string サニタイズされたSVGコード
	 */
	public static function sanitize(string $svg_code):string{
		// 空文字列チェック
		if(empty(trim($svg_code))){
			return '';
		}

		// XML警告を非表示にして処理
		$old_errors = libxml_use_internal_errors(true);
		
		// DOMDocumentでパース
		$dom = new \DOMDocument('1.0', 'UTF-8');
		$dom->preserveWhiteSpace = true;
		
		// SVG文字列のラッピング処理（最上位がsvgタグでない場合を考慮）
		$svg_to_load = $svg_code;
		if(strpos(trim($svg_code), '<svg') !== 0){
			$svg_to_load = '<svg>' . $svg_code . '</svg>';
		}

		// loadXMLで解析（HTMではなくXML）
		if(!@$dom->loadXML($svg_to_load, LIBXML_NONET | LIBXML_NOCDATA)){
			libxml_use_internal_errors($old_errors);
			return '';
		}

		libxml_use_internal_errors($old_errors);

		// ルート要素を取得
		$root = $dom->documentElement;
		if(!$root){
			return '';
		}

		// サニタイズ処理を実行
		self::sanitizeNode($dom, $root);

		// サニタイズされたXMLを文字列に変換
		$result = '';
		foreach($root->childNodes as $node){
			$result .= $dom->saveXML($node);
		}

		// 最初にラッピングしていた場合はそのまま返す
		if(strpos(trim($svg_code), '<svg') === 0){
			return $dom->saveXML($root);
		}

		return $result;
	}

	/**
	 * ノードとその子要素を再帰的にサニタイズ
	 * 
	 * @param \DOMDocument $dom DOMDocument
	 * @param \DOMNode $node 処理するノード
	 */
	private static function sanitizeNode(\DOMDocument $dom, \DOMNode $node):void{
		// テキストノード、コメントノード、CDATAセクションは処理不要
		if($node->nodeType !== XML_ELEMENT_NODE){
			return;
		}

		// タグ名を小文字に統一
		$tag_name = strtolower($node->nodeName);

		// 許可されていないタグを削除
		if(!in_array($tag_name, self::$allowed_tags)){
			// script, style タグなどの危険なタグは内容ごと削除
			if(in_array($tag_name, ['script', 'style', 'embed', 'object', 'iframe'])){
				$node->parentNode->removeChild($node);
				return;
			}

			// その他の許可されていないタグはコンテンツのみを保持
			$fragment = $dom->createDocumentFragment();
			foreach($node->childNodes as $child){
				$fragment->appendChild($child->cloneNode(true));
			}
			$node->parentNode->replaceChild($fragment, $node);
			return;
		}

		// 許可されたタグの属性をサニタイズ
		if($node->hasAttributes()){
			$attrs_to_remove = [];
			foreach($node->attributes as $attr){
				$attr_name = strtolower($attr->nodeName);
				$attr_value = $attr->nodeValue;

				// aria-*, data-* 属性は許可
				if(strpos($attr_name, 'aria-') === 0 || strpos($attr_name, 'data-') === 0){
					continue;
				}

				// ホワイトリストに含まれていない属性は削除
				if(!in_array($attr_name, self::$allowed_attributes)){
					$attrs_to_remove[] = $attr_name;
					continue;
				}

				// 属性値の危険なプロトコルをチェック
				$lower_value = strtolower($attr_value);
				$is_dangerous = false;
				foreach(self::$dangerous_protocols as $protocol){
					if(strpos($lower_value, $protocol) === 0){
						$is_dangerous = true;
						break;
					}
				}

				if($is_dangerous){
					$attrs_to_remove[] = $attr_name;
				}
			}

			// 危険な属性を削除
			foreach($attrs_to_remove as $attr_name){
				$node->removeAttribute($attr_name);
			}
		}

		// 子ノードを再帰的にサニタイズ
		$children = [];
		foreach($node->childNodes as $child){
			$children[] = $child;
		}
		foreach($children as $child){
			self::sanitizeNode($dom, $child);
		}
	}
}
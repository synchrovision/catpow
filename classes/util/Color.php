<?php
namespace Catpow\util;

abstract class Color{
	public static function hex_to_oklch(string $hex): array {
		// # を除去
		$hex = ltrim($hex, '#');

		if (strlen($hex) === 6 || strlen($hex) === 8) {
			$r = hexdec(substr($hex, 0, 2)) / 255;
			$g = hexdec(substr($hex, 2, 2)) / 255;
			$b = hexdec(substr($hex, 4, 2)) / 255;
			$alpha = strlen($hex) === 6?1:(hexdec(substr($hex, 6, 2)) / 255);
		}
		elseif(strlen($hex) === 3 || strlen($hex) === 4) {
			$r = hexdec(substr($hex, 0, 1)) / 15;
			$g = hexdec(substr($hex, 1, 1)) / 15;
			$b = hexdec(substr($hex, 2, 1)) / 15;
			$alpha = strlen($hex) === 3?1:(hexdec(substr($hex, 3, 1)) / 15);
		}
		else{
			throw new \Error('Invalid hex color');
		}

		// HEX → sRGB (0–1)

		// sRGB → Linear RGB
		$linear = function ($c) {
			return ($c <= 0.04045)
				? $c / 12.92
				: pow(($c + 0.055) / 1.055, 2.4);
		};

		$r = $linear($r);
		$g = $linear($g);
		$b = $linear($b);

		// Linear RGB → OKLab
		$l = 0.4122214708 * $r + 0.5363325363 * $g + 0.0514459929 * $b;
		$m = 0.2119034982 * $r + 0.6806995451 * $g + 0.1073969566 * $b;
		$s = 0.0883024619 * $r + 0.2817188376 * $g + 0.6299787005 * $b;

		$l_ = \pow($l,1/3);
		$m_ = \pow($m,1/3);
		$s_ = \pow($s,1/3);

		$L = 0.2104542553 * $l_ + 0.7936177850 * $m_ - 0.0040720468 * $s_;
		$a = 1.9779984951 * $l_ - 2.4285922050 * $m_ + 0.4505937099 * $s_;
		$b = 0.0259040371 * $l_ + 0.7827717662 * $m_ - 0.8086757660 * $s_;

		// OKLab → OKLCH
		$C = sqrt($a * $a + $b * $b);
		$H = rad2deg(atan2($b, $a));
		if ($H < 0) {
			$H += 360;
		}

		return [
			'l' => $L,
			'c' => $C,
			'h' => $H,
			'a' => $alpha
		];
	}
	public static function oklch_to_hex(Array $lch): string {
		$L=$lch['l'];
		$C=$lch['c'];
		$H=$lch['h'];
		$alpha=$lch['a']??1;
		// H をラジアンに変換
		$hRad = deg2rad($H);

		// OKLCH → OKLab
		$a = $C * cos($hRad);
		$b = $C * sin($hRad);

		// OKLab → LMS
		$l_ = $L + 0.3963377774 * $a + 0.2158037573 * $b;
		$m_ = $L - 0.1055613458 * $a - 0.0638541728 * $b;
		$s_ = $L - 0.0894841775 * $a - 1.2914855480 * $b;

		$l = $l_ ** 3;
		$m = $m_ ** 3;
		$s = $s_ ** 3;

		// LMS → Linear RGB
		$r =  4.0767416621 * $l - 3.3077115913 * $m + 0.2309699292 * $s;
		$g = -1.2684380046 * $l + 2.6097574011 * $m - 0.3413193965 * $s;
		$b = -0.0041960863 * $l - 0.7034186147 * $m + 1.7076147010 * $s;

		// Linear RGB → sRGB
		$to_srgb = function ($c) {
			return ($c <= 0.0031308)
				? 12.92 * $c
				: 1.055 * pow($c, 1 / 2.4) - 0.055;
		};

		$r = $to_srgb($r);
		$g = $to_srgb($g);
		$b = $to_srgb($b);

		// gamut clipping
		$r = min(max($r, 0), 1);
		$g = min(max($g, 0), 1);
		$b = min(max($b, 0), 1);

		// sRGB → HEX
		return sprintf(
			'#%02X%02X%02X%02X',
			(int) round($r * 255),
			(int) round($g * 255),
			(int) round($b * 255),
			(int) round($alpha * 255)
		);
	}
}
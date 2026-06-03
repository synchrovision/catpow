<?php
namespace Catpow\util;

abstract class Color{
	//oklch <=> rgb
	public static function rgb_to_oklch(Array $rgb): array {
		$r = $rgb['r'] / 255;
		$g = $rgb['g'] / 255;
		$b = $rgb['b'] / 255;
		$alpha = $rgb['a'];

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
	public static function oklch_to_rgb(Array $lch): array {
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
		return [
			'r'=>(int) round($r * 255),
			'g'=>(int) round($g * 255),
			'b'=>(int) round($b * 255),
			'a'=>$alpha
		];
	}

	// color code string => oklch
	public static function to_oklch(string $color): array {
		if(substr($color,0,1)==='#'){return self::hex_to_oklch($color);}
		if(substr($color,0,3)==='rgb'){return self::rgb_to_oklch(self::parse_rgb_code($color));}
		if(substr($color,0,3)==='hsl'){return self::rgb_to_oklch(self::hsl_to_rgb(self::parse_hsl_code($color)));}
	}

	//hsl <=> rgb
	public static function hsl_to_rgb(array $hsl): array {
		$h = $hsl['h'] / 360;
		$s = $hsl['s'] / 100;
		$l = $hsl['l'] / 100;
		$a = $hsl['a'] ?? 1;

		if ($s === 0.0) {
			return [
				'r' => $l,
				'g' => $l,
				'b' => $l,
				'a' => $a
			];
		}

		$q = $l < 0.5 ? $l * (1 + $s) : $l + $s - $l * $s;
		$p = 2 * $l - $q;

		$hue_to_rgb = function ($p, $q, $t) {
			if ($t < 0) $t += 1;
			if ($t > 1) $t -= 1;
			if ($t < 1/6) return $p + ($q - $p) * 6 * $t;
			if ($t < 1/2) return $q;
			if ($t < 2/3) return $p + ($q - $p) * (2/3 - $t) * 6;
			return $p;
		};

		return [
			'r' => $hue_to_rgb($p, $q, $h + 1/3),
			'g' => $hue_to_rgb($p, $q, $h),
			'b' => $hue_to_rgb($p, $q, $h - 1/3),
			'a' => $a
		];
	}
	public static function rgb_to_hsl(array $rgb): array {
		$r = $rgb['r'];
		$g = $rgb['g'];
		$b = $rgb['b'];
		$a = $rgb['a'] ?? 1;

		$max = max($r, $g, $b);
		$min = min($r, $g, $b);
		$delta = $max - $min;

		$l = ($max + $min) / 2;

		if ($delta === 0.0) {
			$h = 0;
			$s = 0;
		} else {
			$s = $l < 0.5 ? $delta / ($max + $min) : $delta / (2 - $max - $min);

			if ($max === $r) {
				$h = ((($g - $b) / $delta) % 6) / 6;
			} elseif ($max === $g) {
				$h = ((($b - $r) / $delta) + 2) / 6;
			} else {
				$h = ((($r - $g) / $delta) + 4) / 6;
			}
		}

		return [
			'h' => $h * 360,
			's' => $s * 100,
			'l' => $l * 100,
			'a' => $a
		];
	}

	//oklch <=> hex
	public static function hex_to_oklch(string $hex): array {
		return self::rgb_to_oklch(self::hex_to_rgb($hex));
	}
	public static function oklch_to_hex(Array $lch): string {
		return self::rgb_to_hex(self::oklch_to_rgb($lch));
	}

	//hex <=> rgb
	public static function hex_to_rgb(string $hex){
		$hex = ltrim($hex, '#');

		if (strlen($hex) === 6 || strlen($hex) === 8) {
			$r = hexdec(substr($hex, 0, 2));
			$g = hexdec(substr($hex, 2, 2));
			$b = hexdec(substr($hex, 4, 2));
			$a = strlen($hex) === 6?1:(hexdec(substr($hex, 6, 2)) / 255);
		}
		elseif(strlen($hex) === 3 || strlen($hex) === 4) {
			$r = hexdec(substr($hex, 0, 1)) * 17;
			$g = hexdec(substr($hex, 1, 1)) * 17;
			$b = hexdec(substr($hex, 2, 1)) * 17;
			$a = strlen($hex) === 3?1:(hexdec(substr($hex, 3, 1)) / 15);
		}
		else{
			throw new \Error('Invalid hex color : '.$hex);
		}
		return compact('r','g','b','a');
	}
	public static function rgb_to_hex(array $rgb){
		return sprintf(
			'#%02X%02X%02X%02X',
			(int) round($rgb['r']),
			(int) round($rgb['g']),
			(int) round($rgb['b']),
			(int) round($rgb['a'] * 255)
		);
	}

	//parse color code string
	public static function parse_rgb_code(string $code): array{
		preg_match('/^rgba?\((?P<r>[\d\.]+)(?P<ru>%?)\s+(?P<g>[\d\.]+)(?P<gu>%?)\s+(?P<b>[\d\.]+)(?P<bu>%?)(\s+\/\s+(?P<a>[\d\.]+)(?P<au>%?))?\)$/',$code,$matches);
		if(empty($matches)){
			error_log(sprintf('Error : %s is not valid rgb code',$code));
			return ['r'=>0, 'g'=>0, 'b'=>0, 'a'=>1];
		}
		return [
			'r'=>floatval($matches['r'])*(empty($matches['ru'])?1:2.55),
			'g'=>floatval($matches['g'])*(empty($matches['gu'])?1:2.55),
			'b'=>floatval($matches['b'])*(empty($matches['bu'])?1:2.55),
			'a'=>empty($matches['a'])?1:(floatval($matches['a'])*(empty($matches['au'])?1:0.01))
		];
	}
	public static function parse_hsl_code(string $code): array{
		preg_match('/^hsla?\((?P<h>[\d\.]+)(deg)?\s+(?P<s>[\d\.]+)%?\s+(?P<l>[\d\.]+)%?(\s+\/\s+(?P<a>[\d\.]+)(?P<au>%?))?\)$/',$code,$matches);
		if(empty($matches)){
			error_log(sprintf('Error : %s is not valid hsl code',$code));
			return ['h'=>0, 's'=>0, 'l'=>0, 'a'=>1];
		}
		return [
			'h'=>floatval($matches['h']),
			's'=>floatval($matches['s']),
			'l'=>floatval($matches['l']),
			'a'=>empty($matches['a'])?1:(floatval($matches['a'])*(empty($matches['au'])?1:0.01))
		];
	}
	public static function parse_oklch_code(string $code): array{
		preg_match('/^oklch\((?P<l>[\d\.]+)(?P<lu>%?)\s+(?P<c>[\d\.]+)(?P<cu>%?)\s+(?P<h>[\d\.]+)(deg)?(\s+\/\s+(?P<a>[\d\.]+)(?P<au>%?))?\)$/',$code,$matches);
		if(empty($matches)){
			error_log(sprintf('Error : %s is not valid oklch code',$code));
		}
		return [
			'l'=>floatval($matches['l'])*(empty($matches['lu'])?1:0.01),
			'c'=>floatval($matches['c'])*(empty($matches['cu'])?1:0.01),
			'h'=>floatval($matches['h']),
			'a'=>empty($matches['a'])?1:(floatval($matches['a'])*(empty($matches['au'])?1:0.01))
		];
	}
}
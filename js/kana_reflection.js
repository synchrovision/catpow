function kana_reflection(from,to,isHiragana=false){
	var i;
	from.addEventListener('keyup',function(e){
		if(/^[a-z]$/.test(e.key)){
			to.value+=e.key;
			for(i=kana_reflection.roma.length;i>-1;i--){
				to.value = to.value.replace(kana_reflection.roma[i],kana_reflection[isHiragana?'hiragana':'katakana'][i]);
			}
		}
		else if(e.key == '-'){
			to.value+='-';
		}
		else if(e.key == 'Backspace'){
			to.value=to.value.slice(0,-1);
		}
		if(from.value==""){to.value="";}
	});
}

kana_reflection.hiragana = new Array('あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'ふ', 'へ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'ゐ', 'ゑ', 'を', 'ん', 'いぇ', 'し', 'ち', 'つ', 'ふぁ', 'ふぃ', 'ふぇ', 'ふぉ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ヴぁ', 'ヴぃ', 'ヴ', 'ヴぇ', 'ヴぉ', 'くぁ', 'くぃ', 'くぇ', 'くぉ', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ほ', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'じゃ', 'じゅ', 'じょ', 'きゃ', 'きゅ', 'きょ', 'ぎゃ', 'ぎゅ', 'ぎょ', 'しゃ', 'しゅ', 'しょ', 'しゃ', 'しゅ', 'しょ', 'じゃ', 'じゅ', 'じょ', 'ちゃ', 'ちゅ', 'ちょ', 'ぢゃ', 'ぢゅ', 'ぢょ', 'ちゃ', 'ちゅ', 'ちょ', 'にゃ', 'にゅ', 'にょ', 'ひゃ', 'ひゅ', 'ひょ', 'びゃ', 'びゅ', 'びょ', 'ぴゃ', 'ぴゅ', 'ぴょ', 'みゃ', 'みゅ', 'みょ', 'りゃ', 'りゅ', 'りょ', 'しぇ', 'じぇ', 'しぇ', 'じぇ', 'ちぇ', 'ちぇ', 'つぁ', 'つぇ', 'つぉ', 'てぃ', 'でぃ', 'でゅ', 'ヵ', 'ヶ', 'っ', 'ゃ', 'ゅ', 'ょ', 'ゎ', 'うぃ', 'うぃ', 'うぇ', 'うぇ', 'うぉ', 'ヴゅ', 'つぃ', 'くぁ', 'くぃ', 'くぇ', 'くぉ', 'ぐぁ', 'じゃ', 'じゅ', 'じょ', 'ちゃ', 'ちゅ', 'ちょ', 'てぃ', 'でぃ', 'てゅ', 'とぅ', 'どぅ', 'ふぁ', 'ふぃ', 'ふぇ', 'ふぉ', 'ふゅ', 'ふゅ', 'んb', 'んc', 'んd', 'んf', 'んg', 'んh', 'んj', 'んk', 'んl', 'んm', 'んp', 'んq', 'んr', 'んs', 'んt', 'んv', 'んw', 'んx', 'んz', 'っb', 'っc', 'っd', 'っf', 'っg', 'っh', 'っj', 'っk', 'っl', 'っm', 'っp', 'っq', 'っr', 'っs', 'っt', 'っv', 'っw', 'っx', 'っy', 'っz');

kana_reflection.katakana = new Array('ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'フ', 'ヘ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン', 'イェ', 'シ', 'チ', 'ツ', 'ファ', 'フィ', 'フェ', 'フォ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ヴァ', 'ヴィ', 'ヴ', 'ヴェ', 'ヴォ', 'クァ', 'クィ', 'クェ', 'クォ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'ホ', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ジャ', 'ジュ', 'ジョ', 'キャ', 'キュ', 'キョ', 'ギャ', 'ギュ', 'ギョ', 'シャ', 'シュ', 'ショ', 'シャ', 'シュ', 'ショ', 'ジャ', 'ジュ', 'ジョ', 'チャ', 'チュ', 'チョ', 'ヂャ', 'ヂュ', 'ヂョ', 'チャ', 'チュ', 'チョ', 'ニャ', 'ニュ', 'ニョ', 'ヒャ', 'ヒュ', 'ヒョ', 'ビャ', 'ビュ', 'ビョ', 'ピャ', 'ピュ', 'ピョ', 'ミャ', 'ミュ', 'ミョ', 'リャ', 'リュ', 'リョ', 'シェ', 'ジェ', 'シェ', 'ジェ', 'チェ', 'チェ', 'ツァ', 'ツェ', 'ツォ', 'ティ', 'ディ', 'デュ', 'ヵ', 'ヶ', 'ッ', 'ャ', 'ュ', 'ョ', 'ヮ', 'ウィ', 'ウィ', 'ウェ', 'ウェ', 'ウォ', 'ヴュ', 'ツィ', 'クァ', 'クィ', 'クェ', 'クォ', 'グァ', 'ジャ', 'ジュ', 'ジョ', 'チャ', 'チュ', 'チョ', 'ティ', 'ディ', 'テュ', 'トゥ', 'ドゥ', 'ファ', 'フィ', 'フェ', 'フォ', 'フュ', 'フュ', 'ンb', 'ンc', 'ンd', 'ンf', 'ンg', 'ンh', 'ンj', 'ンk', 'ンl', 'ンm', 'ンp', 'ンq', 'ンr', 'ンs', 'ンt', 'ンv', 'ンw', 'ンx', 'ンz', 'ッb', 'ッc', 'ッd', 'ッf', 'ッg', 'ッh', 'ッj', 'ッk', 'ッl', 'ッm', 'ッp', 'ッq', 'ッr', 'ッs', 'ッt', 'ッv', 'ッw', 'ッx', 'ッy', 'ッz');

kana_reflection.roma = new Array('a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'si', 'su', 'se', 'so', 'ta', 'ti', 'tu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'hu', 'fu', 'he', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'wyi', 'wye', 'wo', 'nn', 'ye', 'shi', 'chi', 'tsu', 'fa', 'fi', 'fe', 'fo', 'xa', 'xi', 'xu', 'xe', 'xo', 'va', 'vi', 'vu', 've', 'vo', 'qa', 'qi', 'qe', 'qo', 'ga', 'gi', 'gu', 'ge', 'go', 'za', 'zi', 'ji', 'zu', 'ze', 'zo', 'da', 'di', 'du', 'de', 'do', 'ho', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po', 'ja', 'ju', 'jo', 'kya', 'kyu', 'kyo', 'gya', 'gyu', 'gyo', 'sya', 'syu', 'syo', 'sha', 'shu', 'sho', 'zya', 'zyu', 'zyo', 'tya', 'tyu', 'tyo', 'dya', 'dyu', 'dyo', 'cha', 'chu', 'cho', 'nya', 'nyu', 'nyo', 'hya', 'hyu', 'hyo', 'bya', 'byu', 'byo', 'pya', 'pyu', 'pyo', 'mya', 'myu', 'myo', 'rya', 'ryu', 'ryo', 'sye', 'she', 'zye', 'je', 'tye', 'che', 'tsa', 'tse', 'tso', 'thi', 'dhi', 'dhu', 'xka', 'xke', 'xtu', 'xya', 'xyu', 'xyo', 'xwa', 'whi', 'wi', 'whe', 'we', 'who', 'vyu', 'tsi', 'kwa', 'kwi', 'kwe', 'kwo', 'gwa', 'jya', 'jyu', 'jyo', 'cya', 'cyu', 'cyo', 'thi', 'dhi', 'thu', 'twu', 'dwu', 'hwa', 'hwi', 'hwe', 'hwo', 'fyu', 'hwyu', 'nb', 'nc', 'nd', 'nf', 'ng', 'nh', 'nj', 'nk', 'nl', 'nm', 'np', 'nq', 'nr', 'ns', 'nt', 'nv', 'nw', 'nx', 'nz', 'bb', 'cc', 'dd', 'ff', 'gg', 'hh', 'jj', 'kk', 'll', 'mm', 'pp', 'qq', 'rr', 'ss', 'tt', 'vv', 'ww', 'xx', 'yy', 'zz');

kana_reflection.setup=function(){
	document.removeEventListener("DOMContentLoaded",kana_reflection.setup);
	window.removeEventListener("load",kana_reflection.setup);
	document.querySelectorAll('form.cmf-form').forEach(function(form){
		form.addEventListener('reset',function(){
			form.querySelectorAll('[data-hiragana-reflection]').forEach(function(input){
				kana_reflection(form.querySelector('[name="'+input.dataset['hiraganaReflection']+'"]'),input,true);
			});
			form.querySelectorAll('[data-katakana-reflection]').forEach(function(input){
				kana_reflection(form.querySelector('[name="'+input.dataset['katakanaReflection']+'"]'),input);
			});
		});
	});
}
document.addEventListener('DOMContentLoaded',kana_reflection.setup);
window.addEventListener('load',kana_reflection.setup);
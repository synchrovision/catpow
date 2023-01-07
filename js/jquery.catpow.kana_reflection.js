(function ($) {
	window.Catpow.kana = new Array('ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'フ', 'ヘ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン', 'イェ', 'シ', 'チ', 'ツ', 'ファ', 'フィ', 'フェ', 'フォ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ヴァ', 'ヴィ', 'ヴ', 'ヴェ', 'ヴォ', 'クァ', 'クィ', 'クェ', 'クォ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'ホ', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ジャ', 'ジュ', 'ジョ', 'キャ', 'キュ', 'キョ', 'ギャ', 'ギュ', 'ギョ', 'シャ', 'シュ', 'ショ', 'シャ', 'シュ', 'ショ', 'ジャ', 'ジュ', 'ジョ', 'チャ', 'チュ', 'チョ', 'ヂャ', 'ヂュ', 'ヂョ', 'チャ', 'チュ', 'チョ', 'ニャ', 'ニュ', 'ニョ', 'ヒャ', 'ヒュ', 'ヒョ', 'ビャ', 'ビュ', 'ビョ', 'ピャ', 'ピュ', 'ピョ', 'ミャ', 'ミュ', 'ミョ', 'リャ', 'リュ', 'リョ', 'シェ', 'ジェ', 'シェ', 'ジェ', 'チェ', 'チェ', 'ツァ', 'ツェ', 'ツォ', 'ティ', 'ディ', 'デュ', 'ヵ', 'ヶ', 'ッ', 'ャ', 'ュ', 'ョ', 'ヮ', 'ウィ', 'ウィ', 'ウェ', 'ウェ', 'ウォ', 'ヴュ', 'ツィ', 'クァ', 'クィ', 'クェ', 'クォ', 'グァ', 'ジャ', 'ジュ', 'ジョ', 'チャ', 'チュ', 'チョ', 'ティ', 'ディ', 'テュ', 'トゥ', 'ドゥ', 'ファ', 'フィ', 'フェ', 'フォ', 'フュ', 'フュ', 'ンb', 'ンc', 'ンd', 'ンf', 'ンg', 'ンh', 'ンj', 'ンk', 'ンl', 'ンm', 'ンp', 'ンq', 'ンr', 'ンs', 'ンt', 'ンv', 'ンw', 'ンx', 'ンz', 'ッb', 'ッc', 'ッd', 'ッf', 'ッg', 'ッh', 'ッj', 'ッk', 'ッl', 'ッm', 'ッp', 'ッq', 'ッr', 'ッs', 'ッt', 'ッv', 'ッw', 'ッx', 'ッy', 'ッz');

	window.Catpow.roma = new Array('a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'si', 'su', 'se', 'so', 'ta', 'ti', 'tu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'hu', 'fu', 'he', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'wyi', 'wye', 'wo', 'nn', 'ye', 'shi', 'chi', 'tsu', 'fa', 'fi', 'fe', 'fo', 'xa', 'xi', 'xu', 'xe', 'xo', 'va', 'vi', 'vu', 've', 'vo', 'qa', 'qi', 'qe', 'qo', 'ga', 'gi', 'gu', 'ge', 'go', 'za', 'zi', 'ji', 'zu', 'ze', 'zo', 'da', 'di', 'du', 'de', 'do', 'ho', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po', 'ja', 'ju', 'jo', 'kya', 'kyu', 'kyo', 'gya', 'gyu', 'gyo', 'sya', 'syu', 'syo', 'sha', 'shu', 'sho', 'zya', 'zyu', 'zyo', 'tya', 'tyu', 'tyo', 'dya', 'dyu', 'dyo', 'cha', 'chu', 'cho', 'nya', 'nyu', 'nyo', 'hya', 'hyu', 'hyo', 'bya', 'byu', 'byo', 'pya', 'pyu', 'pyo', 'mya', 'myu', 'myo', 'rya', 'ryu', 'ryo', 'sye', 'she', 'zye', 'je', 'tye', 'che', 'tsa', 'tse', 'tso', 'thi', 'dhi', 'dhu', 'xka', 'xke', 'xtu', 'xya', 'xyu', 'xyo', 'xwa', 'whi', 'wi', 'whe', 'we', 'who', 'vyu', 'tsi', 'kwa', 'kwi', 'kwe', 'kwo', 'gwa', 'jya', 'jyu', 'jyo', 'cya', 'cyu', 'cyo', 'thi', 'dhi', 'thu', 'twu', 'dwu', 'hwa', 'hwi', 'hwe', 'hwo', 'fyu', 'hwyu', 'nb', 'nc', 'nd', 'nf', 'ng', 'nh', 'nj', 'nk', 'nl', 'nm', 'np', 'nq', 'nr', 'ns', 'nt', 'nv', 'nw', 'nx', 'nz', 'bb', 'cc', 'dd', 'ff', 'gg', 'hh', 'jj', 'kk', 'll', 'mm', 'pp', 'qq', 'rr', 'ss', 'tt', 'vv', 'ww', 'xx', 'yy', 'zz');


	$.fn.extend({
		cp_kana_reflection:function(name){
			var $kana=$(this),kana=$kana.get(0),i;
			var tgt=document.getElementsByName(name);
			$(tgt).on('keyup',function(e){
				if(/^[a-z]$/.test(e.key)){
					kana.value+=e.key;
					for(i=window.Catpow.roma.length;i>-1;i--){
						kana.value = kana.value.replace(window.Catpow.roma[i],window.Catpow.kana[i]);
					}
				}
				else if(e.key == '-'){
					kana.value+='-';
				}
				else if(e.key == 'Backspace'){
					kana.value=kana.value.slice(0,-1);
				}
				if(tgt.value==""){kana.value="";}
			});
			return $kana;
		}
	});
})(jQuery);
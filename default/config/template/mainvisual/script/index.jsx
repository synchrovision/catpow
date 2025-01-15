import {ready,simpleParallax} from 'catpow/util';

ready(()=>{
	document.querySelectorAll('.cp-mainvisual > .bg').forEach((el)=>simpleParallax(el));
});
export const hexToRgb=(hex)=>{
	const [r,g,b]=(hex.match(/#?(\w)(\w)(\w)$/) || hex.match(/#?(\w{2})(\w{2})(\w{2})$/)).slice(1).map((c)=>parseInt(c,16));
	return {r,g,b};
};
export const rgbToHex=(rgb)=>{
	const f=(n)=>n.toString(16).padStart(2,'0');
	return '#'+f(rgb.r)+f(rgb.g)+f(rgb.b);
};
export const hexToHsl=(hex)=>{
	var h=0,s=0;
	var rgb=hex.match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).map(function(c){return parseInt(c,16)/0xff;});
	var max=Math.max.apply(null,rgb);
	var min=Math.min.apply(null,rgb);
	var d=max-min;
	var l=(max+min)/2;
	var [r,g,b]=rgb;

	if(d!=0){
		if(r===max){
			h=60*((g-b)/d);
			h=h<0?h+360:h;
		}
		if(g===max){
			h=60*(((b-r)/d)+2);
		}
		if(b===max){
			h=60*(((r-g)/d)+4);
		}
	}
	if(l>0 && l<1){
		s=d/(1-Math.abs(l*2-1));
	}
	return {h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)};
};
export const hslToHex=(hsl)=>{
	var l=Math.min(100,hsl.l)/100;
	var a=Math.min(100,hsl.s)*Math.min(l,1-l)/100;
	var f=function(n){
		var k=(n+hsl.h/30)%12;
		var c=l-a*Math.max(Math.min(k-3,9-k,1),-1);
		return Math.round(255*c).toString(16).padStart(2,'0');
	};
	return '#'+f(0)+f(8)+f(4);
};
export const hexToHsb=(hex)=>{
	var h=0,s=0;
	var rgb=hex.match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).map(function(c){return parseInt(c,16)/0xff;});
	var max=Math.max.apply(null,rgb);
	var min=Math.min.apply(null,rgb);
	var b=max;
	var d=max-min;
	if(d!==0){
		var dr,dg,db;
		s=d/b;
		dr=(((b-rgb[0])/6)+(d/2))/d;
		dg=(((b-rgb[1])/6)+(d/2))/d;
		db=(((b-rgb[2])/6)+(d/2))/d;

		if(rgb[0]==max){
			h=db-dg;
		}
		else{
			if(rgb[1]==max){
				h=(1/3)+dr-db;
			}
			else{
				if(rgb[2]==max){
					h=(2/3)+dg-dr;
				}
			}
		}
		if(h<0){h++;}
		if(h>1){h--;}
	}
	return {h:Math.round(h*360),s:Math.round(s*100),b:Math.round(b*100)};
};
export const hsbToHex=(hsb)=>{
	const {h,s,b}=hsb;
	const hs=h/60;
	const d=b*s/10000;
	const min=(b/100)-d;
	const f=function(n){
		var c=min+d*Math.min(1,Math.max(0,Math.abs((hs+n)%6-3)-1));
		return Math.round(255*c).toString(16).padStart(2,'0');
	};
	return '#'+f(0)+f(4)+f(2);
}
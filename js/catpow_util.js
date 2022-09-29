/* global console Catpow */
window.Catpow=window.Catpow || {};
window.Catpow.UI=window.Catpow.UI || {};

Catpow.util={
	devices:{
		sp:{
			icon:'smartphone',
			width:480,
			media_query:'(max-width:640px)',
			sizes:'(max-width:640px) 480px',
			sizes_value:'480px',
			media_size:'medium_large',
			reg:/[^,]+ 480w,/,
			rep:' 480w,'
		},
		tb:{
			icon:'tablet',
			width:960,
			media_query:'(max-width:1280px)',
			sizes:'(max-width:1280px) 960px',
			sizes_value:'960px',
			media_size:'full',
			reg:/[^,]+ 960w,/,
			rep:' 960w,'
		},
		lt:{
			icon:'laptop',
			width:1440,
			media_query:'(max-width:1920px)',
			sizes:'(max-width:1920px) 1440px',
			sizes_value:'1440px',
			media_size:'full',
			reg:/[^,]+ 1440w,/,
			rep:' 1440w,'
		},
		pc:{
			icon:'desktop',
			width:1920,
			media_query:false,
			sizes:'100vw',
			sizes_value:'100vw',
			media_size:'full',
			reg:/[^,]+$/,
			rep:''
		}
	},
	getDevice:function(){
		var rtn='pc';
		Object.keys(Catpow.util.devices).some(function(device){
			if(Catpow.util.devices[device].width>=window.innerWidth){rtn=device;return true;}
			return false;
		});
		return rtn;
	},
	getDeviceData:function(){
		return Catpow.util.devices[Catpow.util.getDevice()];
	},
	requireStyles:function(styles){
		styles.filter(function(href){
			for(let i=0;i<document.styleSheets.length;i++){
				if(document.styleSheets[i].href===href){return false;}
			}
			return true;
		}).map(function(href){
			const el=document.createElement('link');
			el.setAttribute('rel','stylesheet');
			el.setAttribute('href',href);
			document.head.appendChild(el);
		});
	},
	requireScripts:function(scripts){
		var dfr=new jQuery.Deferred();
		var scriptsFlag={};
		for(let i=0;i<document.scripts.length;i++){
			scriptsFlag[document.scripts[i].src.split('?')[0]]=true;
		}
		jQuery.when.apply(null,scripts.filter(function(src){
			return !scriptsFlag[src];
		}).map(function(src){
			const dfr=new jQuery.Deferred();
			const el=document.createElement('script');
			el.setAttribute('type','text/javascript');
			el.setAttribute('src',src);
			document.body.appendChild(el);
			el.onload=el.onreadystatechange=function( _, isAbort ) {
				if(isAbort || !el.readyState || /loaded|complete/.test(el.readyState) ) {
					el.onload=el.onreadystatechange=null;
					if(!isAbort) { dfr.resolve(); }
				}
			};
			return dfr.promise();
		})).then(function(){dfr.resolve();});
		return dfr.promise();
	},
	getDateValue:function(dateObj){
		return dateObj.getFullYear()+'-'+ (dateObj.getMonth()+1)+'-'+ dateObj.getDate();
	},
	getDateObject:function(dateValue,defaultValue){
		var d=dateValue.match(/^(\d+)\-(\d+)\-(\d+)$/);
		if(d){return new Date(d[1],d[2]-1,d[3]);}
		return Catpow.util.getRelativeDateTimeObject(dateValue,defaultValue);
	},
	getDateTimeValue:function(dateTimeObj){
		return (
			dateTimeObj.getFullYear()+'-'+ 
			(dateTimeObj.getMonth()+1)+'-'+
			dateTimeObj.getDate()+' '+
			dateTimeObj.getHours()+':'+
			dateTimeObj.getMinutes()+':'+
			dateTimeObj.getSeconds()
		);
	},
	getDateTimeObject:function(dateTimeValue,defaultValue){
		var dt=dateTimeValue.match(/^(\d+)\-(\d+)\-(\d+) (\d+):(\d+):(\d+)$/);
		if(dt){return new Date(dt[1],dt[2]-1,dt[3],dt[4],dt[5],dt[6]);}
		return Catpow.util.getRelativeDateTimeObject(dateTimeValue,defaultValue);
	},
	getRelativeDateTimeObject:function(dateTimeValue,defaultValue){
		if(dateTimeValue==='now'){return new Date();}
		var r=dateTimeValue.match(/^([+\-]\d+)\s+(year|week|month|day|hour|minute|second)s?/);
		if(r){
			var d=new Date();
			var rv=parseInt(r[1]);
			switch(r[2]){
				case 'year':d.setFullYear(d.getFullYear()+rv);break;
				case 'week':d.setDate(d.getDate()+rv*7);break;
				case 'month':d.setMonth(d.getMonth()+rv);break;
				case 'day':d.setDate(d.getDate()+rv);break;
				case 'hour':d.setHours(d.getHours()+rv);break;
				case 'minute':d.setMinutes(d.getMinutes()+rv);break;
				case 'second':d.setSeconds(d.getSeconds()+rv);break;
			}
			return d;
		}
		if(defaultValue){return defaultValue;}
		return false;
	},
	/*url*/
	getURLparam:function(url,key){
		const reg=new RegExp(`(&amp;|&|\\?)${key}=([^&]+)`);
		const m=url.match(reg);
		return m?m[2]:null;
	},
	setURLparams:function(url,params){
		if(!url){return '';}
		for(const key in params){
			url=Catpow.util.setURLparam(url,key,params[key]);
		}
		return url;
	},
	setURLparam:function(url,key,val){
		if(!url){return '';}
		if(url.indexOf('?')===-1){
			return `${url}?${key}=${val}`;
		}
		const reg=new RegExp(`((&amp;|&|\\?)${key}=)([^&]+)`);
		if(reg.test(url)){
			return url.replace(reg,'$1'+val);
		}
		return `${url}&${key}=${val}`;
	},
	removeURLparam:(url,key)=>{
		if(!url){return '';}
		if(url.indexOf('?')===-1){return url;}
		const reg=new RegExp(`(&amp;|&|\\?)${key}=[^&]+(&amp;|&)?`);
		return url.replace(reg,(m,p1,p2)=>p2?p1:'');
	},
	/*file*/
	download:function(data,name,type){
		var blob=new Blob([data],{type:type||'text/plain'});
		var url=window.URL || window.webkitURL;
		var blobURL=url.createObjectURL(blob);

		var a=document.createElement('a');
		a.download=name||'undefined.txt';
		a.href=blobURL;
		a.click();
		a.remove();
		return true;
	},
	/*color*/
	hslToHex:function(hsl){
		var l=Math.min(100,hsl.l)/100;
		var a=Math.min(100,hsl.s)*Math.min(l,1-l)/100;
		var f=function(n){
			var k=(n+hsl.h/30)%12;
			var c=l-a*Math.max(Math.min(k-3,9-k,1),-1);
			return Math.round(255*c).toString(16).padStart(2,'0');
		};
		return '#'+f(0)+f(8)+f(4);
	},
	hexToHsl:function(hex){
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
	},
	hexToHsb:function(hex){
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
	}
};

//浮動小数点問題対策のmath
Math.sum=function(){
	var args=[],i;
	for(i=0;i<arguments.length;i++){
		args.push(arguments[i]);
	}
	i=args.reduce(function(i,n){
		var a=parseFloat(n).toString().split('.');
		if(a[1]){return Math.min(i,-a[1].length);}
		return i;
	},0);
	var n=args.reduce(function(a,v){
		return a+parseFloat(v+'e'+i*-1);
	},0);
	return parseFloat(n+'e'+i);
};
Math.pfloor=function(n,p){
	return parseFloat(Math.floor(parseFloat(n+'e'+p))+'e-'+p);
};
Math.pround=function(n,p){
	return parseFloat(Math.round(parseFloat(n+'e'+p))+'e-'+p);
};
Math.pceil=function(n,p){
	return parseFloat(Math.ceil(parseFloat(n+'e'+p))+'e-'+p);
};
Math.clamp=function(a,b,c){
	return Math.max(a,Math.min(b,c));
}

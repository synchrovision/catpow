/* global console Catpow Promise Proxy*/
window.Catpow=window.Catpow || {};
window.Catpow.UI=window.Catpow.UI || {};
window.Catpow.uiProps=window.Catpow.uiProps || {};

Catpow.util={
	/*device*/
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
	/*event*/
	ready:(callback)=>{
		if(document.readyState!=='loading'){callback();}
		else{document.addEventListener('DOMContentLoaded',callback);}
	},
	/*dom*/
	el:(tag,props,children)=>{
		const el=document.createElement(tag);
		Object.keys(props).forEach((key)=>{
			el[key]=props[key];
		});
		if(Array.isArray(children)){
			children.forEach((child)=>{
				if(typeof child === 'string'){
					el.appendChild(document.createTextNode(child));
				}
				else{el.appendChild(child);}
			});
		}
		return el;
	},
	bem:(className)=>{
		const children={};
		return new Proxy(function(){
			if(arguments.length>0){
				const classes=[];let i;
				for(i=0;i<arguments.length;i++){
					if(!arguments[i]){continue;}
					if(typeof(arguments[i])==='string'){
						classes.push(arguments[i]);
						continue;
					}
					classes.push.apply(
						classes,
						Array.isArray(arguments[i])?arguments[i]:
						Object.keys(arguments[i]).filter((c)=>arguments[i][c])
					);
				}
				if(classes.length>0){return className+' '+classes.join(' ');}
			}
			return className;
		},{
			get:(target,prop)=>{
				if(undefined===children[prop]){
					children[prop]=Catpow.util.bem(className.split(' ')[0]+(prop[0]==='_'?'_':'-')+prop);
				}
				return children[prop];
			}
		});
	},
	classNamesToFlags:(classNames)=>classNames && classNames.split(' ').map(Catpow.util.kebabToCamel).reduce((p,c)=>{p[c]=true;return p},{}),
	flagsToClassNames:(flags)=>flags && Object.keys(flags).filter((f)=>flags[f]).map(Catpow.util.camelToKebab).join(' '),
	/*string*/
	camelToKebab:(str)=>str.replace(/(\w)([A-Z])/g,'$1-$2').toLowerCase(),
	camelToSnake:(str)=>str.replace(/(\w)([A-Z])/g,'$1_$2').toLowerCase(),
	kebabToCamel:(str)=>str.replace(/\-(\w)/g,(m)=>m[1].toUpperCase()),
	snakeToCamel:(str)=>str.replace(/_(\w)/g,(m)=>m[1].toUpperCase()),
	/*calc*/
	fib:(n)=>{
		if(undefined===Catpow.util.fib.cache){Catpow.util.fib.cache=[0,1,1];}
		if(undefined!==Catpow.util.fib.cache[n]){return Catpow.util.fib.cache[n];}
		return Catpow.util.fib.cache[n-2]+Catpow.util.fib.cache[n-1];
	},
	bez:(ns,t)=>{
		var p=0,n=ns.length-1,i;
		p+=ns[0]*Math.pow((1-t),n)
		for(i=1;i<n;i++){
			p+=ns[i]*Math.pow((1-t),n-i)*Math.pow(t,i)*n;
		}
		p+=ns[n]*Math.pow(t,n);
		return p;
	},
	srand:(w=88675123)=>{
		var x=123456789,y=362436069,z=521288629;
		return (min,max)=>{
			let t;
			t=x^(x<<11);
			[x,y,z]=[y,z,w];
			w=(w^(w>>>19))^(t^(t>>>8));
			return min+Math.abs(w)%(max+1-min);
		}
	},
	/*deps*/
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
	requireScripts:async(scripts)=>{
		var scriptsFlag={};
		for(let i=0;i<document.scripts.length;i++){
			scriptsFlag[document.scripts[i].src.split('?')[0]]=true;
		}
		for(const script of scripts){
			if(!scriptsFlag[script]){
				await Catpow.util.loadScript(script);
			}
		}
	},
	loadScript:(src)=>{
		return new Promise((resolve)=>{
			const el=document.createElement('script');
			el.setAttribute('type','text/javascript');
			el.setAttribute('src',src);
			document.body.appendChild(el);
			el.onload=el.onreadystatechange=function(_,isAbort){
				if(isAbort || !el.readyState || /loaded|complete/.test(el.readyState)) {
					el.onload=el.onreadystatechange=null;
					if(!isAbort){resolve();}
				}
			};
		});
	},
	evalScript:(el)=>{
		const script=document.createElement("script");
		script.type="text/javascript";
		script.appendChild(document.createTextNode(el.textContent));
		document.head.prepend(script);
		script.remove();
	},
	/*datetime*/
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
	/*csv*/
	parseCSV:(csv)=>{
		let tmp=[];
		csv=csv.replace(/("[^"]*")+/g,(match)=>{
            tmp.push(match.slice(1,-1).replace(/""/g,'"'));return '[TMP]';
        });
		return csv.split("\r\n").map((row)=>{
            return row.split(',').map((val)=>val==='[TMP]'?tmp.shift():val)
        });
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
	hsbToHex:(hsb)=>{
		const {h,s,b}=hsb;
		const hs=h/60;
		const d=b*s/10000;
		const min=(b/100)-d;
		const f=function(n){
			var c=min+d*Math.min(1,Math.max(0,Math.abs((hs+n)%6-3)-1));
			return Math.round(255*c).toString(16).padStart(2,'0');
		};
		return '#'+f(0)+f(4)+f(2);
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
	},
	/*animation*/
	animate:(cb,dur=500,ease=null)=>{
		var s=parseInt(performance.now()),c=1/dur,p=0;
		if(ease===null){ease=Catpow.util.easeInOutQuad;}
		if(Array.isArray(ease)){
			const ns=ease;
			ns.unshift(0);ns.push(1);
			ease=(p)=>Catpow.util.bez(ns,p);
		}
		const tick=(t)=>{
			p=(t-s)*c;
			if(p>1){return cb(1);}
			window.requestAnimationFrame(tick);
			return cb(ease(p));
		}
		window.requestAnimationFrame(tick);
	},
	easeLinear:(p)=>p,
	easeInQuad:(p)=>p*p,
	easeOutQuad:(p)=>1-Math.pow(1-p,2),
	easeInOutQuad:(p)=>(p<0.5)?(p*p*2):(1-Math.pow(1-p,2)*2),
	easeInCubic:(p)=>p*p*p,
	easeOutCubic:(p)=>1-Math.pow(1-p,3),
	easeInOutCubic:(p)=>(p<0.5)?(p*p*p*4):(1-Math.pow(1-p,3)*4)
};
/*Math*/
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
Math.pfloor=(n,p)=>parseFloat(Math.floor(parseFloat(n+'e'+p))+'e-'+p);
Math.pround=(n,p)=>parseFloat(Math.round(parseFloat(n+'e'+p))+'e-'+p);
Math.pceil=(n,p)=>parseFloat(Math.ceil(parseFloat(n+'e'+p))+'e-'+p);
Math.clamp=(a,b,c)=>Math.max(a,Math.min(b,c));
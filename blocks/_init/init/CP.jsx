import {kebabToCamel,camelToKebab} from 'util';
﻿import {kebabToCamel,camelToKebab} from 'catpow/util';

export const CP={
	filters:{},
	cache:{},
	config:{},
	
	listedConvertibles:['catpow/listed','catpow/flow','catpow/faq','catpow/ranking','catpow/dialog','catpow/sphere','catpow/slider','catpow/banners','catpow/lightbox','catpow/panes','catpow/slidablemenu','catpow/showcase'],
	tableConvertibles:['catpow/simpletable','catpow/datatable','catpow/comparetable','catpow/layouttable'],
	
	dummyText:{
		title:'吾輩は猫である。',
		lead:'名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。',
		text:'名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。',
		footer:'『吾輩は猫である』（わがはいはねこである）　夏目漱石　著'
	},
	
	selectImage:(keys,set,size,devices)=>{
		if(CP.uploder===undefined){
			CP.uploader=wp.media({
				title:'Select Image',
				button:{text:'Select'},  
				multiple:false
			});
		}
		CP.uploader.off('select').on('select',()=>{
			let image = CP.uploader.state().get('selection').first().toJSON();
			let data={};
			if(keys.mime){data[keys.mime]=image.mime;}
			if(keys.alt){data[keys.alt]=image.alt;}
			if(size && image.sizes && image.sizes[size]){data[keys.src]=image.sizes[size].url;}
			else{data[keys.src]=image.url;}
			if(keys.sources && image.sizes){
				devices=devices || ['sp'];
				data[keys.sources]=devices.map((device)=>{
					const sizeData=CP.devices[device];
					return {srcset:image.sizes[sizeData.media_size].url,device};
				});
			}
			if(keys.srcset && image.sizes){
				devices=devices || ['sp','pc'];
				data[keys.srcset]='';
				devices.forEach((device)=>{
					const sizeData=CP.devices[device];
					data[keys.srcset]+=image.sizes[sizeData.media_size].url+sizeData.rep;
				});
			}
			if(keys.data){
				data[keys.data]=image;
			}
			set(data);
		}).open();
	},
	imageSrcOrDummy:(src)=>{
		if(!src){return wpinfo.theme_url+'/images/dummy.jpg';}
		if(src[0]=='['){return wpinfo.plugins_url+'/catpow/callee/dummy_image.php?text='+src;}
		return src;
	},
	
	parseCSV:(csv)=>{
		let tmp=[];
		csv=csv.replace(/("[^"]*")+/g,(match)=>{
            tmp.push(match.slice(1,-1).replace(/""/g,'"'));return '[TMP]';
        });
		return csv.split("\r\n").map((row)=>{
            return row.split(',').map((val)=>val==='[TMP]'?tmp.shift():val)
        });
	},
	
	switchNumberClass:({set,attr},label,value)=>{
		let classArray=(attr.classes || '').split(' ');
		let i=classArray.findIndex(cls=>(cls.slice(0,label.length)===label));
		if(i===-1){if(value){classArray.push(label+value);}}
		else{if(value){classArray.splice(i,1,label+value);}else{classArray.splice(i,1)}}
		set({classes:classArray.join(' ')});
	},
	getNumberClass:({attr},label)=>{
		let value=(attr.classes || '').split(' ').find(cls=>(cls.slice(0,label.length)===label));
		if(!value){return 0;}
		return parseInt(value.slice(label.length));
	},
	
	switchColor:(props,value)=>{
		CP.switchNumberClass(props,'color',value);
	},
	getColor:(props)=>{
		return CP.getNumberClass(props,'color');
	},
	
	switchPattern:(props,value)=>{
		CP.switchNumberClass(props,'pattern',value);
	},
	getPattern:(props)=>{
		return CP.getNumberClass(props,'pattern');
	},
	
	switchSelectiveClass:({set,attr},values,value,key)=>{
		if(key === undefined){key='classes'}
		let classArray=attr[key].split(' ');
		if(!Array.isArray(values) && _.isObject(values)){values=Object.keys(values);}
		classArray=_.difference(classArray,values);
        if(Array.isArray(value)){classArray=classArray.concat(value);}
		else{classArray.push(value);}
		let data={};
		data[key]=classArray.join(' ');
		set(data);
	},
	getSelectiveClass:({attr},values,key)=>{
		if(key === undefined){key='classes'}
        if(attr[key] === undefined){attr[key]='';}
		let classArray=attr[key].split(' ');
		if(!Array.isArray(values) && _.isObject(values)){values=Object.keys(values);}
		return _.intersection(classArray,values).shift();
	},
	
	getSubClasses:(prm)=>{
		let rtn={};
		let values;
		if(Array.isArray(prm.values)){values=prm.values;}
		else{values=Object.keys(prm.values);}
		values.forEach((val)=>{
			if(prm.sub && prm.sub[val]){
				rtn[val]=CP.getAllSubClasses(prm.sub[val]);
			}
			else{
				rtn[val]=[];
			}
		});
		return rtn;
	},
	getAllSubClasses:(prms)=>{
		let rtn=[];
		prms.forEach((prm)=>{
			if(typeof prm === 'object'){
				if(prm.values){
					if(Array.isArray(prm.values)){
						rtn=rtn.concat(prm.values);
					}
					else if(_.isObject(prm.values)){
						rtn=rtn.concat(Object.keys(prm.values));
					}
					else{
						rtn.push(prm.values);
					}
				}
				if(prm.sub){
					if(Array.isArray(prm.sub)){
						rtn=rtn.concat(CP.getAllSubClasses(prm.sub));
					}
					else{
						Object.keys(prm.sub).forEach((key)=>{
							rtn=rtn.concat(CP.getAllSubClasses(prm.sub[key]));
						});
					}
				}
			}
		});
		return rtn;
	},
	getBindClasses:(prm)=>{
		let rtn={};
		let values;
		if(Array.isArray(prm.values)){values=prm.values;}
		else{values=Object.keys(prm.values);}
		values.forEach((val)=>{
			if(prm.bind && prm.bind[val]){
				rtn[val]=prm.bind[val];
			}
			else{
				rtn[val]=[];
			}
		});
		return rtn;
	},
	
	toggleClass:({attr,set},value,key)=>{
		if(key === undefined){key='classes'}
        if(attr[key] === undefined){attr[key]='';}
		let classArray=attr[key].split(' ');
		let i=classArray.indexOf(value);
		if(i===-1){classArray.push(value);}
		else{classArray.splice(i,1);}
		let data={};
		data[key]=classArray.join(' ');
		set(data);
	},
	hasClass:({attr},value,key)=>{
		if(key === undefined){key='classes';}
        if(attr[key] === undefined){attr[key]='';}
		return attr[key].split(' ').indexOf(value)!==-1;
	},
	
	selectPrevItem:(tag)=>{
		window.getSelection().anchorNode.parentNode.closest(tag).previousElementSibling.querySelector('[contentEditable]').focus();
	},
	selectNextItem:(tag)=>{
		window.getSelection().anchorNode.parentNode.closest(tag).nextElementSibling.querySelector('[contentEditable]').focus();
	},
	saveItem:({items,itemsKey,set})=>{
		set({[itemsKey || 'items']:JSON.parse(JSON.stringify(items))});
	},
	deleteItem:(props)=>{
		var {items,index}=props;
		items.splice(index,1);
		CP.saveItem(props);
	},
	cloneItem:(props)=>{
		var {tag,items,index}=props;
		items.splice(index,0,JSON.parse(JSON.stringify(items[index])));
		CP.saveItem(props);
		CP.selectNextItem(tag);
	},
	upItem:(props)=>{
		var {items,index}=props;
		if(!items[index-1])return false;
		items.splice(index-1,2,items[index],items[index-1]);
		CP.saveItem(props);
	},
	downItem:(props)=>{
		var {items,index}=props;
		if(!items[index+1])return false;
		items.splice(index,2,items[index+1],items[index]);
		CP.saveItem(props);
	},
	
	switchItemColor:({items,index,set},color,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=(items[index].classes || '').split(' ');
		let i=classArray.findIndex(cls=>(cls.slice(0,5)==='color'));
		if(i===-1){if(color){classArray.push('color'+color);}}
		else{if(color){classArray.splice(i,1,'color'+color);}else{classArray.splice(i,1)}}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemColor:({items,index})=>{
		let c=(items[index].classes || '').split(' ').find(cls=>(cls.slice(0,5)==='color'));
		if(!c){return 0;}
		return parseInt(c.slice(5));
	},
	
	switchItemPattern:({items,index,set},pattern,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=(items[index].classes || '').split(' ');
		let i=classArray.findIndex(cls=>(cls.slice(0,7)==='pattern'));
		if(i===-1){if(pattern){classArray.push('pattern'+pattern);}}
		else{if(pattern){classArray.splice(i,1,'pattern'+pattern);}else{classArray.splice(i,1)}}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemPattern:({items,index})=>{
		let p=(items[index].classes || '').split(' ').find(cls=>(cls.slice(0,7)==='pattern'));
		if(!p){return 0;}
		return parseInt(p.slice(7));
	},
	
	switchItemSelectiveClass:({items,index,set},values,value,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=(items[index].classes || '').split(' ');
		if(!Array.isArray(values) && _.isObject(values)){values=Object.keys(values);}
		classArray=_.difference(classArray,values);
        if(Array.isArray(value)){classArray=classArray.concat(value);}
		else{classArray.push(value);}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemSelectiveClass:({items,index},values)=>{
		if(!items[index].classes){return false;}
		let classArray=(items[index].classes || '').split(' ');
		if(!Array.isArray(values) && _.isObject(values)){values=Object.keys(values);}
		return _.intersection(classArray,values).shift();
	},
	
	toggleItemClass:({items,index,set},value,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=(items[index].classes || '').split(' ');
		let i=classArray.indexOf(value);
		if(i===-1){classArray.push(value);}
		else{classArray.splice(i,1);}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	hasItemClass:({items,index},value)=>{
		let classArray=(items[index].classes || '').split(' ');
		return classArray.indexOf(value)!==-1;
	},
    
    getJsonValue:({attr},json,key)=>{
        if(!attr[json]){return null;}
        return JSON.parse(attr[json])[key];
    },
    hasJsonValue:(prop,json,key,value)=>{
        let values=CP.getJsonValue(prop,json,key);
        if(!values){return false;}
		return values.indexOf(value)!==-1;
    },
    setJsonValue:({attr,set},json,key,value)=>{
        let data={};
        let jsonData=JSON.parse(attr[json]);
        jsonData[key]=value;
        data[json]=JSON.stringify(jsonData);
        set(data);
    },
    switchJsonValue:(prop,json,key,value)=>{
        let values=CP.getJsonValue(prop,json,key);
        if(!values){values=[];}
		let i=values.indexOf(value);
		if(i===-1){values.push(value);}
		else{values.splice(i,1);}
        CP.setJsonValue(prop,json,key,values);
    },
	
	
	parseStyleString:(css)=>{
		if(css instanceof Object){return css;}
		if(!css){return {};}
		var obj={};
		css.replace('&amp;','&').split(';').forEach((pair)=>{
			const match=pair.match(/^((\-\-)?([^:]+?)):(.+)$/);
			if(!match){return;}
			obj[match[2]?match[1]:kebabToCamel(match[3])]=match[4];
		});
		return obj;
	},
	createStyleString:(data)=>{
		if(!data){return '';}
		return Object.keys(data).map((key)=>{
			return camelToKebab(key)+':'+data[key]+';';
		}).join('');
	},
	parseStyleCode:(code)=>{
		let rtn={};
		for(const match of code.matchAll(/(\S.+?){([^}]+)}/g)){
			rtn[match[1]]=CP.parseStyleString(match[2]);
		}
		return rtn;
	},
	createStyleCode:(data)=>{
		if(!data){return '';}
		return Object.keys(data).map((sel)=>{
			return sel+'{'+CP.createStyleString(data[sel])+'}';
		}).join('');
	},
	parseStyleCodeWithMediaQuery:(code)=>{
		if(!code){return {};}
		var rtn={};
		const reg=/@media\s*\((.+?)\)\s*{([^}]+})\s*}/;
		const defaultCode=code.replace(new RegExp(reg,'g'),(str)=>{
			const matches=str.match(reg);
			rtn[matches[1]]=CP.parseStyleCode(matches[2]);
			return '';
		});
		rtn['default']=CP.parseStyleCode(defaultCode);
		return rtn;
	},
	createStyleCodeWithMediaQuery:(data)=>{
		var rtn='';
		return Object.keys(data).map((media)=>{
			if(media==='default'){return {p:-10000,media};}
			const matches=media.match(/(min|max)\-width:(\d+)px/);
			return {p:parseInt(matches[2])*{min:1,max:-1}[matches[1]],media};
		}).sort((a,b)=>a.p-b.p).map((d)=>d.media).map((media)=>{
			if(media==='default'){return CP.createStyleCode(data[media]);}
			return '@media('+media+'){'+CP.createStyleCode(data[media])+'}';
		}).join('');
	},
	
	createGridStyleCode:(sel,bnd)=>{
		return sel+'{'+CP.createStyleString(CP.createGridStyleCodeData(bnd))+'}';
	},
	createGridStyleCodeData:(bnd)=>{
		var rtn={
			"display":"grid",
			" display":"-ms-grid",
			"-ms-grid-columns":"1fr ".repeat(bnd[0]),
			"grid-template-columns":"repeat("+bnd[0]+",1fr)",
			"-ms-grid-rows":"1fr ".repeat(bnd[1]),
			"grid-template-rows":"repeat("+bnd[1]+",1fr)",
		}
		return rtn;
	},
	createGridItemStyleCode:(sel,bnd)=>{
		return sel+'{'+CP.createStyleString(CP.createGridItemStyleCodeData(bnd))+'}';
	},
	createGridItemStyleCodeData:(bnd)=>{
		var rtn={
			"-ms-grid-column":bnd[0],
			"-ms-grid-row":bnd[1],
			"grid-column":bnd[0],
			"grid-row":bnd[1],
		}
		if(bnd[2] && bnd[2]>1){
			rtn["grid-column"]+=" / span "+bnd[2];
			rtn["-ms-grid-column-span"]=bnd[2];
		}
		if(bnd[3] && bnd[3]>1){
			rtn["grid-row"]+=" / span "+bnd[3];
			rtn["-ms-grid-row-span"]=bnd[3];
		}
		return rtn;
	},
	
	getUrlInStyleCode:(code)=>{
		if(!code || code.indexOf('url(')===-1){return false;}
		const m=code.match(/url\((.+?)\)/);
		return m?m[1]:'';
	},
	
	parseGradientStyleValue:(gradient)=>{
		const match=gradient.match(/^(linear|radial)\-gradient\((\d+deg),(.+)\)$/);
		return {
			type:match[1],
			angle:match[2],
			colors:match[3].match(/rgba?\([\d,]+?\) \d+%/g).map((color)=>{
				const match=color.match(/((rgba?)\((\d+),(\d+),(\d+)(,(\d+))?\)) (\d+%)/);
				return {
					color:match[1],
					type:match[2],
					r:match[3],
					g:match[4],
					b:match[5],
					a:(match[7]===undefined)?1:match[7],
					position:match[8]
				}
			})
		};
	},
	
	/*flags*/
	testFlags:(cond,flags)=>cond&flags===cond,
	filterArrayWithFlags:(array,flags)=>array.filter((c,i)=>flags&1<<i),
	
	wordsToFlags:(words)=>{
		var rtn={};
		if(undefined === words){return {};}
		if(typeof words === 'string'){words=words.split(' ');}
		words.forEach((word)=>{rtn[word]=true;});
		return rtn;
	},
	flagsToWords:(flags)=>{
		if(undefined === flags){return '';}
		return Object.keys(flags).filter((word)=>flags[word]).join(' ');
	},
	
	classNamesToFlags:(words)=>{
		var rtn={};
		if(undefined === words){return {};}
		if(typeof words === 'string'){words=words.split(' ').map(kebabToCamel);}
		words.forEach((word)=>{rtn[word]=true;});
		return rtn;
	},
	flagsToClassNames:(flags)=>{
		if(undefined === flags){return '';}
		return Object.keys(flags).filter((word)=>flags[word]).map(camelToKebab).join(' ');
	},
	
	filterFlags:(flags,callback)=>{
		Object.keys(flags).forEach((key)=>{
			if(!callback(key)){delete(flags[key]);}
		});
		return flags;
	},
	
	/*proxy*/
	finderProxy:(obj)=>new Proxy(obj,CP.finderProxyHandler),
	finderProxyHandler:{
		get:(obj,prop)=>{
			if(prop === 'isFinderProxy'){return true;}
			if(prop === 'finderProxyTarget'){return obj;}
			var rtn;
			if(Array.isArray(obj) && !(/^\d+$/.test(prop))){
				rtn=obj.find((item)=>(typeof item === 'object') && item.hasOwnProperty('name') && item.name===prop);
				if(!rtn && prop in obj){return obj[prop];}
			}
			else{
				rtn=obj[prop];
			}
			if(typeof rtn === 'object'){return new Proxy(rtn,CP.finderProxyHandler);}
			return rtn;
		},
		set:(obj,prop,val)=>{
			if(typeof val === 'object' && val.isFinderProxy){val=val.finderProxyTarget;}
			if(Array.isArray(obj) && !(/^\d+$/.test(prop)) && !(prop in obj)){
				if(typeof val !== 'object'){return false;}
				val.name=prop;
				const index=obj.findIndex((item)=>(typeof item === 'object') && item.hasOwnProperty('name') && item.name===prop);
				if(index<0){obj.push(val);}
				else{obj[index]=val;}
			}
			else{
				obj[prop]=val;
			}
			return true;
		},
		deleteProperty:(obj,prop)=>{
			if(Array.isArray(obj) && !(/^\d+$/.test(prop))){
				prop=obj.findIndex((item)=>item === prop || (typeof item === 'object') && item.hasOwnProperty('name') && item.name===prop);
				if(prop<0){return;}
			}
			delete obj[prop];
		}
	},
	
	parseSelections:(sels)=>{
		let options,values;
		if(Array.isArray(sels)){
			values=sels;
			options=sels.map(cls=>{return {label:cls,value:cls};});
		}
		else{
			values=Object.keys(sels);
			options=values.map((cls)=>{return {label:sels[cls],value:cls};});
		}
		return {options,values};
	},
	
	createBlocks:(blocks)=>{
		return blocks.map((block)=>{
			if(block[2]){block[2]=CP.createBlocks(block[2]);}
			return wp.blocks.createBlock(...block);
		});
	},
	
	devices:Catpow.util.devices,
	getImageSizesForDevices:(devices)=>{
		return Object.keys(CP.devices).filter((device=>devices.includes(device)))
			.map((device)=>CP.devices[device].sizes).join(',');
	},
	getPictureSoucesAttributes:(selector)=>{
		return {
			source:'query',
			selector:(selector || 'picture')+' source',
			query:{
				srcset:{source:'attribute',attribute:'srcset'},
				device:{source:'attribute','attribute':'data-device'}
			}
		}
	},
	getPictureSoucesAttributesForDevices:(devices,selector,image)=>{
		let attr=CP.getPictureSoucesAttributes(selector);
		attr.default=CP.getPictureSoucesAttributesDefaultValueForDevices(devices,image);
		return attr;
	},
	getPictureSoucesAttributesDefaultValueForDevices:(devices,image)=>{
		return devices.map((device)=>({srcset:wpinfo.theme_url+'/images/'+(image || 'dummy.jpg'),device}));
	},
	getMediaQueryKeyForDevice:(device)=>{
		if(!CP.devices[device].media_query){return 'default';}
		return CP.devices[device].media_query.slice(1,-1);
	},
	
	translateCssVal:(type,val)=>{
		switch(type){
			case 'background-size':
				switch(val){
					case 'c':return 'cover';
					case 'i':return 'contain';
					case 'f':return '100% 100%';
					default:return val;
				}
			case 'background-repeat':
				switch(val){
					case 'n':return 'no-repeat';
					case 'x':
					case 'y':return 'repeat-'+val;
					default:return val;
				}
		}
	},
	
	/*datalist*/
	getDataListId(name,values){
		const id='datalist-'+name;
		if(!document.getElementById(id)){
			if(!values){
				if(!CP.dataListPresets.hasOwnProperty(name)){return null;}
				values=CP.dataListPresets[name];
			}
			const datalist=document.createElement('datalist');
			datalist.id=id;
			values.forEach((value)=>{
				const option=document.createElement('option');
				option.value=value;
				datalist.appendChild(option);
			});
			document.body.appendChild(datalist);
		}
		return id;
	},
	dataListPresets:{
		currency:['AUD','CAD','CNY','DKK','HKD','INR','IDR','JPY','KRW','MYR','NOK','PHP','RUB','SGD','VND','SEK','CHF','THB','GBP','USD','TWD','EUR','BRL'],
		mouseEvent:[
			'click','dblclick','mouseup','mousedown','mouseenter','mouseleave','mouseover','mouseout','contextmenu'
		],
		playerEvent:[
			'canplay','canplaythrough','complete','durationchange',
			'emptied','ended','loadeddata','loadedmetadata',
			'pause','play','playing','progress','ratechange',
			'seeked','seeking','stalled','suspend','timeupdate','volumechange','waiting'
		]
	},
	
	/*richtext helper*/
	getSelecedFormatElement:()=>{
		const sel=window.getSelection();
		if(!sel.rangeCount)return null;
		const con=sel.getRangeAt(0).startContainer;
		return con.nextElementSibling || con.parentElement;
	},
	
	/*event*/
	extractEventDispatcherAttributes:(blockTypeName,item)=>{
		const blockType=wp.data.select('core/blocks').getBlockType(blockTypeName);
		const eventDispatcherAttributes={};
		if(blockType.attributes.items.eventDispatcherAttributes){
			blockType.attributes.items.eventDispatcherAttributes.map((attr_name)=>{
				eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute]=item[attr_name];
			});
		}
		return eventDispatcherAttributes;
	},
	
	/*color inherit*/
	inheritColor:(props,images)=>{
		const {attributes,className,setAttributes,context}=props;
		const {setURLparams}=Catpow.util;
		const {classes,color}=attributes;
		const {useEffect,useMemo}=wp.element;
		const inheritColor=useMemo(()=>{
			return color === "0" || context['catpow/color'] === color;
		},[color,context['catpow/color']]);
		useEffect(()=>{
			if(inheritColor && context['catpow/color']!=="0"){setAttributes({color:context['catpow/color']});}
			setAttributes({inheritColor:color === context['catpow/color']});
		},[context['catpow/color']]);
		useEffect(()=>{
			const atts={
				classes:
					classes.split(' ')
					.filter(str=>!CP.colorToneClassPattern.test(str))
					.concat(CP.colorToneValueToClasses(color))
					.join(' ')
			};
			images.forEach((key)=>{
				if(!attributes[key]){return;}
				if(attributes[key].indexOf('url(')!==-1){
					atts[key]=attributes[key].replace(/url\((.+?)\)/,(m,p1)=>'url('+setURLparams(p1,{c:color,theme:wpinfo.theme})+')');
					return;
				}
				atts[key]=setURLparams(attributes[key],{c:color,theme:wpinfo.theme});
			});
			setAttributes(atts);
		},[color]);
	},
	extractColorToneValue:(classes)=>CP.generateColorToneValue(CP.extractColorToneValues(classes)),
	extractColorToneValues:(classes)=>{
		if(!Array.isArray(classes)){classes=classes.split(' ');}
		const rtn={};
		classes.find((c)=>{
			const matches=c.match(CP.colorToneClassPattern);
			if(matches){
				if(matches[1]){
					rtn.h=matches[2];
				}
				if(matches[5]){
					rtn[matches[7]]=matches[8];
				}
				return (
					rtn.hasOwnProperty('h') &&
					rtn.hasOwnProperty('s') &&
					rtn.hasOwnProperty('l')
				);
			}
			return false;
		});
		return rtn;
	},
	parseColorToneValue:(value)=>{
		if(value){
			const matches=value.match(CP.colorToneValuePattern);
			if(matches){
				return {h:matches[1],s:matches[5],l:matches[7]}
			}
		}
		return {h:'0'}
	},
	colorToneValueToClasses:(value)=>CP.generateColorToneClasses(CP.parseColorToneValue(value)),
	generateColorToneValue:(values)=>(values.h || '0')+(values.s?'s'+values.s:'')+(values.l?'l'+values.l:''),
	generateColorToneClasses:(values)=>{
		const classes=[];
		if(values.h){classes.push('color'+values.h);}
		if(values.s){classes.push('tone-s'+values.s);}
		if(values.l){classes.push('tone-l'+values.l);}
		return classes;
	},
	colorToneValuePattern:/^((|_|\-\-)(\-?\d+))?(s(\-?\d+))?(l(\-?\d+))?$/,
	colorToneClassPattern:/^(color((|_|\-\-)(\-?\d+)))|(tone\-((s|l)(\-?\d+)))$/,
	parseColorClass:(colorClass)=>{
		if(colorClass){
			const matches=colorClass.match(CP.colorClassPattern);
			if(matches){
				return {
					fixed:matches[2]==='--',
					absolute:matches[2]==='',
					relative:matches[2]==='_',
					value:matches[3]
				};
			}
		}
		return {fixed:false,absolute:false,relative:false,value:0};
	},
	generateColorClass:(data)=>'color'+(data.fixed?'--':(data.relative?'_':''))+data.value,
	colorClassPattern:/^color((|_|\-\-)(\-?\d+))$/,
	parseToneClass:(toneClass)=>{
		if(toneClass){
			const matches=toneClass.match(CP.toneClassPattern);
			if(matches){
				return {
					s:matches[2]==='s',
					l:matches[2]==='l',
					value:matches[3]
				};
			}
		}
		return {s:false,l:false,value:0};
	},
	generateToneClass:(data)=>'tone-'+(data.s?'s':'l')+data.value,
	toneClassPattern:/^tone\-((s|l)(\-?\d+))$/,
	colorClassProxy:(state)=>{
		if(!state){state={};}
		if(typeof state === 'string' || Array.isArray(state)){
			state=CP.wordsToFlags(state);
		}
		return new Proxy(state,CP.colorClassProxyHandler);
	},
	colorClassProxyHandler:{
		get(state,prop){
			switch(prop){
				case 'classes':{
					return CP.flagsToWords(state);
				}
				case 'value':{
					return CP.extractColorToneValue(Object.keys(state).filter((c)=>state[c]));
				}
				case 'h':{
					return Object.keys(state).find((c)=>CP.colorClassPattern.test(c));
				}
				case 's':
				case 'l':{
					return Object.keys(state).find((c)=>{
						const match=c.match(CP.toneClassPattern);
						return match && match[2]===prop;
					});
				}
			}
			return Reflect.get(...arguments);
		},
		set(state,prop,val){
			switch(prop){
				case 'state':{
					return state;
				}
				case 'h':
				case 's':
				case 'l':{
					if(prop==='h'){
						CP.filterFlags(state,(c)=>!CP.colorClassPattern.test(c));
					}
					else{
						CP.filterFlags(state,(c)=>{
							const match=c.match(CP.toneClassPattern);
							return !(match && match[2]===prop);
						});
					}
					if(val){state[val]=true;}
					return;
				}
			}
			return Reflect.set(...arguments);
		}
	},
	/*id reflection*/
	manageStyleData:(props,csss)=>{
		const {attributes,className,setAttributes}=props;
		const {anchor,prevAnchor,styleDatas}=attributes;
		const {useEffect}=wp.element;
		
		useEffect(()=>{
			if(!anchor){setAttributes({anchor:'s'+(new Date().getTime().toString(16))})}
			if(undefined === styleDatas){
				const styleDatas={};
				csss.forEach((key)=>{
					styleDatas[key]=CP.parseStyleCodeWithMediaQuery(attributes[key]);
				});
				setAttributes({styleDatas});
			}
		},[]);
		useEffect(()=>{
			if(anchor && anchor.length>2){
				if(document.querySelectorAll('#'+anchor).length>1){
					setAttributes({anchor:'s'+(new Date().getTime().toString(16))})
				}
				const atts={};
				atts.prevAnchor=anchor;
				atts.styleDatas={};
				csss.forEach((key)=>{
					if(!attributes[key]){return;}
					atts[key]=attributes[key].replace('#'+prevAnchor,'#'+anchor);
					atts.styleDatas[key]=CP.parseStyleCodeWithMediaQuery(atts[key]);
				});
				setAttributes(atts);
			}
		},[anchor]);
	}
};
CP.example={
	attributes:{
		title:[CP.dummyText.title],
		headerText:[CP.dummyText.title],
		footerText:[CP.dummyText.footer],
		read:[CP.dummyText.lead],
		text:[CP.dummyText.text],
	},
	innerBlocks: [
		{
			name: 'core/paragraph',
			attributes:{
				content: CP.dummyText.text
			}
		}
	]
};
window.CP=CP;
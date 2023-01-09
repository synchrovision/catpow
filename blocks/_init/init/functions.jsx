const CP={
	filters:{},
	cache:{},
	config:{},
	
	listedConvertibles:['catpow/listed','catpow/flow','catpow/faq','catpow/ranking','catpow/dialog','catpow/sphere','catpow/slider','catpow/banners','catpow/lightbox','catpow/panes'],
	tableConvertibles:['catpow/simpletable','catpow/datatable','catpow/layouttable'],
	
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
				devices.map((device)=>{
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
		let i=classArray.findIndex(cls=>(cls.substr(0,label.length)===label));
		if(i===-1){if(value){classArray.push(label+value);}}
		else{if(value){classArray.splice(i,1,label+value);}else{classArray.splice(i,1)}}
		set({classes:classArray.join(' ')});
	},
	getNumberClass:({attr},label)=>{
		let value=(attr.classes || '').split(' ').find(cls=>(cls.substr(0,label.length)===label));
		if(!value){return 0;}
		return parseInt(value.substr(label.length));
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
		values.map((val)=>{
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
		prms.map((prm)=>{
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
						Object.keys(prm.sub).map((key)=>{
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
		values.map((val)=>{
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
		jQuery(window.getSelection().anchorNode).closest(tag).prev().find('[contentEditable]').get(0).focus();
	},
	selectNextItem:(tag)=>{
		jQuery(window.getSelection().anchorNode).closest(tag).next().find('[contentEditable]').get(0).focus();
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
		var {tag,items,index}=props;
		if(!items[index-1])return false;
		items.splice(index-1,2,items[index],items[index-1]);
		CP.saveItem(props);
		CP.selectPrevItem(tag);
	},
	downItem:(props)=>{
		var {tag,items,index}=props;
		if(!items[index+1])return false;
		items.splice(index,2,items[index+1],items[index]);
		CP.saveItem(props);
		CP.selectNextItem(tag);
	},
	
	switchItemColor:({items,index,set},color,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=(items[index].classes || '').split(' ');
		let i=classArray.findIndex(cls=>(cls.substr(0,5)==='color'));
		if(i===-1){if(color){classArray.push('color'+color);}}
		else{if(color){classArray.splice(i,1,'color'+color);}else{classArray.splice(i,1)}}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemColor:({items,index})=>{
		let c=(items[index].classes || '').split(' ').find(cls=>(cls.substr(0,5)==='color'));
		if(!c){return 0;}
		return parseInt(c.substr(5));
	},
	
	switchItemPattern:({items,index,set},pattern,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=(items[index].classes || '').split(' ');
		let i=classArray.findIndex(cls=>(cls.substr(0,7)==='pattern'));
		if(i===-1){if(pattern){classArray.push('pattern'+pattern);}}
		else{if(pattern){classArray.splice(i,1,'pattern'+pattern);}else{classArray.splice(i,1)}}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemPattern:({items,index})=>{
		let p=(items[index].classes || '').split(' ').find(cls=>(cls.substr(0,7)==='pattern'));
		if(!p){return 0;}
		return parseInt(p.substr(7));
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
		css.replace('&amp;','&').split(';').map((pair)=>{
			const match=pair.match(/^([^:]+?):(.+)$/);
			if(!match){return;}
			obj[match[1]]=match[2];
		});
		return obj;
	},
	createStyleString:(data)=>{
		if(!data){return '';}
		return Object.keys(data).map((key)=>{
			return key+':'+data[key]+';';
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
		words.split(' ').map((word)=>{rtn[word]=true;});
		return rtn;
	},
	flagsToWords:(flags)=>{
		if(undefined === flags){return '';}
		return Object.keys(flags).filter((word)=>flags[word]).join(' ');
	},
	
	filterFlags:(flags,callback)=>{
		Object.keys(flags).map((key)=>{
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
			return createBlock(...block);
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
	
	selectiveClassesPreset:{
		isTemplate:{
			label:'テンプレート',
			values:'isTemplate',
			sub:[
				{input:'bool',label:'ループ',key:'doLoop',sub:[
					{label:'content path',input:'text',key:'content_path'},
					{label:'query',input:'textarea',key:'query'},
					{label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
				]}
			]
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
			values.map((value)=>{
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
	
	/*color inherit*/
	inheritColor:(props,images)=>{
		const {attributes,className,setAttributes,context}=props;
		const {setURLparams}=Catpow.util;
		const {classes,color,inheritColor}=attributes;
		const {useEffect}=wp.element;
		if(undefined === inheritColor){
			setAttributes({inheritColor:color === "0" || context['catpow/color'] === color})
		}
		wp.element.useEffect(()=>{
			if(inheritColor && context['catpow/color']!=="0"){setAttributes({color:context['catpow/color']});}
			setAttributes({inheritColor:color === context['catpow/color']});
		},[context['catpow/color']]);
		wp.element.useEffect(()=>{
			const atts={
				inheritColor:color==context['catpow/color'],
				classes:classes.replace(/color\d+\s*/,'')+' color'+color
			};
			images.map((key)=>{
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
	
	/*id reflection*/
	manageStyleData:(props,csss)=>{
		const {attributes,className,setAttributes}=props;
		const {id,prevId,styleDatas}=attributes;
		const {useEffect}=wp.element;
		
		if(!id){setAttributes({id:'s'+(new Date().getTime().toString(16))})}
		if(undefined === styleDatas){
			const styleDatas={};
			csss.map((key)=>{
				styleDatas[key]=CP.parseStyleCodeWithMediaQuery(attributes[key]);
			});
			setAttributes({styleDatas});
		}
		wp.element.useEffect(()=>{
			if(id && id.length>2){
				if(document.querySelectorAll('#'+id).length>1){
					setAttributes({id:'s'+(new Date().getTime().toString(16))})
				}
				const atts={};
				atts.prevId=id;
				atts.styleDatas={};
				csss.map((key)=>{
					if(!attributes[key]){return;}
					atts[key]=attributes[key].replace('#'+prevId,'#'+id);
					atts.styleDatas[key]=CP.parseStyleCodeWithMediaQuery(atts[key]);
				});
				setAttributes(atts);
			}
		},[id]);
	},
	
	/*compornents*/
	SelectThemeColor:(props)=>{
		const {selected,onChange}=props;

		var items=Array.from(Array(13),(v,i)=>{
			var classes='fillColor'+i;
			const value='color'+i;
			if(value==selected){classes+=' active';}
			return (
				<li
					className={classes}
					onClick={()=>onChange(value)}
				> </li>
			);
		});

		return (
			<ul class="selectColor">{items}</ul>
		);
	},
	SelectColors:(props)=>{
		const {useState,useRef}=wp.element;
		const {ColorPicker,ColorPalette,Popover}=wp.components;
		const {onChange}=props;
		const [index,setIndex]=useState(-1);
		
		const colorValues=props.colors.map((color)=>{
			if(typeof color === 'string'){
				return color;
			}
			if('h' in color){
				if('a' in color){return `hsla(${color.h},${color.s},${color.l},${color.a})`;}
				return `hsl(${color.h},${color.s},${color.l})`;
			}
			if('a' in color){return `rgba(${color.r},${color.g},${color.b},${color.a})`;}
			return `rgba(${color.r},${color.g},${color.b})`;
		});
		const colors=colorValues.map((color)=>{
			return {name:color,color};
		});
		
		return (
			<div>
				<ColorPalette
					colors={colors}
					color={index>-1 && colors[index].color}
					onChange={(colorValue)=>{
						setIndex(colorValues.indexOf(colorValue));
					}}
				/>
				{index>-1 && (
					<Popover>
						<ColorPicker
							color={colors[index].color}
							onChangeComplete={(value)=>{
								colors[index].color=value.hex;
								onChange(index,value);
							}}
						/>
					</Popover>
				)}
			</div>
		);
	},
	SelectButtons:(props)=>{
		const {BaseControl,Button,ButtonGroup}=wp.components;
		return (
			<BaseControl label={props.label} help={props.help} id={'CP-SelectButtons-'+wp.compose.useInstanceId(CP.SelectButtons)}>
				<div className="selectButtons">
					<ButtonGroup>
						{props.options.map((option)=>(
							<Button
								onClick={()=>props.onChange(option.value)}
								isPrimary={props.selected===option.value}
							>{option.label}</Button>
						))}
					</ButtonGroup>
				</div>
			</BaseControl>
		);
	},
	SelectGridButtons:(props)=>{
		const {BaseControl}=wp.components;
		const maxStrlen=props.options.reduce((acc,cur)=>Math.max(acc,cur.label.length+cur.label.replace(/[ -~]+/,'').length),3);
		const colNum=Math.min(6,Math.floor(36/(maxStrlen+2)));
		return (
			<BaseControl label={props.label} help={props.help} id={'CP-SelectGridButtons-'+wp.compose.useInstanceId(CP.SelectGridButtons)}>
				<ul className={"selectGridButtons col"+colNum}>
					{props.options.map((option)=>(
						<li
							onClick={()=>props.onChange(option.value)}
							className={'item'+((props.selected===option.value)?' active':'')}
						>{option.label}</li>
					))}
				</ul>
			</BaseControl>
		);
	
	},
	
	SelectResponsiveImage:(props)=>{
		const {className,attr,set,keys={},index,size,devices,device,isTemplate,...otherProps}=props;
		let {sizes}=props;
		let type,onClick,item,items;
		if(keys.items){
			items=attr[keys.items];
			if(keys.subItems){
				item=items[index][keys.subItems][subIndex];
			}
			else{
				item=items[index];
			}
		}
		else{
			item=attr;
		}
		if(device){
			const sizeData=CP.devices[device];
			onClick=(e)=>CP.selectImage({src:'src'},function({src}){
				if(keys.sources){
					item[keys.sources].map((source)=>{
						if(source.device===device){source.srcset=src;}
						return source;
					});
					if(items){
						set({[keys.items]:JSON.parse(JSON.stringify(items))});
					}
					else{
						set({[keys.sources]:JSON.parse(JSON.stringify(item[keys.sources]))});
					}
				}
				else{
					if(items){
						item[keys.srcset]=item[keys.srcset].replace(sizeData.reg,src+sizeData.rep);
						set({[keys.items]:JSON.parse(JSON.stringify(items))});
					}
					else{
						set({[keys.srcset]:item[keys.srcset].replace(sizeData.reg,src+sizeData.rep)});
					}
				}
			},sizeData.media_size);
		}
		else{
			onClick=(e)=>CP.selectImage(keys,function(data){
				if(keys.items){
					Object.assign(item,data);
					set({[keys.items]:JSON.parse(JSON.stringify(items))});
				}
				else{
					set(data);
				}
			},size,devices);
		}
		if(isTemplate && keys.code && item[keys.code]){
			return <CP.DummyImage text={item[keys.code]}/>;
		}
		if(item[keys.mime]){type=item[keys.mime].split('/')[0];}
		else{type='image';}
		if(type=='audio'){
			return (
				<audio
					className={'selectImage '+className}
					src={item[keys.src]}
					data-mime={item[keys.mime]}
					onClick={onClick}
					{...otherProps}
					></audio>
			);
		}
		if(item[keys.srcset] && !sizes){
			if(device){
				sizes=CP.devices[device].sizes_value;
			}
			else{
				sizes=CP.getImageSizesForDevices(devices || ['sp','pc']);
			}
		}
		if(type=='video'){
			return (
				<video
					className={'selectImage '+className}
					src={item[keys.src]}
					data-mime={item[keys.mime]}
					onClick={onClick}
					autoplay={1}
					loop={1}
					playsinline={1}
					muted={1}
					{...otherProps}
					></video>
			);
		}
		var src=CP.imageSrcOrDummy(item[keys.src]);
		if(keys.sources){
			if(device){
				const source=item[keys.sources].find((source)=>source.device===device) || {srcset:wpinfo.theme_url+'/images/dummy.jpg'};
				return (
					<picture
						className={'selectImage '+className}
						onClick={onClick}
						{...otherProps}
					>
						<img
							src={source.srcset}
							alt={item[keys.alt]}
						/>
					</picture>
				);
			}
			return (
				<picture
					className={'selectImage '+className}
					onClick={onClick}
					{...otherProps}
				>
					{item[keys.sources].map((source)=>(
						<source srcset={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device}/>
					))}
					<img
						src={src}
						alt={item[keys.alt]}
					/>
				</picture>
			);
		}
		return (
			<img
				className={'selectImage '+className}
				src={src}
				alt={item[keys.alt]}
				srcset={item[keys.srcset]}
				sizes={sizes}
				data-mime={item[keys.mime]}
				onClick={onClick}
				{...otherProps}
			/>
		);
	},
	ResponsiveImage:({className,attr,keys,index,sizes,devices,device,isTemplate})=>{
		let type,item;
		if(keys.items){item=attr[keys.items][index];}
		else{item=attr;}
		if(isTemplate && keys.code && item[keys.code]){
			return item[keys.code];
		}
		if(item[keys.mime]){type=item[keys.mime].split('/')[0];}
		else{type='image';}
		if(type=='audio'){
			return (
				<audio
					src={item[keys.src]}
					data-mime={item[keys.mime]}
					></audio>
			);
		}
		if(item[keys.srcset] && !sizes){
			devices=devices || ['sp','pc'];
			sizes=CP.getImageSizesForDevices(devices);
		}
		if(type=='video'){
			return (
				<video
					className={className}
					src={item[keys.src]}
					srcset={item[keys.srcset]}
					sizes={sizes}
					data-mime={item[keys.mime]}
					autoplay={1}
					loop={1}
					playsinline={1}
					muted={1}
					></video>
			);
		}
		if(keys.sources && item[keys.sources] && item[keys.sources].length){
			if(device){
				const source=item[keys.sources].find((source)=>source.device===device);
				return (
					<picture className={'selectImage '+className}>
						<img
							src={source.srcset}
							alt={item[keys.alt]}
						/>
					</picture>
				);
			}
			return (
				<picture className={'selectImage '+className}>
					{item[keys.sources].map((source)=>(
						<source srcset={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device}/>
					))}
					<img
						src={item[keys.src]}
						alt={item[keys.alt]}
					/>
				</picture>
			);
		}
		return (
			<img
				className={className}
				src={item[keys.src]}
				alt={item[keys.alt]}
				srcset={item[keys.srcset]}
				sizes={sizes}
				data-mime={item[keys.mime]}
			/>
		);
	},
	SelectPictureSources:(props)=>{
		const {devices}=props;
		return (
			<table className="SelectPictureSources">
				<tbody>
					<tr>
						<td colspan={devices.length}>
							<CP.SelectResponsiveImage {...props}/>
						</td>
					</tr>
					<tr>
					{devices.map((device)=>(
						<td key={device}>
							<div className="label">
								<Icon icon={CP.devices[device].icon}/>
							</div>
							<CP.SelectResponsiveImage
								device={device}
								{...props}
							/>
						</td>
					))}
					</tr>
				</tbody>
			</table>
		);
	},

	SelectPreparedImage:({className,name,value,color,onChange,...otherProps})=>{
		let onClick;
		const {getURLparam,setURLparam,setURLparams,removeURLparam}=Catpow.util;
		const [state,dispatch]=wp.element.useReducer((state,action)=>{
			switch(action.type){
				case 'nextPage':state.page--;break;
				case 'prevPage':state.page++;break;
				case 'gotoPage':state.page=action.page;break;
				case 'update':
					if(action.images){
						state.images=action.images;
						const bareURL=removeURLparam(value,'c');
						state.image=state.images.find((image)=>image.url===bareURL);
					}
					if(action.image){state.image=action.image;}
					onChange({...state.image,url:setURLparams(state.image?state.image.url:value,{c:color,theme:wpinfo.theme})});
			}
			return {...state};
		},{page:0,images:null,image:null});

		CP.cache.PreparedImage=CP.cache.PreparedImage || {};

		if(state.images===null){
			if(CP.cache.PreparedImage[name]){
				dispatch({type:'update',images:CP.cache.PreparedImage[name]});
			}
			else{
				wp.apiFetch({path:'cp/v1/images/'+name}).then((images)=>{
					CP.cache.PreparedImage[name]=images;
					dispatch({type:'update',images});
				});
			}
			return false;
		}
		return (
			<ul className={'selectPreparedImage '+name+' '+className} {...otherProps}>
				{state.images.map((image)=>{
					const url=setURLparams(image.url,{c:color,theme:wpinfo.theme});
					return (
						<li className={'item '+((value==url)?'active':'')} key={image.url}>
							<img
								src={url}
								alt={image.alt}
								onClick={()=>dispatch({type:'update',image})}
							/>
						</li>
					);
				})}
			</ul>
		);
	},
	SelectPreparedImageSet:({className,name,value,color,onChange,...otherProps})=>{
		let onClick;
		const {getURLparam,setURLparam,setURLparams,removeURLparam}=Catpow.util;
		const [state,dispatch]=wp.element.useReducer((state,action)=>{
			switch(action.type){
				case 'update':
					if(action.imagesets){
						state.imagesets=action.imagesets;
						const bareURL=removeURLparam(value,'c');
						for(const key in state.imagesets){
							if(state.imagesets[key].url===bareURL){
								state.imageset=state.imagesets[key];
								break;
							}
						}
					}
					if(action.imageset){state.imageset=action.imageset;}
					if(state.imageset){
						onChange(state.imageset.map((item)=>{
							return {...item,url:setURLparams(item.url,{c:color,theme:wpinfo.theme})};
						}));
					}
			}
			return {...state};
		},{page:0,imagesets:null,imageset:null});

		CP.cache.PreparedImageSets=CP.cache.PreparedImageSets || {};

		if(state.imagesets===null){
			if(CP.cache.PreparedImageSets[name]){
				dispatch({type:'update',imagesets:CP.cache.PreparedImageSets[name]});
			}
			else{
				wp.apiFetch({path:'cp/v1/imageset/'+name}).then((imagesets)=>{
					CP.cache.PreparedImageSets[name]=imagesets;
					dispatch({type:'update',imagesets});
				});
			}
			return false;
		}
		return (
			<ul className={'selectPreparedImageSet '+name+' '+className} {...otherProps}>
				{Object.keys(state.imagesets).map((key)=>{
					const imageset=state.imagesets[key];
					const url=setURLparams(imageset[0].url,{c:color,theme:wpinfo.theme});
					return (
						<li className={'item '+((value==url)?'active':'')} key={key}>
							<img
								src={url}
								alt={imageset[0].alt}
								onClick={()=>dispatch({type:'update',imageset})}
							/>
						</li>
					);
				})}
			</ul>
		);
	},
	
	InputIcon:(props)=>{
		return wp.element.createElement(CP[wp.hooks.applyFilters('catpow.IconComponent','StandardIcon')].Input,props);
	},
	OutputIcon:(props)=>{
		return wp.element.createElement(CP[wp.hooks.applyFilters('catpow.IconComponent','StandardIcon')].Output,props);
	},
	StandardIcon:{
		Input:(props)=>{
			const {item,prm,save}=props;
			prm.keys=prm.keys || {};
			prm.keys.src=prm.keys.src || prm.input+'Src';
			prm.keys.alt=prm.keys.alt || prm.input+'Alt';
			return (
				<CP.SelectPreparedImage
					name={prm.input}
					value={item[prm.keys.src]}
					color={prm.color || CP.getColor({attr:item}) || 0}
					onChange={(image)=>{
						save({
							[prm.keys.src]:image.url,
							[prm.keys.alt]:image.alt,
						});
					}}
				/>
			);
		},
		Output:(props)=>{
			const {item}=props;
			return (
				<span className="icon">
					<img src={item.iconSrc} alt={item.iconAlt}/>
				</span>
			)
		}
	},
	
	DataInputTable:(props)=>{
		const {cols,value,onChange}=props;
		const {useCallback,useMemo}=wp.element;
		const el=wp.element.createElement;
		const Row=useCallback((props)=>{
			const {cols,value,onChange}=props;
			return (
				<tr className="DataInputTable__body__row">
				{Object.keys(cols).map((c)=>(
					<td className="DataInputTable__body__row__cell" key={c}>
						<CP.DynamicInput
							value={value[c]}
							onChange={(val)=>{
								value[c]=val;
								onChange(value);
							}}
							param={cols[c]}
						/>
					</td>
				))}
				</tr>
			);
		},[]);
		const defaultRowValues=useMemo(()=>{
			const rowValue={};
			Object.keys(cols).map((c)=>{
				rowValue[c]=cols[c].default || '';
			});
			return [rowValue];
		},[cols]);
		const colsWithoutLabel=useMemo(()=>{
			const colsWithoutLabel={};
			Object.keys(cols).map((c)=>{
				const {label,...otherParams}=cols[c];
				colsWithoutLabel[c]=otherParams;
			});
			return colsWithoutLabel;
		},[cols]);
		
		return (
			<table className="DataInputTable">
				<thead class="DataInputTable__head">
					<tr class="DataInputTable__head__row">
					{Object.keys(cols).map((c)=>(
						<th className="DataInputTable__head__row__cell" key={c}>{cols[c].label || c}</th>
					))}
					</tr>
				</thead>
				<tbody class="DataInputTable__body">
				{(value || defaultRowValues).map((rowValue,index)=>(
					<Row
						cols={colsWithoutLabel}
						value={rowValue}
						onChange={(rowValue)=>{
							if(!value){onChange([rowValue]);return;}
							value[index]=rowValue;
							onChange(value);
						}}
						onDelete={()=>{
							if(!value){onChange([]);return;}
							value.splice(index,1);
							onChange(value);
						}}
						onClone={()=>{
							if(!value){onChange([defaultRowValues]);return;}
							value.splice(index,0,JSON.parse(JSON.stringify(rowValue)));
							onChange(value);
						}}
						key={index}
					/>
				))}
				</tbody>
			</table>
		);
	},
	DynamicInput:(props)=>{
		const {useMemo}=wp.element;
		const {TextControl,TextareaControl,SelectControl,ToggleControl,RangeControl}=wp.components;

		const {param,value,onChange}=props;
		const type=param.type || param.input || 'text';
		const {options}=useMemo(()=>{
			if(!param.options && !param.values){return {};}
			return CP.parseSelections(param.options || param.values);
		},[param.options,param.values]);

		switch(type){
			case 'radio':{
				return (
					<RadioControl
						label={param.label || null}
						onChange={onChange}
						selected={value}
						options={options}
					/>
				);
			}
			case 'select':{
				return (
					<SelectControl
						label={param.label || null}
						onChange={onChange}
						value={value}
						options={options}
					/>
				);
			}
			case 'buttons':{
				return (
					<CP.SelectButtons
						label={param.label || null}
						onChange={onChange}
						selected={value}
						options={options}
					/>
				);
			}
			case 'gridbuttons':{
				return (
					<CP.SelectGridButtons
						label={param.label || null}
						onChange={onChange}
						selected={value}
						options={options}
					/>
				);
			}
			case 'range':{
				if(!param.coef){param.coef=1;}
				return (
					<RangeControl
						label={param.label || null}
						onChange={(value)=>onChange(value*param.coef)}
						value={value/param.coef}
						min={param.min || 0}
						max={param.max || 10}
						step={param.step || 1}
					/>
				);
			}
			case 'bool':{
				return (
					<ToggleControl
						label={param.label || null}
						checked={value}
						onChange={onChange}
					/>
				);
			}
			case 'data':{
				return (
					<CP.DataInputTable
						label={param.label || null}
						cols={param.cols}
						value={value}
						onChange={onChange}
					/>
				)
			}
			case 'textarea':{
				return (
					<TextareaControl
						label={param.label || null}
						value={value}
						onChange={onChange}
					/>
				)
			}
			default:{
				return (
					<TextControl
						label={param.label || null}
						type={param.type}
						value={value}
						onChange={onChange}
						list={param.list && CP.getDataListId(param.list,param.values)}
					/>
				);
			}
		}
	},

	Item:(props)=>{
		const {tag,items,itemsKey,index,set,attr,triggerClasses,children}=props;
		let {itemClasses}=props;
		if(!items[index].classes){items[index].classes='item';}
		else if(items[index].classes.search(/\bitem\b/)===-1){items[index].classes+=' item';}
		let classes=items[index].classes;
		if(props.className){classes+=' '+props.className;}

		const {currentItemIndex=0}=attr;

		const isSelected=(props.isSelected === undefined)?(index==currentItemIndex):props.isSelected;

		return wp.element.createElement(
			tag,
			{
				className:classes,
				"data-index":index,
				"data-refine-cond":items[index]['cond'],
				onKeyDown:(e)=>{
					if((e.ctrlKey || e.metaKey)){
						switch(e.key){
							case 's':CP.saveItem(props);e.preventDefault();break;
							case 'd':CP.cloneItem(props);e.preventDefault();break;
							case 'Backspace':CP.deleteItem(props);e.preventDefault();break;
							case 'ArrowUp':CP.upItem(props);e.preventDefault();break;
							case 'ArrowDown':CP.downItem(props);e.preventDefault();break;
						}
					}
				},
				onClick:(e)=>{
					set({currentItemIndex:index});
				}
			},
			<>
				{children}
				{isSelected &&
					<div className='itemControl'>
						<div className='btn delete' onClick={(e)=>CP.deleteItem(props)}></div>
						<div className='btn clone' onClick={(e)=>CP.cloneItem(props)}></div>
						<div className='btn up' onClick={(e)=>CP.upItem(props)}></div>
						<div className='btn down' onClick={(e)=>CP.downItem(props)}></div>
					</div>
				}
			</>
		);
	},
	ItemControlInfoPanel:()=>{
		const {PanelBody}=wp.components;
		return (
			<PanelBody title="操作" initialOpen={false} icon="info">
				<table>
					<tbody>
						<tr>
							<th>⌘/Ctrl + S</th>
							<td>保存</td>
						</tr>
						<tr>
							<th>⌘/Ctrl + D</th>
							<td>複製</td>
						</tr>
						<tr>
							<th>⌘/Ctrl + delete</th>
							<td>削除</td>
						</tr>
						<tr>
							<th>⌘/Ctrl + ↑</th>
							<td>前のアイテムと入れ替え</td>
						</tr>
						<tr>
							<th>⌘/Ctrl + ↓</th>
							<td>次のアイテムと入れ替え</td>
						</tr>
					</tbody>
				</table>
			</PanelBody>
		);
	},

	SelectClassPanel:(props)=>{
		const {PanelBody,CheckboxControl,SelectControl,TextareaControl,TextControl,ColorPicker,__experimentalGradientPicker:GradientPicker}=wp.components;
		const {classKey='classes',items,index,subItemsKey,subIndex,set,attr,triggerClasses}=wp.hooks.applyFilters('catpow.SelectClassPanelProps',props);
		let {itemsKey,itemClasses}=props;
		let item;
		if(items){
			itemsKey=itemsKey || 'items';
			if(subItemsKey){
				if(!items[index]){return false;}
				item=items[index][subItemsKey][subIndex];
			}
			else{
				item=items[index];
			}

			if(!item){return false;}
		}
		else{
			item=attr;
		}
		let states=CP.wordsToFlags(item[classKey]);
		const {styleDatas}=attr;

		const save=(data)=>{
			if(items){
				Object.assign(item,data);
				set({[itemsKey]:JSON.parse(JSON.stringify(items))});
			}
			else{
				set(data);
			}
		}
		const saveClasses=()=>{
			save({[classKey]:CP.flagsToWords(states)});
		}
		const saveCss=(cssKey)=>{
			set({[cssKey]:CP.createStyleCodeWithMediaQuery(styleDatas[cssKey])});
		}

		const SelectClass=(prm)=>{
			if(prm.hasOwnProperty('cond')){
				if(prm.cond===false){return false;}
				if(Array.isArray(prm.cond) && prm.cond.some((className)=>!states[className])){return false;}
				if(typeof prm.cond === 'string' && !states[prm.cond]){return false;}
				if(typeof prm.cond === 'function' && !prm.cond(states,props)){return false;}
			}
			let rtn=[];
			if(prm.filter && props.filters && props.filters[prm.filter]){
				props.filters[prm.filter](prm);
			}
			if(prm.keys){
				if(items){
					prm.keys.items=prm.keys.items || itemsKey;
					if(subItemsKey){
						prm.keys.subItems=prm.keys.subItems || subItemsKey;
					}
				}
			}

			if(prm.json){
				if(prm.input){
					switch(prm.input){
						case 'select':
						case 'buttons':
						case 'gridbuttons':
						case 'bool':
						case 'range':
						case 'text':
						case 'textarea':{
							rtn.push(
								<CP.DynamicInput
									param={prm}
									value={JSON.parse(props.attr[prm.json])[prm.key]}
									onChange={(val)=>{
										CP.setJsonValue(props,prm.json,prm.key,val);
										if(prm.effect){prm.effect(val,states,props);}
									}}
								/>
							);
							break;
						}
						case 'flag':
							let value=CP.getJsonValue(props,prm.json,prm.key) || 0;
							if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
							Object.keys(prm.values).map((key)=>{
								rtn.push(
									<CheckboxControl
										label={key}
										onChange={(flag)=>{
											value |= prm.values[key];
											if(!flag){value^=prm.values[key];}
											CP.setJsonValue(props,prm.json,prm.key,value);
										}}
										checked={value & prm.values[key]}
										key={key}
									/>
								);
							});
							break;
						case 'color':
							if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
							rtn.push(
								<ColorPicker
									color={CP.getJsonValue(props,prm.json,prm.key) || '#FFFFFF'}
									onChangeComplete={(value)=>{
										CP.setJsonValue(props,prm.json,prm.key,value.hex);
									}}
								/>
							);
							break;
						case 'colors':
							if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
							rtn.push(
								<CP.SelectColors
									colors={CP.getJsonValue(props,prm.json,prm.key) || [{h:'40',s:'80%',l:'50%'},{h:'60',s:'80%',l:'50%'}]}
									onChange={(colors)=>{
										CP.setJsonValue(props,prm.json,prm.key,colors);
									}}
								/>
							);
							break;
						case 'gradient':
							if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
							rtn.push(
								<GradientPicker
									onChange={(value)=>{
										console.log(CP.parseGradientStyleValue(value));
									}}
								/>
							);
							break;
					}
					
					switch(prm.input){
						case 'select':
						case 'buttons':
						case 'gridbuttons':{
							if(prm.sub){
								if(prm.sub[JSON.parse(props.attr[prm.json])[prm.key]]){
									let sub=[];
									prm.sub[JSON.parse(props.attr[prm.json])[prm.key]].map((prm)=>{sub.push(SelectClass(prm))});
									rtn.push(<div className="sub">{sub}</div>);
								}
							}
							break;
						}
						case 'bool':{
							if(prm.sub){
								if(JSON.parse(props.attr[prm.json])[prm.key]){
									let sub=[];
									prm.sub.map((prm)=>{sub.push(SelectClass(prm))});
									rtn.push(<div className="sub">{sub}</div>);
								}
							}
							break;
						}
					}
				}
				else if(_.isObject(prm.values)){
					let {options,values}=CP.parseSelections(prm.values);
					rtn.push(
						<SelectControl
							label={prm.label}
							value={CP.getJsonValue(props,prm.json,prm.key)}
							onChange={(val)=>{CP.setJsonValue(props,prm.json,prm.key,val);}}
							options={options}
						/>
					);
					if(prm.sub){
						let currentValue=CP.getJsonValue(props,prm.json,prm.key);
						if(currentValue && prm.sub[currentValue]){
							let sub=[];
							prm.sub[currentValue].map((prm)=>{sub.push(SelectClass(prm))});
							rtn.push(<div className="sub">{sub}</div>);
						}
					}
				}
				else if(prm.values){
					rtn.push(
						<CheckboxControl
							label={prm.label}
							onChange={()=>{CP.switchJsonValue(props,prm.json,prm.key,prm.values);}}
							checked={CP.hasJsonValue(props,prm.json,prm.key,prm.values)}
						/>
					);
					if(prm.sub){
						if(CP.getJsonValue(props,prm.json,prm.key)){
							let sub=[];
							prm.sub.map((prm)=>{sub.push(SelectClass(prm))});
							rtn.push(<div className="sub">{sub}</div>);
						}
					}
				}
				else{
					rtn.push(
						<TextControl
							label={prm.label}
							value={JSON.parse(props.attr[prm.json])[prm.key]}
							onChange={(val)=>{CP.setJsonValue(props,prm.json,prm.key,val);}}
						/>
					);
				}
			}
			else if(prm.css){
				const {device='pc'}=prm;
				const media=CP.getMediaQueryKeyForDevice(device);
				const sel=(typeof prm.sel === 'function')?prm.sel(props):prm.sel;
				styleDatas[prm.css]=styleDatas[prm.css] || {};
				styleDatas[prm.css][media]=styleDatas[prm.css][media] || {};
				styleDatas[prm.css][media][sel]=styleDatas[prm.css][media][sel] || {};
				const tgt=styleDatas[prm.css][media][sel];
				if(prm.input){
					switch(prm.input){
						case 'border':
							rtn.push(
								<CP.SelectPreparedImage
									name="border"
									value={CP.getUrlInStyleCode(tgt['border-image'])}
									color={prm.color || 0}
									onChange={(image)=>{
										if(!image.conf){return;}
										const {slice,width,repeat}=image.conf;
										tgt['border-style']='solid';
										tgt['border-image']='url('+image.url+') fill '+slice+' / '+width+' '+repeat;
										saveCss(prm.css);
									}}
								/>
							);
							break;
						case 'pattern':
							rtn.push(
								<CP.SelectPreparedImage
									name="pattern"
									value={CP.getUrlInStyleCode(tgt['background-image'])}
									color={prm.color || 0}
									onChange={(image)=>{
										if(!image.conf){return;}
										const {size,width,height,repeat,x,y}=image.conf;
										tgt['background-image']='url('+image.url+')';
										if(width && height){tgt['background-size']=width+'px '+height+'px';}
										else if(size){tgt['background-size']=CP.translateCssVal('background-size',size);}
										else{delete tgt['background-size'];}
										if(repeat){tgt['background-repeat']=CP.translateCssVal('background-repeat',repeat);}
										else{delete tgt['background-repeat'];}
										if(x && y){tgt['background-position']=x+'% '+y+'%';}
										else{delete tgt['background-position'];}
										saveCss(prm.css);
									}}
								/>
							);
							break;
						case 'frame':
							rtn.push(
								<CP.SelectPreparedImageSet
									name="frame"
									value={CP.getUrlInStyleCode(tgt['border-image'])}
									color={prm.color || 0}
									onChange={(imageset)=>{
										imageset.map((image)=>{
											if(!image.conf){return;}
											const {device,slice,width,repeat}=image.conf;
											const media=CP.getMediaQueryKeyForDevice(device);
											styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
											styleDatas[prm.css][media][sel] = styleDatas[prm.css][media][sel] || {};
											styleDatas[prm.css][media][sel]['border-style']='solid';
											styleDatas[prm.css][media][sel]['border-image']='url('+image.url+') fill '+slice+' / '+width+' '+repeat;
										});
										saveCss(prm.css);
									}}
								/>
							);
							break;
					}
				}
				else{
					rtn.push(
						<TextControl
							label={prm.label}
							value={tgt[prm.attr]}
							onChange={(val)=>{
								tgt[prm.attr]=val;
								saveCss(prm.css);
							}}
						/>
					);
				}
			}
			else{
				if(prm === 'color'){
					rtn.push(
						<CP.SelectColorClass
							label='色'
							set={props.set}
							attr={props.attr}
							selected={Object.keys(states).find(key=>/^color\d+/.test(key))}
							onChange={(color)=>{
								CP.filterFlags(states,(key)=>!(/^color\d+/.test(key)));
								states[color]=true;
								if(!items){set({color:color.substr(5)});}
								saveClasses();
							}}
						/>
					);
				}
				else if(prm === 'pattern'){
					rtn.push(
						<CP.SelectPatternClass
							label='パターン'
							set={props.set}
							attr={props.attr}
							selected={Object.keys(states).find(key=>/^pattern\d+/.test(key))}
							onChange={(pattern)=>{
								CP.filterFlags(states,(key)=>!(/^pattern\d+/.test(key)));
								states[pattern]=true;
								saveClasses();
							}}
						/>
					);
				}
				else if(prm === 'cond'){
					rtn.push(
						<TextareaControl
							label='表示条件'
							value={item['cond']}
							onChange={(cond)=>save({cond})}
						/>
					);
				}
				else if(prm === 'event'){
					wp.hooks.applyFilters('catpow.EventInputs',[],{item,save}).map((EventInput)=>{rtn.push(EventInput);});
				}
				else if(prm.input){
					switch(prm.input){
						case 'select':
						case 'buttons':
						case 'gridbuttons':
						case 'bool':
						case 'range':
						case 'text':
						case 'textarea':{
							rtn.push(
								<CP.DynamicInput
									param={prm}
									value={item[prm.key]}
									onChange={(val)=>{
										save({[prm.key]:val});
										if(prm.effect){prm.effect(val,states,props);}
									}}
								/>
							);
							break;
						}
						case 'image':
							if(prm.label){
								rtn.push(<h5>{prm.label}</h5>);
							}
							rtn.push(
								<CP.SelectResponsiveImage
									index={index}
									set={props.set}
									attr={props.attr}
									keys={prm.keys}
									size={prm.size}
									sizes={prm.sizes}
									device={prm.device}
									devices={prm.devices}
									isTemplate={prm.isTemplate}
								/>
							);
							break;
						case 'picture':
							if(prm.label){
								rtn.push(<h5>{prm.label}</h5>);
							}
							rtn.push(
								<CP.SelectPictureSources
									index={index}
									set={props.set}
									attr={props.attr}
									keys={prm.keys}
									sizes={prm.sizes}
									devices={prm.devices}
									isTemplate={prm.isTemplate}
								/>
							);
							break;
						case 'position':
							rtn.push(
								<CP.SelectPositionClass
									set={props.set}
									attr={props.attr}
									label={prm.label}
									key={prm.key}
									help={prm.help}
									disable={prm.disable}
									itemsKey={itemsKey}
									index={index}
								/>
							);
						case 'icon':
							if(prm.label){
								rtn.push(<h5>{prm.label}</h5>);
							}
							rtn.push(<CP.InputIcon prm={prm} item={item} save={save}/>);
							break;
						case 'symbol':
						case 'pattern':
							prm.keys=prm.keys || {};
							prm.keys.src=prm.keys.src || prm.input+'Src';
							prm.keys.alt=prm.keys.alt || prm.input+'Alt';
							if(prm.label){
								rtn.push(<h5>{prm.label}</h5>);
							}
							rtn.push(
								<CP.SelectPreparedImage
									name={prm.input}
									value={item[prm.keys.src]}
									color={prm.color || CP.getColor({attr:item}) || 0}
									onChange={(image)=>{
										save({
											[prm.keys.src]:image.url,
											[prm.keys.alt]:image.alt,
										});
									}}
								/>
							);
							break;
					}
					switch(prm.input){
						case 'select':
						case 'buttons':
						case 'gridbuttons':
							if(prm.sub && prm.sub[item[prm.key]]){
								let sub=[];
								prm.sub[item[prm.key]].map((prm)=>{sub.push(SelectClass(prm))});
								rtn.push(<div className="sub">{sub}</div>);
							}
							break;
						case 'bool':
							if(prm.sub && item[prm.key]){
								let sub=[];
								prm.sub.map((prm)=>{sub.push(SelectClass(prm))});
								rtn.push(<div className="sub">{sub}</div>);
							}
							break;
					}

				}
				else if(_.isObject(prm.values)){
					let subClasses=CP.getSubClasses(prm);
					let bindClasses=CP.getBindClasses(prm);

					var {options,values}=CP.parseSelections(prm.values);
					const currentClass=values.find((value)=>states[value]);

					let onChangeCB=(newClass)=>{
						if(currentClass){
							states[currentClass]=false;

							let currentSels=[];
							if(subClasses[currentClass]){
								currentSels=currentSels.concat(subClasses[currentClass]);
							}
							if(bindClasses[currentClass]){
								currentSels=currentSels.concat(bindClasses[currentClass]);
							}

							let newSels=[];
							if(subClasses[newClass]){
								newSels=newSels.concat(subClasses[newClass]);
							}
							if(bindClasses[newClass]){
								newSels=newSels.concat(bindClasses[newClass]);
							}
							currentSels.map((value)=>{
								if(!newSels.includes(value)){states[value]=false;}
							});
						}
						bindClasses[newClass].map((value)=>{
							states[value]=true;
						});
						states[newClass]=true;

						saveClasses();
						if(prm.effect){prm.effect(currentClass,newClass,states,props);}
					};


					switch(prm.type){
						case 'radio':
							rtn.push(
								<RadioControl
									label={prm.label}
									onChange={onChangeCB}
									selected={currentClass}
									options={options}
								/>
							);
							break;
						case 'buttons':
							rtn.push(
								<CP.SelectButtons
									label={prm.label}
									onChange={onChangeCB}
									selected={currentClass}
									options={options}
								/>
							);
							break;
						case 'gridbuttons':
							rtn.push(
								<CP.SelectGridButtons
									label={prm.label}
									onChange={onChangeCB}
									selected={currentClass}
									options={options}
								/>
							);
							break;
						default:
							rtn.push(
								<SelectControl
									label={prm.label}
									onChange={onChangeCB}
									value={currentClass}
									options={options}
								/>
							);
					}


					if(prm.sub){
						let currentClass=CP.getSelectiveClass(props,prm.values,prm.key);
						if(currentClass && prm.sub[currentClass]){
							let sub=[];
							prm.sub[currentClass].map((prm)=>{sub.push(SelectClass(prm))});
							rtn.push(<div className="sub">{sub}</div>);
						}
					}
				}
				else{
					rtn.push(
						<CheckboxControl
							label={prm.label}
							onChange={()=>{
								states[prm.values]=!states[prm.values];
								saveClasses();
							}}
							checked={states[prm.values]}
						/>
					);
					if(prm.sub){
						if(states[prm.values]){
							let sub=[];
							prm.sub.map((prm)=>{sub.push(SelectClass(prm))});
							rtn.push(<div className="sub">{sub}</div>);
						}
					}
				}
			}
			return rtn;
		};
		if(triggerClasses && triggerClasses.item){
			const blockStates=CP.wordsToFlags(attr.classes);
			itemClasses=triggerClasses.item[Object.keys(triggerClasses.item).find((value)=>blockStates[value])];
			if(!itemClasses || Array.isArray(itemClasses) && itemClasses.length===0){return false;}
			return (
				<PanelBody title={props.title} initialOpen={props.initialOpen || false} icon={props.icon}>
					{itemClasses.map(SelectClass)}
				</PanelBody>
			);
		}
		return (
			<PanelBody title={props.title} initialOpen={props.initialOpen || false} icon={props.icon}>
				{props.selectiveClasses.map(SelectClass)}
				{props.children}
			</PanelBody>
		);
	},

	AlignClassToolbar:(props)=>{
		const {BlockAlignmentToolbar}=wp.blockEditor;
		const aligns=['left','center','right'];
		return (
			<BlockAlignmentToolbar
				value={CP.getSelectiveClass(props,aligns)}
				controls={props.aligns || aligns}
				onChange={(align)=>{CP.switchSelectiveClass(props,aligns,align,props.key)} }
			/>
		);
	},
	VerticalAlignClassToolbar:(props)=>{
		const {BlockVerticalAlignmentToolbar}=wp.blockEditor;
		const aligns=['top','center','bottom'];
		return (
			<BlockVerticalAlignmentToolbar
				value={CP.getSelectiveClass(props,aligns)}
				controls={props.aligns || aligns}
				onChange={(align)=>{CP.switchSelectiveClass(props,aligns,align,props.key)} }
			/>
		);
	},
	SelectColorClass:(props)=>{
		const {BaseControl}=wp.components;
		const {label,help}=props;

		return (
			<BaseControl label={label} help={help}>
				<CP.SelectThemeColor
					onChange={props.onChange}
					selected={props.selected}
				/>
			</BaseControl>
		);
	},
	SelectPatternClass:(props)=>{
		const {BaseControl}=wp.components;
		const {label,help,selected,onChange}=props;

		var items=Array.from(Array(6),(v,i)=>{
			var classes='bgPattern'+i;
			const value='pattern'+i;
			if(value==selected){classes+=' active';}
			return (
				<li
					className={classes}
					onClick={()=>onChange(value)}
				> </li>
			);
		});

		return (
			<BaseControl label={label} help={help}>
				<ul class="selectPattern">{items}</ul>
			</BaseControl>
		);
	},

	SelectPositionClass:(props)=>{
		const {BaseControl}=wp.components;
		const rows=[
			['topLeft','top','topRight'],
			['left','center','right'],
			['bottomLeft','bottom','bottomRight'],	
		];
		const values=_.flatten(rows);
		const {label,help,itemsKey,index,disable}=props;
		let value=itemsKey?CP.getItemSelectiveClass(props,values):CP.getSelectiveClass(props,values);

		return (
			<BaseControl label={label} help={help}>
				<table className="selectPosition">
					<tbody>
					{rows.map((cols)=>(
						<tr>
						{cols.map((col)=>{
							var isChecked=value==col;
							if(disable && disable.includes(col)){return <td className="disable" key={col}> </td>;}
							return (
								<td
									className={isChecked?"active":""}
									onClick={()=>{
										if(itemsKey){
											CP.switchItemSelectiveClass(props,values,col,props.key)
										}
										else{
											CP.switchSelectiveClass(props,values,col,props.key)
										}
									}}
									key={col}
								> </td>
							);
						})}
						</tr>
					))}
					</tbody>
				</table>
			</BaseControl>
		);
	},

	ImporterCSVPanel:(props)=>{
		const {PanelBody,FormFileUpload}=wp.components;
		let reader=new FileReader();
		reader.onload=(e)=>{
			props.callback(CP.parseCSV(e.target.result));
		}
		return (
			<PanelBody title={props.title} initialOpen={false} icon={props.icon}>
				<FormFileUpload
					label='CSV'
					accept="text/csv"
					onChange={(e)=>{reader.readAsText(e.target.files[0]);}}
				/>
			</PanelBody>
		)
	},

	SelectBreakPointToolbar:(props)=>{
		const {Toolbar}=wp.components;

		return (
			<Toolbar
				controls={props.breakpoints.map((bp)=>{
					let title=bp=="0"?'ー':bp;
					return {
						icon:(
							<svg viewBox="0 0 100 100">
								<text style={{"font-size":"50px"}} x={50} y={50} textAnchor="middle" dominantBaseline="middle">{title}</text>
							</svg>
						),
						isActive: props.value==bp,
						onClick: () => props.onChange(bp)
					};
				})}
			/>
		);
	},
	SelectModeToolbar:(props)=>{
		const {BlockControls}=wp.blockEditor;
		const {Toolbar}=wp.components;

		const {set,attr,modes=['EditMode','AltMode']}=props;
		const SomeMode=modes.some((mode)=>attr[mode]);
		const icons={
			EditMode:'edit',
			OpenMode:'video-alt3',
			AltMode:'welcome-comments',
			TextMode:'media-text'
		};
		const cond={
			AltMode:'doLoop'
		};
		return (
			<BlockControls>
				{modes.map((mode)=>{
					if(!attr[mode] && SomeMode){return false;}
					if(cond[mode] && !attr[cond[mode]]){return false;}
					return (
						<Toolbar
							controls={[
								{
									icon:icons[mode],
									title:mode,
									isActive:attr[mode],
									onClick:()=>set({[mode]:!attr[mode]})
								}
							]}
							key={mode}
						/>
					);
				})}
			</BlockControls>
		);
	},

	SelectDeviceToolbar:(props)=>{
		const {BlockControls}=wp.blockEditor;
		const {Toolbar}=wp.components;
		const {set,attr,devices=['sp','pc']}=props;
		return (
			<BlockControls>
				{devices.map((device)=>{
					return (
						<Toolbar
							controls={[
								{
									icon:CP.devices[device].icon,
									title:device,
									isActive:attr.device===device,
									onClick:()=>{
										if(attr.device===device){
											set({device:null});
										}
										else{set({device});}
									}
								}
							]}
							key={device}
						/>
					);
				})}
			</BlockControls>
		);
	},

	EditItemsTable:(props)=>{
		const {set,attr,itemsKey='items',columns,isTemplate}=props;
		const items=attr[itemsKey] || [];
		const save=()=>{
			set({[itemsKey]:JSON.parse(JSON.stringify(items))});	
		};
		return (
			<table className="editItemsTable">
				<thead>
					<tr>
						{columns.map((col)=>((!('cond' in col) || col.cond)?<th>{col.label || col.key}</th>:false))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item,index)=>{
						const propsForControl={tag:'tr',set,itemsKey,items,index};
						return (
							<tr
								onClick={(e)=>{
									set({currentItemIndex:index});
								}}
								key={index}
							>
								{columns.map((col)=>{
									if('cond' in col && !col.cond){return false;}
									switch(col.type){
										case 'text':
											return (
												<td>
													<RichText
														value={item[col.key]}
														onChange={(value)=>{
															item[col.key]=value;
															save();
														}}
													/>
												</td>
											);
										case 'image':
											return (
												<td>
													<CP.SelectResponsiveImage
														attr={attr}
														set={set}
														keys={{items:itemsKey,src:col.key,...col.keys}}
														index={index}
														size={col.size || 'vga'}
														isTemplate={isTemplate}
													/>
												</td>
											);
										case 'picture':
											return (
												<td>
													<CP.SelectPictureSources
														index={index}
														attr={attr}
														set={set}
														keys={{items:itemsKey,...col.keys}}
														sizes={col.sizes}
														devices={col.devices}
														isTemplate={isTemplate}
													/>
												</td>
											);
										case 'items':
											col.columns.map((subCol)=>{
												if(subCol.keys){subCol.keys.subItems=col.key;}
											});
											return (
												<td>
													<CP.EditItemsTable
														set={()=>{
															save();
														}}
														attr={item}
														itemsKey={col.itemsKey}
														columns={col.columns}
														isTemplate={isTemplate}
													/>
												</td>
											);
									}
								})}
								<td>
									<div className='itemControl'>
										<div className='btn delete' onClick={(e)=>CP.deleteItem(propsForControl)}></div>
										<div className='btn clone' onClick={(e)=>CP.cloneItem(propsForControl)}></div>
										<div className='btn up' onClick={(e)=>CP.upItem(propsForControl)}></div>
										<div className='btn down' onClick={(e)=>CP.downItem(propsForControl)}></div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	},

	DummyImage:({text})=>{
		return <img src={wpinfo.plugins_url+'/catpow/callee/dummy_image.php?text='+text}/>
	},
	
	DataStructure:(props)=>{
		return (
			<ul className="dataStructure">{props.children}</ul>
		);
	},
	DataStructureItem:(props)=>{
		const {useState}=wp.element;
		const [open,setOpen]=useState(false);
		return (
			<li className={"item "+(props.children?'hasChildren '+(open?'open':'close'):'noChildren')}>
				<h5 className="title" onClick={()=>setOpen(!open)}>
					{props.title}
					{undefined!==props.name && (<span className="name">{props.name}</span>)}
				</h5>
				{!!open && !!props.children &&(
					<div className="children">{props.children}</div>
				)}
			</li>
		);
	},
	
	EventInputCards:(props)=>{
		const {title,onChange}=props;
		const {useState,useReducer,useCallback,useEffect,useMemo}=wp.element;
		const {BaseControl,Card,CardHeader,CardBody,Flex,FlexItem,FlexBlock,Icon,TextControl}=wp.components;
		const {processerId,eventTypes,parseEventValue,createEventValue,eventParams}=props.processer;

		const reducer=useCallback((state,action)=>{
			switch(action.type){
				case 'UPDATE':{
					state.events[action.index]={...state.events[action.index],...action.event};
					const value=createEventValue(state.events);
					onChange(value);
					return {...state,value};
				}
				case 'CLONE':{
					state.events.splice(action.index,0,{...state.events[action.index]});
					const value=createEventValue(state.events);
					onChange(value);
					return {...state,value};
				}
				case 'REMOVE':{
					state.events.splice(action.index,1);
					const value=createEventValue(state.events);
					onChange(value);
					return {...state,value};
				}
			}
			return state;
		},[]);
		const [state,dispatch]=useReducer(reducer,{
			value:props.value,
			events:parseEventValue(props.value)
		});
		const eventParamsWithoutLabel=useMemo(()=>{
			const eventParamsWithoutLabel={};
			Object.keys(eventParams).map((name)=>{
				const {label,...otherParams}=eventParams[name];
				eventParamsWithoutLabel[name]=otherParams;
			});
			return eventParamsWithoutLabel;
		},[eventParams]);
		const eventTypeList=useMemo(()=>{
			if(!eventTypes){return [];}
			return Object.keys(eventTypes).filter((eventType)=>eventType!=='_custom');
		},[eventTypes]);
		
		const EventInputCard=useCallback((props)=>{
			const {event,index}=props;
			const activeEventParamNames=useMemo(()=>{
				if(eventTypes && event.eventType){
					const eventType=eventTypes[event.eventType] || eventTypes['_custom'];
					console.log(eventType);
					if(eventType){
						return Object.keys(eventParams).filter((paramName)=>{
							return eventParams[paramName].common || eventType.options.indexOf(paramName)>=0;
						});
					}
				}
				return Object.keys(eventParams).filter((paramName)=>!eventParams[paramName].limited);
			},[eventTypes,eventParams,event.eventType]);
			return (
				<Card className="EventInputCard">
					<CardHeader className="EventInputCard__header">
						<Flex>
							<FlexBlock>{title}</FlexBlock>
							<FlexItem>
								<Icon
									icon="insert"
									onClick={()=>{
										dispatch({type:'CLONE',index});
									}}
								/>
								{state.events.length>1 && (
									<Icon
										icon="remove"
										onClick={()=>{
											dispatch({type:'REMOVE',index});
										}}
									/>
								)}
							</FlexItem>
						</Flex>
					</CardHeader>
					<CardBody className="EventInputCard__body">
						{eventTypes && (
							<div className="EventInputCard__item">
								<div className="EventInputCard__item__inputs">
									<TextControl
										value={event.eventType}
										onChange={(val)=>{
											dispatch({type:'UPDATE',event:{eventType:val},index});
										}}
										list={CP.getDataListId(processerId+'EventTypes',eventTypeList)}
									/>
								</div>
							</div>
						)}
						<div className="EventInputCard__item">
							<div className="EventInputCard__item__pref">@</div>
							<div className="EventInputCard__item__inputs">
								<TextControl
									value={event.event}
									onChange={(val)=>{
										dispatch({type:'UPDATE',event:{event:val},index});
									}}
									list={CP.getDataListId(props.eventList || 'mouseEvent')}
								/>
							</div>
						</div>
						{activeEventParamNames.map((paramName)=>{
							const param=eventParams[paramName];
							return (
								<div className={"EventInputCard__item is-type-"+(param.type || 'text')} key={paramName}>
									<div className="EventInputCard__item__title">{param.label}</div>
									<div className="EventInputCard__item__inputs">
										<CP.DynamicInput
											param={eventParamsWithoutLabel[paramName]}
											value={event[paramName]}
											onChange={(val)=>{
												dispatch({type:'UPDATE',event:{[paramName]:val},index});
											}}
										/>
									</div>
								</div>
							);
						})}
					</CardBody>
				</Card>
			)
		},[]);
		return (
			<BaseControl>
			{state.events.length>0?(
				state.events.map((event,index)=>(<EventInputCard event={event} index={index} key={index}/>))
			):(
				<EventInputCard event={{}} index={0}/>
			)}
			</BaseControl>
		);
	},
	
	ServerSideRender:(props)=>{
		const {className,block,attributes}=props;
		const {RawHTML,useState,useMemo,useRef,useEffect}=wp.element;
		const {useDebounce}=wp.compose;
		const [response,setResponse]=useState(false);
		const [hold,setHold]=useState(false);
		const [stylesheets,setStylesheets]=useState([]);
		
		useEffect(()=>{
			if(hold){return;}
			const path='/cp/v1/blocks/render/'+block.split('/')[1];
			const data={
				context:'edit',
				attributes
			};
			const post_id=wp.data.select('core/editor').getCurrentPostId();
			if(post_id){data.post_id=post_id;}
			wp.apiFetch({path,data,method:'POST'}).then((res)=>{
				if(!res){return;}
				setStylesheets(res.deps.styles);
				setResponse(res.rendered);
			}).catch((res)=>{
				console.log(res);
			}).finally(()=>{
				setTimeout(()=>setHold(false),500);
			});
			setHold(true);
		},[JSON.stringify(attributes)]);
		
		return (
			<>
				<RawHTML className={className}>{response}</RawHTML>
				{stylesheets.map((stylesheet)=><link rel="stylesheet" href={stylesheet} key={stylesheet}/>)}
			</>
		);
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
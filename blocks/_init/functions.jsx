const CP={
	filters:{},
	cache:{},
	
	listedConvertibles:['catpow/listed','catpow/flow','catpow/faq','catpow/ranking','catpow/dialog','catpow/sphere','catpow/slider','catpow/banners','catpow/lightbox'],
	tableConvertibles:['catpow/simpletable','catpow/datatable','catpow/layouttable'],
	
	example:{
		attributes:{
			title:['吾輩は猫である。'],
			headerText:['吾輩は猫である。'],
			footerText:['『吾輩は猫である』（わがはいはねこである）　夏目漱石　著'],
			read:['名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。'],
			text:['名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。'],
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes:{
					content: 
						'名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。'
				}
			}
		]
	},
	
	selectImage:(keys,set,size)=>{
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
			console.log(image.sizes);
			if(keys.srcset && image.sizes){
				data[keys.srcset]=image.sizes.medium_large.url+' 480w,'+image.url;
			}
			set(data);
		}).open();
	},
	imageSrcOrDummy:(src)=>{
		if(!src){return cp.theme_url+'/images/dummy.jpg';}
		if(src[0]=='['){return cp.plugins_url+'/catpow/callee/dummy_image.php?text='+src;}
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
		let classArray=attr.classes.split(' ');
		let i=classArray.findIndex(cls=>(cls.substr(0,label.length)===label));
		if(i===-1){if(value){classArray.push(label+value);}}
		else{if(value){classArray.splice(i,1,label+value);}else{classArray.splice(i,1)}}
		set({classes:classArray.join(' ')});
	},
	getNumberClass:({attr},label)=>{
		let value=attr.classes.split(' ').find(cls=>(cls.substr(0,label.length)===label));
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
		let classArray=items[index].classes.split(' ');
		let i=classArray.findIndex(cls=>(cls.substr(0,5)==='color'));
		if(i===-1){if(color){classArray.push('color'+color);}}
		else{if(color){classArray.splice(i,1,'color'+color);}else{classArray.splice(i,1)}}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemColor:({items,index})=>{
		let c=items[index].classes.split(' ').find(cls=>(cls.substr(0,5)==='color'));
		if(!c){return 0;}
		return parseInt(c.substr(5));
	},
	
	switchItemPattern:({items,index,set},pattern,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=items[index].classes.split(' ');
		let i=classArray.findIndex(cls=>(cls.substr(0,7)==='pattern'));
		if(i===-1){if(pattern){classArray.push('pattern'+pattern);}}
		else{if(pattern){classArray.splice(i,1,'pattern'+pattern);}else{classArray.splice(i,1)}}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:items});
	},
	getItemPattern:({items,index})=>{
		let p=items[index].classes.split(' ').find(cls=>(cls.substr(0,7)==='pattern'));
		if(!p){return 0;}
		return parseInt(p.substr(7));
	},
	
	switchItemSelectiveClass:({items,index,set},values,value,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=items[index].classes.split(' ');
		if(!Array.isArray(values) && _.isObject(values)){values=Object.keys(values);}
		classArray=_.difference(classArray,values);
        if(Array.isArray(value)){classArray=classArray.concat(value);}
		else{classArray.push(value);}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	getItemSelectiveClass:({items,index},values)=>{
		if(!items[index].classes){return false;}
		let classArray=items[index].classes.split(' ');
		if(!Array.isArray(values) && _.isObject(values)){values=Object.keys(values);}
		return _.intersection(classArray,values).shift();
	},
	
	toggleItemClass:({items,index,set},value,itemsKey)=>{
		if(itemsKey === undefined){itemsKey='items';}
		let classArray=items[index].classes.split(' ');
		let i=classArray.indexOf(value);
		if(i===-1){classArray.push(value);}
		else{classArray.splice(i,1);}
		items[index].classes=classArray.join(' ');
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});
	},
	hasItemClass:({items,index},value)=>{
		let classArray=items[index].classes.split(' ');
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
		var obj={}
		css.split(';').map((pair)=>{
			pair=pair.split(':');
			obj[pair[0]]=pair[1];
		});
		return obj;
	},
	createStyleString:(data)=>{
		if(!data){return '';}
		return Object.keys(data).map((key)=>{
			return key+':'+data[key]+';';
		}).join('');
	},
	createStyleCode:(data)=>{
		if(!data){return '';}
		return Object.keys(data).map((sel)=>{
			return sel+'{'+CP.createStyleString(data[sel])+'}';
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
	
	wordsToFlags:(words)=>{
		var rtn={};
		words.split(' ').map((word)=>{rtn[word]=true;});
		return rtn;
	}
};
const SelectResponsiveImage=({className,attr,set,keys,index,sizes,size,ofSP,...otherProps})=>{
	let type,onClick,item;
	keys=keys || {};
	if(ofSP){
		if(keys.items){
			item=attr[keys.items][index];
			onClick=(e)=>CP.selectImage({src:'src'},function({src}){
				var newItems=JSON.parse(JSON.stringify(attr[keys.items]));
				newItems[index][keys.srcset]=newItems[index][keys.srcset].replace(/[^,]+ 480w,/,src+' 480w,');
				set({[keys.items]:newItems});
			},size || 'medium_large');
		}
		else{
			item=attr;
			onClick=(e)=>CP.selectImage({src:'src'},function({src}){
				set({[keys.srcset]:item[keys.srcset].replace(/[^,]+ 480w,/,src+' 480w,')});
			},size || 'medium_large');
		}
	}
	else{
		if(keys.items){
			item=attr[keys.items][index];
			onClick=(e)=>CP.selectImage(keys,function(data){
				let rusult={};
				rusult[keys.items]=attr[keys.items].map((obj)=>jQuery.extend(true,{},obj));
				rusult[keys.items][index]=jQuery.extend({},item,data);
				set(rusult);
			},size);
		}
		else{
			item=attr;
			onClick=(e)=>CP.selectImage(keys,set,size);
		}
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
	if(item[keys.srcset] && !sizes){sizes='(max-width:640px) 480px,100vw';}
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
};
const ResponsiveImage=({className,attr,keys,index,sizes})=>{
	let type,item;
	if(keys.items){item=attr[keys.items][index];}
	else{item=attr;}
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
	if(item[keys.srcset] && !sizes){sizes='(max-width:640px) 480px,100vw';}
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
}

const SelectPreparedImage=({className,attr,set,name,keys,index,...otherProps})=>{
	let onClick;
	const [images,setImages]=wp.element.useState([]);
	wp.apiFetch({path:'cp/v1/images/'+name}).then(setImages);
	if(keys.items){
		item=attr[keys.items][index];
		onClick=(e)=>{
			let items=JSON.parse(JSON.stringify(attr[keys.items]));
			items[index][keys.src]=e.currentTarget.src;
			items[index][keys.alt]=e.currentTarget.alt;
			set({[keys.items]:items});
		};
	}
	else{
		item=attr;
		onClick=(e)=>set({
			[keys.src]:e.currentTarget.src,
			[keys.alt]:e.currentTarget.alt
		});
	}
	return (
		<ul className={'selectPreparedImage '+name+' '+className} {...otherProps}>
			{images.map((image)=>{
				return (
					<li className={'item '+((item[keys.src]==image.url)?'active':'')}>
						<img
							src={image.url}
							alt={image.alt}
							onClick={onClick}
						/>
					</li>
				);
			})}
		</ul>
	);
}

const Item=(props)=>{
	const {tag,items,itemsKey,index,set,attr,triggerClasses,children}=props;
	let {itemClasses}=props;
	if(!items[index].classes){items[index].classes='item';}
	else if(items[index].classes.search(/\bitem\b/)===-1){items[index].classes+=' item';}
	let classes=items[index].classes;
	if(props.className){classes+=' '+props.className;}
	
	if(attr.currentItemIndex===undefined){attr.currentItemIndex=-1;}
	
	const isSelected=(props.isSelected === undefined)?(index==attr.currentItemIndex):props.isSelected;
	
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
		<Fragment>
			{children}
			{isSelected &&
				<div className='itemControl'>
					<div className='btn delete' onClick={(e)=>CP.deleteItem(props)}></div>
					<div className='btn clone' onClick={(e)=>CP.cloneItem(props)}></div>
					<div className='btn up' onClick={(e)=>CP.upItem(props)}></div>
					<div className='btn down' onClick={(e)=>CP.downItem(props)}></div>
				</div>
			}
		</Fragment>
	);
}
const ItemControlInfoPanel=()=>{
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
}

const EditItems=(props)=>{
	const {atts,set}=props;
	const key=props.key || 'item';
	var items=atts[key];
	const save=()=>{
		set({[key]:JSON.parse(JSON.stringify(items))});
	};
	return (
		<ul className="EditItems">
			{props.items.map((item)=>{
				return (
					<li className="item">
						
					</li>
				);
			})}
		</ul>
	);
}

const SelectClassPanel=(props)=>{
	const SelectClass=(prm)=>{
		if(prm.hasOwnProperty('cond') && !prm.cond){
			return false;
		}
		let rtn=[];
		if(prm.filter && props.filters && props.filters[prm.filter]){
			props.filters[prm.filter](prm);
		}
        if(prm.json){
            if(prm.input){
                switch(prm.input){
                    case 'text':
                        rtn.push(
                            <TextControl
                                label={prm.label}
                                value={JSON.parse(props.attr[prm.json])[prm.key]}
                                onChange={(val)=>{CP.setJsonValue(props,prm.json,prm.key,val);}}
                            />
                        );
                        break;
                    case 'range':
                        if(!prm.coef){prm.coef=1;}
                        rtn.push(
                            <RangeControl
                                label={prm.label}
                                value={CP.getJsonValue(props,prm.json,prm.key)/prm.coef}
                                onChange={(val)=>{CP.setJsonValue(props,prm.json,prm.key,val*prm.coef);}}
                                min={prm.min}
                                max={prm.max}
								step={prm.step}
                            />
                        );
                        break;
                        
                }
            }
            else if(_.isObject(prm.values)){
                let options,values;
                if(Array.isArray(prm.values)){
                    values=prm.values;
                    options=prm.values.map(cls=>{return {label:cls,value:cls};});
                }
                else{
                    values=Object.keys(prm.values);
                    options=values.map((cls)=>{return {label:prm.values[cls],value:cls};});
                }
                rtn.push(
                    <SelectControl
                        label={prm.label}
                        value={CP.getJsonValue(props,prm.json,prm.key)}
                        onChange={(val)=>{CP.setJsonValue(props,prm.json,prm.key,val);}}
                        options={options}
                    />
                );
            }
            else if(prm.values){
                rtn.push(
                    <CheckboxControl
                        label={prm.label}
                        onChange={()=>{CP.switchJsonValue(props,prm.json,prm.key,prm.values);}}
                        checked={CP.hasJsonValue(props,prm.json,prm.key,prm.values)}
                    />
                );
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
        else{
            if(prm === 'color'){
                rtn.push(
                    <SelectColorClass
                        label='色'
                        set={props.set}
                        attr={props.attr}
                    />
                );
            }
            else if(prm === 'pattern'){
                rtn.push(
                    <RangeControl
                        label='パターン'
                        onChange={(clr)=>CP.switchPattern(props,clr)}
                        value={CP.getPattern(props)}
                        min={0}
                        max={5}
                    />
                );
            }
            else if(prm.input){
                switch(prm.input){
                    case 'text':
                        rtn.push(
                            <TextControl
                                label={prm.label}
                                value={props.attr[prm.key]}
                                onChange={(val)=>{let data={};data[prm.key]=val;props.set(data);}}
                            />
                        );
                        break;
                    case 'range':
                        if(!prm.coef){prm.coef=1;}
                        rtn.push(
                            <RangeControl
                                label={prm.label}
                                value={props.attr[prm.key]/prm.coef}
                                onChange={(val)=>{let data={};data[prm.key]=val*prm.coef;props.set(data);}}
                                min={prm.min}
                                max={prm.max}
                                step={prm.step}
                            />
                        );
                        break;
                    case 'image':
						if(prm.label){
							rtn.push(<h5>{prm.label}</h5>);
						}
                        rtn.push(
                            <SelectResponsiveImage
                                set={props.set}
                                attr={props.attr}
                                keys={prm.keys}
                                size={prm.size}
								sizes={prm.sizes}
								ofSP={prm.ofSP}
                            />
                        );
                        break;
					case 'position':
						rtn.push(
							<SelectPositionClass
                                set={props.set}
                                attr={props.attr}
								label={prm.label}
                                key={prm.key}
								help={prm.help}
								disable={prm.disable}
							/>
						);
					case 'icon':
					case 'symbol':
					case 'pattern':
						prm.keys=prm.keys || {};
						prm.keys.src=prm.keys.src || prm.input+'Src';
						prm.keys.alt=prm.keys.alt || prm.input+'Alt';
						if(prm.label){
							rtn.push(<h5>{prm.label}</h5>);
						}
						rtn.push(
							<SelectPreparedImage
								set={props.set}
								attr={props.attr}
								name={prm.input}
								keys={prm.keys}
							/>
						);
						break;
                }
            }
            else if(_.isObject(prm.values)){
                let subClasses=CP.getSubClasses(prm);
                let bindClasses=CP.getBindClasses(prm);

                let options,values;
                if(Array.isArray(prm.values)){
                    values=prm.values;
                    options=prm.values.map(cls=>{return {label:cls,value:cls};});
                }
                else{
                    values=Object.keys(prm.values);
                    options=values.map((cls)=>{return {label:prm.values[cls],value:cls};});
                }
				
				let onChangeCB=(cls)=>{
					let prevCls=CP.getSelectiveClass(props,prm.values,prm.key);
					let sels=[];
					if(prevCls){
						if(subClasses[prevCls]){sels=sels.concat(subClasses[prevCls]);}
						if(bindClasses[prevCls]){sels=sels.concat(bindClasses[prevCls]);}
						sels=_.difference(sels,subClasses[cls]);
					}
					sels=sels.concat(values);

					CP.switchSelectiveClass(
						props,sels,
						bindClasses[cls].concat([cls]),
						prm.key
					);
				};
				
				switch(prm.type){
					case 'radio':
						rtn.push(
							<RadioControl
								label={prm.label}
								onChange={onChangeCB}
								selected={CP.getSelectiveClass(props,prm.values,prm.key)}
								options={options}
							/>
						);
						break;
					default:
						rtn.push(
							<SelectControl
								label={prm.label}
								onChange={onChangeCB}
								value={CP.getSelectiveClass(props,prm.values,prm.key)}
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
                        onChange={()=>{CP.toggleClass(props,prm.values,prm.key);}}
                        checked={CP.hasClass(props,prm.values,prm.key)}
                    />
                );
                if(prm.sub){
                    if(CP.hasClass(props,prm.values,prm.key)){
                        let sub=[];
                        prm.sub.map((prm)=>{sub.push(SelectClass(prm))});
                        rtn.push(<div className="sub">{sub}</div>);
                    }
                }
            }
        }
		return rtn;
	};
	return (
		<PanelBody title={props.title} initialOpen={false} icon={props.icon}>
			{props.selectiveClasses.map(SelectClass)}
		</PanelBody>
	)
}
const SelectItemClassPanel=(props)=>{
	const {items,index,set,attr,triggerClasses}=props;
	let {itemsKey,itemClasses}=props;

	if(!items[index]){return false;}
	
	itemsKey=itemsKey || 'items';
	if(!items[index].classes){items[index].classes='item';}
	else if(items[index].classes.search(/\bitem\b/)===-1){items[index].classes+=' item';}
	let classes=items[index].classes;
	if(props.className){classes+=' '+props.className;}
	
	if(triggerClasses && triggerClasses.item){
		itemClasses=triggerClasses.item[CP.getSelectiveClass(props,triggerClasses.values)];
		if(Array.isArray(itemClasses) && itemClasses.length===0){itemClasses=false;}
	}
	

	const selectItemClass=(prm)=>{
		if(prm.hasOwnProperty('cond') && !prm.cond){
			return false;
		}
		let rtn=[];
		if(prm.filter && props.filters && props.filters[prm.filter]){
			props.filters[prm.filter](prm);
		}
		if(prm === 'color'){
			rtn.push(
				<SelectItemColorClass
					label='色'
					set={set}
					attr={attr}
					items={items}
					index={index}
					itemsKey={itemsKey}
				/>
			);
		}
		else if(prm === 'pattern'){
			rtn.push(
				<RangeControl
					label='パターン'
					onChange={(clr)=>CP.switchItemPattern(props,clr,itemsKey)}
					value={CP.getItemPattern(props)}
					min={0}
					max={5}
				/>
			);
		}
		else if(prm === 'cond'){
			rtn.push(
				<TextareaControl
					label='表示条件'
					value={items[index]['cond']}
					onChange={(cond)=>{
						items[index]['cond']=cond;
						if(itemsKey===undefined){set({items});}
						else{set({[itemsKey]:items})}
					}}
				/>
			);
		}
		else if(prm === 'event'){
			if(cp.use_functions.indexOf('ga')>-1){
				var {parseEventString,createEventString}=window.Catpow.ga;
				var eventData=parseEventString(items[index]['event']);
				var params={event:'イベント',action:'アクション',category:'カテゴリ',label_name:'ラベル名',label:'ラベル',value:'値'};
				rtn.push(
					<BaseControl label="Google Analitics Event">
						<table>
							{Object.keys(params).map((key)=>{
								return (
									<tr>
										<th width="80">{params[key]}</th>
										<td>
											<TextControl
												value={eventData[key]}
												type={key=='value'?'number':'text'}
												onChange={(val)=>{
													eventData[key]=val;
													items[index]['event']=createEventString(eventData);
													if(itemsKey===undefined){set({items});}
													else{set({[itemsKey]:items})}
												}}
											/>
										</td>
									</tr>
								);
							})}
						</table>
					</BaseControl>
				);
			}
		}
		else if(prm.input){
			switch(prm.input){
				case 'text':
					rtn.push(
						<TextControl
							label={prm.label}
							value={items[index][prm.key]}
							onChange={(val)=>{
								let newItems=JSON.parse(JSON.stringify(items));
								newItems[index][prm.key]=val;
								set({[itemsKey]:newItems});
							}}
						/>
					);
					break;
				case 'image':
					prm.keys.items=prm.keys.items || itemsKey;
					if(prm.label){
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<SelectResponsiveImage
							set={props.set}
							attr={props.attr}
							keys={prm.keys}
							index={index}
							size={prm.size}
							sizes={prm.sizes}
							ofSP={prm.ofSP}
						/>
					);
					break;
				case 'icon':
				case 'symbol':
				case 'pattern':
					prm.keys=prm.keys || {};
					prm.keys.items=prm.keys.items || itemsKey;
					prm.keys.src=prm.keys.src || prm.input+'Src';
					prm.keys.alt=prm.keys.alt || prm.input+'Alt';
					if(prm.label){
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<SelectPreparedImage
							set={props.set}
							attr={props.attr}
							name={prm.input}
							keys={prm.keys}
							index={index}
						/>
					);
					break;
			}
		}
		else if(_.isObject(prm.values)){
			let options;
			if(Array.isArray(prm.values)){
				options=prm.values.map(cls=>{return {label:cls,value:cls};});
			}
			else{
				options=Object.keys(prm.values).map((cls)=>{return {label:prm.values[cls],value:cls};});
			}
			switch(prm.type){
				case 'radio':
					rtn.push(
						<RadioControl
							label={prm.label}
							onChange={(cls)=>CP.switchItemSelectiveClass(props,prm.values,cls,itemsKey)}
							selected={CP.getItemSelectiveClass(props,prm.values)}
							options={options}
						/>
					);
					break;
				default:
					rtn.push(
						<SelectControl
							label={prm.label}
							onChange={(cls)=>CP.switchItemSelectiveClass(props,prm.values,cls,itemsKey)}
							value={CP.getItemSelectiveClass(props,prm.values)}
							options={options}
						/>
					);
			}
			if(prm.sub){
				let currentClass=CP.getItemSelectiveClass(props,prm.values);
				if(currentClass && prm.sub[currentClass]){
					let sub=[];
					prm.sub[currentClass].map((prm)=>{sub.push(selectItemClass(prm))});
					rtn.push(<div className="sub">{sub}</div>);
				}
			}
		}
		else{
			rtn.push(
				<CheckboxControl
					label={prm.label}
					onChange={()=>{CP.toggleItemClass(props,prm.values,itemsKey);}}
					checked={CP.hasItemClass(props,prm.values)}
				/>
			);
			if(prm.sub){
				if(CP.hasItemClass(props,prm.values)){
					let sub=[];
					prm.sub.map((prm)=>{sub.push(selectItemClass(prm))});
					rtn.push(<div className="sub">{sub}</div>);
				}
			}
		}
		return rtn;
	};

	if(!itemClasses){return false;}
	return (
		<PanelBody title={props.title} initialOpen={false} icon={props.icon}>
			{itemClasses.map(selectItemClass)}
		</PanelBody>
	)
}

const AlignClassToolbar=(props)=>{
	const aligns=['left','center','right'];
	return (
		<BlockAlignmentToolbar
			value={CP.getSelectiveClass(props,aligns)}
			controls={props.aligns || aligns}
			onChange={(align)=>{CP.switchSelectiveClass(props,aligns,align,props.key)} }
		/>
	);
}
const VerticalAlignClassToolbar=(props)=>{
	const aligns=['top','center','bottom'];
	return (
		<BlockVerticalAlignmentToolbar
			value={CP.getSelectiveClass(props,aligns)}
			controls={props.aligns || aligns}
			onChange={(align)=>{CP.switchSelectiveClass(props,aligns,align,props.key)} }
		/>
	);
}
const SelectColorClass=(props)=>{
	const {label,help}=props;
	
	var color=CP.getColor(props);
	var items=Array.from(Array(13),(v,i)=>{
		var classes='fillColor'+i;
		if(color==i){classes+=' active';}
		return (
			<li className={classes} onClick={()=>{CP.switchColor(props,i);}}> </li>
		);
	});;
	
	return (
		<BaseControl label={label} help={help}>
			<ul class="selectColor">{items}</ul>
		</BaseControl>
	);
}
const SelectItemColorClass=(props)=>{
	const {label,help,itemsKey}=props;
	
	var color=CP.getItemColor(props);
	var items=Array.from(Array(13),(v,i)=>{
		var classes='fillColor'+i;
		if(color==i){classes+=' active';}
		return (
			<li className={classes} onClick={()=>{CP.switchItemColor(props,i,itemsKey);}}> </li>
		);
	});;
	
	return (
		<BaseControl label={label} help={help}>
			<ul class="selectColor">{items}</ul>
		</BaseControl>
	);
}

const SelectPositionClass=(props)=>{
	const rows=[
		['topLeft','top','topRight'],
		['left','center','right'],
		['bottomLeft','bottom','bottomRight'],	
	];
	const values=_.flatten(rows);
	let value=CP.getSelectiveClass(props,values);
	
	const {label,help,disable}=props;
	
	return (
		<BaseControl label={label} help={help}>
			<table className="selectPosition">
				<tbody>
				{rows.map((cols)=>(
					<tr>
					{cols.map((col)=>{
						var isChecked=value==col;
						if(disable && disable.includes(col)){return <td className="disable"> </td>;}
						return (
							<td
								className={isChecked?"active":""}
								onClick={()=>{CP.switchSelectiveClass(props,values,col,props.key)}}
							> </td>
						);
					})}
					</tr>
				))}
				</tbody>
			</table>
		</BaseControl>
	);
}

const ImporterCSVPanel=(props)=>{
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
}

const SelectBreakPointToolbar=(props)=>{
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
}

const EditItemsTable=(props)=>{
	const {set,attr,itemsKey='items',columns}=props;
	const items=attr[itemsKey];
	const save=()=>{
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});	
	};
	return (
		<table className="editItemsTable">
			<thead>
				<tr>
					{columns.map((col)=>(col.cond?<th>{col.label || col.key}</th>:false))}
					<th></th>
				</tr>
			</thead>
			<tbody>
				{items.map((item,index)=>{
					const propsForControl={tag:'tr',set,itemsKey,items,index};
					return (
						<tr>
							{columns.map((col)=>{
								if(!col.cond){return false;}
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
												<SelectResponsiveImage
													attr={attr}
													set={set}
													keys={{items:itemsKey,...col.keys}}
													index={index}
													size={col.size || 'vga'}
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
}

const DummyImage=({text})=>{
	return <img src={cp.plugins_url+'/catpow/callee/dummy_image.php?text='+text}/>
}
import {CP} from './CP.jsx';

CP.SelectClassPanelContext=wp.element.createContext({});

CP.SelectClassPanel=(props)=>{
	const {Fragment,useMemo,useCallback,useContext,createElement:el}=wp.element;
	const {__}=wp.i18n;
	const {PanelBody,CheckboxControl,RadioControl,SelectControl,TextareaControl,TextControl,ColorPicker,__experimentalGradientPicker:GradientPicker}=wp.components;
	const {classKey='classes',items,index,subItemsKey,subIndex,set,attr,triggerClasses}=wp.hooks.applyFilters('catpow.SelectClassPanelProps',props);
	let {itemsKey=items?'items':null,itemClasses}=props;
	const selectiveClasses=useMemo(()=>{
		if(!triggerClasses || !triggerClasses.item){
			return props.selectiveClasses;
		}
		const blockStates=CP.wordsToFlags(attr.classes);
		return triggerClasses.item[Object.keys(triggerClasses.item).find((value)=>blockStates[value])];
	},[props.selectiveClasses,triggerClasses]);
	
	const {styleDatas}=attr;
	
	const item=useMemo(()=>{
		if(!items){return attr;}
		if(!items[index]){return false;}
		if(subItemsKey){
			return items[index][subItemsKey][subIndex];
		}
		return items[index];
	},[attr,items,index,subItemsKey,subIndex]);
	const states=useMemo(()=>CP.wordsToFlags(item[classKey]),[item[classKey]]);
	const save=useCallback((data)=>{
		if(items){
			Object.assign(item,data);
			set({[itemsKey]:JSON.parse(JSON.stringify(items))});
		}
		else{
			set(data);
		}
	},[set,index,items,itemsKey]);
	const saveClasses=useCallback(()=>{
		save({[classKey]:CP.flagsToWords(states)});
	},[save,classKey,states]);
	const saveCss=useCallback((cssKey)=>{
		set({[cssKey]:CP.createStyleCodeWithMediaQuery(styleDatas[cssKey])});
	},[set,styleDatas]);

	const SelectClass=useCallback(({prm})=>{
		const {props,item,states,save,saveClasses,saveCss}=useContext(CP.SelectClassPanelContext);
		if(typeof prm ==='string'){
			const preset={
				customColorVars:{name:'customColorVars',input:'customColorVars',label:'カスタムカラー',vars:'customColorVars'},
				isTemplate:{
					name:'template',
					input:'bool',
					key:'isTemplate',
					label:'テンプレート',
					sub:[
						{name:'loop',input:'bool',label:'ループ',key:'doLoop',sub:[
							{name:'contentPath',label:'content path',input:'text',key:'content_path'},
							{name:'query',label:'query',input:'textarea',key:'query'},
							{name:'loopCount',label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
						]}
					]
				},
				backgroundImage:{name:'backgroundImage',label:'背景画像',values:'hasBackgroundImage',sub:[
					{name:'blendmode',label:__('モード','catpow'),vars:'vars',key:'--cp-image-blendmode',input:'blendmode'},
					{name:'opacity',label:__('不透明度','catpow'),vars:'vars',key:'--cp-image-opacity',input:'range',min:0,max:1,step:0.1}
				 ]},
				width:{name:'width',type:'buttons',label:__('幅','catpow'),values:{fullWidth:'フル',wideWidth:'ワイド',regularWidth:'レギュラー',narrowWidth:'ナロー'}},
				size:{name:'size',type:'buttons',label:__('サイズ','catpow'),values:{large:'大',medium:'中',small:'小'}},
				itemSize:{name:'itemSize',label:__('サイズ','catpow'),vars:'vars',key:'--cp-item-size',input:'range',min:100,max:1200,step:10},
				textColor:{name:'textColor',type:'buttons',label:__('文字色','catpow'),values:{revertTextColor:'通常',invertTextColor:'反転'}}
			};
			if(preset.hasOwnProperty(prm)){prm=preset[prm];}
		}
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
			if(props.items){
				prm.keys.items=prm.keys.items || props.itemsKey;
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
					case 'flag':{
						let value=CP.getJsonValue(props,prm.json,prm.key) || 0;
						if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
						Object.keys(prm.values).forEach((key)=>{
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
					}
					case 'color':{
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
					}
					case 'colors':{
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
					}
					case 'gradient':{
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
				}

				switch(prm.input){
					case 'select':
					case 'buttons':
					case 'gridbuttons':{
						if(prm.sub){
							if(prm.sub[JSON.parse(props.attr[prm.json])[prm.key]]){
								let sub=[];
								prm.sub[JSON.parse(props.attr[prm.json])[prm.key]].forEach((prm)=>{sub.push(el(SelectClass,{prm}))});
								rtn.push(<div className="sub">{sub}</div>);
							}
						}
						break;
					}
					case 'bool':{
						if(prm.sub){
							if(JSON.parse(props.attr[prm.json])[prm.key]){
								let sub=[];
								prm.sub.forEach((prm)=>{sub.push(el(SelectClass,{prm}))});
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
						prm.sub[currentValue].forEach((prm)=>{sub.push(el(SelectClass,{prm}))});
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
						prm.sub.forEach((prm)=>{sub.push(el(SelectClass,{prm}))});
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
									imageset.forEach((image)=>{
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
		else if(prm.vars){
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
								value={props.attr[prm.vars][prm.key]}
								onChange={(val)=>{
									save({[prm.vars]:{...props.attr[prm.vars],[prm.key]:''+val}});
								}}
							/>
						);
						break;
					}
					case 'customColorVars':{
						rtn.push(
							<CP.CustomColorVars
								value={props.attr[prm.vars]}
								onChange={(vars)=>{
									const newVars={...props.attr[prm.vars]};
									Object.keys(vars).forEach((key)=>{
										if(vars[key]===null){delete newVars[key];}
										else{newVars[key]=vars[key];}
									});
									console.log({[prm.vars]:newVars});
									save({[prm.vars]:newVars});
								}}
							/>
						);
						break;
					}
					case 'blendmode':{
						rtn.push(
							<CP.SelectBlendMode
								label={prm.label}
								value={props.attr[prm.vars][prm.key]}
								onChange={(val)=>{
									save({[prm.vars]:{...props.attr[prm.vars],[prm.key]:val}});
								}}
							/>
						);
						break;
					}
				}
			}
			else{
				rtn.push(
					<TextControl
						label={prm.label}
						value={props.attr[prm.vars][prm.key]}
						onChange={(val)=>{
							save({[prm.vars]:{...props.attr[prm.vars],[prm.key]:''+val}});
						}}
					/>
				);
			}
		}
		else{
			if(prm === 'color'){
				rtn.push(
					<CP.SelectColorClass
						label={__('色','catpow')}
						selected={states}
						onChange={(proxy)=>{
							if(!props.items){set({color:proxy.value});}
							saveClasses();
						}}
					/>
				);
			}
			else if(prm === 'pattern'){
				rtn.push(
					<CP.SelectPatternClass
						label={__('パターン','catpow')}
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
						label={__('表示条件','catpow')}
						value={item['cond']}
						onChange={(cond)=>save({cond})}
					/>
				);
			}
			else if(prm === 'event'){
				const EventInputs=useMemo(()=>wp.hooks.applyFilters('catpow.EventInputs',[],{item,save}),[item,save]);
				rtn.push(...EventInputs);
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
					case 'image':{
						if(prm.label){
							rtn.push(<h5>{prm.label}</h5>);
						}
						rtn.push(
							<CP.SelectResponsiveImage
								index={props.index}
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
					}
					case 'picture':{
						if(prm.label){
							rtn.push(<h5>{prm.label}</h5>);
						}
						rtn.push(
							<CP.SelectPictureSources
								index={props.index}
								set={props.set}
								attr={props.attr}
								keys={prm.keys}
								sizes={prm.sizes}
								devices={prm.devices}
								isTemplate={prm.isTemplate}
							/>
						);
						break;
					}
					case 'position':{
						rtn.push(
							<CP.SelectPositionClass
								set={props.set}
								attr={props.attr}
								label={prm.label}
								key={prm.key}
								help={prm.help}
								disable={prm.disable}
								itemsKey={itemsKey}
								index={props.index}
							/>
						);
					}
					case 'icon':{
						if(prm.label){
							rtn.push(<h5>{prm.label}</h5>);
						}
						rtn.push(<CP.InputIcon prm={prm} item={item} save={save}/>);
						break;
					}
					case 'symbol':
					case 'pattern':{
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
				}
				switch(prm.input){
					case 'select':
					case 'buttons':
					case 'gridbuttons':{
						if(prm.sub && prm.sub[item[prm.key]]){
							let sub=[];
							prm.sub[item[prm.key]].forEach((prm)=>{sub.push(el(SelectClass,{prm}))});
							rtn.push(<div className="sub">{sub}</div>);
						}
						break;
					}
					case 'bool':{
						if(prm.sub && item[prm.key]){
							let sub=[];
							prm.sub.forEach((prm)=>{sub.push(el(SelectClass,{prm}))});
							rtn.push(<div className="sub">{sub}</div>);
						}
						break;
					}
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
						currentSels.forEach((value)=>{
							if(!newSels.includes(value)){states[value]=false;}
						});
					}
					bindClasses[newClass].forEach((value)=>{
						states[value]=true;
					});
					states[newClass]=true;

					saveClasses();
					if(prm.effect){prm.effect(currentClass,newClass,states,props);}
				};


				switch(prm.type){
					case 'radio':{
						rtn.push(
							<RadioControl
								label={prm.label}
								onChange={onChangeCB}
								selected={currentClass}
								options={options}
							/>
						);
						break;
					}
					case 'buttons':{
						rtn.push(
							<CP.SelectButtons
								label={prm.label}
								onChange={onChangeCB}
								selected={currentClass}
								options={options}
							/>
						);
						break;
					}
					case 'gridbuttons':{
						rtn.push(
							<CP.SelectGridButtons
								label={prm.label}
								onChange={onChangeCB}
								selected={currentClass}
								options={options}
							/>
						);
						break;
					}
					default:{
						rtn.push(
							<SelectControl
								label={prm.label}
								onChange={onChangeCB}
								value={currentClass}
								options={options}
							/>
						);
					}
				}


				if(prm.sub){
					if(currentClass && prm.sub[currentClass]){
						let sub=[];
						prm.sub[currentClass].forEach((prm,index)=>{sub.push(<Fragment key={index}>{el(SelectClass,{prm})}</Fragment>)});
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
						checked={!!states[prm.values]}
					/>
				);
				if(prm.sub){
					if(states[prm.values]){
						let sub=[];
						prm.sub.forEach((prm,index)=>{sub.push(<Fragment key={index}>{el(SelectClass,{prm})}</Fragment>)});
						rtn.push(<div className="sub">{sub}</div>);
					}
				}
			}
		}
		return (
			<>
				{rtn.map((item,index)=><Fragment key={index}>{item}</Fragment>)}
			</>
		);
	},[]);
	
	if(!item || !selectiveClasses){return false;}
	
	return (
		<PanelBody title={props.title} initialOpen={props.initialOpen || false} icon={props.icon}>
			<CP.SelectClassPanelContext.Provider value={{props,item,states,save,saveClasses,saveCss}}>
				{selectiveClasses.map((prm,index)=>(
					<Fragment key={index}>
						{el(SelectClass,{prm})}
					</Fragment>
				))}
				{props.children}
			</CP.SelectClassPanelContext.Provider>
		</PanelBody>
	);
};
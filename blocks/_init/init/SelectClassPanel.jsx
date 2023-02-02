import {CP} from './CP.jsx';

CP.SelectClassPanel=(props)=>{
	const {Fragment,useMemo,useCallback,useRef}=wp.element;
	const {__}=wp.i18n;
	const {PanelBody,CheckboxControl,SelectControl,TextareaControl,TextControl,ColorPicker,__experimentalGradientPicker:GradientPicker}=wp.components;
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
	
	const ref=useRef({});
	ref.current.props=props;
	ref.current.item=useMemo(()=>{
		if(!items){return attr;}
		if(!items[index]){return false;}
		if(subItemsKey){
			return items[index][subItemsKey][subIndex];
		}
		return items[index];
	},[attr,items,index,subItemsKey,subIndex]);
	ref.current.states=useMemo(()=>CP.wordsToFlags(ref.current.item[classKey]),[ref.current.item[classKey]]);
	ref.current.save=useCallback((data)=>{
		if(items){
			Object.assign(ref.current.item,data);
			set({[itemsKey]:JSON.parse(JSON.stringify(items))});
		}
		else{
			set(data);
		}
	},[set,index,ref,items,itemsKey]);
	ref.current.saveClasses=useCallback(()=>{
		ref.current.save({[classKey]:CP.flagsToWords(ref.current.states)});
	},[ref.current.save,classKey,ref.current.states]);
	ref.current.saveCss=useCallback((cssKey)=>{
		set({[cssKey]:CP.createStyleCodeWithMediaQuery(styleDatas[cssKey])});
	},[set,styleDatas]);

	const SelectClass=useCallback((prm)=>{
		if(prm.hasOwnProperty('cond')){
			if(prm.cond===false){return false;}
			if(Array.isArray(prm.cond) && prm.cond.some((className)=>!ref.current.states[className])){return false;}
			if(typeof prm.cond === 'string' && !ref.current.states[prm.cond]){return false;}
			if(typeof prm.cond === 'function' && !prm.cond(ref.current.states,ref.current.props)){return false;}
		}
		let rtn=[];
		if(prm.filter && ref.current.props.filters && ref.current.props.filters[prm.filter]){
			ref.current.props.filters[prm.filter](prm);
		}
		if(prm.keys){
			if(ref.current.props.items){
				prm.keys.items=prm.keys.items || ref.current.props.itemsKey;
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
								value={JSON.parse(ref.current.props.attr[prm.json])[prm.key]}
								onChange={(val)=>{
									CP.setJsonValue(ref.current.props,prm.json,prm.key,val);
									if(prm.effect){prm.effect(val,ref.current.states,ref.current.props);}
								}}
							/>
						);
						break;
					}
					case 'flag':{
						let value=CP.getJsonValue(ref.current.props,prm.json,prm.key) || 0;
						if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
						Object.keys(prm.values).forEach((key)=>{
							rtn.push(
								<CheckboxControl
									label={key}
									onChange={(flag)=>{
										value |= prm.values[key];
										if(!flag){value^=prm.values[key];}
										CP.setJsonValue(ref.current.props,prm.json,prm.key,value);
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
								color={CP.getJsonValue(ref.current.props,prm.json,prm.key) || '#FFFFFF'}
								onChangeComplete={(value)=>{
									CP.setJsonValue(ref.current.props,prm.json,prm.key,value.hex);
								}}
							/>
						);
						break;
					}
					case 'colors':{
						if(prm.label){rtn.push(<h5>{prm.label}</h5>);}
						rtn.push(
							<CP.SelectColors
								colors={CP.getJsonValue(ref.current.props,prm.json,prm.key) || [{h:'40',s:'80%',l:'50%'},{h:'60',s:'80%',l:'50%'}]}
								onChange={(colors)=>{
									CP.setJsonValue(ref.current.props,prm.json,prm.key,colors);
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
							if(prm.sub[JSON.parse(ref.current.props.attr[prm.json])[prm.key]]){
								let sub=[];
								prm.sub[JSON.parse(ref.current.props.attr[prm.json])[prm.key]].forEach((prm)=>{sub.push(SelectClass(prm))});
								rtn.push(<div className="sub">{sub}</div>);
							}
						}
						break;
					}
					case 'bool':{
						if(prm.sub){
							if(JSON.parse(ref.current.props.attr[prm.json])[prm.key]){
								let sub=[];
								prm.sub.forEach((prm)=>{sub.push(SelectClass(prm))});
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
						value={CP.getJsonValue(ref.current.props,prm.json,prm.key)}
						onChange={(val)=>{CP.setJsonValue(ref.current.props,prm.json,prm.key,val);}}
						options={options}
					/>
				);
				if(prm.sub){
					let currentValue=CP.getJsonValue(ref.current.props,prm.json,prm.key);
					if(currentValue && prm.sub[currentValue]){
						let sub=[];
						prm.sub[currentValue].forEach((prm)=>{sub.push(SelectClass(prm))});
						rtn.push(<div className="sub">{sub}</div>);
					}
				}
			}
			else if(prm.values){
				rtn.push(
					<CheckboxControl
						label={prm.label}
						onChange={()=>{CP.switchJsonValue(ref.current.props,prm.json,prm.key,prm.values);}}
						checked={CP.hasJsonValue(ref.current.props,prm.json,prm.key,prm.values)}
					/>
				);
				if(prm.sub){
					if(CP.getJsonValue(ref.current.props,prm.json,prm.key)){
						let sub=[];
						prm.sub.forEach((prm)=>{sub.push(SelectClass(prm))});
						rtn.push(<div className="sub">{sub}</div>);
					}
				}
			}
			else{
				rtn.push(
					<TextControl
						label={prm.label}
						value={JSON.parse(ref.current.props.attr[prm.json])[prm.key]}
						onChange={(val)=>{CP.setJsonValue(ref.current.props,prm.json,prm.key,val);}}
					/>
				);
			}
		}
		else if(prm.css){
			const {device='pc'}=prm;
			const media=CP.getMediaQueryKeyForDevice(device);
			const sel=(typeof prm.sel === 'function')?prm.sel(ref.current.props):prm.sel;
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
									ref.current.saveCss(prm.css);
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
									ref.current.saveCss(prm.css);
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
									ref.current.saveCss(prm.css);
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
							ref.current.saveCss(prm.css);
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
						selected={Object.keys(ref.current.states).find(key=>CP.colorClassPattern.test(key))}
						onChange={(color)=>{
							CP.filterFlags(ref.current.states,(key)=>!(CP.colorClassPattern.test(key)));
							ref.current.states[color]=true;
							if(!ref.current.props.items){set({color:color.substr(5)});}
							ref.current.saveClasses();
						}}
					/>
				);
			}
			else if(prm === 'pattern'){
				rtn.push(
					<CP.SelectPatternClass
						label={__('パターン','catpow')}
						set={ref.current.props.set}
						attr={ref.current.props.attr}
						selected={Object.keys(ref.current.states).find(key=>/^pattern\d+/.test(key))}
						onChange={(pattern)=>{
							CP.filterFlags(ref.current.states,(key)=>!(/^pattern\d+/.test(key)));
							ref.current.states[pattern]=true;
							ref.current.saveClasses();
						}}
					/>
				);
			}
			else if(prm === 'cond'){
				rtn.push(
					<TextareaControl
						label={__('表示条件','catpow')}
						value={ref.current.item['cond']}
						onChange={(cond)=>ref.current.save({cond})}
					/>
				);
			}
			else if(prm === 'event'){
				wp.hooks.applyFilters('catpow.EventInputs',[],{item:ref.current.item,save:ref.current.save}).forEach((EventInput)=>{rtn.push(EventInput);});
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
								value={ref.current.item[prm.key]}
								onChange={(val)=>{
									ref.current.save({[prm.key]:val});
									if(prm.effect){prm.effect(val,ref.current.states,ref.current.props);}
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
								index={ref.current.props.index}
								set={ref.current.props.set}
								attr={ref.current.props.attr}
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
								index={ref.current.props.index}
								set={ref.current.props.set}
								attr={ref.current.props.attr}
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
								set={ref.current.props.set}
								attr={ref.current.props.attr}
								label={prm.label}
								key={prm.key}
								help={prm.help}
								disable={prm.disable}
								itemsKey={itemsKey}
								index={ref.current.props.index}
							/>
						);
					}
					case 'icon':{
						if(prm.label){
							rtn.push(<h5>{prm.label}</h5>);
						}
						rtn.push(<CP.InputIcon prm={prm} item={ref.current.item} save={ref.current.save}/>);
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
								value={ref.current.item[prm.keys.src]}
								color={prm.color || CP.getColor({attr:ref.current.item}) || 0}
								onChange={(image)=>{
									ref.current.save({
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
						if(prm.sub && prm.sub[ref.current.item[prm.key]]){
							let sub=[];
							prm.sub[ref.current.item[prm.key]].forEach((prm)=>{sub.push(SelectClass(prm))});
							rtn.push(<div className="sub">{sub}</div>);
						}
						break;
					}
					case 'bool':{
						if(prm.sub && ref.current.item[prm.key]){
							let sub=[];
							prm.sub.forEach((prm)=>{sub.push(SelectClass(prm))});
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
				const currentClass=values.find((value)=>ref.current.states[value]);

				let onChangeCB=(newClass)=>{
					if(currentClass){
						ref.current.states[currentClass]=false;

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
							if(!newSels.includes(value)){ref.current.states[value]=false;}
						});
					}
					bindClasses[newClass].forEach((value)=>{
						ref.current.states[value]=true;
					});
					ref.current.states[newClass]=true;

					ref.current.saveClasses();
					if(prm.effect){prm.effect(currentClass,newClass,ref.current.states,ref.current.props);}
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
						prm.sub[currentClass].forEach((prm,index)=>{sub.push(<Fragment key={index}>{SelectClass(prm)}</Fragment>)});
						rtn.push(<div className="sub">{sub}</div>);
					}
				}
			}
			else{
				rtn.push(
					<CheckboxControl
						label={prm.label}
						onChange={()=>{
							ref.current.states[prm.values]=!ref.current.states[prm.values];
							ref.current.saveClasses();
						}}
						checked={!!ref.current.states[prm.values]}
					/>
				);
				if(prm.sub){
					if(ref.current.states[prm.values]){
						let sub=[];
						prm.sub.forEach((prm,index)=>{sub.push(<Fragment key={index}>{SelectClass(prm)}</Fragment>)});
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
	},[ref]);
	
	if(!ref.current.item || !selectiveClasses){return false;}
	return (
		<PanelBody title={props.title} initialOpen={props.initialOpen || false} icon={props.icon}>
			{selectiveClasses.map((prm,index)=>(
				<Fragment key={index}>
					{SelectClass(prm)}
				</Fragment>
			))}
			{props.children}
		</PanelBody>
	);
};
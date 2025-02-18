Catpow.Customize.ColorSet=(props)=>{
	const {useState,useCallback,useMemo,useEffect,useRef,useReducer}=wp.element;
	const {ColorPicker}=wp.components;
	const {id,value,onChange,param}=props;
	const {roles}=param;
	const [inputMode,setInputMode]=useState('pane');
	const {hexToHsl,hslToHex,hexToHsb}=Catpow.util;
	const [activeRole,setActiveRole]=useState(null);
	
	const isDarkColor=useCallback((color)=>{
		if(!color){return true;}
		if(/^#(\w{6}|\w{8})$/.test(color)){return color.match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).reduce((p,c,i)=>p+parseInt(c,16)*([3,6,2][i]),0) < 0x600;}
		if(color.slice(0,3)==='hsl'){return getTones(color).l<60;}
	},[]);
	const getTextColorForTone=useCallback((tone)=>{
		if(tone.l<70){return '#FFFFFF';}
		return hslToHex({h:tone.h,s:tone.s/2,l:Math.max(0,Math.min(100,tone.l*2-150))});
	},[]);
	const autoDefine=useCallback((colors,key,flag)=>{
		if(flag & 0o01){
			if(key==='b'){
				const bla=colors.tones.b.l*4/1000;
				colors.shade='hsla(0,0%,0%,'+Math.pround(0.6-bla,3)+')';
				colors.shadow='hsla(0,0%,0%,'+Math.pround(0.7-bla,3)+')';
				colors.tones.sh=getTones(colors.shade);
				colors.tones.shd=getTones(colors.shadow);
			}
		}
		if(flag & 0o02){
			if(key==='b'){
				colors.text=getTextColorForTone(colors.tones.b);
				colors.tones.t=getTones(colors.text);
			}
		}
		if(flag & 0o04){
			if(key==='b'){
				colors.sheet=hslToHex({h:colors.tones.b.h,s:colors.tones.b.s,l:colors.tones.b.l+(colors.tones.b.l<50?5:-5)});
				colors.tones.s=getTones(colors.sheet);
			}
		}
		if(flag & 0o10){
			if(key==='b'){
				const bla=colors.tones.b.l*4/1000;
				colors.light='hsla(0,0%,100%,'+Math.pround(0.1+bla,3)+')';
				colors.tones.lt=getTones(colors.light);
			}
		}
		if(flag & 0o20){
			if(key==='m'){
				colors.inside=getTextColorForTone(colors.tones.m);
				colors.tones.i=getTones(colors.inside);
			}
		}
		if(flag & 0o40){
			if(key==='m'){
				colors.accent=hslToHex({
					h:colors.tones.m.h,
					s:Math.min(100,colors.tones.m.s*1.4),
					l:colors.tones.m.l<40?50:(colors.tones.m.l-20)
				});
				colors.tones.a=getTones(colors.accent);
			}
		}
	},[]);
	const getTones=useCallback((color)=>{
		var hsl,hsb;
		if(/^#(\w{6}|\w{8})$/.test(color)){
			hsl=hexToHsl(color);
			hsb=hexToHsb(color);
			return {
				h:hsl.h,
				s:hsl.s,
				l:hsl.l,
				a:color.length===9?(parseInt(color.slice(-2),16)/0xff):1,
				t:(1-hsl.l/100),
				S:hsb.s,
				B:hsb.b,
			}
		}
		if(color.slice(0,3)==='hsl'){
			const matches=color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d\.]+))?\)/);
			return {
				h:matches[1],
				s:matches[2],
				l:matches[3],
				a:matches[4]===undefined?1:matches[4]
			}
		}
	},[]);
	const colorReducer=useCallback((colors,action)=>{
		if(action.autoDefine){
			return {...colors,autoDefine:action.autoDefine^colors.autoDefine};
		}
		if(action.hueRange){
			const newColors={...colors,hueRange:parseInt(action.hueRange)};
			onChange(newColors);
			return newColors;
		}
		if(action.hueShift!==undefined){
			const newColors={...colors,hueShift:parseInt(action.hueShift)};
			onChange(newColors);
			return newColors;
		}
		const {role,value}=action;
		const key=roles[role].shorthand;
		colors.tones[key]=getTones(value);
		const newColors={...colors,[role]:value};
		autoDefine(newColors,key,colors.autoDefine);
		onChange(newColors);
		return newColors;
	},[]);
	const initColors=useCallback((colors)=>{
		if(!colors){colors={}}
		if(!colors.tones){colors.tones={};}
		if(!colors.hueRange){colors.hueRange=30;}
		if(!colors.hueShift){colors.hueShift=0;}
		Object.keys(roles).map((role)=>{
			const key=roles[role].shorthand;
			if(!colors[role]){colors[role]=roles[role].default;}
			if(!colors.tones[key]){colors.tones[key]=getTones(colors[role]);}
		});
		if(undefined===colors.useAutoDefine){
			colors.autoDefine=0o77;
		}
		return colors;
	},[roles]);
	const [colors,setColors]=useReducer(colorReducer,value,initColors);
	
	const ModeSelect=useCallback((props)=>{
		const {Icon}=wp.components;
		const {value,onChange}=props;
		return (
			<div className="cp-colorset-modeselect">
				<Icon className={"colorset-modeselect__item"+(value==='pane'?' active':'')} icon="admin-settings" onClick={()=>onChange('pane')}/>
				<Icon className={"colorset-modeselect__item"+(value==='bulk'?' active':'')} icon="media-text" onClick={()=>onChange('bulk')}/>
			</div>
		);
	},[]);
	const Palette=useCallback((props)=>{
		const {role,value,open,onClick}=props;
		const ref=useRef(null);
		
		
		return (
			<div className={"cp-colorset-palette__item "+(open?'open':'close')}>
				<div className={"chip "+(isDarkColor(value[role])?'is-dark':'is-light')} onClick={onClick} style={{backgroundColor:value[role]}}>
					<div className="label">{roles[role].label}</div>
				</div>
				<Catpow.Popover open={open}>
					<div className="cp-colorset-palette__box">
						<ColorPicker
							color={value[role]}
							onChange={(value)=>{
								setColors({role,value});
							}}
							enableAlpha
							defaultValue="#000"
						/>
					</div>
				</Catpow.Popover>
			</div>
		);
	},[]);
	const HueRange=useCallback((props)=>{
		const {value}=props;
		return (
			<div className="cp-colorset-huerange">
				<div className="cp-colorset-huerange__input">
					<label>Range</label>
					<input
						type="range"
						value={value.hueRange}
						onChange={(e)=>{
							setColors({hueRange:e.currentTarget.value})
						}}
						min={1}
						max={30}
					/>
				</div>
				<div className="cp-colorset-huerange__input">
					<label>Shift</label>
					<input
						type="range"
						value={value.hueShift}
						onChange={(e)=>{
							setColors({hueShift:e.currentTarget.value})
						}}
						min={-180}
						max={180}
					/>
				</div>
			</div>
		);
	},[]);
	const BulkInput=useCallback((props)=>{
		const {Icon}=wp.components;
		const {value}=props;
		const [tmp,setTmp]=useState();
		const keyRoleMap=useMemo(()=>{
			const map={hr:'hueRange',hs:'hueShift'};
			Object.keys(roles).map((role)=>{
				map[roles[role].shorthand]=role;
			});
			return map;
		},[roles]);
		const checkValue=useCallback((tmp)=>{
			const lines=tmp.split("\n");
			if(lines.some((line)=>{
				if(!line){return true;}
				const [key,val]=line.split(' : ');
				const role=keyRoleMap[key];
				if(key==='hr' || key==='hs'){return !/^-?\d+$/.test(val);}
				if(roles[role].alphaEnabled){return !/^hsla?\(\d+,\d+%,\d+%(,[\d\.]+)?\)$/.test(val);}
				return !/^#\w{6}$/.test(val);
			})){return false;}
			return true;
		},[]);
		const commitValue=useCallback((tmp)=>{
			const lines=tmp.split("\n"),colors={};
			lines.map((line)=>{
				const [key,val]=line.split(' : ');
				const role=keyRoleMap[key];
				if(key==='hr' || key==='hs'){
					colors[role]=parseInt(val);
				}
				else{
					colors[role]=val;
					value.tones[key]=getTones(val);
				}
			});
			onChange({...value,...colors});
		},[]);
		useEffect(()=>{
			setTmp(
				Object.keys(roles).map((role)=>roles[role].shorthand+' : '+value[role]).join("\n")+
				"\nhr : "+value.hueRange+"\nhs : "+value.hueShift
			);
		},[value]);
		return (
			<div className="cp-colorset-bulkinput">
				<textarea
					className="cp-colorset-bulkinput__textarea"
					value={tmp}
					rows={Object.keys(roles).length+2}
					onChange={(e)=>{
						const tmp=e.currentTarget.value;
						setTmp(tmp);
						if(checkValue(tmp)){commitValue(tmp);}
					}}
				/>
				<Icon
					className="cp-colorset-bulkinput__clipboard"
					icon="clipboard"
					onClick={()=>navigator.clipboard.writeText(tmp)}
				/>
			</div>
		);
	},[roles]);
	const Preview=useCallback((props)=>{
		const {value}=props;
		const Row=useCallback((props)=>{
			const {h,s,l,hr,hs}=props;
			return (
				<div className="cp-colorset-preview__row">
					{[...Array(12).keys()].map((i)=>(
						<div className="colorset-preview__row__item" style={{backgroundColor:'hsl('+(h+hr*(i-6)+hs)+','+s+'%,'+l+'%)'}} key={i}></div>
					))}
				</div>
			);
		},[]);
		return (
			<div className="cp-colorset-preview">
				<Row h={value.tones.b.h} s={value.tones.b.s} l={value.tones.b.l} hr={value.hueRange} hs={value.hueShift}/>
				<Row h={value.tones.s.h} s={value.tones.s.s} l={value.tones.s.l} hr={value.hueRange} hs={value.hueShift}/>
				<Row h={value.tones.m.h} s={value.tones.m.s} l={value.tones.m.l} hr={value.hueRange} hs={value.hueShift}/>
				<Row h={value.tones.a.h} s={value.tones.a.s} l={value.tones.a.l} hr={value.hueRange} hs={value.hueShift}/>
			</div>
		);
	},[]);
	
	
	switch(inputMode){
		case 'pane':{
			return (
				<div className="cp-colorset">
					<ModeSelect value={inputMode} onChange={setInputMode}/>
					<div className="colorset-palette">
						{Object.keys(roles).map((role)=><Palette role={role} value={colors} open={role===activeRole} onClick={()=>setActiveRole(role===activeRole?null:role)} key={role}/>)}
					</div>
					<HueRange value={colors}/>
					<Preview value={colors}/>
				</div>
			);
		}
		case 'bulk':{
			return (
				<div className="cp-colorset">
					<ModeSelect value={inputMode} onChange={setInputMode}/>
					<BulkInput value={colors}/>
					<Preview value={colors}/>
				</div>
			);
		}
	}
	
}
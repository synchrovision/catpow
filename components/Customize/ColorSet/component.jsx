Catpow.Customize.ColorSet=(props)=>{
	const {useState,useCallback,useMemo,useEffect,useRef,useReducer}=wp.element;
	const {value,onChange,param}=props;
	const {roles}=param;
	
	const Pane=useCallback((props)=>{
		const {role,value}=props;
		const ref=useRef(null);
		const [tmp,setTmp]=useState(value[role]);
		
		useEffect(()=>{
			setTmp(value[role]);
		},[value[role]]);
		
		const isDark=useMemo(()=>{
			return value[role].match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).reduce((p,c,i)=>p+parseInt(c,16)*([3,6,2][i]),0) < 0x600;
		},[value[role]]);
		
		return (
			<div className={'pane pane_'+role+(isDark?' is-dark':' is-light')}>
				<div class="body">
					<div class="label" onClick={(e)=>{ref.current.dispatchEvent(new Event('click'))}}>{roles[role].label}</div>
					<input
						type="text"
						className="text"
						value={tmp}
						onChange={(e)=>{
							if(/^#[\dA-Fa-f]{6}$/.test(e.currentTarget.value)){
								console.log('text color update');
								onChange({...value,[role]:e.currentTarget.value});
							}
							setTmp(e.currentTarget.value);
						}}
					/>
				</div>
				<div class="bg" onClick={(e)=>{ref.current.dispatchEvent(new Event('click'))}} style={{backgroundColor:value[role]}}></div>
				<input
					ref={ref}
					className="input input_color"
					type="color"
					value={value[role]}
					onChange={(e)=>{
						onChange({...value,[role]:e.currentTarget.value});
					}}
				/>
			</div>
		);
	},[]);
	
	if(value === null){return false;}
	
	return (
		<div className="ColorSet">
			<div class="panes">
				{Object.keys(roles).map((role)=><Pane role={role} value={value}/>)}
			</div>
		</div>
	);
}
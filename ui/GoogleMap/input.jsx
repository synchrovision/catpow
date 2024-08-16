Catpow.UI.GoogleMap=(props)=>{
	const {useState,useReducer,useMemo,useCallback}=wp.element;
	const {__}=wp.i18n;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem('GoogleMap'),[]);
	
	
	const init=useCallback((state)=>{
		if(props.value && typeof props.value === 'string' && props.value.startsWith('https://www.google.com/maps')){
			state.value=props.value;
		}
		else{
			state.value='https://www.google.com/maps?output=embed&z=16&t=m&hl=ja&q=Osaka City';
		}
		const url=new URL(state.value);
		state.useQuery=url.searchParams.has('q');
		if(state.useQuery){
			state.queryUrl=url;
			state.embedUrl=new URL('https://www.google.com/maps?output=embed&z=16&t=m&hl=ja&q=Osaka City');
		}
		else{
			state.queryUrl=new URL('https://www.google.com/maps?output=embed');
			state.embedUrl=url;
		}
		return state;
	},[]);
	const reducer=useCallback((state,action)=>{
		const newState={...state};
		if(action.value){
			newState.embedUrl=new URL(action.value);
			newState.value=action.value;
			if(newState.embedUrl.searchParams.has('q')){
				newState.queryUrl=new URL(action.value);
			}
		}
		if(action.hasOwnProperty('useQuery')){
			newState.useQuery=action.useQuery;
		}
		if(newState.useQuery){
			for(const key of ['q','t','z','hl','ll']){
				if(action.hasOwnProperty(key)){
					newState.queryUrl.searchParams.set(key,action[key]);
				}
			}
			newState.value=newState.queryUrl.toString();
		}
		return newState;
	},[]);
	const [state,update]=useReducer(reducer,{},init);
	
	const onChangeValue=useCallback((e)=>{
		let value=e.currentTarget.value;
		const matches=value.match(/src="(.+?)"/);
		if(matches){value=matches[1];}
		update({value});
	},[]);
	
	return (
		<div className={classes()}>
			<div className={classes.preview()}>
				<iframe className={classes.preview.map()} src={state.value} width="320" height="320"/>
			</div>
			<div className={classes.inputs()}>
				<Catpow.TabPanel
					value={state.useQuery}
					options={{'検索':true,'埋め込みURL':false}}
					onChange={(useQuery)=>update({useQuery})}
					size="medium"
				>
					{state.useQuery?(
						<dl className={classes.inputs._dl()}>
							<dt className={classes.inputs._dl.dt()}>
								{__('検索ワード')}
							</dt>
							<dd className={classes.inputs._dl.dd()}>
								<textarea
									className={classes.inputs.textarea()}
									type="text"
									value={state.queryUrl.searchParams.get('q')}
									onChange={(e)=>update({q:e.currentTarget.value})}
									rows="3"
								/>
							</dd>
							<dt className={classes.inputs._dl.dt()}>
								{__('表示形式')}
							</dt>
							<dd className={classes.inputs._dl.dd()}>
								<Catpow.RadioButtons
									value={state.queryUrl.searchParams.get('t')}
									options={{'地図':'m','航空写真':'k','地図 + 航空写真':'h','地形図':'p','Google Earth':'e'}}
									onChange={(t)=>update({t})}
									size="small"
								/>
							</dd>
							<dt className={classes.inputs._dl.dt()}>
								{__('縮尺')}
							</dt>
							<dd className={classes.inputs._dl.dd()}>
								<input
									className={classes.inputs.range()}
									type="range"
									min="0"
									max="23"
									value={state.queryUrl.searchParams.get('z')}
									onChange={(e)=>update({z:e.currentTarget.value})}
								/>
								<input
									className={classes.inputs.number()}
									type="number"
									min="0"
									max="23"
									value={state.queryUrl.searchParams.get('z')}
									onChange={(e)=>update({z:e.currentTarget.value})}
								/>
							</dd>
							<dt className={classes.inputs._dl.dt()}>
								{__('言語')}
							</dt>
							<dd className={classes.inputs._dl.dd()}>
								<Catpow.RadioButtons
									value={state.queryUrl.searchParams.get('hl')}
									options={['ja','us','zh-CN','zh-TW']}
									onChange={(hl)=>update({hl})}
									size="small"
								/>
							</dd>
						</dl>
					):(
						<dl className={classes.inputs._dl()}>
							<dt className={classes.inputs._dl.dt()}>
								{__('埋め込みURL')}
							</dt>
							<dd className={classes.inputs._dl.dd()}>
								<textarea 
									className={classes.inputs.textarea()}
									onChange={onChangeValue}
									value={state.value}
									rows="8"
								/>
							</dd>
						</dl>
					)}
				</Catpow.TabPanel>
			</div>
			{state.value &&
				<Catpow.UI.HiddenValues
					name={props.name}
					value={state.value}
				/>
			}
		</div>
	);
}
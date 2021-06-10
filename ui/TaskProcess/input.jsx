Catpow.UI.TaskProcess=(props)=>{
	const {Fragment,useCallback,useMemo,useState,useReducer}=wp.element;
	const {RadioButtons,CheckBoxes,CheckBox,SelectNumber}=Catpow;
	const {__}=wp.i18n;
	
	const files= props.files || [null];
	
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'SAVE':{
				return {...state};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{
		value:props.value || {}
	});
	const save=useCallback((key,value,result)=>{
		dispatch({type:'SAVE'});
	},[dispatch]);
	
	const processOptions=useMemo(()=>{
		return {
			[__("セーブ")]:'save',
			[__("ロード")]:'load',
			[__("接続承認")]:'check',
			[__("接続承認確認")]:'is_checked',
			[__("タスク完了")]:'complete',
			[__("タスク完了確認")]:'is_completed'
		};
	},[]);
	
	return (
		<div className={'TaskProcess'}>
			{files.map((file)=>(
				<div className="TaskProcess__content">
					<CheckBoxes options={processOptions} value={state.value} onChange={save}/>
					<CheckBox label={__("タスク発行")} selected={state.value.create} onChange={(value)=>{state.value.create=value?{}:false;save();}}/>
					{state.value.create && (
						<dl class="inputs">
							<dt class="label">{__('アクション')}</dt>
							<dd class="input"><input type="text" value={state.value.create.action} onChange={(e)=>{state.value.create.action=e.target.value;save();}}/></dd>
							<dt class="label">{__('有効期限')}</dt>
							<dd class="input"><input type="text" value={state.value.create.expire} onChange={(e)=>{state.value.create.expire=e.target.value;save();}}/></dd>
							<dt class="label">{__('有効回数')}</dt>
							<dd class="input"><input type="number" value={state.value.create.limit} onChange={(e)=>{state.value.create.limit=e.target.value;save();}}/></dd>
						</dl>
					)}
					<Catpow.UI.HiddenValues name={props.name} value={state.value}/>
				</div>
			))}
		</div>
	);
}
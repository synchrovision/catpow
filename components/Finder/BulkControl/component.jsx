/**
* Finderで選択された項目をbulk APIで処理するコンポーネント
*/

Catpow.Finder.BulkControl=(props)=>{
	const {callback}=props;
	const {useState,useCallback,useMemo,useEffect,useContext}=wp.element;
	const {__}=wp.i18n;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	const [value,setValue]=useState(false);
	const [modal,setModal]=useState(false);
	const {cols}=state.index;
	
	useEffect(()=>{
		wp.apiFetch({
			path:state.apiPath+'/bulk/index'
		}).then((bulk)=>{
			dispatch({type:'update',data:{bulk}});
		});
	},[]);
	const options=useMemo(()=>{
		if(!state.bulk){return {};}
		const options={};
		Object.keys(state.bulk).map((name)=>{
			options[state.bulk[name].label]=name;
		});
		return options;
	},[state.bulk]);
	
	const exec_bulk=useCallback(async(action)=>{
		const conf=state.bulk[action];
		const rows=state.items.filter((item)=>item._selected).map((item)=>item._id);
		
		try{
			const vals=await show_modal(conf);
		}
		catch(err){return false;}
		
		wp.apiFetch({
			path:state.apiPath+'/bulk/exec/'+action,
			method: 'POST',
			data:{rows,vals}
		}).then((res)=>{
			console.log(res);
			if(callback){
				callback({action,res,state,dispatch});
			}
			if(res.items){
				res.items.map((newItem)=>{
					const oldItem=state.items.find((oldItem)=>oldItem._id===newItem._id)
					if(oldItem){Object.assign(oldItem,newItem);}
				});
			}
			if(res.message){
				dispatch({type:'showMessage',...res.message});
			}
		});
	},[state,dispatch]);
	const show_modal=useCallback((conf)=>{
		const {ModalForm}=Catpow;
		const {Input,Button}=ModalForm;
		return new Promise((resolve,reject)=>{
			if(!conf.inputs){resolve(false);return;}
			setModal(
				<ModalForm
					onComplete={(values)=>{
						setModal(false);
						if(values.accept){resolve(values);}
						else{reject(false);}
					}}
				>
					<div className="FinderBulkControlForm">
						<h3 className="title">{conf.label}</h3>
						<ul className="inputs">
							{conf.inputs.map((props)=>{
								const {label,desc,caption,...otherPorps}=props;
								return (
									<li className="item">
										{label && <h4 className="label">{label}</h4>}
										{desc && <p className="desc">{desc}</p>}
										<div className="input"><Input {...otherPorps}/></div>
										{caption && <p className="caption">{caption}</p>}
									</li>
								)
							})}
						</ul>
						<ul className="buttons s">
							<li className="item negative">
								<Button
									label={__('キャンセル','catpow')}
									name="accept"
									value={false}
								/>
							</li>
							<li className="item primary">
								<Button
									label={__('実行','catpow')}
									name="accept"
									value={true}
								/>
							</li>
						</ul>
					</div>
				</ModalForm>
			);
		});
	},[setModal]);
	
	return (
		<div className="FinderControl FinderBulkControl">
			<ul className="items">
				<li className={'item'+(open?' active':'')}>
					<div className="inputs">
						<Catpow.SelectBox
							label={__('一括処理','catpow')}
							value={value}
							options={options}
							onChange={(val)=>{setValue(val);}}
						/>
						<button
							className="button"
							onClick={(e)=>{exec_bulk(value)}}
						>{__('適用','catpow')}</button>
					</div>
				</li>
			</ul>
			<Catpow.OuterContents name="modal">{modal}</Catpow.OuterContents>
		</div>
	);
}
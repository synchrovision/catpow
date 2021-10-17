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
		try{
			const conf=state.bulk[action];
			const vals=await show_modal(conf);
			
			wp.apiFetch({
				path:state.apiPath+'/bulk/exec/'+action,
				method: 'POST',
				data:{rows:state.selectedRows.map((row)=>row._id),vals}
			}).then((res)=>{
				if(callback){
					callback({action,res,state,dispatch});
				}
				if(res.remove){
					dispatch({type:'removeRows',rows:state.selectedRows});
				}
				if(res.update){
					dispatch({type:'updateRows',rows:res.update});
				}
				if(res.message){
					dispatch({type:'showMessage',...res.message});
				}
				if(res.download){
					Catpow.util.download(res.download.data,res.download.name || state.name+'.csv','text/csv');
				}
			});
		}
		catch(err){return false;}
	},[state,dispatch]);
	const show_modal=useCallback((conf)=>{
		const {ModalForm,Buttons}=Catpow;
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
						<Buttons>
							<Button
								label={__('キャンセル','catpow')}
								className="negative"
								name="accept"
								value={false}
							/>
							<Button
								label={__('実行','catpow')}
								className="primary"
								name="accept"
								value={true}
							/>
						</Buttons>
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
						<Catpow.Button
							label={__('実行','catpow')}
							onClick={(e)=>{exec_bulk(value)}}
						/>
					</div>
				</li>
			</ul>
			{modal}
		</div>
	);
}
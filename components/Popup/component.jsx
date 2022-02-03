Catpow.Popup=(props)=>{
	const {children,open,onClose,onClosed,closeButton=false,closeOnClickAway=true}=props;
	const {useState,useEffect}=wp.element;
	const [state,setPopupState]=useState('closed');
	
	useEffect(()=>setPopupState(open?'open':'close'),[open]);
	
	return (
		<Catpow.External id="PopupContainer" className="PopupContainer">
			<div
				className={'Popup '+state}
				onAnimationEnd={()=>{
					if(state==='close'){
						setPopupState('closed');
						onClosed && onClosed();
					}
				}}
			>
				<div class="PopupBG" onClick={()=>{if(closeOnClickAway){onClose()}}}></div>
				<div class="PopupBody">
					<div className="PopupContents">{children}</div>
					{closeButton && (
						<div className="PopupControl">
							<div className="close" onClick={onClose}></div>
						</div>
					)}
				</div>
			</div>
		</Catpow.External>
	);
}
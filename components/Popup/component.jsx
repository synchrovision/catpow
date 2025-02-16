Catpow.Popup=(props)=>{
	const {children,open,onClose,onClosed,closeButton=false,closeOnClickAway=true}=props;
	const {useState,useEffect}=wp.element;
	const [state,setPopupState]=useState('closed');
	
	useEffect(()=>setPopupState(open?'open':'close'),[open]);
	
	return (
		<Catpow.External id="PopupContainer" className="cp-popup-container">
			<div
				className={'cp-popup '+state}
				onAnimationEnd={()=>{
					if(state==='close'){
						setPopupState('closed');
						onClosed && onClosed();
					}
				}}
			>
				<div className="cp-popup-bg" onClick={()=>{if(closeOnClickAway){onClose()}}}></div>
				<div className="cp-popup-body">
					<div className="cp-popup-contents">{children}</div>
					{closeButton && (
						<div className="cp-popup-control">
							<div className="close" onClick={onClose}></div>
						</div>
					)}
				</div>
			</div>
		</Catpow.External>
	);
}
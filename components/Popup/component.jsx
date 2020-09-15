Catpow.Popup=function({children,open,onClose,closeButton}){
	var [state,setPopupState]=wp.element.useState('closed');
	if(open && state==='closed'){setPopupState('open');}
	if(!open && state==='open'){setPopupState('close');}
	return (
		<div
			className={'Popup '+state}
			onAnimationEnd={()=>{
				if(state==='close'){
					setPopupState('closed');
				}
			}}
		>
			<div class="PopupBG" onClick={onClose}></div>
			<div class="PopupBody">
				<div className="PopupContents">{children}</div>
				{closeButton && (
					<div className="PopupControl">
						<div className="close" onClick={onClose}></div>
					</div>
				)}
			</div>
		</div>
	);
}
Catpow.Popover=function({children,open,onClose,closeButton,position='top'}){
	var [state,setPopoverState]=wp.element.useState('closed');
	if(open && state==='closed'){setPopoverState('open');}
	if(!open && state==='open'){setPopoverState('close');}
	return (
		<div
			className={`Popover ${state} ${position}`}
			onAnimationEnd={()=>{
				if(state==='close'){
					setPopoverState('closed');
				}
			}}
		>
			<div class="PopoverBody">
				<div class="PopoverArrow"></div>
				<div className="PopoverContents">{children}</div>
				{closeButton && (
					<div className="PopoverControl">
						<div className="close" onClick={onClose}></div>
					</div>
				)}
			</div>
		</div>
	);
}
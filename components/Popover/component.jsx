Catpow.Popover=function(props){
	const {children,open,onClose,closeButton,position='top'}=props;
	const {Fragment,useEffect,useState,useRef}=wp.element;
	const [state,setPopoverState]=useState('closed');
	
	useEffect(()=>setPopoverState(open?'open':(state==='closed'?'closed':'close')),[open]);
	
	const ref=useRef({});
	
	return (
		<Fragment>
			<div className="PopoverAnchor" ref={ref}></div>
			<Catpow.External className="PopoverContainer" trace={ref.current}>
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
			</Catpow.External>
		</Fragment>
	);
}
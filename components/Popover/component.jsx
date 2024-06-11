Catpow.Popover=function(props){
	const {className='Popover',children,open,onClose,size='middle',closeButton=false,closeOnClickAway=true}=props;
	const {Fragment,useEffect,useState,useRef}=wp.element;
	const [state,setPopoverState]=useState('closed');
	const [positionX,setPositionX]=useState('');
	const [positionY,setPositionY]=useState('');
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	useEffect(()=>setPopoverState(open?'open':(state==='closed'?'closed':'close')),[open]);
	
	const ref=useRef({});
	const [contentRef,setContentRef]=useState();
	
	useEffect(()=>{
		if(ref.current.getBoundingClientRect && open){
			const bnd=ref.current.getBoundingClientRect();
			const x=bnd.left+bnd.width/2;
			const ux=window.innerWidth/8,cy=window.innerHeight/2;
			setPositionY((bnd.bottom < cy)?'bottom':'top');
			setPositionX((x < ux*3)?'right':((x > ux*5)?'left':'center'));
			
		}
	},[ref,open]);
	
	useEffect(()=>{
		if(!open || !contentRef || !onClose || !closeOnClickAway){return;}
		const doc=contentRef.ownerDocument;
		const cb=(e)=>{
			if(!contentRef.contains(e.target)){
				onClose();
				doc.body.removeEventListener('click',cb);
			}
			
		};
		requestAnimationFrame(()=>{
			doc.body.addEventListener('click',cb);
		});
		return ()=>doc.body.removeEventListener('click',cb);
	},[open,onClose,closeOnClickAway,contentRef]);
	
	return (
		<Fragment>
			<div className={classes.anchor()} ref={ref}></div>
			<Catpow.External className={classes.container()} trace={ref.current}>
				<div
					className={classes(`is-size-${size} is-${state} is-${positionX} is-${positionY}`)}
					onAnimationEnd={()=>{
						if(state==='close'){
							setPopoverState('closed');
						}
					}}
					ref={setContentRef}
				>
					<div className={classes._body()}>
						<div className={classes._body.arrow()}></div>
						<div className={classes._body.contents()}>{children}</div>
						{closeButton && (
							<div className={classes._body.control()}>
								<div className={classes._body.control.button('is-button-close')} onClick={onClose}></div>
							</div>
						)}
					</div>
				</div>
			</Catpow.External>
		</Fragment>
	);
}
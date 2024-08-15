import {CP} from './CP.jsx';

CP.Link=(props)=>{
	const {className,attr,keys,index,...otherProps}=props;
	
	const item=keys.items?attr[keys.items][index]:attr;
	const href=item[keys.href] || '';
	const target=href.indexOf('://')!==-1?'_brank':null;
	
	return (
		<a className={className} href={href} target={target} rel={target && 'noopener'} {...otherProps}>{props.children}</a>
	);
}
CP.Link.Edit=(props)=>{
	const {className,set,attr,keys,index,isSelected='auto',...otherProps}=props;
	const {onChange}=props;
	const {useMemo,useCallback,useEffect,useState}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem('CP-Link '+className),[className]);
	
	const item=useMemo(()=>keys.items?attr[keys.items][index]:attr,[attr,keys.items,index]);
	
	const [hasCursor,setHasCursor]=useState(false);
	const [ref,setRef]=useState(false);
	
	useEffect(()=>{
		const cb=()=>{
			if(!ref){return;}
			const selection=window.getSelection();
			setHasCursor(selection.rangeCount>0 && ref.contains(selection.getRangeAt(0).commonAncestorContainer));
		}
		document.addEventListener('click',cb);
		return ()=>document.removeEventListener('click',cb);
	},[ref,setHasCursor]);
	
	return (
		<span className={classes({'is-selected':isSelected==='auto'?hasCursor:isSelected})} {...otherProps} ref={setRef}>
			{props.children}
			<span
				className={classes.input()}
				contentEditable={true}
				suppressContentEditableWarning={true}
				onBlur={(e)=>{
					const href=e.target.textContent;
					if(keys.items){
						Object.assign(attr[keys.items][index],{[keys.href]:href});
						set({[keys.items]:JSON.parse(JSON.stringify(attr[keys.items]))});
					}
					else{
						set({[keys.href]:href});
					}
				}}
			>{item[keys.href] || ''}</span>
		</span>
	);
};
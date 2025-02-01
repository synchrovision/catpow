import {CP} from './CP.jsx';
import {bem,rtf} from 'catpow/util';
import {Portal,Transition} from 'catpow/component';
import { useCallback } from 'preact/hooks';



CP.RTF=(props)=>{
	const {className,pref='rtf',attr,keys,index,...otherProps}=props;
	const item=keys.items?attr[keys.items][index]:attr;
	const text=item[keys.text]?item[keys.text]:'';
	
	return (
		<div className={className} data-text={text} dangerouslySetInnerHTML={{__html:rtf(text,pref)}}/>
	);
}
CP.RTF.Edit=(props)=>{
	const {className,pref='rtf',set,attr,keys,index,isSelected=true,...otherProps}=props;
	const {useMemo,useCallback,useState}=wp.element;
	const classes=useMemo(()=>bem('CP-RTF '+className),[className]);
	
	const item=useMemo(()=>keys.items?attr[keys.items][index]:attr,[attr,keys.items,index]);
	const text=item[keys.text];
	const updateText=useCallback((text)=>{
		console.log(rtf(text));
		if(keys.items){
			Object.assign(attr[keys.items][index],{[keys.text]:text});
			set({[keys.items]:JSON.parse(JSON.stringify(attr[keys.items]))});
		}
		else{
			set({[keys.text]:text});
		}
	},[set,attr,keys]);
	const [savedText,setSavedText]=useState(text);
	const [isActive,setIsActive]=useState(false);
	
	return (
		<div className={classes({'is-active':isSelected && isActive})}>
			<div className={classes.contents()} onClick={()=>setIsActive(!isActive)} dangerouslySetInnerHTML={{__html:rtf(item.text,pref)}}/>
			<Portal id="EditRTF">
				<div className={classes.portal({'is-active':isSelected && isActive})}>
					<div className={classes.portal.preview()} dangerouslySetInnerHTML={{__html:rtf(item.text,pref)}}/>
					<div className={classes.portal.input()}>
						<textarea
							className={classes.portal.input.edit()}
							value={text}
							onChange={(e)=>{updateText(e.target.value)}}
						/>
						<div className={classes.portal.input.buttons()}>
							<div className={classes.portal.input.buttons.button('is-reset')} onClick={()=>updateText(savedText)}>Reset</div>
							<div className={classes.portal.input.buttons.button('is-save')} onClick={()=>{setSavedText(text);setIsActive(false);}}>Save</div>
						</div>
					</div>
				</div>
			</Portal>
		</div>
	);
};
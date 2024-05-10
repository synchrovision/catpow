import {Input} from './Input.jsx';

export const ObjectInput=(props)=>{
	const {className='JsonEditor-Input-ObjectInput',layout='block',size='medium',compact=false,level=0,agent,lastChanged}=props;
	const {useState,useMemo,useCallback,useEffect,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const schema=agent.getMergedSchemaForInput();
	
	const InputComponent=useMemo(()=>{
		if(compact){
			return (props)=>{
				const {agent}=props;
				const schema=agent.getMergedSchemaForInput();
				const [open,setOpen]=useState(false);
				const onClose=useCallback(()=>setOpen(false),[setOpen]);
				
				const getLabel=useMemo(()=>{
					if(!schema.label){return ()=>schema.title || schema.key;}
					if(schema.label.includes('{')){
						return (agent)=>schema.label.replaceAll(/{(.+?)}/g,(match,p1)=>{
							const names=p1.split('|');
							for(let name of names){
								if(/^("|').+\1$/.test(name)){return name.slice(1,-1);}
								if(agent.properties[name]){
									let value=agent.properties[name].getValue();
									if(value){return value;}
								}
							}
							return '';
						});
					}
					return ()=>schema.label;
				},[schema.label]);
				const label=getLabel(agent);
				
				return (
					<div className={classes(`is-layout-${layout}`,`is-size-${size}`,`is-level-${level}`,open?'is-open':'is-close')}>
						<div className={classes.label()} onClick={()=>setOpen(!open)}>{label}</div>
						<Catpow.Popover open={open} onClose={onClose}>
							{Object.keys(schema.properties).map((name)=>(
								agent.properties[name] && <Input agent={agent.properties[name]} level={level+1} key={name}/>
							))}
						</Catpow.Popover>
					</div>
				);
			}
		}
		return (props)=>{
			const {agent}=props;
			const schema=agent.getMergedSchemaForInput();
			return (
				<div className={classes(`is-layout-${layout}`,`is-size-${size}`,`is-level-${level}`)}>
					{Object.keys(schema.properties).map((name)=>(
						agent.properties[name] && <Input agent={agent.properties[name]} level={level+1} key={name}/>
					))}
				</div>
			);
		};
	},[classes,layout,size,compact,level]);
	
	if(schema.properties == null){
		return (
			<div className={classes.message()}></div>
		);
	}
	
	return <InputComponent agent={agent}/>;
}
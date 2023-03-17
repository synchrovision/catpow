import {CP} from './CP.jsx';

CP.PlacedPictures=(props)=>{
	const {className,attr,keys,index}=props;
	const item=keys.items?attr[keys.items][index]:attr;
	const pictures=item[keys.pictures];
	return (
		<div className={className}>
			{pictures && pictures.map((picture,index)=>{
				const {style,code,sources,src,alt}=picture;
				return (
					<div className="item" style={CP.parseStyleString(style)} key={index}>
						{code || (
							<picture className="picture">
								{sources && sources.map((source)=>(
									<source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device}/>
								))}
								<img className="img" src={src} alt={alt}/>
							</picture>
						)}
					</div>
				);
			})}
		</div>
	);
};

CP.PlacedPictures.Edit=(props)=>{
	const {className,set,attr,keys,index}=props;
	const {useState,useMemo,useCallback,useRef,useEffect}=wp.element;
	const item=keys.items?attr[keys.items][index]:attr;
	const pictures=item[keys.pictures];
	
	const [mode,setMode]=useState(props.mode || 'view');
	
	const [currentItemNodes,setCurrentItemNodes]=useState([]);
	const [currentItemIndexes,setCurrentItemIndexes]=useState([]);
	const [containerNode,setContainerNode]=useState(false);

	const targetRefs=useRef([]);
	useEffect(()=>{
		setCurrentItemNodes(currentItemIndexes.sort().map((index)=>targetRefs.current[index]));
	},[currentItemIndexes,targetRefs,setCurrentItemNodes]);
	
	const remPx=useMemo(()=>parseFloat(getComputedStyle(document.documentElement).fontSize),[]);
	const getPlaceStyle=useCallback((bnd,tgtBnd)=>{
		const style={
			position:'absolute',
			width:Math.pround(tgtBnd.width/remPx,2)+'rem',
			height:Math.pround(tgtBnd.height/remPx,2)+'rem'
		};
		const px=(tgtBnd.left-bnd.left+tgtBnd.width/2)/bnd.width;
		const py=(tgtBnd.top-bnd.top+tgtBnd.height/2)/bnd.height;
		if(px<0.4){
			style.left=Math.pround((tgtBnd.left-bnd.left)/remPx,4)+'rem';
		}
		else if(px>0.6){
			style.right=Math.pround((bnd.right-tgtBnd.right)/remPx,4)+'rem';
		}
		else{
			style.left=style.right=0;
			style['margin-left']=style['margin-right']='auto';
		}
		if(py<0.4){
			style.top=Math.pround((tgtBnd.top-bnd.top)/remPx,4)+'rem';
		}
		else if(py>0.6){
			style.bottom=Math.pround((bnd.bottom-tgtBnd.bottom)/remPx,4)+'rem';
		}
		else{
			style.top=style.bottom=0;
			style['margin-top']=style['margin-bottom']='auto';
			
		}
		return style;
	},[]);
	
	const onClickItem=useCallback((e)=>{
		const index=parseInt(e.currentTarget.dataset.index);
		const selected=currentItemIndexes.includes(index);
		if(e.shiftKey){
			if(selected){
				setCurrentItemIndexes(currentItemIndexes.filter((i)=>i!==index));
			}
			else{
				setCurrentItemIndexes(currentItemIndexes.concat([index]));
			}
		}
		else if(!selected){
			setCurrentItemIndexes([index]);
		}
	},[currentItemIndexes,setCurrentItemIndexes]);
	
	const updatePictures=useCallback((pictures)=>{
		if(keys.items){
			const items=attr[keys.iteems];
			items[index][keys.pictures]=[...pictures];
			set({[keys.items]:[...items]});
		}
		else{
			set({[keys.pictures]:[...pictures]});
		}
	},[attr,set,keys,index]);
	
	const save=useCallback(()=>{
		if(keys.items){
			items[index][keys.pictures]=JSON.parse(JSON.stringify(pictures));
			set({[keys.items]:[...items]});
		}
		else{
			set({[keys.pictures]:JSON.parse(JSON.stringify(pictures))});
		}
	},[set,pictures]);
	
	return (
		<div className={className} ref={setContainerNode}>
			{pictures && pictures.map((picture,index)=>{
				const {style,code,sources,src,alt}=picture;
				return (
					<div className="item"
						style={CP.parseStyleString(style)}
						onClick={(e)=>mode==='edit' && onClickItem(e)}
						onDoubleClick={()=>mode==='view' && setMode('edit')}
						data-index={index}
						ref={(el)=>targetRefs.current[index]=el}
						key={index}
					>
						{code?(
							<CP.DummyImage text={code}/>
						):(
							<picture className="picture">
								{sources && sources.map((source)=>(
									<source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device}/>
								))}
								<img className="img" src={src} alt={alt}/>
							</picture>
						)}
					</div>
				);
			})}
			{mode==='edit' && 
				<CP.BoundingBox
					targets={currentItemNodes}
					container={containerNode}
					onChange={()=>{
						const bnd=containerNode.getBoundingClientRect();
						currentItemNodes.forEach((el)=>{
							pictures[el.dataset.index].style=getPlaceStyle(bnd,el.getBoundingClientRect());
						});
						save();
					}}
					onDeselect={()=>{
						setCurrentItemIndexes([]);
					}}
					onDuplicate={()=>{
						pictures.push.apply(pictures,pictures.filter((item,index)=>currentItemIndexes.includes(index)));
						save();
					}}
					onDelete={()=>{
						currentItemIndexes.sort().revers().forEach((index)=>picture.splice(index,1));
						save();
					}}
				/>
			}
		</div>
	);
}
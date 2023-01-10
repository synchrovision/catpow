import {CP} from './CP.jsx';

CP.ServerSideRender=(props)=>{
	const {className,block,attributes}=props;
	const {RawHTML,useState,useMemo,useRef,useEffect}=wp.element;
	const {useDebounce}=wp.compose;
	const [response,setResponse]=useState(false);
	const [hold,setHold]=useState(false);
	const [stylesheets,setStylesheets]=useState([]);

	useEffect(()=>{
		if(hold){return;}
		const path='/cp/v1/blocks/render/'+block.split('/')[1];
		const data={
			context:'edit',
			attributes
		};
		const post_id=wp.data.select('core/editor').getCurrentPostId();
		if(post_id){data.post_id=post_id;}
		wp.apiFetch({path,data,method:'POST'}).then((res)=>{
			if(!res){return;}
			setStylesheets(res.deps.styles);
			setResponse(res.rendered);
		}).catch((res)=>{
			console.log(res);
		}).finally(()=>{
			setTimeout(()=>setHold(false),500);
		});
		setHold(true);
	},[JSON.stringify(attributes)]);

	return (
		<>
			<RawHTML className={className}>{response}</RawHTML>
			{stylesheets.map((stylesheet)=><link rel="stylesheet" href={stylesheet} key={stylesheet}/>)}
		</>
	);
};
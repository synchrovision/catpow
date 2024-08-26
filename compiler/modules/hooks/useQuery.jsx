const cache={};
export const useQuery=(uri)=>{
	const {useState,useEffect,useRef}=wp.element;
	const [data,setData]=useState(false);
	const [isPending,setIsPending]=useState(true);
	
	useEffect(()=>{
		if(cache.hasOwnProperty(uri)){
			setData(cache[uri]);
			setIsPending(false);
		}
		else{
			setIsPending(true);
			fetch(uri).then((res)=>res.json()).then((data)=>{
				cache[uri]=data;
				setData(data);
				setIsPending(false);
			})
		}
	},[uri]);
	return [data,isPending];
}
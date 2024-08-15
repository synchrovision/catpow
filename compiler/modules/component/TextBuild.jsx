import {bem} from 'util';

export const TextBuild=(props)=>{
	const {useState,useCallback,useMemo,useEffect}=wp.element;
	const {className="cp-textbuild",children,delay=5,interval=150}=props;
	const classes=useMemo(()=>bem(className),[className]);
	
	const [progress,setProgress]=useState(0);
	
	const letters=useMemo(()=>{
		const letters=[];
		children.forEach((line)=>{
			if(typeof line === 'string'){
				Array.from(line).forEach((letter)=>letters.push(letter));
			}
			else{
				letters.push(line);
			}
		});
		return letters;
	},[children]);
	
	useEffect(()=>{
		let progress=-delay; 
		const timer=setInterval(()=>{
			progress++;
			setProgress(progress);
			if(progress>letters.length){
				clearInterval(timer);
			}
		},interval);
		return ()=>clearInterval(timer);
	},[letters,delay,interval]);
	
	return (
		<div className={classes()}>
			{letters.map((letter,index)=>(
				(typeof letter === 'string')?
				(<span className={classes._letter('is-'+(index<progress?'show':'hide'))}>{letter}</span>):letter
			))}
		</div>
	);
}
import {SVG} from 'component';
import {bem} from 'util';

export const Honycomb=(props)=>{
	const {useCallback,useMemo,useContext}=wp.element;
	const Screen=useContext(SVG.Screen);
	const Colors=useContext(SVG.Colors);
	const {className='cp-honycomb',width=Screen.width,height=Screen.height,size=34,gap=2,callback,...otherProps}=props;
	const classes=useMemo(()=>bem(className),[className]);
	
	const cellCallback=useMemo((props)=>{
		if(undefined===callback){return ()=>({});}
		return callback;
	},[callback]);
	
	const drawHexagon=useMemo(()=>{
		const w=size*Math.sqrt(3)/2,h=size/2;
		return `m 0,-${size} l ${w},${h} 0,${size} -${w},${h} -${w},-${h} 0,-${size} z`;
	},[size]);
	
	const Hexagon=useCallback((props)=>{
		const {className,...dynamicProps}=cellCallback(props);
		return (
			<path className={classes._cell(className)} d={`M ${props.x} ${props.y} ${drawHexagon}`} {...otherProps} {...dynamicProps}/>
		);
	},[cellCallback,otherProps,classes]);
	
	const cells=useMemo(()=>{
		const stepX=Math.sqrt(3)*(size+gap/2),stepY=(size+gap/2)*1.5,cells=[];
		let row,rows=Math.ceil(height/stepY),
			col,cols=Math.ceil(width/stepX);
		for(row=0;row<=rows;row++){
			for(col=0;col<=cols;col++){
				cells.push({row,col,x:col*stepX+stepX*(row&1)/2,y:row*stepY,r:size});
			}
		}
		return cells;
	},[width,height,size,gap]);
	
	return (
		<g className={className}>
			{cells.map((props)=><Hexagon {...props}/>)}
		</g>
	);
}
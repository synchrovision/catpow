import {Animation} from 'component';
import {easeOutQuad,preserveDistances,preserveAnimationValues,bem} from 'util';

export const MosaicWave=(props)=>{
	const {className='cp-mosaicwave',size=40,dur=200,hue=240,saturation=80,lightness=80,amount=8}=props;
	const {useMemo,useCallback}=wp.element;
	const frames=wp.element.useContext(Animation.Frames);
	const screen=wp.element.useContext(Animation.Screen);
	
	const rows=useMemo(()=>[...Array(Math.ceil(Math.max(screen.height/size,1))).keys()],[screen.height,size]);
	const cols=useMemo(()=>[...Array(Math.ceil(Math.max(screen.width/size,1))).keys()],[screen.width,size]);
	
	const waves=useMemo(()=>{
		const du=dur*2/amount;
		return [...Array(amount).keys()].map((i)=>({
			r:Math.floor(Math.random()*rows.length),
			c:Math.floor(Math.random()*cols.length),
			p:Math.round(i*du)
		}));
	},[amount,dur,rows,cols]);
	
	const colors=useMemo(()=>{
		return preserveAnimationValues((p)=>`hsl(${hue-30+p*60},${saturation}%,${p*lightness}%)`,dur,easeOutQuad);
	},[dur,hue,saturation,lightness]);
	const powers=useMemo(()=>{
		return preserveAnimationValues((p)=>dur*Math.max(0,1-Math.abs(p*2-1)),dur);
	},[dur]);
	const dists=useMemo(()=>{
		return preserveDistances(Math.max(rows.length,cols.length),dur/Math.hypot(rows.length,cols.length));
	},[dur,rows,cols]);
	
	const results=useMemo(()=>{
		waves.forEach((wave)=>{
			if(wave.p>dur*2){
				wave.r=Math.floor(Math.random()*rows.length);
				wave.c=Math.floor(Math.random()*cols.length);
				wave.p=0;
			}
			wave.p++;
		});
		const coef=1/waves.length;
		return rows.map((r)=>{
			return cols.map((c)=>{
				var p=0;
				waves.forEach((wave)=>{
					p+=powers[Math.max(0,Math.min(dur-1,wave.p-dists[Math.abs(r-wave.r)][Math.abs(c-wave.c)]))];
				});
				p=Math.max(0,Math.min(dur-1,Math.floor(p*coef)));
				return colors[p];
			});
		});
	},[frames.frame]);
	const classes=useMemo(()=>bem(className),[className]);
	
	return (
		<div
			className={classes()}
			style={{
				"display":"grid",
				"grid-template-columns":`repeat(${cols.length},1fr)`,
				"grid-template-rows":`repeat(${rows.length},1fr)`,
				"position":"absolute",
				"inset":0
			}}
		>
			{results.map((row)=>row.map((color)=>(
				<div className={classes._tile()} style={{"backgroundColor":color}}></div>
			)))}
		</div>
	);
}
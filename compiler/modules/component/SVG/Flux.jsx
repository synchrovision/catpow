import {bez,preserveAnimationValues,waveFromBase36,bem} from 'util';

export const Flux=(props)=>{
	const {className='cp-svg-flux',dur=2000,delay=10,gap=4,width=1920,height=1080,color="white",amount=20,progress=0}=props;
	const {useMemo,useCallback}=wp.element;
	
	const parseSeed=useCallback((seed)=>{
		seed=seed.replace(' ','').padEnd(3,'0');
		const nums=seed.slice(0,2).split('').map((c)=>parseInt(c,36));
		const n=3+(nums[0]&3);
		const u=2/(n-2);
		const ox=-(1+u)/2;
		const sx=(1+(nums[0]>>2&3))/4;
		const sy=(1+(nums[0]>>4&3))*sx;
		const base={
			p:1+(nums[1]&7),
			d:1+(nums[1]>>3&7)
		};
		const wv1=waveFromBase36(seed.slice(2));
		const points=[...Array(n).keys()].map((i)=>{
			const {p,d}=base;const c=i/n;
			
			return {
				x:ox+u*i,y:1/2,sx,sy,
				px:(wv1(c)+1)/2*p,
				py:(wv1(c)+1)/2*p,
				dx:(wv1(c)+1)/2*d,
				dy:(wv1(c)+1)/2*d
			};
		});
		console.log(points);
		return points;
	},[]);
	const getOrbit=useCallback((o,t,d,n)=>{
		console.log({o,t,d,n});
		const ns=[o,o+t,o-t,o];
		return [...Array(n).keys()].map((i)=>o+Math.round(Math.sin(Math.PI*2*i/n)*t));
	},[]);
	const orbits=useMemo(()=>{
		var i,l;
		const orbits=[];
		const points=props.points || parseSeed(props.seed || 'LNiZvx8mmJHIF1ZaL7HghNucZNZH3YVa');
		return points.map((pnt)=>([
			getOrbit(pnt.x*width,pnt.sx*width,pnt.px*dur,dur+Math.ceil(pnt.px*pnt.dx*dur)),
			getOrbit(pnt.y*height,pnt.sy*height,pnt.py*dur,dur+Math.ceil(pnt.py*pnt.dy*dur))
		]));
	},[props.points,props.seed,width,height,dur,delay]);
	const drawer=useMemo(()=>{
		const cp=(os,p,n)=>{
			const x=os[n][0],y=os[n][1];
			return x[p%x.length]+','+y[p%y.length];
		}
		const ap=(os,p,n)=>{
			const x1=os[n][0],x2=os[n+1][0],y1=os[n][1],y2=os[n+1][1];
			return (x1[p%x1.length]+x2[p%x2.length]>>1)+','+(y1[p%y1.length]+y2[p%y2.length]>>1);
		}
		const l=orbits.length - 1;
		const ns=[...Array(l).keys()].slice(1);
		return (os,p)=>`M ${ap(os,p,0)} Q ${ns.map((n)=>cp(os,p,n)+' '+ap(os,p,n)).join(' Q ')}`;
	},[orbits.length]);
	
	const opacities=useMemo(()=>[...Array(amount).keys()],[amount]).map((i)=>1-Math.abs(i/amount*2-1));
	const classes=useMemo(()=>bem(className),[className]);
	
	
	return (
		<g className={classes()}>
		{useMemo(()=>opacities.map((o,i)=>{
			return (
				<path
					className={classes.path()}
					d={drawer(orbits,progress+i*gap)}
					fill="none"
					stroke={color}
					strokeOpacity={o}
				/>
			);
		},[orbits,progress]))}
		</g>
	);
}
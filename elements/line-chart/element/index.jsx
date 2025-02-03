import {el,svgEl,bem,hfloor,hceil,hunit,classNamesToFlags,flagsToClassNames} from 'catpow/util';
import cssCode from 'css:./style.css';


class LineChart extends HTMLElement{
	constructor(){
		super();
	}
	connectedCallback(){
		const shadow = this.attachShadow({ mode: "open" });
		const classes=bem('line-chart');
		
		const values=JSON.parse(this.getAttribute('values'));
		
		const flags={hasLabels:this.hasAttribute('labels')};
		
		const min=this.hasAttribute('min')?parseFloat(this.getAttribute('min')):hfloor(Math.min(0,Math.min.apply(null,values.map((row)=>Math.min.apply(null,row)))),1);
		const max=this.hasAttribute('max')?parseFloat(this.getAttribute('max')):hceil(Math.max(0,Math.max.apply(null,values.map((row)=>Math.max.apply(null,row)))),1);
		const len=max-min;
		const step=this.hasAttribute('step')?this.getAttribute('step'):hunit(len,2);
		
		const rowLabels=[];
		const colLabels=flags.hasLabels?JSON.parse(this.getAttribute('labels')):null;
		const maxValueLength=flags.hasLabels?Math.max(min.toString().length,max.toString().length):0;
		const maxLabelLength=flags.hasLabels?Math.max.apply(null,colLabels.map((label)=>label.length)):2;
		const pdl=maxValueLength*12+20;
		const pdr=maxLabelLength*6+10;
		const pdt=10;
		const pdb=flags.hasLabels?20:0;
		
		const height=this.getAttribute('height') || 480;
		const width=this.getAttribute('width') || Math.max(height,maxLabelLength*values[0].length*12+pdl);
		const graphWidth=width-pdl-pdr;
		const graphHeight=height-pdt-pdb;
		
		
		const rowLength=values.length;
		const rowUnit=graphHeight/len;
		const rowHeight=step*rowUnit;
		const colLength=values[0].length;
		const colWidth=graphWidth/(colLength-1);
		
		const labelFontSize=colLabels && Math.min(20,colWidth/maxLabelLength);
		
		const grid={x:[],y:[]}
		
		const gridLines=[];
		let v,y,x;
		for(v=max;v>=min;v-=step){
			rowLabels.push(v.toString());
			grid.y.push(pdt+rowUnit*(max-v));
		}
		for(x=pdl;x<=width-pdr;x+=colWidth){
			grid.x.push(x);
		}
		
		shadow.appendChild(el('style',{},[cssCode]));
		shadow.appendChild(svgEl('svg',{xmlns:'http://www.w3.org/2000/svg',viewBox:`0 0 ${width} ${height}`,class:classes(flagsToClassNames(flags))},[
			values.map((row)=>{
				const points=row.map((val,c)=>(pdl+colWidth*c)+' '+(pdt+rowUnit*(max-val))).join(',');
				return (
					svgEl('g',{class:classes.values()},[
						svgEl('polyline',{points,fill:'none',class:classes.values.line()}),
						row.map((val,c)=>svgEl('circle',{cx:pdl+colWidth*c,cy:pdt+rowUnit*(max-val),r:4,class:classes.values.circle()}))
					])
				);
			}),
			svgEl('g',{class:classes.grid()},[
				grid.x.map((x)=>svgEl('line',{x1:x,x2:x,y1:pdt,y2:height-pdb,class:classes.grid.line('is-x')})),
				grid.y.map((y)=>svgEl('line',{x1:pdl,x2:width-pdr,y1:y,y2:y,class:classes.grid.line('is-y')})),
			]),
			colLabels && svgEl('g',{class:classes.labels('is-column')},colLabels.map((label,c)=>svgEl('text',{class:classes.labels.label(),x:pdl+colWidth*c,y:height-pdb+10},label))),
			rowLabels && svgEl('g',{class:classes.labels('is-row')},rowLabels.map((label,r)=>svgEl('text',{class:classes.labels.label(),x:pdl-10,y:pdt+rowHeight*r},label)))
		]));
	}
}
customElements.define('line-chart',LineChart);
/**
Create function to test the date is adapted to the rule
The format of the rule is like bellow.
w=0
d>10 && m<12
d in 5,10,15,20,25 && (w=0 || w>4)
*/
function date_cond(rule){
	rule=rule.toLowerCase();
	const get_extractor=(type)=>{
		switch(type){
			case 'y':
				return (date)=>date.getFullYear();
			case 'm':
				return (date)=>date.getMonth()+1;
			case 'd':
				return (date)=>date.getDate();
			case 'w':
				return (date)=>date.getDay();
			case 'h':
				return (date)=>date.getHours();
			default:
				console.error(type+" is not valid value type");
				return (date)=>date.getTime();
		}
	};
	const get_comparer=(compare)=>{
		switch(compare){
			case '=':
			case '==':
				return (v,val)=>v==val;
			case '!=':
			case '!==':
				return (v,val)=>v!=val;
			case '<':
				return (v,val)=>v<val;
			case '>':
				return (v,val)=>v>val;
			case '<=':
			case '=<':
				return (v,val)=>v<=val;
			case '>=':
			case '=>':
				return (v,val)=>v>=val;
			case 'in':
				return (v,vals)=>vals.includes(v);
			case 'not in':
				return (v,vals)=>!vals.includes(v);
			default:
				console.error(compare+" is not valid compare");
				return ()=>false;
		}
	};
	const get_tester=(rule)=>{
		const matches=rule.match(/^(\w)\s*(!=|[=><]+|in|not in)\s*(.+)$/);
		const extractor=get_extractor(matches[1]);
		const comparer=get_comparer(matches[2]);
		const vals=['in','not in'].includes(matches[2])?matches[3].split(',').map((n)=>parseInt(n)):matches[3];
		return (date)=>comparer(extractor(date),vals);
	};
	const parse_rule=(rule)=>{
		let crr={c:[]};
		let cp=0;
		const split_and_push=(arr,str)=>{
			arr.push.apply(arr,str.split(/(\|\||&&)/).map((str)=>str.trim()).filter((str)=>/\S/.test(str)));
		};
		const convert_to_tester=(data)=>{
			const cbs=[[]];
			let crr=cbs[0];
			for(let i=0;i<data.length;i+=2){
				const cb=(typeof data[i] === 'string')?get_tester(data[i]):convert_to_tester(data[i].c);
				if(i===0 || data[i-1]==='&&'){crr.push(cb);}
				else{crr=[cb];cbs.push(crr);}
			}
			return (date)=>cbs.some(cbg=>cbg.every(cb=>cb(date)));
		};
		for(var i=0,l=rule.length;i<l;i++){
			if(rule[i]==='('){
				const p=crr;
				crr={p,s:i+1,c:[]};
				split_and_push(p.c,rule.substring(cp,i));
				cp=i+1;
				p.c.push(crr);
			}
			else if(rule[i]===')'){
				crr.e=i;
				split_and_push(crr.c,rule.substring(cp,i));
				cp=i+1;
				crr=crr.p;
			}
		}
		split_and_push(crr.c,rule.substring(cp,i));
		return convert_to_tester(crr.c);
	};
	return parse_rule(rule);
}
import {store,getElement,getContext,withScope} from '@wordpress/interactivity';


const parseCond=(cond)=>{
	if(!cond){return ()=>true;}
	const testGroups=cond.split('||').map((sec)=>sec.split('&&').map((code)=>{
		const matches=code.match(/(!|#)?(\w+)\s*(([<=>]+)\s*(\-?\d))?/);
		if(!matches){
			return ()=>{
				console.error('can not parse cond : '+code);
				return false;
			}
		}
		const key=matches[2];
		if(matches[3]==null){
			if(matches[1]==null){
				return (context)=>context.flags[key];
			}
			else if(matches[1]==='!'){
				return (context)=>!context.flags[key];
			}
			else{
				return (context)=>context.log[key];
			}
		}
		else{
			const value=parseInt(matches[5]);
			switch(matches[4]){
				case '<':{
					return (context)=>{console.log({value,scores:context.scores});return context.scores[key]<value;};
				}
				case '<=':
				case '=<':{
					return (context)=>context.scores[key]<=value;
				}
				case '=':
				case '==':{
					return (context)=>context.scores[key]==value;
				}
				case '=>':
				case '>=':{
					return (context)=>context.scores[key]>=value;
				}
				case '>':{
					return (context)=>context.scores[key]>value;
				}
				default:{
					return ()=>{
						console.error('can not parse cond : '+code);
						return false;
					}
				}
			}
		}
	}));
	return (context)=>testGroups.some((testGroup)=>testGroup.every((test)=>test(context)));
};
const applyFlag=(context,flagCode)=>{
	if(!flagCode){return;}
	flagCode.split(';').forEach((chunk)=>{
		if(chunk[0]==='!'){context.flags[chunk.slice(1)]=false;}
		else{context.flags[chunk]=true;}
	});
};
const applyScore=(context,scoreCode)=>{
	if(!scoreCode){return;}
	scoreCode.split(';').forEach((chunk)=>{
		const [key,val]=chunk.split(':');
		if(val){
			if(context.scores[key]==null){context.scores[key]=0;}
			context.scores[key]+=parseInt(val);
		}
	});
};

store("diagnosis",{
	state:{
		get activeSection(){
			return getContext().activeSection;
		},
		get step(){
			return getContext().step;
		}
	},
	actions:{
		onClickButton:(e)=>{
			const {attributes}=getElement();
			const context=getContext();
			context.log[attributes['data-button-id']]=true;
			applyFlag(context,attributes['data-flag']);
			applyScore(context,attributes['data-score']);
			if(context.doSendEvent && Catpow.eventProcessor!=null){
				Catpow.eventProcessor.send({
					
				});
			}
			const testSection=(section)=>{
				if(section.test(context)){
					context.activeSection=section.ref.dataset.index;
					return true;
				}
				return false;
			};
			context.count++;
			for(context.step++;context.sectionsByStep[context.step]!=null;context.step++){
				if(context.sectionsByStep[context.step].some(testSection)){return;}
			}
			console.error('section not found');
		}
	},
	callbacks:{
		initBlock:()=>{
			const {ref}=getElement();
			const context=getContext();
			context.doSendEvent=ref.classList.contains('do-send-event');
			context.flags={};
			context.scores={};
			context.log={};
			const sectionsByStep={};
			const buttonById={};
			ref.querySelectorAll('[data-role="section"]').forEach((ref)=>{
				if(sectionsByStep[ref.dataset.step]==null){
					sectionsByStep[ref.dataset.step]=[];
				}
				sectionsByStep[ref.dataset.step].push({ref,test:parseCond(ref.dataset.cond)});
				ref.querySelectorAll('[data-role="button"]').forEach((buttonRef)=>{
					buttonById[buttonRef.dataset.buttonId]={section:ref,button:buttonRef};
				});
			});
			context.sectionsByStep=sectionsByStep;
			context.buttonById=buttonById;
		},
		isActiveSection:()=>{
			const {attributes}=getElement();
			return attributes['data-index']==getContext().activeSection;
		}
	}
});
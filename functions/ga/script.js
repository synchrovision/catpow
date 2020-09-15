window.Catpow = window.Catpow || {};

window.Catpow.ga={
	parseEventString:function(str){
		// action:category«label_name:label»#value@event
		if(!str){return {};}
		var matches=str.match(/^([\d\w_]+?)?(?::([\d\w_]+?))?(?:«(?:(.+?):)?([^:]+?)?»)?(?:#(\d+))?(?:@(\w+))?$/);
		if(!matches){return {};}
		var rtn={};
		if(matches[1]){rtn.action=matches[1];}
		if(matches[2]){rtn.category=matches[2];}
		if(matches[3]){rtn.label_name=matches[3];}
		if(matches[4]){rtn.label=matches[4];}
		if(matches[5]){rtn.value=matches[5];}
		rtn.event=matches[6] || 'click';
		return rtn;
	},
	createEventString:function(data){
		if(!data.action)return '';
		var rtn=data.action;
		if(data.category){rtn+=':'+data.category;}
		if(data.label_name || data.label){
			rtn+='«';
			if(data.label_name){rtn+=data.label_name+':';}
			if(data.label){rtn+=data.label;}
			rtn+='»';
		}
		if(data.value){rtn+='#'+data.value;}
		if(data.event && data.event!=='click'){rtn+='@'+data.event;}
		return rtn;
	},
	send:function(data){
		if(!data.action){return false;}
		var prm={};
		if(data.category){prm.event_category=data.category;}
		if(data.label){
			if(data.label_name){prm[data.label_name]=data.label;}
			else{prm.event_label=data.label;}
		}
		if(data.value){prm.value=data.value;}
		gtag('event',data.action,prm);
	}
}
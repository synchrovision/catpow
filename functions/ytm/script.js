/* global ytag */
window.Catpow = window.Catpow || {};

window.Catpow.yss={
	parseEventValue:function(value){
		if(!value){return [];}
		return value.split(' + ').map(window.Catpow.yss.parseEventString);
	},
	parseEventString:function(str){
		// action:category«label_name:label»#value@event
		if(!str){return {};}
		var matches=str.match(/^([\d\w_]+?)(?:#(\d+))?(?:@(\w+))?$/);
		if(!matches){return {};}
		var rtn={};
		if(matches[1]){rtn.label=matches[1];}
		if(matches[2]){rtn.value=matches[2];}
		rtn.event=matches[3] || 'click';
		return rtn;
	},
	createEventValue:function(datas){
		return datas.filter((data)=>!!data.label).map(window.Catpow.yss.createEventString).join(' + ');
	},
	createEventString:function(data){
		if(!data.label)return '';
		var rtn=data.label;
		if(data.value){rtn+='#'+data.value;}
		if(data.event && data.event!=='click'){rtn+='@'+data.event;}
		return rtn;
	},
	send:function(data){
		if(!data.label){return false;}
		var config={yahoo_conversion_id:window.primaryYssId,yahoo_conversion_label:data.label};
		if(data.value){config.yahoo_conversion_value=data.value;}
		ytag({type:'yss_conversion',config});
	}
}
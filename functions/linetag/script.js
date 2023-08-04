/* global linetag */
window.Catpow = window.Catpow || {};
window.Catpow.linetag={
	processerId:'linetag',
	guideURL:false,
	eventParams:{
		category:{type:'text',label:'カテゴリ'},
		type:{type:'text',label:'タイプ'},
		send_to:{type:'text',label:'送信先',common:true}
	},
	parseEventValue:function(value){
		if(!value){return [];}
		return value.split(' + ').map(window.Catpow.linetag.parseEventString);
	},
	parseEventString:function(str){
		// category«type»@event→send_to
		if(!str){return {};}
		var matches=str.match(/^([\d\w_\-]+?)(?:«([^»]+?)?»)?(?:@(\w+))?(?:→(.+))?$/);
		if(!matches){return {};}
		var rtn={};
		if(matches[1]){rtn.category=matches[1];}
		if(matches[2]){rtn.type=matches[2];}
		rtn.event=matches[3] || 'click';
		if(matches[4]){rtn.send_to=matches[4];}
		return rtn;
	},
	createEventValue:function(datas){
		return datas.filter((data)=>!!data.category).map(window.Catpow.linetag.createEventString).join(' + ');
	},
	createEventString:function(data){
		if(!data.category)return '';
		var rtn=data.category;
		if(data.type){rtn+='«'+data.type+'»';}
		if(data.event && data.event!=='click'){rtn+='@'+data.event;}
		if(data.send_to){rtn+='→'+data.send_to;}
		return rtn;
	},
	send:function(data){
		const {category,event,send_to,...params}=data;
		if(!category){return false;}
		_lt('send',category,params,[send_to || window.Catpow.linetag.initialTagId]);
	}
}
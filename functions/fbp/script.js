/* global fbp */
window.Catpow = window.Catpow || {};

window.Catpow.fbp={
	processerId:'fbp',
	guideURL:'https://developers.facebook.com/docs/facebook-pixel/reference',
	eventTypes:{
		AddPaymentInfo:{label:'支払い情報の追加',options:['content_category','contents','currency','value'],require:[]},
		AddToCart:{label:'カートに追加',options:['content_name','content_type','contents','currency','value'],require:['content_type','contents']},
		AddToWishlist:{label:'ウィッシュリストに追加',options:['content_name','content_category','contents','currency','value'],require:[]},
		CompleteRegistration:{label:'登録完了',options:['content_name','currency','status','value'],require:[]},
		Contact:{label:'問い合わせ',options:[],require:[]},
		CustomizeProduct:{label:'製品のカスタマイズ',options:[],require:[]},
		Donate:{label:'寄付',options:[],require:[]},
		FindLocation:{label:'場所の検索',options:[],require:[]},
		InitiateCheckout:{label:'チェックアウト開始',options:['content_category','contents','currency','num_items','value'],require:[]},
		Lead:{label:'リード',options:['content_category','content_name','currency','value'],require:[]},
		Purchase:{label:'購入',options:['content_name','content_type','contents','currency','num_items','value'],require:['currency','value']},
		Schedule:{label:'日時を指定',options:[],require:[]},
		Search:{label:'検索',options:['content_category','contents','currency','search_string','value'],require:[]},
		StartTrial:{label:'トライアル開始',options:['currency','predicted_ltv','value'],require:[]},
		SubmitApplication:{label:'応募',options:[],require:[]},
		Subscribe:{label:'サブスクリプション登録',options:['currency','predicted_ltv','value'],require:[]},
		ViewContent:{label:'コンテンツビュー',options:['content_category','content_name','content_type','contents','currency','value'],require:[]},
		_custom:{options:['custom']}
	},
	eventParams:{
		content_category:{type:'text',label:'製品カテゴリ'},
		//content_ids:{type:'text',label:'製品ID（SKU）'},//useless while contents input exists
		content_name:{type:'text',label:'製品名'},
		content_type:{type:'gridbuttons',label:'タイプ',options:{'product':'製品','product_group':'製品グループ'}},
		contents:{type:'data',label:'内容',cols:{id:{label:'製品ID'},quantity:{type:'number',label:'数量'}}},
		currency:{type:'gridbuttons',label:'通貨',default:'JPY',options:['JPY','USD','EUR']},
		value:{type:'number',label:'価格'},
		num_items:{type:'number',label:'数量'},
		predicted_ltv:{type:'number',label:'予想顧客 生涯価格'},
		search_string:{type:'text',label:'検索ワード'},
		status:{type:'bool',label:'登録ステータス'},
		custom:{type:'data',label:'カスタムパラメータ',cols:{label:{label:'ラベル'},value:{label:'値'}}},
		fb_pixel_id:{type:'text',label:'送信先',common:true}
	},
	currencies:{
		'¥':'JPY',
		'$':'USD',
		'€':'EUR'
	},
	parseEventValue:function(value){
		if(!value){return [];}
		return value.split(' + ').map(window.Catpow.fbp.parseEventString);
	},
	parseEventString:function(str){
		// eventType:«content_name#content_category×num_items»「id×quantity,id×quantity」*¥value¥~predicted_ltv##search_string##{status}【custom】@event→fb_pixel_id
		if(!str){return {};}
		if(!window.Catpow.fbp.EventStringPattern){
			var currencyUnits=Object.keys(window.Catpow.fbp.currencies).join('');
			var patternString=
				'^(\\w+):'+
				'(?:«(.+?)(?:#(.+?))?(?:×(\\d+))?»)?'+
				'(?:「(.+)」(\\*)?)?'+
				'(?:(['+currencyUnits+'])(\\d+(?:\\.\\d+)?))?(?:(['+currencyUnits+'])\\~(\\d+(?:\\.\\d+)?))?'+
				'(?:##(.+?)##)?(?:{(y|n)})?'+
				'(?:【(.+)】)?'+
				'(?:@(\\w+))?(?:→(.+))?$';
			window.Catpow.fbp.EventStringPattern=new RegExp(patternString);
		}
		var matches=str.match(window.Catpow.fbp.EventStringPattern);
		if(!matches){return {};}
		var rtn={};
		var keys=[
			'eventType','content_name','content_category','num_items',
			'contents','content_type',
			'currency','value','currency','predicted_ltv',
			'search_string','status','custom',
			'event','fb_pixel_id'
		];
		keys.map(function(key,index){
			if(matches[index+1]!==undefined){rtn[key]=matches[index+1];}
		});
		if(rtn.contents){
			rtn.contents=rtn.contents.split(',').map(function(chunk){
				var parts=chunk.split('×');
				return {id:parts[0],quantity:parts[1]};
			});
			rtn.content_type=rtn.content_type?'product_group':'product';
		}
		if(rtn.currency){
			rtn.currency=window.Catpow.fbp.currencies[rtn.currency];
		}
		if(rtn.status){
			rtn.status=rtn.status==='y';
		}
		if(rtn.custom){
			rtn.custom=rtn.custom.split(',').map(function(entry){
				entry=entry.split(':');
				return {label:entry[0],value:entry[1]};
			});
		}
		if(!rtn.event){rtn.event='click';}
		return rtn;
	},
	createEventValue:function(datas){
		return datas.filter((data)=>!!data.eventType).map(window.Catpow.fbp.createEventString).join(' + ');
	},
	createEventString:function(data){
		if(!data.eventType)return '';
		var rtn=data.eventType+':';
		var currencyUnits={};
		Object.keys(window.Catpow.fbp.currencies).map(function(unit){
			currencyUnits[window.Catpow.fbp.currencies[unit]]=unit;
		});
		if(data.category){rtn+=':'+data.category;}
		if(data.content_name){
			rtn+='«'+data.content_name;
			if(data.content_category){rtn+='#'+data.content_category;}
			if(data.num_items){rtn+='×'+data.num_items;}
			rtn+='»';
		}
		if(data.contents){
			rtn+='「';
			rtn+=data.contents.map(function(entry){
				return entry.id+'×'+entry.quantity;
			}).join(',');
			rtn+='」';
			if(data.content_type==='product_group'){rtn+='*';}
		}
		if(data.currency){
			if(data.value){rtn+=currencyUnits[data.currency]+data.value;}
			else if(data.predicted_ltv){rtn+=currencyUnits[data.currency]+'~'+data.predicted_ltv;}
		}
		if(data.search_string){rtn+='##'+data.search_string+'##';}
		if(data.status!==undefined){rtn+='{'+(data.status?'y':'n')+'}';}
		if(data.custom){
			rtn+='【';
			rtn+=data.custom.map(function(entry){
				return entry.label+':'+entry.value;
			}).join(',');
			rtn+='】';
		}
		if(data.event && data.event!=='click'){rtn+='@'+data.event;}
		if(data.fb_pixel_id){rtn+='→'+data.fb_pixel_id;}
		return rtn;
	},
	send:function(data){
		if(!data.eventType){return false;}
		var prm={};
		var isCustomEvent=!window.Catpow.fbp.eventTypes[data.eventType];
		var eventParams=isCustomEvent?[
				'content_name','content_category','num_items',
				'contents','content_type',
				'currency','value','currency','predicted_ltv',
				'search_string','status'
			]:window.Catpow.fbp.eventTypes[data.eventType].options;
		eventParams.map(function(eventParam){
			if(data[eventParam]!==undefined){prm[eventParam]=data[eventParam];}
		});
		if(data.custom){
			data.custom.map(function(entry){
				prm[entry.label]=entry.value;
			});
		}
		if(data.fb_pixel_id){
			fbp(isCustomEvent?'trackSingleCustom':'trackSingle',data.fb_pixel_id,data.eventType,prm);
		}
		else{
			fbp(isCustomEvent?'trackCustom':'track',data.eventType,prm);
		}
		
	}
}
window.Catpow.eventProcessor.register('fbp',window.Catpow.fb);
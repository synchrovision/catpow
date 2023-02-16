/* global gtag */
window.Catpow = window.Catpow || {};

window.Catpow.ga={
	processerId:'ga',
	guideURL:'https://developers.google.com/gtagjs/reference/ga4-events?hl=ja',
	eventTypes:{
		add_payment_info:{label:'支払い情報を送信',options:['currency','value','items'],require:['currency','value','items']},
		add_shipping_info:{label:'配送先情報を送信',options:['currency','value','items'],require:['currency','value','items']},
		add_to_cart:{label:'カートに追加',options:['currency','value','items'],require:['currency','value','items']},
		add_to_wishlist:{label:'ウィッシュリストに追加',options:['currency','value','items'],require:['currency','value','items']},
		begin_checkout:{label:'購入手続きを開始',options:['currency','value','items'],require:['currency','value','items']},
		earn_virtual_currency:{label:'仮想通貨の授与',options:[],require:[]},
		generate_lead:{label:'見込み顧客の発掘',options:['currency','value'],require:['currency','value']},
		join_group:{label:'グループに参加',options:[],require:[]},
		level_end:{label:'レベルを終了',options:[],require:[]},
		level_start:{label:'レベルを開始',options:[],require:[]},
		level_up:{label:'レベルアップ',options:[],require:[]},
		login:{label:'ログイン',options:[],require:[]},
		post_score:{label:'スコアを投稿',options:[],require:[]},
		purchase:{label:'購入',options:['transaction_id','currency','value','items'],require:['transaction_id','currency','value','items']},
		refund:{label:'払い戻し',options:['transaction_id','currency','value','items'],require:['transaction_id','currency','value','items']},
		remove_from_cart:{label:'カートから削除',options:['currency','value','items'],require:['currency','value','items']},
		search:{label:'検索',options:['search_term'],require:['search_term']},
		select_content:{label:'コンテンツを選択',options:[],require:[]},
		select_item:{label:'商品を選択',options:['items'],require:['items']},
		select_promotion:{label:'プロモーションを選択',options:[],require:[]},
		share:{label:'コンテンツを共有',options:[],require:[]},
		sign_up:{label:'アカウント登録',options:[],require:[]},
		spend_virtual_currency:{label:'仮想通貨を消費',options:['value','virtual_currency_name'],require:['value','virtual_currency_name']},
		tutorial_begin:{label:'チュートリアルを開始',options:[],require:[]},
		tutorial_complete:{label:'チュートリアルを完了',options:[],require:[]},
		unlock_achievement:{label:'実績解除',options:['achievement_id'],require:['achievement_id']},
		view_cart:{label:'カートを表示',options:['currency','value','items'],require:['currency','value','items']},
		view_item:{label:'商品を表示',options:['currency','value','items'],require:['currency','value','items']},
		view_item_list:{label:'商品一覧を表示',options:['items'],require:['items']},
		view_promotion:{label:'プロモーションを表示',options:['items'],require:[]},
		_custom:{options:['category','event_label']}
	},
	currencies:{
		'¥':'JPY',
		'$':'USD',
		'€':'EUR'
	},
	eventParams:{
		category:{type:'text',label:'カテゴリ',list:'gaEventCategory',values:['engagement','ecommerce']},
		event_label:{type:'text',label:'ラベル'},
		currency:{type:'gridbuttons',label:'通貨',default:'JPY',options:['JPY','USD','EUR']},
		value:{type:'number',label:'価格'},
		items:{type:'data',label:'商品',cols:{
			item_id:{label:'商品ID'},
			item_name:{label:'商品名'}
		}},
		custom:{type:'data',label:'カスタムパラメータ',cols:{label:{label:'ラベル'},value:{label:'値'}}},
		send_to:{type:'text',label:'送信先',common:true}
	},
	parseEventValue:function(value){
		if(!value){return [];}
		return value.split(' + ').map(window.Catpow.ga.parseEventString);
	},
	parseEventString:function(str){
		// eventType:category«event_label»#event_value@event→send_to
		if(!str){return {};}
		if(!window.Catpow.ga.EventStringPattern){
			var currencyUnits=Object.keys(window.Catpow.ga.currencies).join('');
			var patternString=
				'^([\\d\\w_]+?)?'+
				'(?::([\\d\\w_]+?))?'+
				'(?:«([^»]+?)?»)?'+
				'(?:(['+currencyUnits+'])(\\d+(?:\\.\\d+)?))?'+
				'(?:「(.+)」)?'+
				'(?:【(.+)】)?'+
				'(?:@(\\w+))?(?:→(.+))?$';
			window.Catpow.ga.EventStringPattern=new RegExp(patternString);
		}
		var matches=str.match(window.Catpow.ga.EventStringPattern);
		if(!matches){return {};}
		var rtn={};
		var keys=[
			'eventType','category','event_label','currency','value','items',
			'custom','event','send_to'
		];
		keys.map(function(key,index){
			if(matches[index+1]!==undefined){rtn[key]=matches[index+1];}
		});
		if(rtn.currency){
			rtn.currency=window.Catpow.ga.currencies[rtn.currency];
		}
		if(rtn.items){
			rtn.items=rtn.items.split(',').map(function(chunk){
				var parts=chunk.split('：');
				return {item_id:parts[0],item_name:parts[1]};
			});
			rtn.content_type=rtn.content_type?'product_group':'product';
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
		return datas.filter((data)=>!!data.eventType).map(window.Catpow.ga.createEventString).join(' + ');
	},
	createEventString:function(data){
		if(!data.eventType)return '';
		var rtn=data.eventType;
		var currencyUnits={};
		Object.keys(window.Catpow.ga.currencies).map(function(unit){
			currencyUnits[window.Catpow.ga.currencies[unit]]=unit;
		});
		if(data.category){rtn+=':'+data.category;}
		if(data.event_label){rtn+='«'+data.event_label+'»';}
		if(data.currency && data.value){rtn+=currencyUnits[data.currency]+data.value;}
		if(data.items){
			rtn+='「';
			rtn+=data.items.map(function(entry){
				return entry.item_id+'：'+entry.item_name;
			}).join(',');
			rtn+='」';
		}
		if(data.custom){
			rtn+='【';
			rtn+=data.custom.map(function(entry){
				return entry.label+':'+entry.value;
			}).join(',');
			rtn+='】';
		}
		if(data.event && data.event!=='click'){rtn+='@'+data.event;}
		if(data.send_to){rtn+='→'+data.send_to;}
		return rtn;
	},
	send:function(data){
		if(!data.eventType){return false;}
		var prm={};
		if(data.category){prm.event_category=data.category;}
		if(data.event_label){prm.event_label=data.event_label;}
		if(data.currencyc){prm.currency=data.currency;}
		if(data.value){prm.value=data.value;}
		if(data.items){prm.items=data.items;}
		if(data.custom){
			data.custom.map(function(entry){
				prm[entry.label]=entry.value;
			});
		}
		gtag('event',data.eventType,prm);
	}
}
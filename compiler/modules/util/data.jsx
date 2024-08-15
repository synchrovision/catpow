export const getTreeData=(items)=>{
	const hasUriKey=items[0].hasOwnProperty('uri');
	const hasIdKey=items[0].hasOwnProperty('id');
	const hasParentKey=items[0].hasOwnProperty('parent');
	if(!hasUriKey && !(hasIdKey && hasParentKey)){return items;}
	const parentMap=new Map();
	const childrenMap=new Map();
	const itemsMap=new Map();
	const itemsDict={};
	const primaryKey=(hasIdKey && hasParentKey)?'id':'uri';
	const h={
		get:function(target,prop,receiver){
			if(prop==='parent'){
				if(!parentMap.has(target)){return null;}
				return parentMap.get(target);
			}
			if(prop==='children'){
				if(!childrenMap.has(target)){return null;}
				return childrenMap.get(target);
			}
			return Reflect.get(...arguments);
		}
	};
	const f=(item)=>new Proxy(item,h);
	const getParentItem=hasParentKey?(item)=>{
		if(!item.parent){return null;}
		return itemsDict[item.parent];
	}:(item)=>{
		if(item.uri[0]!=='/'){return null;}
		const baseUri=item.uri.replace(/\/index\.(php|html)$/,'/');
		if(baseUri==='/'){return null;}
		const parentUri=baseUri.replace(/\/(\w+\/|[^\/]+)$/,'/');
		if(parentUri==='/'){return null;}
		return itemsDict[parentUri];
	};
	items.forEach((item)=>{
		itemsMap.set(item,f(item));
		itemsDict[item[primaryKey]]=item;
		if(primaryKey==='uri'){
			const baseUri=item.uri.replace(/\/index\.(php|html)$/,'/');
			if(item.uri!==baseUri){
				itemsDict[baseUri]=item;
			}
		}
	});
	items.forEach((item)=>{
		const parentItem=getParentItem(item);
		if(!parentItem){return;}
		parentMap.set(item,itemsMap.get(parentItem));
		if(!childrenMap.has(parentItem)){childrenMap.set(parentItem,[]);}
		childrenMap.get(parentItem).push(itemsMap.get(item));
	});
	return items.filter((item)=>!parentMap.has(item)).map((item)=>itemsMap.get(item));
};
export const getChildrensOfLevel=(tree,level)=>{
	if(level<1){return [tree];}
	return tree.filter((item)=>item.children).reduce((p,item)=>p.concat(getChildrensOfLevel(item.children,level-1)),[]);
}
export const getItemsOfLevel=(tree,level)=>{
	if(level<1){return tree;}
	return tree.filter((item)=>item.children).reduce((p,item)=>p.concat(getItemsOfLevel(item.children,level-1)),[]);
}
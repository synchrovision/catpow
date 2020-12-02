const Finder=(props)=>{
	const {useState,useCallback,useEffect,useRef}=wp.element;
	const {basepath,baseurl}=props;
	const [path,setPath]=useState(props.path);
	const [query,setQuery]=useState(props.query || {});
	const [index,setIndex]=useState(null);
	const [contents,setContents]=useState(null);
	const [pageState,setPageState]=useState(null);
	const [items,setItems]=useState([]);
	const [tags,setTags]=useState([]);
	
	const cache=useRef({});
	
	
	
	const parsePath=useCallback((path)=>{
		let matches;
		if(matches=path.match(/^(\d+)\/?$/)){
			return {item_id:matches[1]};
		}
	},[]);
	const save=useCallback((state)=>{
		const {path,query}=state;
		let q={};
		if(query){
			Object.keys(query).map((key)=>{
					q['q['+key+']'+(Array.isArray(query[key])?'[]':'')]=query[key];
			});
		}
		history.pushState(state,'',URI(baseurl).query(q).toString());
	},[]);
	const toggleTag=useCallback((tag)=>{
		let i,tags=query.tags || [];
		if((i=tags.indexOf(tag.id))===-1){tags.push(tag.id);}
		else{tags.splice(i,1);}
		setQuery(Object.assign({},query,{tags}));
		save({path,query});
	},[path,query]);
	
	const showDetailOfItem=useCallback((item)=>{
		setPageState('wait');
		wp.apiFetch({
			path:'/cp/v1/'+basepath+'/finder/'+item.id+'/detail'
		}).then((contents)=>{
			setPageState('success');
			setContents(contents);
			save({path,query});
		});
	},[path,query]);
	
	useEffect(()=>{
		wp.apiFetch({
			path:'/cp/v1/'+basepath+'/finder/index'
		}).then(setIndex);
		window.addEventListener('popstate',(e)=>{
			setPath(e.state.path);
			setQuery(e.state.query);
		});
	},[props]);
	
	const pathData=parsePath(path);
	useEffect(()=>{
		if(index){
			let tagsById={};
			index.tags.map((tag)=>{
				tag.count=0;
				tagsById[tag.id]=tag;
			});
			let items=index.items.filter((item)=>{
				if(query.tags){
					return query.tags.every((tag)=>{
						return item.tags.indexOf(tag)!==-1;
					});
				}
				return true;
			});
			setItems(items);
			items.map((item)=>{
				item.tags.map((tag)=>{
					tagsById[tag].count++;
				})
			});
		}
	},[path,query,index]);
	
	
	
	const texts=[
		(<p>情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。 とかくに人の世は住みにくい。
どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。意地を通せば窮屈だ。山路を登りながら、こう考えた。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。智に働けば角が立つ。 
とかくに人の世は住みにくい。山路を登りながら、こう考えた。とかくに人の世は住みにくい。住みにくさが高じると、安い所へ引き越したくなる。住みにくさが高じると、安い所へ引き越したくなる。情に棹させば流される。 
意地を通せば窮屈だ。住みにくさが高じると、安い所へ引き越したくなる。意地を通せば窮屈だ。</p>),
		(<p>吾輩は猫である。名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ち付いて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛を以て装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にも大分逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中が余りに突起している。そうしてその穴の中から時々ぷうぷうと烟を吹く。どうも咽せぽくて実に弱った。これが人間の飲む烟草というものである事は漸くこの頃知った。</p>),
		(<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>)
	];
	
	const [ti,setTi]=useState(1);
	const [hoge,setHoge]=useState(texts[0]);
	
	const qTags=query.tags || [];
	if(index===null){return false;}
	return (
		<div className="finder">
			<Catpow.Transition fitHeight={true}>
				{hoge}
			</Catpow.Transition>
			<button
				onClick={()=>{
					setTi((ti+1)%3);
					setHoge(texts[ti]);
				}}
			>test</button>
			{index.tags && (
				<ul className="finder_tags">
				{index.tags.map((tag)=>{
						let className="finder_tags_item";
						if(qTags.indexOf(tag.id)!==-1){className+=' active';}
						if(tag.count===0){className+=' empty';}
						return (
							<li
								className={className}
								onClick={()=>toggleTag(tag)}
							>{tag.label}<span className="finder_tags_item_count">({tag.count})</span></li>
						);
				})}
				</ul>
			)}
			<ul className="finder_items">
			{items.map((item)=>{
				return (
					<div
						className="finder_items_item"
						onClick={()=>showDetailOfItem(item)}
					>
						{item.title}
					</div>
				);
			})}
			</ul>
			{contents && (
				<Catpow.Contents className="finder_contents" html={contents.html} deps={contents.deps}/>
			)}
		</div>
	);
}
const TestCounter=()=>{
	const {useState}=wp.element;
	const [count,setCount]=useState(0);
	return (
		<div onClick={()=>setCount(count+1)}>counter {count}</div>
	);
};
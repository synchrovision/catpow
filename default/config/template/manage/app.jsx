const app=(props)=>{
	const {useCallback}=wp.element;
	
	const App=useCallback((props)=>{
		const {useContext,useCallback,Fragment}=wp.element;
		const {Nav,Spacer,Main,SelectLayout,SelectColumns,BulkControl,FilterControl,Download,PerPage,Status,Contents,Pagenate}=Catpow.Finder;
		const {state,dispatch}=useContext(Catpow.FinderContext);
		
		return(
			<Catpow.Transition>
				{state.focused?(
					<Fragment depth={2}>
						<div className={"icon dashicons dashicons-arrow-left-alt"} onClick={()=>dispatch({type:'blurItem'})}></div>
						<div>
							{state.focused.simei}
							吾輩は猫である。名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ち付いて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛を以て装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にも大分逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中が余りに突起している。そうしてその穴の中から時々ぷうぷうと烟を吹く。どうも咽せぽくて実に弱った。これが人間の飲む烟草というものである事は漸くこの頃知った。
						</div>
					</Fragment>
				):(
					<Fragment depth={1}>
						<Nav>
							<BulkControl/>
							<SelectLayout/>
							<SelectColumns/>
							<FilterControl/>
							<Download/>
							<Spacer/>
							<PerPage/>
							<Status/>
						</Nav>
						<Main>
							<Contents/>
						</Main>
						<Pagenate/>
					</Fragment>
				)}
			</Catpow.Transition>
		);
	},[]);
	
	return (
		<Catpow.Finder {...props}>
			<App/>
		</Catpow.Finder>
	);
}
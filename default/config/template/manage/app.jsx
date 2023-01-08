window.app=(props)=>{
	const {useCallback}=wp.element;
	
	const App=useCallback((props)=>{
		const {useContext,useCallback,Fragment}=wp.element;
		const {Nav,Spacer,Main,SelectLayout,SelectColumns,BulkControl,FilterControl,Download,PerPage,Status,SearchResults,Focused,Pagenate}=Catpow.Finder;
		const {state,dispatch,info}=useContext(Catpow.FinderContext);
		
		return(
			<Catpow.Transition>
				{state.wait?(
					<Fragment depth={0}>
						<Catpow.Spinner/>
					</Fragment>
				):state.focused?(
					<Fragment depth={2}>
						<div className={"icon dashicons dashicons-arrow-left-alt"} onClick={()=>dispatch({type:'blurItem'})}></div>
						<Focused/>
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
							<SearchResults/>
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
export default (props)=>{
	const {useCallback}=wp.element;
	
	const App=useCallback((props)=>{
		const {useContext,useCallback,Fragment}=wp.element;
		const {Nav,Spacer,Main,SelectLayout,SelectColumns,BulkControl,FilterControl,Download,PerPage,Status,SearchResults,Focused,Pagenate}=Catpow.Finder;
		const {state,dispatch,info}=useContext(Catpow.FinderContext);
		
		const Phase=useCallback((props)=>props.children)
		
		return(
			<Catpow.Transition>
				{state.wait?(
					<Phase depth={0}>
						<Catpow.Spinner/>
					</Phase>
				):state.focused?(
					<Phase depth={2}>
						<div className={"icon dashicons dashicons-arrow-left-alt"} onClick={()=>dispatch({type:'blurItem'})}></div>
						<Focused/>
					</Phase>
				):(
					<Phase depth={1}>
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
					</Phase>
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
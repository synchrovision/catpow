export const SVG=(props)=>{
	const {className="cp-svg",width=1200,height=400,colors,children,...otherProps}=props
	const {useState,useMemo,useCallback,useEffect,useRef,useReducer}=wp.element;
	
	const {Colors,Screen}=useMemo(()=>{
		['Colors','Screen'].forEach((contextName)=>{
			if(undefined===SVG[contextName]){
				SVG[contextName]=wp.element.createContext({});
			}
		});
		return SVG;
	},[]);
	const ColorsValue=useMemo(()=>{
		if(undefined!==colors){return colors;}
		return {h:20,s:80,l:80};
	},[colors]);
	const ScreenValue=useMemo(()=>({width,height}),[width,height]);
	
	return (
		<Colors.Provider value={ColorsValue}>
			<Screen.Provider value={ScreenValue}>
				<svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" {...otherProps}>
					{children}
				</svg>
			</Screen.Provider>
		</Colors.Provider>
	);
}
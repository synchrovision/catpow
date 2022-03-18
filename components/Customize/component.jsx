/**
* CatpowのWordPressのテーマカスタマイザで用いる
* コンポーネントのベースとなるコンポーネント
*/


Catpow.Customize=(props)=>{
	const {useState,useCallback,useMemo,useEffect,useRef,useReducer}=wp.element;
	const {id,type='Text',param}=props;
	const [value,setValue]=useState(null);
	
	useEffect(()=>{
		wp.customize(id,(setting)=>{setValue(setting.get());})
	},[id]);
	const onChange=useCallback((value)=>{
		setValue(value);
		wp.customize.control(id).setting.set(value);
	},[id]);
	
	if(value===null){return false;}
	return wp.element.createElement(Catpow.Customize[type],{id,value,onChange,param});
}
declare var Catpow:any,wp:any,CP:any,React:any;

const {__}=wp.i18n;

import { SelectiveClassConfig } from "cpdev/type";


wp.blocks.registerBlockType('catpow/pagenavigation',{
	edit({attributes,className,setAttributes,isSelected}){
		const {useMemo}=wp.element;
		const {InspectorControls}=wp.blockEditor;
		const {PanelBody,TextareaControl}=wp.components;
		const {serverSideRender:ServerSideRender}=wp;
		const {query}=attributes;
		
		const selectiveClasses=useMemo(()=>{
			const selectiveClasses:SelectiveClassConfig[]=[
				{name:'type',type:'gridbuttons',label:'タイプ',values:{'is-style-tree':'tree','is-style-list':'list','is-style-card':'card','is-style-grid':'grid'}},
				{name:'hasOwnTitle',input:'bool',label:'カスタムタイトル',key:'hasOwnTitle'},
				{name:'title',input:'text',label:'タイトル',key:'title',cond:(states,props)=>props.attr.hasOwnTitle},
				{name:'level',label:'level',input:'range',key:'level',min:0,max:3},
				{name:'depth',label:'depth',input:'range',key:'depth',min:0,max:2},
				{name:'query',label:'query',input:'textarea',key:'query'},
				"customMargin"
			];
			wp.hooks.applyFilters('catpow.blocks.pagenavigation.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		
		return (
			<>
				<ServerSideRender block='catpow/pagenavigation' attributes={attributes}/>
				<InspectorControls>
					<CP.SelectClassPanel
						title='設定'
						icon='admin-generic'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
				</InspectorControls>
			</>
		);
	},

	save({attributes,className}){
		return <></>
	}
});
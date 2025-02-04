wp.blocks.registerBlockType('catpow/rtf',{
	title:'🐾 RTF',
	description:'MarkDownに似た記法でHTMLを書けるブロック',
	icon:'editor-code',
	category:'catpow',
	attributes:{
		text:{type:'string',default:''}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,onReplace,mergeBlocks,isSelected}){
		return (
			<CP.RTF.Edit
				set={setAttributes}
				attr={attributes}
				isSelected={isSelected}
			/>
		);
	},
	save({attributes,className,setAttributes}){
		return (
			<CP.RTF attr={attributes}/>
		);
	}
});


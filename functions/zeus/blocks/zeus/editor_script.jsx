registerBlockType('catpow/zeus',{
	title: '🐾 Zeus',
	icon: 'cart',
	category: 'catpow',
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes}=attributes;
		const primaryClass='wp-block-catpow-zeus';
        
        return [
			<div id="ZeusButtonContainer">
				<div id="ZeusButton" className="wp-block-catpow-zeus">
					<RichText onChange={(text)=>{setAttributes({text});}} value={attributes.text}/>
				</div>
			</div>
        ];
    },
	save({attributes,className}){
        return (
			<div id="ZeusButtonContainer">
				<div id="ZeusButton" className="wp-block-catpow-zeus">
					<RichText.Content value={attributes.text}/>
				</div>
			</div>
        );
	},
});
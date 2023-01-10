wp.blocks.registerBlockType('catpow/userinfo',{
	title: '🐾 UserInfo',
	description:'ログイン中のユーザーの情報を表示するためのコンテナです。ログインしていない場合はログインフォームが表示されます。',
	icon: 'admin-users',
	category: 'catpow-functional',
	example:CP.example,
	edit({attributes,setAttributes,className}){
        return (
			<div class="embedded_content">
				<div class="label">UserInfo</div>
				<InnerBlocks template={[
					['core/paragraph',{content:'[output last_name] [output first_name]'}]
				]}/>
			</div>
        );
    },

	save({attributes,className,setAttributes}){
		return <InnerBlocks.Content/>;
	}
});
registerFormatType('catpow/ruby',{
	title:'Ruby',
	tagName:'ruby',
	className:null,
	edit({isActive,value,onChange}){
		const onToggle=()=>{
			if(isActive){
				return onChange(wp.richText.toggleFormat(value,{type:'catpow/ruby'}));
			}
			if(wp.richText.isCollapsed(value)){alert(__('ルビをつけたいテキストを選択してください'));return;}
			let rt=prompt(__('ルビを入力'));
			if(rt===null){return;}
			return onChange(wp.richText.insert(
				value,wp.richText.create({html:'<ruby>'+wp.richText.slice(value).text+'<rt>'+rt+'</rt></ruby>'}),value.start,value.end
			));
		}
		
		const icon=(
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M3.6,19.8L8.9,6.2h1.9l5.6,13.6h-2l-1.6-4.1H7l-1.5,4.1H3.6z M7.6,14.2h4.6l-1.4-3.8c-0.4-1.1-0.8-2.1-1-2.8
				c-0.2,0.9-0.4,1.7-0.7,2.6L7.6,14.2z"/>
				<path d="M10.7,4.4C10.4,4.7,10.1,4.9,9.8,5C9.6,5.1,9.3,5.1,9,5.1C8.4,5.2,8,5,7.7,4.8c-0.3-0.3-0.4-0.6-0.4-1c0-0.2,0-0.4,0.2-0.6
					C7.6,3,7.7,2.8,7.9,2.7C8,2.6,8.2,2.5,8.5,2.4c0.2,0,0.4-0.1,0.7-0.1c0.7-0.1,1.1-0.2,1.4-0.3c0-0.1,0-0.2,0-0.2
					c0-0.3-0.1-0.6-0.2-0.7c-0.2-0.2-0.5-0.3-0.9-0.3C9.1,0.8,8.8,0.9,8.6,1C8.4,1.2,8.3,1.4,8.2,1.8L7.4,1.7C7.5,1.3,7.6,1,7.8,0.8
					c0.2-0.2,0.4-0.4,0.7-0.5c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.7,0,1,0.1c0.3,0.1,0.4,0.2,0.6,0.4c0.1,0.1,0.2,0.3,0.3,0.5
					c0,0.1,0,0.4,0,0.7l0,1.1c0,0.8,0,1.2,0.1,1.4c0,0.2,0.1,0.4,0.2,0.6l-0.8,0C10.8,4.9,10.7,4.7,10.7,4.4z M10.6,2.6
					C10.3,2.8,9.9,2.9,9.3,3C9,3,8.7,3.1,8.6,3.1C8.5,3.2,8.4,3.3,8.3,3.4C8.2,3.5,8.2,3.6,8.2,3.8c0,0.2,0.1,0.4,0.3,0.5
					c0.2,0.1,0.4,0.2,0.7,0.2c0.3,0,0.6-0.1,0.8-0.2s0.4-0.3,0.5-0.6c0.1-0.2,0.1-0.5,0.1-0.8L10.6,2.6z"/>
			</svg>
		);

		return [
			<Fragment>
				<RichTextShortcut
					type={'primary'}
					character={'r'}
					onUse={onToggle}
				/>
				<RichTextToolbarButton
					icon={icon}
					title={'Ruby'}
					onClick={onToggle}
					isActive={isActive}
					shortcutType={'primary'}
					shortcutCharacter={'r'}
				/>
			</Fragment>
		];
	}
});
registerFormatType('catpow/rt',{
	title:'RubyText',
	tagName:'rt',
	className:null
});
registerFormatType('catpow/small',{
	title:'small',
	tagName:'small',
	className:null,
	edit({isActive,value,onChange}){
		const onToggle=()=>onChange(toggleFormat(value,{type:'catpow/small'}));
		
		const icon=(
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M5.6,16.7l3.6-9.4h1.3l3.8,9.4H13l-1.1-2.8H8l-1,2.8H5.6z M8.3,12.9h3.2l-1-2.6C10.2,9.5,10,8.9,9.9,8.4
		C9.7,9,9.6,9.6,9.3,10.1L8.3,12.9z"/>
			</svg>
		);

		return [
			<Fragment>
				<RichTextShortcut
					type={'primary'}
					character={'-'}
					onUse={onToggle}
				/>
				<RichTextToolbarButton
					icon={icon}
					title={'small'}
					onClick={onToggle}
					isActive={isActive}
					shortcutType={'primary'}
					shortcutCharacter={'-'}
				/>
			</Fragment>
		];
	}
});

registerFormatType('catpow/mark',{
	title:'Mark',
	tagName:'mark',
	className:null,
	edit({isActive,value,onChange}){
		const onToggle=()=>onChange(toggleFormat(value,{type:'catpow/mark'}))

		const icon=(
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<polygon points="7.9,10.8 12.1,10.8 10,5.3 	"/>
	<path d="M0,2v16h20V2H0z M13.7,15.3L12.5,12h-5l-1.2,3.4H4.7L9,4h1.9l4.3,11.3H13.7z"/>
			</svg>
		);
		
		return [
			<Fragment>
				<RichTextShortcut
					type={'primary'}
					character={'m'}
					onUse={onToggle}
				/>
				<RichTextToolbarButton
					icon={icon}
					title={'Mark'}
					onClick={onToggle}
					isActive={isActive}
					shortcutType={'primary'}
					shortcutCharacter={'m'}
				/>
			</Fragment>
		];
	}
});
registerFormatType('catpow/q',{
	title:'Quote',
	tagName:'q',
	className:null,
	edit({isActive,value,onChange}){
		const onToggle=()=>onChange(toggleFormat(value,{type:'catpow/q'}))

		const icon=(
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M0.8,17V9.6c0-5.7,4.6-6.1,7.5-6.2v3.1c-3.6,0.1-3.6,1.6-3.6,3h3.6V17H0.8z M11.4,17V9.6c0-5.8,4.6-6.1,7.4-6.2v3.1
		c-3.6,0.1-3.6,1.6-3.6,3h3.6V17H11.4z"/>
			</svg>
		);
		
		return [
			<Fragment>
				<RichTextToolbarButton
					icon={icon}
					title={'Quote'}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		];
	}
});
registerFormatType('catpow/dfn',{
	title:'Define',
	tagName:'dfn',
	className:null,
	edit({isActive,value,onChange}){
		const onToggle=()=>onChange(toggleFormat(value,{type:'catpow/dfn'}))
		const icon=(
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M11.6,1.6v3.7H8V1.6H11.6z M11.6,14.7v3.7H8v-3.7H11.6z"/>
			</svg>
		);

		return [
			<Fragment>
				<RichTextToolbarButton
					icon={icon}
					title={'Define'}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		];
	}
});

registerFormatType('catpow/span',{
	title:'span',
	tagName:'span',
	className:'custom',
	edit({isActive,value,onChange}){
		
		const onToggle=()=>{
			const {removeFormat,insert,create,slice}=wp.richText;
			if(isActive){onChange(toggleFormat(value,{type:'catpow/span'}));}
			let cls=prompt(__('クラスを入力'));
			
			return onChange(insert(
				value,
				create({html:'<span class="'+cls+'">'+slice(value).text+'</span>'}),
				value.start,
				value.end
			));
		}

		return [
			<Fragment>
				<RichTextToolbarButton
					icon={'editor-code'}
					title={'span'}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		];
	}
});


const currentBlockCanInsertBlockFormat=()=>{
	var atts=wp.data.select('core/block-editor').getSelectedBlock().attributes;
	return atts.blockState && atts.blockState.enableBlockFormat;
};


registerFormatType('catpow/ul',{
	title:'ul',
	tagName:'ul',
	className:null,
	edit({isActive,value,onChange}){
		if(!currentBlockCanInsertBlockFormat()){return '';}
		const onToggle=()=>{
			const {removeFormat,insert,create,slice}=wp.richText;
			if(isActive){
				return onChange(create({html:value.text}));
			}
			const marks={
				'*':'annotation',
				'※':'annotation',
				'！':'caution',
				'!':'caution',
				'●':'circle',
				'・':'circle',
				'■':'square',
				'★':'star',
				'▶︎':'caret',
			};
			var str=slice(value).text;
			
			if(cls=marks[str[0]]){
				rsl=str.substring(1).split("\n"+str[0]);
			}
			else{
				rsl=str.split("\n");
			}
			
			return onChange(insert(
				value,
				create({html:'<ul class="'+cls+'"><li>'+rsl.join('</li> <li>')+'</li></ul>'}),
				value.start,
				value.end
			));
		}
		

		return [
			<Fragment>
				<RichTextToolbarButton
					icon={'editor-ul'}
					title={'ul'}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		];
	}
});
registerFormatType('catpow/ol',{
	title:'ol',
	tagName:'ol',
	className:null,
	edit({isActive,value,onChange}){
		if(!currentBlockCanInsertBlockFormat()){return '';}
		const onToggle=()=>{
			const {removeFormat,insert,create,slice}=wp.richText;
			if(isActive){
				return onChange(insert(
					value,
					create({html:slice(value).text}),
					value.start,
					value.end
				));
			}
			return onChange(insert(
				value,
				create({html:'<ol><li>'+slice(value).text.split("\n").join('</li> <li>')+'</li></ol>'}),
				value.start,
				value.end
			));
		}
		

		return [
			<Fragment>
				<RichTextToolbarButton
					icon={'editor-ol'}
					title={'ol'}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		];
	}
});
registerFormatType('catpow/li',{
	title:'li',
	tagName:'li',
	className:null
});

registerFormatType('catpow/dl',{
	title:'dl',
	tagName:'dl',
	className:null,
	edit({isActive,value,onChange}){
		if(!currentBlockCanInsertBlockFormat()){return '';}
		const onToggle=()=>{
			const {removeFormat,insert,create,slice}=wp.richText;
			if(isActive){
				return onChange(create({html:value.text}));
			}
			
			return onChange(insert(
				value,
				create({html:'<dl>'+slice(value).text.split("\n").map((str)=>{
					if(!/[:：]/.test(str)){return '<dd>'+str+'</dd>';}
					return str.replace(/^(.+?)[:：](.+)$/,'<dt>$1</dt><dd>$2</dd>');
				}).join('')+'</dl>'}),
				value.start,
				value.end
			));
		}
		

		return [
			<Fragment>
				<RichTextToolbarButton
					icon={'editor-ul'}
					title={'dl'}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		];
	}
});
registerFormatType('catpow/dt',{
	title:'dt',
	tagName:'dt',
	className:null
});
registerFormatType('catpow/dd',{
	title:'dd',
	tagName:'dd',
	className:null
});


registerFormatType('catpow/clear',{
	title:'clear',
	tagName:'div',
	className:null,
	edit({isActive,value,onChange}){
		const {create}=wp.richText;
		return [
			<RichTextToolbarButton
				icon={'dismiss'}
				title={'🧹全てのスタイルをクリア'}
				onClick={()=>onChange(create({html:value.text}))}
				isActive={false}
			/>
		];
	}
});


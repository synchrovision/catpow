Catpow.UI.Media=class extends wp.element.Component{
	constructor(props) {
		super(props);
		this.state={value:props.value};
		if(undefined===Catpow.uploader){
			Catpow.uploader=wp.media({
				title:'Select Image',
				button:{text:'Select'},  
				multiple:false
			});
		}
	}
	render(){
		var {value}=this.state;
		var {type,mime,size,src,srcset,alt}=value;
		const el=wp.element.createElement;
		
		const selectMedia=()=>{
			Catpow.uploader.off('select').on('select',()=>{
				let image = Catpow.uploader.state().get('selection').first().toJSON();
				let value={
					mime:image.mime,
					alt:image.alt,
				};
				if(size && image.sizes && image.sizes[size]){value.src=image.sizes[size].url;}
				else{value.src=image.url;}
				if(image.sizes){
					value.srcset=image.sizes.medium_large.url+' 480w,'+image.url;
				}
				this.setState({value});
			}).open();
		}
		
		return (
			<div className={'cpui-media'}>
				{el(type,{src,className:'preview',onClick:selectMedia})}
				<Catpow.UI.HiddenValues
					name={this.props.name}
					value={value}
				/>
			</div>
		);
	}
}
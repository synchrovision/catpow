Catpow.UI.Payment=class extends wp.element.Component{
	constructor(props) {
		/*
		購入しようとしている商品の内容と価格
		有効な決済方法の情報（クライアントキーはWP API）
		*/
		super(props);
	}
	render(){
		var {cart,payment}=this.props;
		
		return (
			<div className={'cpui-payment'}>
				
				<Catpow.UI.HiddenValues
					name={this.props.name}
					value={this.state.value}
				/>
			</div>
		);
	}
}
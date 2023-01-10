Catpow.Zeus=class extends wp.element.Component{
	constructor(props) {
		super(props);
		this.$ref=jQuery('#ZeusButtonContainer');
		this.state={popupOpen:false,canCheckout:false,errorMessage:false};
	}
	render(){
		var {cart,payment}=this.props;
		var {popupOpen,canCheckout,errorMessage}=this.state;
		
		var component=this;
		var popup_classes="zeusPopup";
		if(popupOpen){popup_classes+=" open";}
		var checkoutbutton_classes="zeusCheckoutButton";
		if(canCheckout){checkoutbutton_classes+=" active";}
		
		return [
			<div
				id="ZeusButton"
				className="wp-block-catpow-zeus"
				onClick={()=>{
					component.setState({popupOpen:true});
				}}
			>{this.props.text || 'カードでお支払い'}</div>,
			<div className={popup_classes}>
				<div class="zeusPopupContent">
					<h3 className="popupTitle">{this.props.popupTitle || 'カードでお支払い'}</h3>
					<div
						id="zeus_token_card_info_area"
						className="zeusWidget"
						onInput={()=>{
							console.log('onInput');
							component.setState({canCheckout:zeusToken.validateCardForm()});
						}}
					></div>
					{errorMessage && <div id="zeusError" className="zeusError">{errorMessage}</div>}
					<div
						className={checkoutbutton_classes}
						onClick={(e)=>{
							if(!canCheckout){return false;}
							zeusToken.getToken(function(zeus_token_response_data){
								if(!zeus_token_response_data['result']){
									component.setState({
										errorMessage:zeusToken.getErrorMessage(zeus_token_response_data['error_code'])
									});
								}
								else{
									component.token_key=zeus_token_response_data.token_key;
									cpform_submit(component.$ref,component.props.action,function($item,res){
										console.log(res);
										this.setState({popupOpen:false});
									},{token_key:zeus_token_response_data.token_key});
								}
							});
						}}
					>{this.props.checkoutText || '購入する'}</div>
					<div class="zeusPopupClose" onClick={(e)=>{this.setState({popupOpen:false});}}></div>
				</div>
			</div>
		];
	}
	renderButton(){
		zeusTokenStart();
	}
	
	componentDidMount(prevProps){
		this.renderButton();
	}
	
	componentDidUpdate(prevProps){
		//ボタンが消えていたら再レンダリングする処理が必要？
	}
}
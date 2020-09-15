Catpow.AmazonPay=class extends wp.element.Component{
	constructor(props) {
		super(props);
		this.checkoutText=props.checkoutText || '購入する';
		this.$ref=jQuery('#AmazonPayButtonContainer');
		this.state={popupOpen:false,canCheckout:false,errorMessage:false};
	}
	render(){
		var {cart,payment}=this.props;
		var {popupOpen,canCheckout,errorMessage}=this.state;
		
		var component=this;
		var popup_classes="amazonPayPopup";
		if(popupOpen){popup_classes+=" open";}
		var checkoutbutton_classes="amazonPayCheckoutButton";
		if(canCheckout){checkoutbutton_classes+=" active";}
		
		return [
			<div id="AmazonPayButton"></div>,
			<div className={popup_classes}>
				<div class="amazonPayPopupContent">
					<div id="addressBookWidgetDiv" className="amazonPayWidget"></div>
					<div id="walletWidgetDiv" className="amazonPayWidget"></div>
					{errorMessage && <div id="amazonPayError" className="amazonPayError">{errorMessage}</div>}
					<div
						className={checkoutbutton_classes}
						onClick={(e)=>{
							if(!canCheckout){return false;}
							console.log('onClickCheckoutButton');
							cp_form_submit(component.$ref,component.props.action,function($item,res){
								console.log('onCheckout');
								if(res.error){
									component.setState({canCheckout:false,errorMessage:res.message});
									return false;
								}
								component.setState({popupOpen:false});
							},{task:'checkout',orderReferenceId:component.orderReferenceId});
						}}
					>{this.checkoutText}</div>
					<div class="amazonPayPopupClose" onClick={(e)=>{this.setState({popupOpen:false});}}></div>
				</div>
			</div>
		];
	}
	renderButton(){
		OffAmazonPayments.Button("AmazonPayButton",amazonpay_config.merchant_id,{
			type: amazonpay_config.type || 'PwA',
			color: amazonpay_config.color,
			size: amazonpay_config.size,
			language: amazonpay_config.language,
			authorization:()=>{
				amazon.Login.authorize(
					{ scope: "profile postal_code payments:widget payments:shipping_address", popup: true },
					(token)=>{
						this.token=token;
						if(this.props.addressbook){this.showAddressBookWidget();}
						else{this.showWalletWidget();}
						this.setState({popupOpen:true});
					}
				);
			},
			onError: function(error) {
				// something bad happened
				console.log('OffAmazonPayments.Button', error.getErrorCode(), error.getErrorMessage());
			}
		});
	}

	showAddressBookWidget() {
		var component=this;
		// AddressBook
		new OffAmazonPayments.Widgets.AddressBook({
			sellerId: amazonpay_config.merchant_id,
			amazonOrderReferenceId: component.orderReferenceId,
			onReady: function (orderReference) {
				if(!component.orderReferenceId){
					component.orderReferenceId = orderReference.getAmazonOrderReferenceId();
				}
				component.showWalletWidget();
			},
			onAddressSelect: function (addressbook) {
				// お届け先の住所が変更された時に呼び出されます、ここで手数料などの再計算ができます。
				console.log('onAddressSelect');
				cp_form_submit(component.$ref,component.props.action,function($item,res){
					console.log(res);
					//document.getElementById('amazonPayError').innerHTML=res.html;
				},{task:'onAddressSelect',orderReferenceId:component.orderReferenceId});
			},
			design: {
				designMode: 'responsive'
			},
			onError: function (error) {
				// エラー処理 
				// エラーが発生した際にonErrorハンドラーを使って処理することをお勧めします。 
				// @see https://payments.amazon.com/documentation/lpwa/201954960
				component.setState({canCheckout:false});
				console.log('OffAmazonPayments.Widgets.AddressBook', error.getErrorCode(), error.getErrorMessage());
				switch (error.getErrorCode()) {
					case 'AddressNotModifiable':
						// オーダーリファレンスIDのステータスが正しくない場合は、お届け先の住所を変更することができません。
						break;
					case 'BuyerNotAssociated':
						// 購入者とリファレンスIDが正しく関連付けられていません。 
						// ウィジェットを表示する前に購入者はログインする必要があります。
						break;
					case 'BuyerSessionExpired':
						// 購入者のセッションの有効期限が切れました。 
						// ウィジェットを表示する前に購入者はログインする必要があります。
						break;
					case 'InvalidAccountStatus':
						// マーチャントID（セラーID）がリクエストを実行する為に適切な状態ではありません。 
						// 考えられる理由 ： 制限がかかっているか、正しく登録が完了されていません。
						break;
					case 'InvalidOrderReferenceId':
						// オーダーリファレンスIDが正しくありません。
						break;
					case 'InvalidParameterValue':
						// 指定されたパラメータの値が正しくありません。
						break;
					case 'InvalidSellerId':
						// マーチャントID（セラーID）が正しくありません。
						break;
					case 'MissingParameter':
						// 指定されたパラメータが正しくありません。
						break;
					case 'PaymentMethodNotModifiable':
						// オーダーリファレンスIDのステータスが正しくない場合はお支払い方法を変更することができません。
						break;
					case 'ReleaseEnvironmentMismatch':
						// 使用しているオーダーリファレンスオブジェクトがリリース環境と一致しません。
						break;
					case 'StaleOrderReference':
						// 使用しているオーダーリファレンスIDがキャンセルされています。 
					   // キャンセルされたオーダーリファレンスIDでウィジェットを関連付けすることはできません。
						break;
					case 'UnknownError':
						// 不明なエラーが発生しました。(UnknownError)
						break;
					default:
						// 不明なエラーが発生しました。
				}
			}
		}).bind("addressBookWidgetDiv");
	}

	showWalletWidget() {
		var component=this;
		// Wallet
		new OffAmazonPayments.Widgets.Wallet({
			sellerId: amazonpay_config.merchant_id,
			amazonOrderReferenceId: component.orderReferenceId,
			onReady: function(orderReference) {
				if(!component.orderReferenceId){
					component.orderReferenceId = orderReference.getAmazonOrderReferenceId();
				}
				cp_form_submit(component.$ref,component.props.action,function($item,res){
					if(res.error){
						component.setState({canCheckout:false,errorMessage:res.message});
						return false;
					}
					component.setState({canCheckout:true,errorMessage:false});
				},{
					task:'onReady',
					access_token:component.token.access_token,
					orderReferenceId:component.orderReferenceId
				});
			},
			onPaymentSelect: function() {
				console.log('onPaymentSelect');
				console.log(arguments);
				cp_form_submit(component.$ref,component.props.action,function($item,res){
					if(res.error){
						component.setState({canCheckout:false,errorMessage:res.message});
						return false;
					}
					component.setState({canCheckout:true,errorMessage:false});
				},{task:'onPaymentSelect',orderReferenceId:component.orderReferenceId});
			},
			design: {
				designMode: 'responsive'
			},
			onError: function(error) {
				// エラー処理 
				// エラーが発生した際にonErrorハンドラーを使って処理することをお勧めします。 
				// @see https://payments.amazon.com/documentation/lpwa/201954960
				component.setState({canCheckout:false});
				console.log('OffAmazonPayments.Widgets.Wallet', error.getErrorCode(), error.getErrorMessage());
			}
		}).bind("walletWidgetDiv");
	}
	
	
	componentDidMount(prevProps){
		this.renderButton();
	}
	
	componentDidUpdate(prevProps){
		//ボタンが消えていたら再レンダリングする処理が必要？
	}
}
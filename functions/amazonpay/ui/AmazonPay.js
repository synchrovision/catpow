Catpow.AmazonPay = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.checkoutText = props.checkoutText || '購入する';
		_this.$ref = jQuery('#AmazonPayButtonContainer');
		_this.state = { popupOpen: false, canCheckout: false, errorMessage: false };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    cart = _props.cart,
			    payment = _props.payment;
			var _state = this.state,
			    popupOpen = _state.popupOpen,
			    canCheckout = _state.canCheckout,
			    errorMessage = _state.errorMessage;


			var component = this;
			var popup_classes = "amazonPayPopup";
			if (popupOpen) {
				popup_classes += " open";
			}
			var checkoutbutton_classes = "amazonPayCheckoutButton";
			if (canCheckout) {
				checkoutbutton_classes += " active";
			}

			return [wp.element.createElement('div', { id: 'AmazonPayButton' }), wp.element.createElement(
				'div',
				{ className: popup_classes },
				wp.element.createElement(
					'div',
					{ 'class': 'amazonPayPopupContent' },
					wp.element.createElement('div', { id: 'addressBookWidgetDiv', className: 'amazonPayWidget' }),
					wp.element.createElement('div', { id: 'walletWidgetDiv', className: 'amazonPayWidget' }),
					errorMessage && wp.element.createElement(
						'div',
						{ id: 'amazonPayError', className: 'amazonPayError' },
						errorMessage
					),
					wp.element.createElement(
						'div',
						{
							className: checkoutbutton_classes,
							onClick: function onClick(e) {
								if (!canCheckout) {
									return false;
								}
								console.log('onClickCheckoutButton');
								cp_form_submit(component.$ref, component.props.action, function ($item, res) {
									console.log('onCheckout');
									if (res.error) {
										component.setState({ canCheckout: false, errorMessage: res.message });
										return false;
									}
									component.setState({ popupOpen: false });
								}, { task: 'checkout', orderReferenceId: component.orderReferenceId });
							}
						},
						this.checkoutText
					),
					wp.element.createElement('div', { 'class': 'amazonPayPopupClose', onClick: function onClick(e) {
							_this2.setState({ popupOpen: false });
						} })
				)
			)];
		}
	}, {
		key: 'renderButton',
		value: function renderButton() {
			var _this3 = this;

			OffAmazonPayments.Button("AmazonPayButton", amazonpay_config.merchant_id, {
				type: amazonpay_config.type || 'PwA',
				color: amazonpay_config.color,
				size: amazonpay_config.size,
				language: amazonpay_config.language,
				authorization: function authorization() {
					amazon.Login.authorize({ scope: "profile postal_code payments:widget payments:shipping_address", popup: true }, function (token) {
						_this3.token = token;
						if (_this3.props.addressbook) {
							_this3.showAddressBookWidget();
						} else {
							_this3.showWalletWidget();
						}
						_this3.setState({ popupOpen: true });
					});
				},
				onError: function onError(error) {
					// something bad happened
					console.log('OffAmazonPayments.Button', error.getErrorCode(), error.getErrorMessage());
				}
			});
		}
	}, {
		key: 'showAddressBookWidget',
		value: function showAddressBookWidget() {
			var component = this;
			// AddressBook
			new OffAmazonPayments.Widgets.AddressBook({
				sellerId: amazonpay_config.merchant_id,
				amazonOrderReferenceId: component.orderReferenceId,
				onReady: function onReady(orderReference) {
					if (!component.orderReferenceId) {
						component.orderReferenceId = orderReference.getAmazonOrderReferenceId();
					}
					component.showWalletWidget();
				},
				onAddressSelect: function onAddressSelect(addressbook) {
					// お届け先の住所が変更された時に呼び出されます、ここで手数料などの再計算ができます。
					console.log('onAddressSelect');
					cp_form_submit(component.$ref, component.props.action, function ($item, res) {
						console.log(res);
						//document.getElementById('amazonPayError').innerHTML=res.html;
					}, { task: 'onAddressSelect', orderReferenceId: component.orderReferenceId });
				},
				design: {
					designMode: 'responsive'
				},
				onError: function onError(error) {
					// エラー処理 
					// エラーが発生した際にonErrorハンドラーを使って処理することをお勧めします。 
					// @see https://payments.amazon.com/documentation/lpwa/201954960
					component.setState({ canCheckout: false });
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
	}, {
		key: 'showWalletWidget',
		value: function showWalletWidget() {
			var component = this;
			// Wallet
			new OffAmazonPayments.Widgets.Wallet({
				sellerId: amazonpay_config.merchant_id,
				amazonOrderReferenceId: component.orderReferenceId,
				onReady: function onReady(orderReference) {
					if (!component.orderReferenceId) {
						component.orderReferenceId = orderReference.getAmazonOrderReferenceId();
					}
					cp_form_submit(component.$ref, component.props.action, function ($item, res) {
						if (res.error) {
							component.setState({ canCheckout: false, errorMessage: res.message });
							return false;
						}
						component.setState({ canCheckout: true, errorMessage: false });
					}, {
						task: 'onReady',
						access_token: component.token.access_token,
						orderReferenceId: component.orderReferenceId
					});
				},
				onPaymentSelect: function onPaymentSelect() {
					console.log('onPaymentSelect');
					console.log(arguments);
					cp_form_submit(component.$ref, component.props.action, function ($item, res) {
						if (res.error) {
							component.setState({ canCheckout: false, errorMessage: res.message });
							return false;
						}
						component.setState({ canCheckout: true, errorMessage: false });
					}, { task: 'onPaymentSelect', orderReferenceId: component.orderReferenceId });
				},
				design: {
					designMode: 'responsive'
				},
				onError: function onError(error) {
					// エラー処理 
					// エラーが発生した際にonErrorハンドラーを使って処理することをお勧めします。 
					// @see https://payments.amazon.com/documentation/lpwa/201954960
					component.setState({ canCheckout: false });
					console.log('OffAmazonPayments.Widgets.Wallet', error.getErrorCode(), error.getErrorMessage());
				}
			}).bind("walletWidgetDiv");
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount(prevProps) {
			this.renderButton();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			//ボタンが消えていたら再レンダリングする処理が必要？
		}
	}]);
	return _class;
}(wp.element.Component);

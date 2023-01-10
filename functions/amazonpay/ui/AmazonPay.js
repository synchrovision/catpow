(() => {
  // ../functions/amazonpay/ui/AmazonPay.jsx
  Catpow.AmazonPay = class extends wp.element.Component {
    constructor(props) {
      super(props);
      this.checkoutText = props.checkoutText || "\u8CFC\u5165\u3059\u308B";
      this.$ref = jQuery("#AmazonPayButtonContainer");
      this.state = { popupOpen: false, canCheckout: false, errorMessage: false };
    }
    render() {
      var { cart, payment } = this.props;
      var { popupOpen, canCheckout, errorMessage } = this.state;
      var component = this;
      var popup_classes = "amazonPayPopup";
      if (popupOpen) {
        popup_classes += " open";
      }
      var checkoutbutton_classes = "amazonPayCheckoutButton";
      if (canCheckout) {
        checkoutbutton_classes += " active";
      }
      return [
        /* @__PURE__ */ React.createElement("div", { id: "AmazonPayButton" }),
        /* @__PURE__ */ React.createElement("div", { className: popup_classes }, /* @__PURE__ */ React.createElement("div", { class: "amazonPayPopupContent" }, /* @__PURE__ */ React.createElement("div", { id: "addressBookWidgetDiv", className: "amazonPayWidget" }), /* @__PURE__ */ React.createElement("div", { id: "walletWidgetDiv", className: "amazonPayWidget" }), errorMessage && /* @__PURE__ */ React.createElement("div", { id: "amazonPayError", className: "amazonPayError" }, errorMessage), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: checkoutbutton_classes,
            onClick: (e) => {
              if (!canCheckout) {
                return false;
              }
              console.log("onClickCheckoutButton");
              cpform_submit(component.$ref, component.props.action, function($item, res) {
                console.log("onCheckout");
                if (res.error) {
                  component.setState({ canCheckout: false, errorMessage: res.message });
                  return false;
                }
                component.setState({ popupOpen: false });
              }, { task: "checkout", orderReferenceId: component.orderReferenceId });
            }
          },
          this.checkoutText
        ), /* @__PURE__ */ React.createElement("div", { class: "amazonPayPopupClose", onClick: (e) => {
          this.setState({ popupOpen: false });
        } })))
      ];
    }
    renderButton() {
      OffAmazonPayments.Button("AmazonPayButton", amazonpay_config.merchant_id, {
        type: amazonpay_config.type || "PwA",
        color: amazonpay_config.color,
        size: amazonpay_config.size,
        language: amazonpay_config.language,
        authorization: () => {
          amazon.Login.authorize(
            { scope: "profile postal_code payments:widget payments:shipping_address", popup: true },
            (token) => {
              this.token = token;
              if (this.props.addressbook) {
                this.showAddressBookWidget();
              } else {
                this.showWalletWidget();
              }
              this.setState({ popupOpen: true });
            }
          );
        },
        onError: function(error) {
          console.log("OffAmazonPayments.Button", error.getErrorCode(), error.getErrorMessage());
        }
      });
    }
    showAddressBookWidget() {
      var component = this;
      new OffAmazonPayments.Widgets.AddressBook({
        sellerId: amazonpay_config.merchant_id,
        amazonOrderReferenceId: component.orderReferenceId,
        onReady: function(orderReference) {
          if (!component.orderReferenceId) {
            component.orderReferenceId = orderReference.getAmazonOrderReferenceId();
          }
          component.showWalletWidget();
        },
        onAddressSelect: function(addressbook) {
          console.log("onAddressSelect");
          cpform_submit(component.$ref, component.props.action, function($item, res) {
            console.log(res);
          }, { task: "onAddressSelect", orderReferenceId: component.orderReferenceId });
        },
        design: {
          designMode: "responsive"
        },
        onError: function(error) {
          component.setState({ canCheckout: false });
          console.log("OffAmazonPayments.Widgets.AddressBook", error.getErrorCode(), error.getErrorMessage());
          switch (error.getErrorCode()) {
            case "AddressNotModifiable":
              break;
            case "BuyerNotAssociated":
              break;
            case "BuyerSessionExpired":
              break;
            case "InvalidAccountStatus":
              break;
            case "InvalidOrderReferenceId":
              break;
            case "InvalidParameterValue":
              break;
            case "InvalidSellerId":
              break;
            case "MissingParameter":
              break;
            case "PaymentMethodNotModifiable":
              break;
            case "ReleaseEnvironmentMismatch":
              break;
            case "StaleOrderReference":
              break;
            case "UnknownError":
              break;
            default:
          }
        }
      }).bind("addressBookWidgetDiv");
    }
    showWalletWidget() {
      var component = this;
      new OffAmazonPayments.Widgets.Wallet({
        sellerId: amazonpay_config.merchant_id,
        amazonOrderReferenceId: component.orderReferenceId,
        onReady: function(orderReference) {
          if (!component.orderReferenceId) {
            component.orderReferenceId = orderReference.getAmazonOrderReferenceId();
          }
          cpform_submit(component.$ref, component.props.action, function($item, res) {
            if (res.error) {
              component.setState({ canCheckout: false, errorMessage: res.message });
              return false;
            }
            component.setState({ canCheckout: true, errorMessage: false });
          }, {
            task: "onReady",
            access_token: component.token.access_token,
            orderReferenceId: component.orderReferenceId
          });
        },
        onPaymentSelect: function() {
          console.log("onPaymentSelect");
          console.log(arguments);
          cpform_submit(component.$ref, component.props.action, function($item, res) {
            if (res.error) {
              component.setState({ canCheckout: false, errorMessage: res.message });
              return false;
            }
            component.setState({ canCheckout: true, errorMessage: false });
          }, { task: "onPaymentSelect", orderReferenceId: component.orderReferenceId });
        },
        design: {
          designMode: "responsive"
        },
        onError: function(error) {
          component.setState({ canCheckout: false });
          console.log("OffAmazonPayments.Widgets.Wallet", error.getErrorCode(), error.getErrorMessage());
        }
      }).bind("walletWidgetDiv");
    }
    componentDidMount(prevProps) {
      this.renderButton();
    }
    componentDidUpdate(prevProps) {
    }
  };
})();

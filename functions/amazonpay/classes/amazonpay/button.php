<?php
namespace Catpow\amazonpay;

class button{
	function render(){
		?>
<html>
<body>
  <div style="text-align: center; border: 1px solid #bbb;border-radius: 3px;padding:5px;margin:5px;"><div id="AmazonPayButton"></div><label style="font-size: 14px;line-height: 23px;">Amazonアカウントにご登録の住所・クレジット<br>カード情報を利用して、簡単にご注文が出来ます。<br></label></div><button type="button" name="button" id="Logout">Logout</button>
  <div id="addressBookWidgetDiv" style="height:250px"></div>
  <div id="walletWidgetDiv" style="height:250px"></div>
  
  <script type='text/javascript'>
    // get access token
    function getURLParameter(name, source) {
        return decodeURIComponent((new RegExp('[?|&amp;|#]' + name + '=' +
                        '([^&;]+?)(&|#|;|$)').exec(source) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    var accessToken = getURLParameter("access_token", location.hash);
    if (typeof accessToken === 'string' && accessToken.match(/^Atza/)) {
        document.cookie = "amazon_Login_accessToken=" + accessToken + ";path=/;secure";
    }

    window.onAmazonLoginReady = function() {
      
      amazon.Login.setClientId("your_client_id");
    };

    window.onAmazonPaymentsReady = function() {
      showLoginButton();
      showAddressBookWidget();
      
    };

    document.getElementById('Logout').onclick = function() {
      amazon.Login.logout();
      document.cookie = "amazon_Login_accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      window.location.href = '/';
    };
  </script>

  <script type='text/javascript'>
    function showLoginButton() {
        var authRequest;
        OffAmazonPayments.Button("AmazonPayButton", "your_seller_merchant_id", {
          type:  "PwA",
          color: "Gold",
          size:  "medium",

          authorization: function() {
            loginOptions = {scope: "profile payments:widget payments:shipping_address", popup: true};
            authRequest = amazon.Login.authorize (loginOptions, function(t) {
                    // console.log(t.access_token);
                    // console.log(t.expires_in);
                    // console.log(t.token_type);
                    showAddressBookWidget();
                });
          }
        });
    }

    function showAddressBookWidget() {
        // AddressBook
        new OffAmazonPayments.Widgets.AddressBook({
          sellerId: 'your_seller_merchant_id',
          
          onReady: function (orderReference) {
              var orderReferenceId = orderReference.getAmazonOrderReferenceId();
              var el;
              if ((el = document.getElementById("orderReferenceId"))) {
                el.value = orderReferenceId;
              }
              // Wallet
              showWalletWidget(orderReferenceId);
          },
          onAddressSelect: function (orderReference) {
              // お届け先の住所が変更された時に呼び出されます、ここで手数料などの再計算ができます。
          },
          design: {
              designMode: 'responsive'
          },
          onError: function (error) {
              // エラー処理 
              // エラーが発生した際にonErrorハンドラーを使って処理することをお勧めします。 
              // @see https://payments.amazon.com/documentation/lpwa/201954960
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

    function showWalletWidget(orderReferenceId) {
        // Wallet
        new OffAmazonPayments.Widgets.Wallet({
          sellerId: 'your_seller_merchant_id',
          amazonOrderReferenceId: orderReferenceId,
          onReady: function(orderReference) {
              console.log(orderReference.getAmazonOrderReferenceId());
          },
          onPaymentSelect: function() {
              console.log(arguments);
          },
          design: {
              designMode: 'responsive'
          },
          onError: function(error) {
              // エラー処理 
              // エラーが発生した際にonErrorハンドラーを使って処理することをお勧めします。 
              // @see https://payments.amazon.com/documentation/lpwa/201954960
              console.log('OffAmazonPayments.Widgets.Wallet', error.getErrorCode(), error.getErrorMessage());
          }
        }).bind("walletWidgetDiv");
    }

    
  </script>
  <script type="text/javascript" src="https://static-fe.payments-amazon.com/OffAmazonPayments/jp/sandbox/lpa/js/Widgets.js" async></script>
</body>
</html>
<?php
	}
}
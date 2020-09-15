<?php
namespace Catpow\amazonpay;

class PaymentException extends \Exception{
	public $id;
	public function __construct($id,$message=false){
		$this->id=$id;
		if(empty($message) && empty($message=self::get_message_of_error($id))){$message=$id;}
		parent::__construct($message);
	}
	public static function get_message_of_error($id){
		switch($id){
			//Authorization Declined
			case 'InvalidPaymentMethod':return __('支払方法に問題があるようです','catpow');
			case 'AmazonRejected':return __('Amazonがオーソリを拒否しました','catpow');
			case 'ProcessingFailure':return __('内部処理エラーです','catpow');
			case 'TransactionTimedOut':return __('処理がタイムアウトしました','catpow');
			//Order Reference or Billing Agreement Constraints
			case 'BuyerConsentNotSet':return __('支払いに同意していません','catpow');
			case 'AmountNotSet':return __('金額がセットされていません','catpow');
			case 'BuyerEqualsSeller':return __('販売者は購入できません','catpow');
			case 'PaymentMethodNotAllowed':return __('この支払い方法は選択できません','catpow');
			case 'PaymentMethodDeleted':return __('この支払い方法は削除されました','catpow');
			case 'PaymentMethodExpired':return __('この支払い方法は期限切れです','catpow');
			case 'PaymentPlanNotSet':return __('支払い方法を選択してください','catpow');
			case 'ShippingAddressNotSet':return __('配送先がを選択してください','catpow');
			case 'BillingAddressDeleted':return __('選択した配送先は削除されています','catpow');
			case 'InvalidPaymentPlan':return __('この支払い方法は選択できません','catpow');
			//Catpow Agent
			case 'OrderReferenceIdNotSet':return __('注文IDがセットされていません','catpow');
			case 'AuthorizationIdNotSet':return __('決済IDがセットされていません','catpow');
		}
		return false;
	}
}
?>
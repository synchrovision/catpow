<?php
namespace Catpow\amazonpay;

class Agent{
	use \Catpow\traits\SessionSingleton;
	
	public $client,$config,$access_token,$orderReferenceId,$authorizationId;
	const INSTANCE_NAME='CatpowAmazonPayAgent';
	
	public function __construct(){
		$this->init();
	}
	public function init(){
		$conf=get_option('cp_amazonpay_keys')[0];
		
		foreach($conf as $key=>$val){$conf[$key]=reset($val);}
		$conf['sandbox']=$conf['sandbox']!=-1;
		$this->config=array_merge([
			'type'=>'PwA',
			'region'=>'jp',
			'color'=>'Gold',
			'size'=>'medium',
			'langage'=>'ja-JP',
		],$conf);
		$this->client=new \AmazonPay\Client(array_intersect_key($this->config,array_flip([
			'merchant_id','access_key','secret_key','client_id','region','sandbox'
		])));
	}
	
	public function renderButton($prm){
		$uiPath='functions/amazonpay/ui/AmazonPay';
		if(!wp_script_is($uiPath.'.js')){
			\cp::enqueue_style($uiPath.'.css');
			wp_enqueue_script('AmazonPayWidgets',$this->getWidgetsJsURL());
			\cp::enqueue_script($uiPath.'.js',['wp-element','babelHelpers','AmazonPayWidgets']);
		}
		$id='AmazonPayButtonContainer';
		
		if(empty($prm['action'])){
			$prm['action']='amazonpay';
		}
		if(!isset($prm['addressbook'])){
			$prm['addressbook']=!empty($this->config['addressbook']);
		}
		
		$amazonpay_config=array_intersect_key($this->config,array_flip([
			'merchant_id','client_id','color','size'
		]));
		?>
		<div id="<?=$id?>"></div>
		<script type="text/javascript">  
			window.amazonpay_config=window.amazonpay_config || <?=json_encode($amazonpay_config)?>;
			window.onAmazonLoginReady = function() {  
				try {
					amazon.Login.setClientId(window.amazonpay_config.client_id);  
					amazon.Login.setUseCookie(true);
				} catch (err) {
					console.error(err);
				}
			};  
			window.onAmazonPaymentsReady = function() {
			};
			jQuery(function($){ 
				wp.element.render(
					wp.element.createElement(
						Catpow.AmazonPay,
						<?=json_encode($prm)?>
					),
					document.getElementById("<?=$id?>")
				);
			});
		</script>
		<?php
	}
	public function setAccessToken($accessToken){
		$this->accessToken=$accessToken;
	}
	public function setOrderReferenceId($orderReferenceId){
		unset($this->authorizationId);
		$this->orderReferenceId=$orderReferenceId;
	}
	
	public function checkConstraint(){
		if($constraint=$this->details['Constraints']['Constraint']){
			$this->error($constraint['ConstraintID']);
		}
	}
	public function error($id,$message=false){
		throw new PaymentException($id,$message);
	}
	public function order($value=[]){
		/*
		'merchant_id'                   => 'SellerId',
		'amazon_order_reference_id'     => 'AmazonOrderReferenceId',
		'amount'                        => 'OrderReferenceAttributes.OrderTotal.Amount',
		'currency_code'                 => 'OrderReferenceAttributes.OrderTotal.CurrencyCode',
		'platform_id'                   => 'OrderReferenceAttributes.PlatformId',
		'seller_note'                   => 'OrderReferenceAttributes.SellerNote',
		'seller_order_id'               => 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId',
		'store_name'                    => 'OrderReferenceAttributes.SellerOrderAttributes.StoreName',
		'custom_information'            => 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation',
		'supplementary_data'            => 'OrderReferenceAttributes.SellerOrderAttributes.SupplementaryData',
		'request_payment_authorization' => 'OrderReferenceAttributes.RequestPaymentAuthorization',
		'mws_auth_token'                => 'MWSAuthToken'
		*/
		if(empty($this->orderReferenceId)){return false;}
		$result=$this->client->setOrderReferenceDetails(array_merge([
			'amazon_order_reference_id'=>$this->orderReferenceId,
			'currency_code'=>'JPY'
		],$value))->toArray();
		
		if($constraint=$result['SetOrderReferenceDetailsResult']['OrderReferenceDetails']['Constraints']['Constraint']){
			$this->error($constraint['ConstraintID']);
		}
		
		return $result;
	}
	public function confirm($value=[]){
		/*
		'merchant_id'               => 'SellerId',
		'amazon_order_reference_id' => 'AmazonOrderReferenceId',
		'success_url'               => 'SuccessUrl',
		'failure_url'               => 'FailureUrl',
		'authorization_amount'      => 'AuthorizationAmount.Amount',
		'currency_code'             => 'AuthorizationAmount.CurrencyCode',
		'mws_auth_token'            => 'MWSAuthToken'
		*/
		$this->checkConstraint();
		
		if($this->details['OrderReferenceStatus']['State']==='Open'){
			return false;
		}
		
		return $this->client->confirmOrderReference(array_merge([
			'amazon_order_reference_id'=>$this->orderReferenceId
		],$value))->toArray();
	}
	public function authorize($value=[]){
		/*
		'merchant_id'                => 'SellerId',
		'amazon_order_reference_id'  => 'AmazonOrderReferenceId',
		'authorization_amount'       => 'AuthorizationAmount.Amount',
		'currency_code'              => 'AuthorizationAmount.CurrencyCode',
		'authorization_reference_id' => 'AuthorizationReferenceId',
		'capture_now'                => 'CaptureNow',
		'provider_credit_details'    => array(),
		'seller_authorization_note'  => 'SellerAuthorizationNote',
		'transaction_timeout'        => 'TransactionTimeout',
		'soft_descriptor'            => 'SoftDescriptor',
		'mws_auth_token'             => 'MWSAuthToken'
		*/
		$details=$this->details;
		
		if(empty($this->orderReferenceId)){
			$this->error('OrderReferenceIdNotSet');
		}
		
		$result=$this->client->authorize(array_merge([
			'amazon_order_reference_id'=>$this->orderReferenceId,
			'authorization_amount'=>$details['OrderTotal']['Amount'],
			'currency_code'=>$details['OrderTotal']['CurrencyCode'],
			'authorization_reference_id'=>'Authorization'.time(),
			'transaction_timeout'=>0
		],$value))->toArray();
		
		if(!empty($result['Error'])){
			$this->error($result['Error']['Code']);
		}
		$status=$result['AuthorizeResult']['AuthorizationDetails']['AuthorizationStatus'];
		if($status['State']==='Declined'){
			$this->error($status['ReasonCode']);
		}
		$this->authorizationId=$result['AuthorizeResult']['AuthorizationDetails']['AmazonAuthorizationId'];
		
		return $result;
	}
	public function capture($value=[]){
		/*
		'merchant_id'             => 'SellerId',
		'amazon_authorization_id' => 'AmazonAuthorizationId',
		'capture_amount'          => 'CaptureAmount.Amount',
		'currency_code'           => 'CaptureAmount.CurrencyCode',
		'capture_reference_id'    => 'CaptureReferenceId',
		'provider_credit_details' => array(),
		'seller_capture_note'     => 'SellerCaptureNote',
		'soft_descriptor'         => 'SoftDescriptor',
		'mws_auth_token'          => 'MWSAuthToken'
		*/
		$details=$this->details;
		
		if(empty($this->authorizationId)){
			$this->error('AuthorizationIdNotSet');
		}
		
		$result=$this->client->capture(array_merge([
			'amazon_authorization_id'=>$this->authorizationId,
			'capture_amount'=>$details['OrderTotal']['Amount'],
			'capture_reference_id'=>'Capture'.time()
		],$value))->toArray();
		
		if(!empty($result['Error'])){
			$this->error($result['Error']['Code']);
		}
		
		return $result;
	}
	public function close($closure_reason){
		$this->client->closeOrderReference([
			'amazon_order_reference_id'=>$this->orderReferenceId,
			'closure_reason'=>$closure_reason
		]);
	}
	
	function getWidgetsJsURL(){
		$sandbox = $this->config['sandbox']?"sandbox/":"";

		switch (strtolower($this->config['region'])) {
			case "us":
				return "https://static-na.payments-amazon.com/OffAmazonPayments/us/" . $sandbox . "js/Widgets.js";
				break;
			case "uk":
				return "https://static-eu.payments-amazon.com/OffAmazonPayments/gbp/" . $sandbox . "lpa/js/Widgets.js";
				break;
			case "jp":
				return "https://static-fe.payments-amazon.com/OffAmazonPayments/jp/" . $sandbox . "lpa/js/Widgets.js";
				break;
			default:
				return "https://static-eu.payments-amazon.com/OffAmazonPayments/eur/" . $sandbox . "lpa/js/Widgets.js";
				break;
		}
	}
	
	function __get($name){
		switch($name){
			case 'details':
				/*
				'merchant_id'               => 'SellerId',
				'amazon_order_reference_id' => 'AmazonOrderReferenceId',
				'address_consent_token'     => 'AddressConsentToken',
				'access_token'              => 'AccessToken',
				'mws_auth_token'            => 'MWSAuthToken'
				*/
				if(empty($this->orderReferenceId)){return null;}
				return $this->client->getOrderReferenceDetails([
					'amazon_order_reference_id'=>$this->orderReferenceId,
					'access_token'=>$this->access_token
				])->toArray()['GetOrderReferenceDetailsResult']['OrderReferenceDetails'];
			case 'authorizationDetails':
				/*
				'merchant_id'             => 'SellerId',
				'amazon_authorization_id' => 'AmazonAuthorizationId',
				'mws_auth_token'          => 'MWSAuthToken'
				*/
				if(empty($this->authorizationId)){return null;}
				return $this->client->getAuthorizationDetails([
					'amazon_authorization_id'=>$this->authorizationId,
					'access_token'=>$this->access_token
				])->toArray()['GetAuthorizationDetailsResult']['AuthorizationDetails'];
				
		}
	}
	function __set($name,$value){
		switch($name){
			case 'details':
				/*
				'merchant_id'                   => 'SellerId',
				'amazon_order_reference_id'     => 'AmazonOrderReferenceId',
				'amount'                        => 'OrderReferenceAttributes.OrderTotal.Amount',
				'currency_code'                 => 'OrderReferenceAttributes.OrderTotal.CurrencyCode',
				'platform_id'                   => 'OrderReferenceAttributes.PlatformId',
				'seller_note'                   => 'OrderReferenceAttributes.SellerNote',
				'seller_order_id'               => 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId',
				'store_name'                    => 'OrderReferenceAttributes.SellerOrderAttributes.StoreName',
				'custom_information'            => 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation',
				'supplementary_data'            => 'OrderReferenceAttributes.SellerOrderAttributes.SupplementaryData',
				'request_payment_authorization' => 'OrderReferenceAttributes.RequestPaymentAuthorization',
				'mws_auth_token'                => 'MWSAuthToken'
				*/
				if(empty($this->orderReferenceId)){return false;}
				$this->client->setOrderReferenceDetails(array_merge([
					'amazon_order_reference_id'=>$this->orderReferenceId,
					'currency_code'=>'JPY'
				],$value));
		}
		
	}
	
	function __sleep(){
		return ['config','access_token','orderReferenceId','authorizationId'];
	}
	function __wakeup(){
		$this->client=new \AmazonPay\Client(array_intersect_key($this->config,array_flip([
			'merchant_id','access_key','secret_key','client_id','region','sandbox'
		])));
	}
}
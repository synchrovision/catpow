<?php
namespace Catpow\zeus;

class Agent{
	use \Catpow\traits\SessionSingleton;
	
	public $config,$token_key;
	const INSTANCE_NAME='CatpowZeusAgent';
	
	public function __construct(){
		$this->init();
	}
	public function init(){
		$conf=get_option('cp_Zeus_keys')[0];
		
		foreach($conf as $key=>$val){$conf[$key]=reset($val);}
		$this->config=$conf;
	}
	
	public function renderButton($prm){
		$uiPath='functions/zeus/ui/Zeus';
		if(!wp_script_is($uiPath.'.js')){
			\cp::enqueue_style($uiPath.'.css');
			wp_enqueue_style('ZeusSstyle','https://linkpt.cardservice.co.jp/api/token/1.0/zeus_token.css');
			wp_enqueue_script('ZeusScript','https://linkpt.cardservice.co.jp/api/token/1.0/zeus_token_cvv.js');
			\cp::enqueue_script($uiPath.'.js',['wp-element','babelHelpers','ZeusScript']);
		}
		$id='ZeusButtonContainer';
		
		if(empty($prm['action'])){
			$prm['action']='zeus';
		}
		
		?>
		<div id="<?=$id?>"></div>
		<script type="text/javascript">  
			var zeusTokenIpcode= "<?=$this->config['ipcode']??'null'?>";
			jQuery(function($){ 
				wp.element.render(
					wp.element.createElement(
						Catpow.Zeus,
						<?=json_encode($prm)?>
					),
					document.getElementById("<?=$id?>")
				);
			});
		</script>
		<?php
	}
	public function getToken($name,$number,$month,$year){
		$url='https://linkpt.cardservice.co.jp/cgi-bin/token/token.cgi';
		$data=[
			'request'=>['service'=>'token','action'=>'newcard'],
			'authentication'=>['clientip'=>$this->config['ipcode']],
			'card'=>['name'=>$name,'number'=>$number,'expire'=>['year'=>$year,'month'=>$month]]
		];
		$data=http_build_query($data);
		$res=file_get_contents($url,false,stream_context_create([
			'http'=>[
				'method'=>'POST',
				'header'=> "Content-type: application/x-www-form-urlencoded\r\nContent-Length:".strlen($data)."\r\n",
				'content'=>$data
			]
		]));
		$res=simplexml_load_string($res);
		$this->token_key=$token_key;
		return $res;
	}
	public function setToken($token_key){
		$this->token_key=$token_key;
	}
	
	public function authorize($data){
		/*
		money*　決済金額
		send* 'mall'固定
		telno* ユーザーの電話番号
		email* ユーザーのメールアドレス
		sendid フリーパラメータ
		sendpoint フリーパラメータ
		pubsec CGIコールを停止
		printord レスポンスでオーダ番号を取得
		div 支払回数
		*/
		$user=wp_get_current_user();
		return $this->query(array_merge([
			'money'=>0,
			'send'=>'mall',
			'email'=>$user->user_email,
			'telno'=>str_replace('-','',$user->tel)
		],$data));
	}
	
	public function query($data){
		$url='https://linkpt.cardservice.co.jp/cgi-bin/secure.cgi';
		$data=array_merge([
			'clientip'=>$this->config['ipcode'],
			'token_key'=>$this->token_key
		],$data);
		$data=http_build_query($data);
		return file_get_contents($url,false,stream_context_create([
			'http'=>[
				'method'=>'POST',
				'header'=> "Content-type: application/x-www-form-urlencoded\r\nContent-Length:".strlen($data)."\r\n",
				'content'=>$data
			]
		]));
	}
	
	function __sleep(){
		return ['config','token_key'];
	}
}
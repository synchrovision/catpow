<?php
namespace Catpow\api\console;

class console extends \Catpow\api{
	static
		$method='POST',
		$check_nonce=true,
		$props=[];
	public static function render($path=null,$props=null){
		\cp::use_component('Console');
		if(empty($props)){$props=static::$props;}
		if(empty($path)){
			static::register_nonce();
			$path=array_slice(explode('\\',static::class),-2);
			$props['path']=implode('/',$path);
		}
		else{
			static::register_nonce($path);
			$props['path']=$path;
			$path=explode('/',$path);
		}
		$id=uniqid(implode('',array_map('ucfirst',$path)));
		
		?>
		<div id="<?=$id?>">
			<script type="text/javascript">
				document.addEventListener('DOMContentLoaded',function(){
					window.Catpow.consoleProps=window.Catpow.consoleProps || {};
					window.Catpow.consoleProps['<?=$id?>']=<?=json_encode($props)?>;
					wp.element.render(
						wp.element.createElement(
							Catpow.Console,
							window.Catpow.consoleProps['<?=$id?>']
						),
						document.getElementById("<?=$id?>")
					);
				});
			</script>
		</div>
		<?php
	}
}

?>
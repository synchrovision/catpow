<?php
namespace Catpow\api\console;

class console extends \Catpow\api{
	static
		$method='POST',
		$check_nonce=true,
		$props=[];
	public static function render(){
		static::register_nonce();
		\cp::use_component('Console');
		$path=array_slice(explode('\\',static::class),-2);
		$id=uniqid(implode('',array_map('ucfirst',$path)));
		$props=static::$props;
		$props['path']=implode('/',$path);
		
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
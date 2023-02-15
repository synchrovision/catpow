<?php
$id=uniqid('mg-');
cp::use_component('FixedBG');
cp::use_component('Animation/'.$attr['component']);
?>
<div class="<?=$attr['classes']?>">
	<div id="<?=$id?>" class="wp-block-catpow-motiongraphic__background"></div>
	<script type="text/javascript">
	(cb=>document.readyState!=='loading'?cb():document.addEventListener('DOMContentLoaded',cb))(()=>{
		var el=wp.element.createElement;
		wp.element.render(
			el(Catpow.FixedBG,null,[
				el(Catpow.Animation,null,[
					el(Catpow.Animation.<?=$attr['component']?>,<?=$attr['props']?>)
				])
			]),
			document.getElementById("<?=$id?>")
		);
		
	});
	</script>
	<?=$content?>
</div>
<?php
namespace Catpow;
$transient='megamenu_props_'.$attr['id'];
if(current_user_can('edit-theme') || empty($props=get_transient($transient))){
	$props=MenuManager::resolve_props_for_menu_component('MegaMenu',$attr['props']??[]);
	set_transient($transient,$props);
}
add_action('wp_enqueue_scripts',function(){CP::use_components($attr['deps']??['MegaMenu']);});
$id='megamenu_'.$attr['id'];
?>
<div class="wp-block-catpow-megamenu" id="<?=$id?>"></div>
<script type="text/javascript">
(cb=>document.readyState!=='loading'?cb():document.addEventListener('DOMContentLoaded',cb))(()=>{
	var el=wp.element.createElement;
	wp.element.render(
		el(Catpow.MegaMenu,<?=$props?>),
		document.getElementById("<?=$id?>")
	);
});
</script>
<?php
namespace Catpow;
header('content-type:text/javascript');
$form_path=cp::$content->conf['meta']['mail']['alias_path'].'/mailform/form.php';
$form=cp::$content->form($form_path);
ob_start();
cp::enqueue_style('content.css');
$form->render(null,['post_data_path'=>'<!--data_name-->/form']);
$deps_data=util\wp::get_deps_data();
$html=ob_get_clean();
?>
//<script>
window.addEventListener('DOMContentLoaded',async()=>{
const data=<?=json_encode(['html'=>$html,'cssVarsCode'=>util\style_config::get_css_vars_code()],0700)?>;
const defineCssVars=(code)=>{
	const el=document.createElement('style');
	document.head.appendChild(el);
	el.textContent=code;
};
const loadStyle=(src)=>{
	const el=document.createElement('link');
	el.setAttribute('rel','stylesheet');
	el.setAttribute('href',src);
	document.head.appendChild(el);
};
const loadScript=(src)=>{
	return new Promise((resolve)=>{
		const el=document.createElement('script');
		el.setAttribute('type','text/javascript');
		el.setAttribute('src',src);
		document.body.appendChild(el);
		el.onload=el.onreadystatechange=function(_,isAbort){
			if(isAbort || !el.readyState || /loaded|complete/.test(el.readyState)) {
				el.onload=el.onreadystatechange=null;
				if(!isAbort){resolve();}
			}
		};
	});
};
defineCssVars(data.cssVarsCode);
const container=document.getElementById('cpform');
container.innerHTML=data.html;
<?php
foreach($deps_data['styles'] as $handle=>$style){
	if(!empty($style['src'])){
		printf("loadStyle('%s');\n",$style['src']);
	}
}
foreach($deps_data['scripts'] as $handle=>$script){
	if(!empty($script['extra']['before'])){echo implode("\n",$script['extra']['before'])."\n";}
	if(!empty($script['src'])){
		if(!empty($script['extra']['global'])){
			printf("if(!('%s' in window))",$script['extra']['global']);
		}
		printf("await loadScript('%s');\n",$script['src']);
	}
	if(!empty($script['extra']['after'])){echo implode("\n",$script['extra']['after'])."\n";}
}
?>
container.querySelectorAll('script').forEach(Catpow.util.evalScript);
});
<?php
foreach($deps_data['scripts'] as $handle=>$script){
	if(!empty($script['extra']['data'])){echo $script['extra']['data']."\n";}
}
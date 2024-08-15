<?php
namespace Catpow;

/*l10n*/
function _($str){
	return __($str,'catpow');
}
function _e($str){
	_e($str,'catpow');
}

/*snippet*/
function menu($path,$args=null){
	if(strpos($path,'/')){
		list($location,$template)=explode('/',$path);
	}
	else{
		$location=$path;
		$template='menu_item';
	}
	if(isset($args)){$args['theme_location']=$location;}
	else{
		global $nav_datas;
		$args=[
			'container_class'=>"menu-{$location}-container",
			'theme_location'=>$location,
			'before'=>'<div class="link">',
			'after'=>'</div>'
		];
	}
	$args['walker']=new walker\nav_menu($template);
	wp_nav_menu($args);
}
function widgets($name){
	if(is_active_sidebar($name)){
		printf('<div class="widgets-%1$s-container"><ul class="widgets %1$s">',$name);
		dynamic_sidebar($name);
		print('</ul></div>');
	}
}
function breadcrumb($home_name=null){
	template_part\breadcrumb::render(['home_name'=>$home_name,'container_class'=>'breadcrumb-container']);
}
function pagenate($param=[]){
	template_part\pagenate::render($param);
}
function categories($tax='category',$prm=false){
	if(empty($prm)){$prm=[];}
	$prm['taxonomy']=$tax;
	$prm['title_li']='';
	printf('<ul class="categories %s">',$tax);
	wp_list_categories($prm);
	print('</ul>');
}
function article_nav(){
	wp_enqueue_script('jquery.catpow.articlenav');
	echo '<div class="article_nav_container"></div>';
}

function rss($url){
	$rss=simplexml_load_file($url);
	printf('<div class="rss"><h4><a href="%s">%s</a></h4>',$rss->channel->link,$rss->channel->title);
	print('<ul>');
	if(isset($rss->channel->item)){$items=&$rss->channel->item;}else{$items=&$rss->item;}
	foreach($rss->channel->item as $i=>$item){
		if(substr($item->title,0,3)=='PR:' or substr($item->title,-3)==':PR' or empty($item->title))continue;
		printf('<li><a href="%s"><i class="fa fa-chevron-circle-right"></i>%s</a></li>',$item->link,$item->title);
	}
	print('</ul></div>');
}

function image($name,$alt=false,$class='',$x2=true){
	$attr='';
	if($alt){$attr.=sprintf(' alt="%s"',$alt);}else{$attr.=sprintf(' alt="%s"',$name);}
	if($class)$attr.=sprintf(' class="%s"',$class);
	if($path_url=CP::get_file_path_url('images/'.$name,\cp::FROM_CONTENT_DIR|\cp::FROM_THEME|\cp::FROM_DEFAULT)){
		$f=key($path_url);
		$url=reset($path_url);
	}
	else{return false;}
	if(!empty($sz=getimagesize($f))){
		if($x2){$attr.=sprintf(' width="%spx" height="%spx"',floor($sz[0]/2),floor($sz[1]/2));}
		else{$attr.=sprintf(' width="%spx" height="%spx"',$sz[0],$sz[1]);}
	}
	printf('<img src="%s" %s/>',$url,$attr);
}

function picture($dir,$alt=false,$class=''){
	/*この関数はAdobeの画像書き出し形式に対応した形にする*/
	//[file_name].[min-width].[ext]
	$dir_path=CP::get_file_path('images/'.$dir);
	$dir_url=CP::get_file_url('images/'.$dir);
	$dir_obj=dir($dir_path);
	$srcs=array();
	while($fname=$dir_obj->read()){
		if(!@is_array(getimagesize($dir_path.'/'.$fname)))continue;
		$fname_data=explode('.',$fname);
		if(is_numeric($bp=$fname_data[1])){
			$srcs[$bp]=sprintf(
				'<source srcset="%s" media="(%s-width:%dpx)"/>',
				$dir_url.'/'.$fname,
				$bp>0?'min':'max',
				abs($bp)
			);
		}
		else{
			$srcs[0]=sprintf('<img src="%s" alt="%s"/>',$dir_url.'/'.$fname,$alt);
		}
	}
	uksort($srcs,function($a,$b){if($a==0)return 1;if($b==0)return -1;return $b-$a;});
	printf('<picture class="%s">%s</picture>',$class,implode('',$srcs));
}

/*site*/
function site_bg_style(){
	$color=get_theme_mod('background_color');
	if($color!==get_theme_support('custom-background','default-color')){
		printf('background-color:#%s;',$color);
	}
	if($background_image=get_background_image()){
		printf('background-image:url(%s);',$background_image);
		$position_x=get_theme_mod('background_position_x',get_theme_support('custom-background','default-position-x'));
		$position_y=get_theme_mod('background_position_y',get_theme_support('custom-background','default-position-y'));
		if(!in_array($position_x,array('left','center','right'),true)){$position_x='left';}
		if(!in_array($position_y,array('top','center','bottom'),true)){$position_y='top';}
		printf('background-position:%s %s;',$position_x,$position_y);
		
		$size=get_theme_mod('background_size',get_theme_support('custom-background','default-size'));
		if(!in_array($size,array('auto','contain','cover'),true)){$size='auto';}
		printf('background-size:%s;',$size);

		$repeat=get_theme_mod('background_repeat',get_theme_support('custom-background','default-repeat'));
		if(!in_array($repeat,array('repeat-x','repeat-y','repeat','no-repeat'),true)){$repeat='repeat';}
		printf('background-repeat:%s;',$repeat);
	}
	$attachment=get_theme_mod('background_attachment',get_theme_support('custom-background','default-attachment'));
	if('fixed'===$attachment){echo 'position:fixed;width:100vw;height:100vh;';}
	else{echo 'position:absolute;width:100%;height:100%;';}
	echo 'top:0;left:0;z-index:-100;pointer-events: none;';
}
function page_header_bg_style(){
	if(is_front_page()){
		echo 'background-image:url(';
		header_image();
		echo ');';
	}
}
function site_main_class(){
	echo 'site_main';
	if(is_home()){echo ' site_main-home';}
	if(is_front_page()){echo ' site_main-front';}
	echo ' site_main-'.cp::get_the_path_data()['tmp_name'];
}

/*content*/
function this(){
	return \cp::$content;
}
function closest($q){
	return \cp::$content->get_closest($q);
}
function id(){
	return \cp::$content->loop_id;
}

function obj(){
	return \cp::$content->object;
}
function url(){
	return \cp::$content->get_the_url();
}

/*meta*/
function meta($name,$prm=null){
	return \cp::$content->meta($name,$prm);
}
function handler($name=null,$prm=null){
	if(isset($name)){return \cp::$content->meta($name,$prm)->handler;}
	return \cp::$content->handler;
}
function h($name=null,$prm=null){
	return handler($name,$prm);
}
function «($name,$prm=null){
	if(strpos($name,'/')===false){
		return \cp::$content=\cp::$content->meta($name,$prm);
	}
	else{return \cp::$content=\cp::$content->query($name,$prm);}
}
function »(){
	\cp::$content=\cp::$content->parent;
}
function output($name=null,$prm=null,$format=null){
	if(empty(\cp::$content)){return;}
	if(isset($name)){
		if(strpos($name,'/')===false){
			\cp::$content=\cp::$content->meta($name);
			$rtn=\cp::$content->output($prm,$format);
			\cp::$content=\cp::$content->parent;
			return $rtn;
		}
		$path=dirname($name);
		if(is_numeric(basename($path))){
			$loop=loop(dirname($path),basename($path));
		}
		else{$loop=loop($path);}
		foreach($loop as $obj){output(basename($name),$prm,$format);}
		return $loop;
	}
	if(isset(\cp::$content->loop_id)){\cp::$content->output_item($prm,$format);}
	else{\cp::$content->output($prm,$format);}
}
function input($name=null,$prm=null,$format=null){
	if(empty(\cp::$content)){return;}
	if(isset($name)){
		\cp::$content=\cp::$content->meta($name);
		$rtn=\cp::$content->input($prm,$format);
		\cp::$content=\cp::$content->parent;
		return $rtn;
	}
	\cp::$content->input_item($prm,$format);
}
function input_name($name=null,$key='value'){
	if(isset($name)){$meta=\cp::$content->meta($name);}
	else{$meta=\cp::$content;}
	return \cp::get_input_name($meta->data_path,$key);
}
function compare($name,$compare){
	\cp::$content->meta($name)->compare($compare);
}
function value($name=null){
	return \cp::$content->value($name);
}
function values($name=null){
	return \cp::$content->values($name);
}

/*inputs*/
function has($name,$key='value'){
	return \cp::$content->form->inputs->has(\cp::$content->the_data_path.'/'.$name,$key);
}
function get($name,$key='value'){
	return \cp::$content->form->inputs->get(\cp::$content->the_data_path.'/'.$name,$key);
}
function set($name,$val,$key='value'){
	return \cp::$content->form->inputs->set(\cp::$content->the_data_path.'/'.$name,$val,$key);
}
function del($name,$key='value'){
	return \cp::$content->form->inputs->del(\cp::$content->the_data_path.'/'.$name,$key);
}
function def($name,$val,$key='value'){
	return \cp::$content->form->inputs->def(\cp::$content->the_data_path.'/'.$name,$val,$key);
}
function init($data){
	if(!empty(\cp::$content->form->inputs->data)){return false;}
	$data_path=\cp::$content->form->the_data_path;
	$inputs=\cp::$content->form->inputs;
	foreach($data as $key=>$val){
		if(strpos($key,'/')){$inputs->set($data_path.'/'.dirname($key),$val,basename($key));}
		else{$inputs->set($data_path.'/'.$key,$val);}
	}
}

/*loop*/
function loop($name=null,$prm=null,$vars=null){
	if(empty(\cp::$content)){\cp::$content=new content\loop(['parent'=>false]);}
	if(!empty($name)){
		if(strpos($name,'/')===false){
			return \cp::$content->meta($name,$prm)->loop();
		}
		else{
			switch(substr_count($name,'/')){
				case 1:return \cp::$content->query($name.'/default',$prm)->loop();
				case 2:return \cp::$content->query($name,$prm)->loop();
				case 3:
					$path=dirname($name);
					\cp::enqueue_script($path.'/script.js');
					\cp::enqueue_style($path.'/style.css');
					\cp::$content->query($path,$prm)->render(basename($name),$vars);
			}
		}
	}
	else{return \cp::$content->loop();}
}
function children(){
	return \cp::$content->children();
}
function user($path,$id=null){
	if(is_null($id)){$id=get_current_user_id();}
	return loop('user/'.$path,['ID'=>$id]);
}
function site($path,$id=null){
	if(is_null($id)){$id=get_current_blog_id();}
	return loop('site/'.$path,['site_id'=>$id]);
}
function _item(){
	\cp::$content->allow_input();
	\cp::$content->item_attr();
}
function _unit(){
	\cp::$content->unit_attr();
}
function _cond($cond){
	\cp::$content->refine_cond($cond);
}
function controller(){
	if(!empty(\cp::$content->conf['multiple']) && \cp::$content->conf['multiple']<2){
		\cp::$content->multiple_input_buttons();
	}
	if(!empty(\cp::$content->conf['sortable'])){
		\cp::$content->sort_input_buttons();
	}
}


/*form*/
function §form($file=null,$loop_id=null,$inputs=null,$vars=null){
	if(empty($file)){$file='form';}
	elseif(strpos($file,'/')===false && !preg_match('/^form\-?/',$file)){$file='form_'.$file;}
	
	$form=\cp::$content->form($file,$loop_id,$inputs);
	$form->render(false,$vars);
	return $form;
}
function form($name=null){
	if(empty($name)){return \cp::$content->form??null;}
	if(isset(\cp::$forms[\cp::$content->path.'/'.$name])){return \cp::$forms[\cp::$content->path.'/'.$name];}
	if(isset(\cp::$forms[$name])){return \cp::$forms[$name];}
	return null;
}
function inputs($name=null){
	if(empty($name)){return \cp::$content->form->inputs;}
	if(isset(\cp::$inputs[\cp::$content->path.'/'.$name])){return \cp::$inputs[\cp::$content->path.'/'.$name];}
	if(isset(\cp::$inputs[$name])){return \cp::$inputs[$name];}
	return null;
}
function button($content='送信',$action=false,$callback=null,$param=null,$target=null,$ignore_message=null){
	if(\cp::$content->form){
		\cp::$content->form->button($content,$action,$callback,$param,$target,$ignore_message);
	}
}
function _button($action=false,$callback=null,$param=null,$target=null,$ignore_message=null){
	return \cp::$content->form->button_attr($action,$callback,$param,$target,$ignore_message);
}
function buttons($action=false,$key='paged',$values=null,$callback='replace'){
	\cp::$content->form->buttons($action,$key,$values,$callback);
}
function _buttons($action=false,$key='paged',$callback='replace'){
	return \cp::$content->form->buttons_attr($action,$key,$callback);
}
function _buttons_item($value){
	return \cp::$content->form->buttons_item_attr($value);
}

function message($msg,$sel=null,$cls=null){
	$msg=['message'=>$msg];
	if(isset($sel)){$msg['selector']=$sel;}
	if(isset($cls)){$msg['class']=$cls;}
	$GLOBALS['res']['message'][]=$msg;
}
function res($data){
	global $res;
	$res=array_merge($res??[],$data);
}
function deps(){
	$GLOBALS['res']['deps']=util\wp::get_deps();
}

function §message($content=''){
	if(\cp::$content->form){\cp::$content->form->message($content);}
}
function §results($content='results'){
	\cp::$content->form->results($content);
}
function §navs($content='navs'){
	\cp::$content->form->navs($content);
}
function §lightbox(){
	echo '<div class="cp_lightbox_container"><div class="cp_lightbox_content"></div></div>';
}

function receive(){
	if(empty(\cp::$content->form->is_receiver)){return false;}
	\cp::$content->form->receive();
	return true;
}
function clear($flag=3){
	if(\cp::$content->form)\cp::$content->form->clear($flag);
}
function query($q=null){
	if(isset($q)){return \cp::$content->query($q);}
	if(isset(\cp::$content->form)){return \cp::$content->form->get_query();}
	return \cp::$content->query->q?:null;
}
function push($override=true,$reflect=false){
	if(empty(\cp::$content->form->is_receiver)){return false;}
	return \cp::$content->form->push($override,$reflect);
}
function delete(){
	if(empty(\cp::$content->form->is_receiver)){return false;}
	return \cp::$content->form->delete();
}
function mail($content=''){
	if(empty(\cp::$content->form->is_receiver)){return false;}
	\cp::$content->form->mail($content);
	return true;
}
function inherit($data){
	foreach($data as $key=>$val){
		\cp::$content->form->inherit[$key]=true;
		\cp::$content->form->$key=$val;
	}
}

/*external*/
function inc($file,$vars=null){
	\cp::get_template_part(\cp::$content->path.'/'.$file,$vars);
}
function js($fname='script.js'){
	printf('<script defer src="%s"></script>',\cp::get_file_url($fname,8));
}
function css($fname='style.css'){
	printf('<link rel="stylesheet" href="%s"/>',\cp::get_file_url($fname,8));	
}

function §sec($file=null,$loop_id=null,$inputs=null,$vars=null){
	if(empty($file)){$file='sec';}
	if(strpos($file,'/')===false && $file!=='sec'){$file='sec_'.$file;}
	if(strpos($file,'@')!==false){list($file,$tag)=explode('@',$file);}
	
	$form=\cp::$content->sec($file,$loop_id,$inputs);
	if(isset($tag)){$form->tag=$tag;}
	$form->render(false,$vars);
}
function task($file=null,$param=null,$loop_id=null,$inputs=null){
	if(isset($file) && $task_param=content\task::parse_task_id($file)){
		return new content\task($task_param);
	}
	if(empty($file)){$file='task';}
	elseif(strpos($file,'/')===false){$file='task-'.$file;}
	
	if(empty(\cp::$content->form)){return null;}
	if(isset(\cp::$content->form->tasks[$file])){
		return \cp::$content->form->tasks[$file];
	}
	return \cp::$content->form->task($file,$param,$loop_id,$inputs);
}
function talk($file=null,$param=null,$loop_id=null,$inputs=null){
	if(empty($file)){$file='talk';}
	elseif(strpos($file,'/')===false){$file='talk-'.$file;}
	
	if(isset(\cp::$content->form->talks[$file])){
		return \cp::$content->form->talks[$file];
	}
	return \cp::$content->form->talk($file,$param,$loop_id,$inputs);
}

function me($file=false,$vars=null){
	if(empty($file)){$file='panel';}
	if(strpos($file,'/')===false){$tmp='me';}
	else{$tmp=dirname($file);$file=basename($file);}
	
	$loop=\cp::$content->user(get_current_user_id()?:-1,$tmp);
	$loop->render($file,$vars);
}

function content($path=false){
	if(empty($path)){the_content();}
	$post_data=cp::get_post_data($path);
	if(empty($post_data)){return false;}
	echo str_replace(']]>',']]&gt;',apply_filters('the_content',$post_data['post_content']));
	return true;
}


/*helper*/
function is_current_page(){
	return cp::get_the_real_data_path()===cp::$content->get_the_real_data_path();
}
?>

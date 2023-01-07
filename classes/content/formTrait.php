<?php
namespace Catpow\content;

/**
* formの実装をプラグインによって上書き可能にするための分離
*/
trait formTrait{
	public static
		$form_types=[
			'post'=>1,
			'edit'=>2,
			'search'=>4,
			'none'=>8
		];
	
	public
		$form_type,$form_id,
		$inputs,$sections,
		$allowed_actions,
		$allowed_inputs,
		$loop_id,$performs,
		$is_receiver,$tasks,$talks;
	
	public function __construct($param){
		if(isset($param['form_type']) and is_string($param['form_type'])){
			$param['form_type']=self::$form_types[$param['form_type']];
		}
		parent::__construct($param);
		if(empty($param['form_type'])){
			$tmp_class=\cp::get_class_name('template_type',$this->tmp_name);
			if(!class_exists($tmp_class)){
				$tmp_class=\cp::get_class_name('template_type','template_type');
			}
			$this->form_type=$tmp_class::get_form_type($this->file);
		}
		
		if(empty($this->inputs)){$this->inputs=$this->path.'/'.$this->file_name;}
		if(is_string($this->inputs)){
			if(!isset(\cp::$inputs[$this->inputs])){
				$class_name=\cp::get_class_name('inputs');
				\cp::$inputs[$this->inputs]=new $class_name($this->inputs,[]);
			}
			$this->inputs=\cp::$inputs[$this->inputs];
		}
		elseif(is_array($this->inputs)){
			$inputs_path=$this->path.'/'.$this->file_name;
			if(!isset(\cp::$inputs[$inputs_path])){
				$class_name=\cp::get_class_name('inputs');
				\cp::$inputs[$inputs_path]=new $class_name($inputs_path,$this->inputs);
			}
			$this->inputs=\cp::$inputs[$inputs_path];
		}
		
		if(!isset($this->loop_id)){
			switch($this->form_type){
				case 1:
				case 2:
					$this->loop_id='p';break;
				case 4:
					$this->loop_id='s';break;
				case 8:
					$this->loop_id='n';break;
			}
		}
		if(empty($this->form_id)){
			$this->form_id=str_replace('/','--',$this->path.'/'.$this->file_name);
			if(isset($param['loop_id'])){$this->form_id.='--'.$param['loop_id'];}
		}
		\cp::$forms[$this->form_id]=$this;
	}
	
	/*render*/
	public function render($slug=false,$vars=false){
		wp_enqueue_script('cpform');
		wp_enqueue_script('cpform.nonce');
		\Catpow\api::register_nonce('form/post');
		?>
		<form action="<?= home_url(); ?>" method="get" id="<?= $this->form_id ?>" class="cp_form" enctype="multipart/form-data">
			<input type="hidden" name="cp_form_id" value="<?= $this->form_id ?>"/>
			<div class="cp_form_content" data-role="cp_form_content" data-form-id="<?= $this->form_id ?>">
				<?php $this->inc($slug,$vars); ?>
			</div>
		</form>
		<?php
		return $this;
	}
	
	/*button*/
	public function button($content='送信',$action=false,$callback=null,$param=null,$target=null,$ignore_message=null){
		printf(
			'<div class="button %s" %s>%s</div>',
			$action,$this->button_attr($action,$callback,$param,$target,$ignore_message),$content
		);
	}
	public function fill_buttons($content){
		return preg_replace_callback(
			'/(?:data\-action="(?P<action>[\w_\-]+)")(?:'.
				'(?: data\-callback="(?P<callback>[\w_\-,]+)")|'.
				'(?: data\-param="(?P<param>[\w_\-]+)")|'.
				'(?: data\-target="(?P<target>[\w_\-]+)")|'.
				'(?: ignore\-message="(?P<ignoreMessage>1)")'.
			')*/',
			function($matches){
				return $this->button_attr(
					$matches['action'],
					$matches['callback']??null,
					$matches['param']??null,
					$matches['target']??null,
					$matches['ignoreMessage']??null
				);
			},
			$content
		);
	}
	public function button_attr($action=false,$callback=null,$param=null,$target=null,$ignore_message=null){
		if(is_null($target)){$target=!empty($param)?'action':(is_a($this,form_section::class)?'section':'form');}
		if(is_null($ignore_message)){$ignore_message=in_array($action,['close','cancel','back','prev','reset']);}
		if(is_array($callback)){$callback=implode(',',$callback);}
		$rtn=sprintf('data-role="cp_form_submit_%s" data-callback="%s"',$target,$callback??'replace');
		if(!empty($action)){$this->allow_action($action);$rtn.=' data-action="'.$action.'"';}
		if($ignore_message)$rtn.=' data-ignore-message=1';
		if($param)$rtn.=sprintf(' data-param=\'%s\'',json_encode((array)$param));
		return $rtn;
	}
	/*buttons*/
	public function buttons($action=false,$key='paged',$values=null,$callback='replace'){
		printf('<ul class="buttons %s" %s>',$action,$this->button_attr($action,$key,$callback));
		foreach($values as $key=>$val){
			printf('<li %s>%s</li>',$this->buttons_item_attr($val),is_int($key)?$val:$key);
		}
		echo '</ul>';
	}
	public function buttons_attr($action=false,$key='paged',$callback='replace'){
		$rtn=sprintf('data-role="cp_form_action_submit_group" data-param-key="%s" data-callback="%s"',$key,$callback);
		if(!empty($action)){$this->allow_action($action);$rtn.=' data-action="'.$action.'"';}
		return $rtn;
	}
	public function buttons_item_attr($value){
		return sprintf('data-param-value="%s"',$value);
	}
	
	
	/*div*/
	public function results($content='results'){
		return $this->div('results',$content);
	}
	public function message($content=''){
		return $this->div('message',$content);
	}
	public function navs($content='navs'){
		return $this->div('navs',$content);
	}
	public function div($name,$content){
		printf('<div class="cp_form_%1$s" data-role="cp_form_%1$s" data-form-id="%2$s">',$name,$this->form_id);
		if(!empty($content)){
			if(is_callable($content)){$content();}
			elseif(!\cp::get_template_part($this->path.'/'.$this->path_data['file_name'].'-'.$content.'.php')){echo $content;}
		}
		print('</div>');
		return $this;
	}
	
	public function inc($slug=false,$vars=false){
		$parent_content=\cp::$content;
		\cp::$content=$this;
		if(empty($slug)){$file=$this->file;}
		else{$file=$this->path_data['file_name'].'-'.$slug.'.php';}
		\cp::get_template_part($this->path.'/'.$file,$vars);
		\cp::$content=$parent_content;
	}
	
	/*form*/
	public function remove(){
		if(!empty($this->tasks)){
			foreach($this->tasks as $task){$task->delete();}
		}
		unset(\cp::$forms[$this->form_id]);
		if(empty($this->sections))return;
		foreach($this->sections as $section){
			\cp::$forms[$section->form_id]->remove();
		}
		return $this;
	}
	
	/*inputs*/
	public function clear($flag=3){
		if($flag&1){$this->allowed_actions=[];$this->allowed_inputs=[];}
		if($flag&2){$this->inputs->data=[];}
		if($flag&4){$this->remove();}
		return $this;
	}
	public function allow_action($action){
		$this->allowed_actions[]=$action;
	}
	public function allow_input($name,$meta,$key='value'){
		$this->allowed_inputs[\cp::get_input_id($name,$key)]=$meta;
	}
	public function get($name,$key='value'){
		if(strpos($name,'->')!==false){
			list($name,$relkey)=explode('->',$name);
			$conf=$this->conf['meta'][$name];
			if(empty($conf)){return [];}
			$class_name=\cp::get_class_name('meta',$conf['type']);
			$values=$this->inputs->get($this->the_data_path.'/'.$name);
			return $class_name::get_rel_data_value($relkey,$values,$conf);
		}
		return $this->inputs->get($this->the_data_path.'/'.$name,$key);
	}
	public function set($name,$val,$key='value'){
		return $this->inputs->set($this->the_data_path.'/'.$name,$val,$key);
	}
	public function del($name,$key='value'){
		return $this->inputs->del($this->the_data_path.'/'.$name,$key);
	}
	public function def($name,$val,$key='value'){
		return $this->inputs->def($this->the_data_path.'/'.$name,$val,$key);
	}
	public function receive($req=false){
		if($req===false){$req=$_REQUEST;}
		$inputs_class_name=\cp::get_class_name('inputs');
		$req=new $inputs_class_name('tmp',$req);
		$inputs=[];
		$errors=[];
		if(empty($this->allowed_inputs)){return false;}
		ksort($this->allowed_inputs);
		foreach($this->allowed_inputs as $input_id=>$meta){
			$path_data=\cp::parse_input_id($input_id);
			$vals=$req->get_by_id($input_id);
			if(is_array($vals)){$vals=array_filter($vals);}
			if(!empty($vals)){
				$validations=self::get_validations($meta->conf);
				foreach($validations as $validation){
					$validation::validate($input_id,$vals,$meta->conf,$errors);
				}
				$inputs[$input_id]=$vals;
			}
			else{
				if(isset($meta->conf['required']) and $this->form_type & $meta->conf['required']){
					$class_name=\cp::get_class_name('validation','required');
					$errors[$input_id]=$class_name::get_message($meta->conf);
				}
				if(isset($meta->conf['required_if']) and $this->form_type & 1){
					$required=true;
					foreach($meta->conf['required_if'] as $key=>$vals){
						if(
							empty(array_intersect((array)$vals,(array)$req->get($this->the_data_path.'/'.$key))) &&
							empty(array_intersect((array)$vals,(array)$this->inputs->get($this->the_data_path.'/'.$key)))
						){
							$required=false;break;
						}
					}
					if($required){
						$class_name=\cp::get_class_name('validation','required');
						$errors[$input_id]=$class_name::get_message($meta->conf);
					}
				}
				$inputs[$input_id]=null;
			}
		}
		if(!empty($errors)){throw new form_exception(['message'=>$errors]);}
		
		foreach($inputs as $input_id=>$vals){
			$meta=$this->allowed_inputs[$input_id];
			if(empty($meta->conf['type'])){continue;}
			$class_name=\cp::get_class_name('meta',$meta->conf['type']);
			$class_name::reflect_to_inputs($this->inputs,$input_id,$vals,$meta);
		}
		if(!empty($this->conf['on_receive'])){$this->conf['on_receive']($this);}
		
		return true;
	}
	public function get_task($file=null){
		if(empty($file)){$file='task';}
		elseif(strpos($file,'/')===false){$file='task-'.$file;}
		return $this->tasks[$file]??null;
	}
	public function do_task_check_process($task_processes){
		foreach($task_processes as $task_process){
			$task=$this->get_task($task_process['file']??null);
			if(empty($task)){return false;}
			if(!empty($task_process['is_checked']) && !$task->is_checked()){return false;}
			if(!empty($task_process['is_completed']) && !$task->is_completed()){return false;}
			if(!empty($task_process['is_flagged']) && !$task->is_flagged($task_process['is_flagged'])){return false;}
		}
		return true;
	}
	public function do_task_main_process($task_processes){
		error_log(var_export($task_processes,1).__FILE__.__LINE__);
		foreach($task_processes as $task_process){
			if(!empty($task_process['create'])){
				if(empty($file)){$file='task';}
				elseif(strpos($file,'/')===false){$file='task-'.$file;}
				$task=$this->task($file,$task_process['create']);
			}
			else{
				$task=$this->get_task($task_process['file']??null);
			}
			if(empty($task)){continue;}
			if(!empty($task_process['save'])){$task->save();}
			if(!empty($task_process['load'])){$task->load();}
			if(!empty($task_process['check'])){$task->check();}
			if(!empty($task_process['complete'])){$task->complete();}
			if(!empty($task_process['flag'])){$task->flag($task_process['flag'],true);}
			if(!empty($task_process['unflag'])){$task->flag($task_process['unflag'],false);}
		}
	}
	
	/*perform*/
	public function change_data_id($data_id){
		if($this->loop_id === $data_id){return false;}
		$tgt=&$this->inputs->data[$this->data_type][$this->data_name];
		if(isset($tgt[$this->loop_id])){
			$tgt[$data_id]=$tgt[$this->loop_id];
			unset($tgt[$this->loop_id]);
		}
		$this->loop_id=$data_id;
	}
	public function push($override=true,$reflect=false){
		try{
			$data_id=\cp::update_data($this->inputs->data,$this->the_data_path,$override);
			if($reflect){
				$this->change_data_id($data_id);
				$this->form_type=2;
			}
			return $data_id;
		}
		catch(Exception $e){
			$this->error($e->getMessage());
		}
	}
	public function delete(){
		return \cp::delete_data($this->the_data_path);
	}
	public function mail($content=''){
		$headers=[];
		ob_start();
		if(is_callable($content)){$content();}
		elseif($f=\cp::get_file_path($this->path.'/mail'.(empty($content)?'':'-'.$content).'.php')){include($f);}
		else{echo $content;}
		$headers['message']=ob_get_clean();
		return \cp::send_mail($headers);
	}
	public function error($message,$detail=null){
		if(is_array($message)){
			throw new form_exception([
				'message'=>array_map(
					function($val){return __($val,'catpow');},
					$message
				),
				'detail'=>$detail
			]);
		}
		throw new form_exception(['message'=>[str_replace('/','--',$this->form_id)=>__($message,'catpow')]]);
	}
	
	public function get_validations($conf){
		$class_name=\cp::get_class_name('meta',$conf['type']?:'text');
		$validations=$class_name::get_validations($conf);
		if(isset($conf['validation'])){$validations=array_merge($validations,$conf['validation']);}
		$rtn=[];
		foreach($validations as $key=>$val){
			if(is_numeric($key)){$rtn[]=\cp::get_class_name('validation',$val);}
			elseif($this->form_type & $val){$rtn[]=\cp::get_class_name('validation',$key);;}
		}
		$rtn[]=$class_name;
		return $rtn;
	}
	
	public function loop(){
		$loop=new loop([
			'path'=>$this->path,
			'parent'=>$this,
			'query'=>$this->get_query()
		]);
		return $loop->loop();
	}
	public function collect($key,$prm=null,$sort=null){
		$loop=new loop([
			'path'=>$this->path,
			'parent'=>$this,
			'query'=>$this->get_query()
		]);
		return $loop->collect($key,$prm,$sort);
	}
	public function get_query(){
		$class_name=\cp::get_class_name('query',$this->data_type);
		return $class_name::from_request($this->inputs->data,$this->data_name,$this->loop_id);
	}
	
	public static function response(){
		check_ajax_referer('cp_form','_cp_form_nonce');
		global $res;
		add_action('set_logged_in_cookie',function($logged_in_cookie){
			$_COOKIE[LOGGED_IN_COOKIE]=$logged_in_cookie;
		});
		ob_start();
		try{
			$form=\cp::get_the_form();
			\cp::$content=$form;
			$form->is_receiver=true;
			
			$res=array();
			if(isset($_REQUEST['cp_form_action'])){
				$cp_form_action=$_REQUEST['cp_form_action'];
				if(isset($form->allowed_inputs[$cp_form_action])){
					$meta=$form->allowed_inputs[$cp_form_action];
					$class_name=\cp::get_class_name('meta',$meta->conf['type']);
					$class_name::response($meta);
				}
				else{
					if(!in_array($_REQUEST['cp_form_action'],$form->allowed_actions)){
						error_log('not allowed form action : '.$_REQUEST['cp_form_action']);
						$form->error('不正なリクエストです','not allowed form action : '.$_REQUEST['cp_form_action']);
					}
					if(
						\cp::get_template_part(
							$form->path.'/'.$form->file_name.'-'.$cp_form_action.'.php',
							['action'=>$cp_form_action]
						) ||
						\cp::get_template_part(
							$form->path.'/'.$form->file_name.'.php',
							['action'=>$cp_form_action]
						)
					){
						$res['action']=$cp_form_action;
					}
					else{
						$form->error('無効なリクエストです');
					}
				}
			}
			else{
				$cp_form_action=$form->file_slug??false;
				$file=$form->file;
				\cp::get_template_part($form->path.'/'.$file);
				$res['action']=$cp_form_action;
			}
		}
		catch(form_exception $e){
			if(isset($e->data['message'])){
				$res['callback']='message';
				foreach($e->data['message'] as $input_id=>$message){
					$res['message'][]=[
						'selector'=>'#'.$input_id,
						'message'=>$message
					];
				}
			}
			if(isset($e->data['detail'])){
				$res['error_detail']=$e->data['detail'];
			}
			$res['action']=$e->action;
		}
		finally{
			if(isset($form)){$form->is_receiver=false;}
		}
		$res['html']=ob_get_clean();
		printf('%s(%s);',$_REQUEST['callback'],json_encode($res));
		die();
	}
}

?>
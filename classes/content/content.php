<?php
namespace Catpow\content;

/**
* コンテンツの情報の保持と出力を担う
* テーマのテンプレートフォルダに紐づけられ、
* 各種処理に利用するファイルを制限する
* インスタンスは完全なdata_pathとcontent_pathを生成できる
* path_dataを保持することを保証しなくてはならない
* 
*/
class content extends \stdClass{
	public $parent,$inherit,$childrens;
	protected $value;
	
	public function __construct($param){
		foreach($param as $key=>$val){$this->$key=$val;}
		if(!isset($this->parent)){$this->parent=\cp::$content;}
	}
	
	public static function from_object($object,$tmp='single',$parent=null,$value_source=null){
		$param=['object'=>$object];
		$path_data=\cp::get_data_info($object);
		$param['data_path']=$path_data['data_type'].'/'.$path_data['data_name'];
		$param['loop_id']=$path_data['data_id'];
		$content_path=$path_data['data_type'].'/'.$path_data['data_name'].'/'.$tmp;
		if(strpos($tmp,'/')===false){
			$param['tmp']=$tmp;
			$param['path']=$content_path;
		}
		else{
			$param['tmp']=dirname($tmp);
			$param['file']=basename($tmp);
			$param['file_path']=$content_path;
		}
		return new static($param);
	}
	
	/*create child instance*/
	public function content($path){
		return new self(['path'=>$path,'parent'=>$this]);
	}
	public function user($user_id=null,$tmp_name='default'){
		if(empty($user_id)){$user_id=get_current_user_id();}
		$query_class=\cp::get_class_name('query','user');
		return new loop([
			'path'=>'user/'.\cp::get_data_name('user',$user_id).'/'.$tmp_name,
			'parent'=>$this,
			'query'=>new $query_class(['search'=>$user_id,'search_columns'=>['ID']]),
			'loop_id'=>$user_id
		]);
	}
	public function query($path,$q=null){
		if(is_null($q)){$q=[];}
		$path_data=\cp::parse_content_path($path);
		$class_name=\cp::get_class_name('query',$path_data['data_type']??'post');
		if(is_array($q)){
			if(is_object(reset($q))){return new loop(['path'=>$path,'parent'=>$this,'objects'=>$q]);}
			$q=array_merge($q,$path_data);
		}
		if(!is_object($q) || !is_a($q,$class_name)){$q=new $class_name($q);}
		
		return new loop(['path'=>$path,'parent'=>$this,'query'=>$q]);
	}
	public function children(){
		if(is_null($this->loop_id)){return false;}
		if(isset($this->childrens[$this->loop_id])){return $this->childrens[$this->loop_id];}
		return $this->childrens[$this->loop_id]=$this->query($this->path,['parent'=>$this->loop_id]);
	}
	public function meta($name,$param=null){
		if(is_array($name)){
			$conf=$name;
			$name=$name['name'];
			\cp::fill_conf($conf,$this->path.'/'.$name);
			$conf_data=&\cp::get_conf_data($this->conf_data_path.'/'.$name);
			if(!isset($conf_data)){$conf_data=$conf;}
		}
		if(strpos($name,'/')){
			list($name,$loop_id)=explode('/',$name);
		}
		$prm=[
			'parent'=>$this,
			'data'=>$this->get_the_data($name),
			'path'=>$this->path.'/'.$name,
			'data_path'=>$this->get_the_data_path($name),
			'param'=>$param
		];
		if(isset($loop_id)){
			$prm+=['loop_id'=>$loop_id];
		}
		if(isset($conf)){
			$prm+=[
				'inherit'=>['conf'=>true],
				'conf'=>$conf
			];
		}
		elseif(!is_null($this->conf) && !empty($this->conf['meta'][$name])){$prm['meta']=$this->conf['meta'][$name];}
		return new meta($prm);
	}
	public function rel_meta($name,$param=null){
		return new meta([
			'parent'=>$this,
			'data_path'=>$this->rel_data_path.'/'.$name,
			'param'=>$param
		]);
	}
	public function form($file,$loop_id=null,$inputs=null){
		return new form($this->get_form_param($file,$loop_id,$inputs));
	}
	public function sec($file,$loop_id=null,$inputs=null){
		return new form_section($this->get_form_param($file,$loop_id,$inputs));
	}
	public function task($file,$param=null,$loop_id=null,$inputs=null){
		$form_param=$this->get_form_param($file,$loop_id,$inputs);
		$form_param['form_id']=$file;
		$form_param['param']=$param;
		if(isset($this->inherit)){
			$form_param['inherit']=$this->inherit;
			foreach(array_keys($this->inherit) as $key){
				$form_param[$key]=$this->$key;
			}
		}
		return new task($form_param);
	}
	public function talk($file,$param=null,$loop_id=null,$inputs=null){
		$form_param=$this->get_form_param($file,$loop_id,$inputs);
		$form_param['form_id']=$file;
		$form_param['param']=$param;
		return new talk($form_param);
	}
	public function get_form_param($file,$loop_id=null,$inputs=null){
		$rtn=['parent'=>$this,'inputs'=>$inputs];
		if(strpos($file,'/')===false){
			$rtn['file_path']=$this->path.'/'.$file.'.php';
			$rtn['data_path']=$this->data_path;
			if(isset($loop_id)){
				$query_class_name=\cp::get_class_name('query',$this->data_type);
				$rtn['loop_id']=$loop_id;
				$rtn['object']=$query_class_name::get($this->data_name,$loop_id);
			}
			else{
				$rtn['loop_id']=$this->loop_id;
				$rtn['object']=$this->object;
			}
		}
		else{
			$rtn['file_path']=$file.(substr($file,-4)==='.php'?'':'.php');
			$path_data=\cp::parse_content_file_path($rtn['file_path']);
			$rtn['loop_id']=$loop_id;
			$query_class_name=\cp::get_class_name('query',$path_data['data_type']);
			if(class_exists($query_class_name)){
				$rtn['object']=$query_class_name::get($path_data['data_name'],$loop_id);
			}
		}
		return $rtn;
	}
	
	/*attr*/
	public function refine_cond($cond){
		printf(" data-refine-cond='%s'",json_encode($this->get_refine_cond_value($cond)));
	}
	public function get_refine_cond_value($cond){
		$refine_cond=array();
		foreach($cond as $name=>$val){
			$refine_cond[\cp::get_input_name($this->the_data_path.'/'.$name)]=(array)$val;
		}
		return $refine_cond;
	}
	
	/*loop data*/
	public function value($name=null){
		$vals=$this->get_the_data($name);
		if(is_array($vals)){return reset($vals);}
		return $vals;
	}
	public function values($name=null){
		return (array)$this->get_the_data($name);
	}
	public function get_data($name=null){
		if(isset($name)){return $this->get_the_data($name);}
		if(!is_null($this->form)){
			if(!empty($val=$this->form->inputs->get($this->data_path))){return $val;}
		}
		$class_name=\cp::get_class_name('meta',$this->conf['type']?:'text');
		if(isset($this->data)){return $this->data;}

		if(is_a($this,meta::class) && $val=\cp::get_the_meta_value($this->data_path,$this->tmp_name)){return $val;}

		return (array)$class_name::default_value($this->conf);
	}
	public function get_data_path($name=null){
		if(isset($name)){return $this->data_path.'/'.$this->loop_id.'/'.$name;}
		return $this->data_path;
	}
	public function get_the_data($name=null){
		if(isset($name)){
			if(!isset($this->loop_id)){return null;}
			if(strpos($name,'->')!==false){
				list($name,$relkey)=explode('->',$name);
				$class_name=\cp::get_class_name('meta',$this->conf['meta'][$name]['type']??'text');
				return $class_name::get_rel_data_value($relkey,static::get_the_data($name),$this->conf['meta'][$name]);
			}
			if(isset($this->data[$this->loop_id][$name])){return $this->data[$this->loop_id][$name];}
			if(!is_null($this->form)){
				if(!empty($val=$this->form->inputs->get($this->get_the_data_path($name)))){return $val;}
			}
			
			if($vals=\cp::get_the_meta_value($this->the_data_path.'/'.$name,$this->tmp_name)){return $vals;}
			
			$class_name=\cp::get_class_name('meta',$this->conf['meta'][$name]['type']??'text');
			return (array)$class_name::default_value($this->conf['meta'][$name]??[]);
		}
		else{
			if(!is_null($this->form)){
				if(!empty($val=$this->form->inputs->get($this->get_the_data_path()))){return $val;}
			}
			$class_name=\cp::get_class_name('meta',$this->conf['type']??'text');
			if(isset($this->object)){return $this->object;}
			if(is_null($this->loop_id)){if(!empty($this->data)){return $this->data;}}
			elseif(isset($this->data[$this->loop_id])){return $this->data[$this->loop_id];}

			if(is_a($this,meta::class) && $val=\cp::get_the_meta_value($this->the_data_path,$this->tmp_name)){return $val;}
			
			
			if(isset($this->loop_id)){
				return $class_name::default_value($this->conf);
			}
			return (array)$class_name::default_value($this->conf);
		}
	}
	public function get_the_data_path($name=null){
		if(isset($name)){return $this->data_path.'/'.$this->loop_id.'/'.$name;}
		if(isset($this->loop_id)){return $this->data_path.'/'.$this->loop_id;}
		return $this->data_path;
	}
	public function get_the_real_data_path($name=null){
		if(isset($name)){return $this->real_data_path.'/'.$this->loop_id.'/'.$name;}
		if(isset($this->loop_id)){return $this->real_data_path.'/'.$this->loop_id;}
		return $this->real_data_path;
	}
	
	public function get_the_image_id(){
		if(isset($this->conf['meta']['image'])){return $this->get_the_data('image?')[0];}
		if($this->real_path_data['data_type']==='post' && post_type_supports($this->real_path_data['data_name'],'thumbnail')){
			return get_post_thumbnail_id($this->loop_id);
		}
		return null;
	}
	public function get_the_image_url($size='full'){
		return wp_get_attachment_image_url($this->get_the_image_id(),$size);
	}
	public function get_the_url(){
		if(isset($this->path_data['meta_path'])){
			$meta_class=\cp::get_class_name('meta',$this->conf['type']);
			return $meta_class::get_the_url($this->get_the_data_path());
		}
		$query_class=\cp::get_class_name('query',$this->data_type);
		return $query_class::get_the_url($this->object);
	}
	
	/*render*/
	public function render($file=null,$vars=false){
		if(\cp::$content!==$this){$org_content=\cp::$content;\cp::$content=$this;}
		if(empty($file)){
			if(!is_null($this->file)){$file=$this->file;}
			else{$file='index';}
		}
		\cp::get_template_part($this->path.'/'.$file,$vars);
		if(isset($org_content)){\cp::$content=$org_content;}
	}
	public function render_content($file,$vars=false){
		$path=dirname($file);
		\cp::enqueue_script($path.'/script.js');
		\cp::enqueue_style($path.'/style.css');
		$this->content($path)->render(basename($file),$vars);
	}
	public function render_loop($file,$q=null,$vars=false){
		$path=dirname($file);
		\cp::enqueue_script($path.'/script.js');
		\cp::enqueue_style($path.'/style.css');
		$this->query($path,$q)->render(basename($file),$vars);
	}
	
	/*helper*/
	public function get_closest($q){
		if(is_callable($q)){return $this->get_closest_callback($q);}
		if(strpos($q,'/')===false){return $this->get_closest_of_class($q);}
		return $this->get_closest_of_data($q);
	}
	public function get_closest_of_class($class){
		if(is_a($this,'Catpow\\content\\'.$class)){return $this;}
		if(!empty($this->parent)){return $this->parent->get_closest($class);}
		return null;
	}
	public function get_closest_of_data($conf_data_path){
		if(!is_null($this->conf)){
			if($conf_data_path[0]!=='/' && strpos($conf_data_path,'*')!==false){
				$conf_data_path='/^'.str_replace(['/','*'],['\/','[^\/]+'],$conf_data_path).'$/';
			}
			if($conf_data_path[0]==='/'){
				if(preg_match($conf_data_path,$this->conf['path'])){return $this;}
				if(isset($this->conf['alias_path']) && preg_match($conf_data_path,$this->conf['alias_path'])){return $this;}
			}
			else{
				if($this->conf['path']===$conf_data_path){return $this;}
				if(isset($this->conf['alias_path']) && $this->conf['alias_path']===$conf_data_path){return $this;}
			}
		}
		if(!empty($this->parent)){return $this->parent->get_closest_of_data($conf_data_path);}
		return null;
	}
	public function get_closest_callback($callback){
		if($callback($this)){return $this;}
		if(isset($this->parent)){return $this->parent->get_closest($content_class);}
		return null;
	}
	
	public function is_empty(){
		if(isset($this->objects)){return empty($this->objects);}
		if(is_a($this,loop::class)){return empty($this->query) || $this->query->is_empty();}
		if(is_a($this,meta::class)){return empty(array_filter($this->data)) && empty(\cp::get_the_meta_value($this->data_path,$this->tmp_name));}
		if(is_a($this,form::class)){return empty($this->form->inputs->get($this->data_path));}
	}
	
	/*magic method*/
	public function __get($name){
		if(isset($this->path_data[$name])){return $this->path_data[$name];}
		switch($name){
			case 'the_id':
			case 'the_parent':
			case 'the_name':
			case 'the_title':
			case 'the_content':{
				if(empty($this->object)){return null;}
				$data_type_class=\cp::get_class_name('data_type',$this->data_type);
				return $data_type_class::{'get_'.substr($name,4)}($this->object);
			}
			case 'the_url':{
				return $this->get_the_url();
			}
			case 'the_data_path':
				return $this->get_the_data_path();
			case 'the_real_data_path':
				return $this->get_the_real_data_path();
			case 'value':
				return $this->value??$this->get_the_data();
			case 'file':
				$file=$this->path_data['file_name']??'index';
				if(!empty($this->path_data['file_slug'])){$file.='-'.$this->path_data['file_slug'];}
				if(!empty($this->path_data['file_type'])){$file.='.'.$this->path_data['file_type'];}
				else{$file.='.php';}
				return $this->file=$file;
			case 'tmp':
				$tmp=$this->path_data['tmp_name'];
				if(!empty($this->path_data['tmp_slug'])){$tmp.='-'.$this->path_data['tmp_slug'];}
				return $this->tmp=$tmp;
			case 'content_type':return $this->content_type=$this->path_data['data_type'];
			case 'content_name':return $this->content_type=$this->path_data['data_name'];
			case 'meta_name':return $this->meta_name=end($this->path_data['meta_path'])['meta_name'];
			case 'meta_id':return $this->meta_id=end($this->path_data['meta_path'])['meta_id'];
			case 'path_data':
				if(isset($this->data_path)){$path_data=\cp::parse_data_path($this->data_path);}
				else{$path_data=[];}
				if(isset($this->data_type)){$path_data['data_type']=$this->data_type;}
				if(isset($this->data_name)){$path_data['data_name']=$this->data_name;}
				if(isset($this->data_id)){$path_data['data_id']=$this->data_id;}
				if(isset($this->meta_name)){
					$meta=['meta_name'=>$this->meta_name];
					if(isset($this->meta_id)){$meta['meta_id']=$this->meta_id;}
					$path_data['meta_path'][]=$meta;
				}
				if(isset($this->file_path)){$path_data=array_merge(\cp::parse_content_file_path($this->file_path),$path_data);}
				elseif(isset($this->path)){
					if(isset($this->file)){
						$path_data=array_merge(\cp::parse_content_file_path($this->path.'/'.$this->file),$path_data);
					}
					else{$path_data=array_merge(\cp::parse_content_path($this->path),$path_data);}
				}
				elseif(isset($path_data['data_type']) and isset($path_data['data_name']) and isset($this->tmp)){
					$content_path=$path_data['data_type'].'/'.$path_data['data_name'].'/'.$this->tmp;
					if(isset($this->file)){
						$path_data=array_merge(\cp::parse_content_file_path($content_path.'/'.$this->file),$path_data);
					}
					else{$path_data=array_merge(\cp::parse_content_path($content_path),$path_data);}
				}
				return $this->path_data=$path_data;
			case 'conf':return $this->conf=\cp::get_the_conf_data($this->path);
			case 'input_name':return \cp::get_input_name($this->data_path);
			case 'input_id':return \cp::get_input_id($this->data_path);
			case 'path':return $this->path=\cp::create_content_path($this->path_data);
			case 'url':return $this->url=get_theme_file_uri($this->path);
			case 'file_path':return $this->file_path=\cp::create_content_file_path($this->path_data);
			case 'data_path':return $this->data_path=\cp::create_data_path($this->path_data);
			case 'real_data_path':return $this->real_data_path=\cp::create_data_path($this->real_path_data);
			case 'real_path_data':return $this->real_path_data=\cp::realize_path_data($this->path_data);
			case 'conf_data_path':return $this->conf_data_path=\cp::create_conf_data_path($this->path_data);
			case 'query':
				$this->query=[\cp::get_data_type_name($this->data_type)=>$this->data_name];
				if(isset($this->path_data['data_id'])){
					$this->query[\cp::get_data_id_name($this->data_type)]=$this->path_data['data_id'];
				}
				return $this->query;
			case 'value_source':
				$value_source=[];
				if(!is_null($this->form)){$value_source[]='input';}
				if(isset($this->data)){$value_source[]='data';}
				if(isset($this->object)){$value_source[]='object';}
				if(isset($this->query)){$value_source[]='query';}
				if(isset($this->value)){$value_source[]='value';}
				if(isset($this->data_id)){$value_source[]='post';}
				$value_source[]='default';
				return $this->value_source=$value_source;
			case 'form':return $this->form=$this->get_closest('form');
			case 'loop':return $this->loop=$this->get_closest('loop');
			case 'h':
			case 'handler':
				if(is_a($this,meta::class)){
					$class_name=\cp::get_class_name('meta',$this->conf['type']);
					return $this->handler=new $class_name($this->data_path,$this->conf,$this->get_data());
				}
				$class_name=\cp::get_class_name('article_type',$this->conf['type']);
				if(class_exists($class_name)){
					return $this->handler=new $class_name($this->the_data_path,$this->conf,$this->get_the_data());
				}
				return null;
			case 'props':
				if(is_a($this,meta::class)){
					$class_name=\cp::get_class_name('meta',$this->conf['type']);
					return $this->props=$class_name::get_props($this);
				}
				return null;
			case 'length':
				if(isset($this->objects)){return count($this->objects);}
				return $this->query->length;
		}
	}
	public function __sleep(){
		$keys=['data_path','tmp','file'];
		if(isset($this->inherit)){$keys=array_merge($keys,array_keys($this->inherit));}
		foreach($keys as $key){
			if(is_null($this->$key)){$this->$key=null;}
		}
		$ref=new \ReflectionClass(static::class);
		return array_merge(
			$keys,
			array_diff(
				array_keys($ref->getDefaultProperties()),
				array_keys($ref->getStaticProperties())
			)
		);
	}
}

?>
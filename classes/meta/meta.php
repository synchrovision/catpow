<?php
namespace Catpow\meta;
abstract class meta{
	public static
		$value_type='CHAR',
		$data_type='longtext',
		$input_type='text',
		$output_type=null,
		$validation=[],
		$has_children=false,
		$can_edit=true,
		$can_search=true,
		$can_search_with_range=false,
		$is_database=false,
		$has_parent=true,
		$is_bulk_input=false,
		$is_bulk_output=false,
		$is_unit_input=false,
		$is_unit_output=false,
		$functions=[];
	public $data_path,$path_data,$conf,$data;
	
	public function __construct($data_path,$conf,$data=null){
		$this->data_path=$data_path;
		$this->path_data=\cp::parse_data_path($data_path);
		$this->conf=$conf;
		
		if(isset($data)){$this->data=$data;}
		else{$this->load();}
	}
	public function mod($key,$val){
		eval('$this->data["'.str_replace('/','"]["',$key).'"]=$val;');
		return $this;
	}
	public function load(){
		$query_class=\cp::get_class_name('query',$this->path_data['data_type']);
		if($query_class::is_available_id($this->path_data['data_id'])){
			$this->data=static::get(
				$this->path_data['data_type'],
				$this->path_data['data_name'],
				$this->path_data['data_id'],
				$this->path_data['meta_path'][0]['meta_name'],
				$this->conf
			);
		}
		return $this;
	}
	public function save(){
		static::set(
			$this->path_data['data_type'],
			$this->path_data['data_name'],
			$this->path_data['data_id'],
			$this->path_data['meta_path'][0]['meta_name'],
			$this->data,
			$this->conf
		);
		return $this;
	}
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return call_user_func(['\\Catpow\\data_type\\'.$data_type,'get_meta'],$data_name,$id,$meta_name);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		call_user_func(['\\Catpow\\data_type\\'.$data_type,'delete_meta'],$data_name,$id,$meta_name);
		foreach((array)$vals as $val){
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,$meta_name,$val);
		}
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach((array)$vals as $val){
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,$meta_name,$val);
		}
	}
	public static function export($data_type,$data_name,$id,$meta_name,$conf){
		return static::get($data_type,$data_name,$id,$meta_name,$conf);
	}
	public static function import($data_type,$data_name,$id,$meta_name,$vals,$conf){
		return static::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	
	public static function get_rel_data_value($relkey,$vals,$conf){
		return array_column($vals,$relkey);
	}
	
	public static function output($meta,$prm){
		if(is_array($meta->value)){return implode(',',$meta->value);}
		return $meta->value;
	}
	public static function input($meta,$prm){
		return sprintf(
			'<input type="%s" name="%s" value="%s"%s/>',
			isset(static::$input_type)?static::$input_type:static::get_type(),
			\cp::get_input_name($meta->the_data_path),$meta->value,
			\cp::get_input_attr($meta->the_data_path,$meta->conf)
		);
	}
	public static function loop($meta){
		if(isset($meta->param)){$loop=$meta->param;}
		elseif(!empty($meta->conf['multiple']) && $meta->conf['multiple']>1){
			for($i=0;$i<$meta->conf['multiple'];$i++){
				$loop[$i]=$meta->value[$i]??null;
			}
		}
		else{$loop=$meta->value;}
		
		if(is_iterable($loop)){
			foreach($loop as $meta_id=>$meta_value){
				yield $meta_id=>$meta_value;
			}
		}
	}
	public static function get_props($meta){
		return ['value'=>$meta->value];
	}
	
	public static function get_validations($conf){return static::$validation;}
	public static function validate($input_id,$vals,$meta,&$errors){}
	public static function reflect_to_inputs($inputs,$input_id,$vals,$meta){
		$inputs->set_by_id($input_id,$vals);
	}
	
	/**
	* 投稿時のデータへの反映方法を定義
	* 
	*/
	public static function reflect_to_data(&$data,$data_type,$data_name,$meta_name,$id,$input,$conf){
		$data['meta_data'][$meta_name]=$input['value'];
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty(array_filter($input['value']))){return false;}
		
		$input=array_merge(['compare'=>$conf['compare']??'IN','type'=>static::$value_type],$input);
		if($input['compare']==='AND'){
			foreach($input['value'] as $i=>$val){
				$query['meta_query'][$meta_name.$i]=['key'=>$meta_name,'value'=>$val,'compare'=>'=','type'=>$input['type']];
			}
		}else{
			switch(strtoupper($input['compare'])){
				case 'BETWEEN':
					if(empty($input['value'][0])){$input['compare']='<=';$input['value']=implode('',$input['value']);}
					if(empty($input['value'][1])){$input['compare']='>=';$input['value']=implode('',$input['value']);}
					break;
				case 'REGEXP':
				case 'NOT REGEXP':
				case 'ALIKE':
					$input['value']=reset($input['value']);
					break;
				case 'LIKE':
				case 'NOT LIKE':
					$input['value']='%'.reset($input['value']).'%';
					break;
				case 'LEFT':$input['value']=reset($input['value']).'%';$input['compare']='LIKE';break;
				case 'RIGHT':$input['value']='%'.reset($input['value']);$input['compare']='LIKE';break;
				default:
					if(preg_match('/^[<>=]+$/',$input['compare'])==1){
						$input['value']=reset($input['value']);
					}
			}
			$query['meta_query'][$meta_name]=array('key'=>$meta_name,'value'=>$input['value'],'compare'=>$input['compare'],'type'=>$input['type']);
		}
	}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){
		global $wp_query;
		$order_data['orderby']='meta_value&meta_key='.$meta_name;
		$order_data['desc_first']=(isset($wp_query->query['order']) and $wp_query->query['order']!=='desc');
		return true;
	}
	
	public static function fill_conf(&$conf){
		
	}
	public static function resolve_conf($conf){return $conf;}
	
	public static function default_value($conf){
		if(empty($conf['default'])){return '';}
		if(is_object($conf['default']) && is_a($conf['default'],'Closure')){return $conf['default']();}
		return $conf['default'];
	}
	
	public static function get_type(){
		return substr(static::class,strrpos(static::class,'\\')+1);
	}
	
	public static function response($meta){
		global $res;
		$meta->form->receive();
		$res['callback']='replace_item';
		$res['items']=[
			['selector'=>'#'.\cp::get_input_id($meta->data_path),'html'=>$meta->get_input()]
		];
	}
	
	public static function get_the_url($data_path){
		return home_url($data_path);
	}
}
?>
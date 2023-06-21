<?php
namespace Catpow\content;

/**
* data,paramとmeta_typeによりloopを行う
* data_pathはmeta_nameを終端とする
*/
class meta extends content{
	public $param;
	
	/*input output*/
	public function output($prm=null,$format=null){
		$class_name=\cp::get_class_name('meta',$this->conf['output-type']??$this->conf['type']??'text');
		$format=$format??$this->conf['output-format']??$this->conf['format']??null;
		if($class_name::$is_bulk_output){
			$tmp=$class_name::output($this,$prm);
			if(isset($format)){$tmp=printf($format,$tmp);}
		   	else{echo $tmp;}
		}
		elseif(isset($this->loop_id)){
			$tmp=$class_name::output($this,$prm);
			if(isset($format)){$tmp=printf($format,$tmp);}
			else{echo $tmp;}
		}
		else{
			$items=[];
			foreach($class_name::loop($this,$class_name::USE_ALTERNATIVE) as $this->loop_id=>$this->value){
				$item=$class_name::output($this,$prm);
				if(isset($format)){$item=sprintf($format,$item);}
				$items[]=$item;
			}
			echo implode((isset($items[0]) && $items[0][0]==='<')?'':'　',$items);
			unset($this->loop_id,$this->value);
		}
		return $this;
	}
	public function get_output($prm=null,$format=null){
		ob_start();$this->output($prm,$format);
		return ob_get_clean();
	}
	public function output_item($prm=null,$format=null){
		$class_name=\cp::get_class_name('meta',$this->conf['output-type']?:$this->conf['type']?:'text');
		$format=$this->conf['output-format']?:$this->conf['format']?:null;
		$tmp=$class_name::output($this,$prm);
		if(isset($format)){$tmp=printf($format,$tmp);}
		else{echo $tmp;}
		return $this;
	}
	public function input($prm=null,$format=null){
		$class_name=\cp::get_class_name('meta',$this->conf['input-type']??$this->conf['type']??'text');
		$format=$this->conf['input-format']??$this->conf['format']??null;
		
		echo '<div '.$this->get_item_attr().'>';
		if($class_name::$is_bulk_input){
			$tmp=$class_name::input($this,$prm);
			if(isset($format)){$tmp=printf($format,$tmp);}
		   	else{echo $tmp;}
		}
		elseif(isset($this->loop_id)){
			echo '<div '.$this->get_unit_attr().'>';
			$tmp=$class_name::input($this,$prm);
			if(isset($format)){$tmp=printf($format,$tmp);}
			else{echo $tmp;}
			echo '</div>';
		}
		else{
			foreach($class_name::loop($this) as $this->loop_id=>$meta_value){
				echo '<div '.$this->get_unit_attr().'>';
				$tmp=$class_name::input($this,$prm);
				if(isset($format)){$tmp=printf($format,$tmp);}
				else{echo $tmp;}
				if(!empty($this->conf['multiple']) && (int)$this->conf['multiple']<2){$this->multiple_input_buttons();}
				if(!empty($this->conf['sortable'])){$this->sort_input_buttons();}
				echo '</div>';
			}
			unset($this->loop_id);
		}
		echo '</div>';
		$this->allow_input();
		return $this;
	}
	public function get_input($prm=null,$format=null){
		ob_start();$this->input($prm,$format);
		return ob_get_clean();
	}
	public function input_item($prm=null,$format=null){
		$class_name=\cp::get_class_name('meta',$this->conf['input-type']?:$this->conf['type']?:'text');
		$format=$this->conf['input-format']??$this->conf['format']??null;
		$tmp=$class_name::input($this,$prm);
		if(isset($format)){$tmp=printf($format,$tmp);}
		else{echo $tmp;}
		return $this;
	}
	public function compare($compare){
		printf('<input type="hidden" name="%s" value="%s"/>',\cp::get_input_name($this->data_path,'compare'),$compare);
		if(is_null($this->form??null)){return false;}
		$this->form->allow_input($this->data_path,$this,'compare');
	}
	public function get_compare($compare){
		ob_start();$this->compare($compare);
		return ob_get_clean();
	}
	public function allow_input(){
		if(is_null($this->form??null)){return false;}
		$this->form->allow_input($this->data_path,$this);
		return true;
	}
	
	/*meta*/
	public function mod($conf){
		if(is_string($conf)){$conf=['type'=>$conf];}
		if(!$this->conf){$this->conf=$conf;}
		else{$this->conf=array_merge($this->conf,$conf);}
		$this->inherit['meta']=true;
		return $this;
	}
	
	/*attr*/
	/**
	* 入力全体を囲む要素に付与する属性値
	*/
	public function get_item_attr(){
		return \cp::get_item_attr($this->data_path,$this->conf);
	}
	public function item_attr(){
		echo \cp::get_item_attr($this->data_path,$this->conf);
	}
	/**
	* 入力値の並び替え・追加・削除の単位となる要素に付与する属性値
	*/
	public function get_unit_attr(){
		return \cp::get_unit_attr($this->the_data_path,$this->conf);
	}
	public function unit_attr(){
		echo \cp::get_unit_attr($this->the_data_path,$this->conf);
	}
	
	public function get_multiple_input_buttons(){
		wp_enqueue_script('catpow.multiple_input');
		return
			'<div class="multiple-input-buttons">'.
			'<span class="btn-inc" data-role="cp-input-item-increase"></span>'.
			'<span class="btn-dec" data-role="cp-input-item-decrease"></span></div>';
	}
	public function multiple_input_buttons(){
		echo $this->get_multiple_input_buttons();
	}
	public function get_sort_input_buttons(){
		wp_enqueue_script('catpow.multiple_input');
		wp_enqueue_script('jquery.catpow.sort_input');
		wp_enqueue_script('jquery-ui-sortable');
		return
			'<div class="sort-input-buttons">'.
			'<span class="btn-up" data-role="cp-input-item-up"></span>'.
			'<span class="btn-handle" data-role="cp-input-item-handle"></span>'.
			'<span class="btn-down" data-role="cp-input-item-down"></span></div>';
		
	}
	public function sort_input_buttons(){
		echo $this->get_sort_input_buttons();
	}
	
	
	/*input attr*/
	public static function apply_meta_format($io,$outputs,$formats,&$conf){
		//$wrapper $unit $format
		$rtn='';
		$name=$conf['name'];
		if(empty($formats)){
			$format_set=isset($conf[$io.'-format-set'])?$conf[$io.'-format-set']:(
				isset($conf[$io.'-format-sets'][$name])?$conf[$io.'-format-sets'][$name]:(
					isset($conf['format-set'])?$conf['format-set']:(
						isset($conf['format-sets'][$name])?$conf['format-sets'][$name]:false
					)
				)
			);
			if(!empty($format_set)){
				if(is_array($format_set)){extract($format_set);}
				else{include(\cp::get_file_path("cp_item_format/{$format_set}.php"));}
			}
			$format=isset($conf[$io.'-format'])?$conf[$io.'-format']:(
				isset($conf[$io.'-formats'][$name])?$conf[$io.'-formats'][$name]:(
					isset($conf['format'])?$conf['format']:(
						isset($conf['formats'][$name])?$conf['formats'][$name]:
							function($io,$outputs,$conf){return implode($outputs);}
					)
				)
			);
			$item_wrapper=isset($conf[$io.'-item-wrapper'])?$conf[$io.'-item-wrapper']:(
				isset($conf[$io.'-item-wrappers'][$name])?$conf[$io.'-item-wrappers'][$name]:(
					isset($conf['item-wrapper'])?$conf['item-wrapper']:(
						isset($conf['item-wrapper'][$name])?$conf['item-wrapper'][$name]:(
							($io=='input')?'<div%s>%s%s</div>':false
						)
					)
				)
			);
			$wrapper=isset($conf[$io.'-wrapper'])?$conf[$io.'-wrapper']:(
				isset($conf[$io.'-wrappers'][$name])?$conf[$io.'-wrappers'][$name]:(
					isset($conf['wrapper'])?$conf['wrapper']:(
						isset($conf['wrappers'][$name])?$conf['wrappers'][$name]:false
					)
				)
			);
		}
		else{
			if(is_string($formats) or is_callable($formats)){
				$format=$formats;
				$formats=false;
			}
			else{
				$format=isset($formats[$name])?$formats[$name]:function($io,$outputs,$conf){return implode($outputs);};
			}
		}
		if($io==='input'){
			if(!isset($conf['length']) && !empty($conf['multiple'])){
				$item_attr=self::get_item_attr($name,$conf['type'],true);
				$item_control=self::get_multiple_input_buttons();
			}
			else{
				$item_attr=self::get_item_attr($name,$conf['type'],false);
				$item_control='';
			}
		}
		else{
			$item_attr=$item_control='';
		}
		foreach($outputs as $i=>&$output){
			if(!is_array($output))$output=(array)$output;
			foreach($output as $n=>&$v){if(is_array($v))$v=apply_meta_format($io,$v,$formats,$conf['meta'][$n]);}
			$tmp=is_callable($format)?$format($io,$output,$conf):vsprintf($format,$output);
			if(!empty($item_wrapper))$tmp=is_callable($item_wrapper)?$item_wrapper($item_wrapper,$item_attr,$tmp,$item_control):sprintf($item_wrapper,$item_attr,$tmp,$item_control);
			$rtn.=$tmp;
		}
		if(!empty($wrapper))$rtn=is_callable($wrapper)?$wrapper($io,$rtn,$conf):vsprintf($wrapper,$rtn);
		return $rtn;
	}
	
	/*loop*/
	public function loop($flags=0){
		if(\cp::$content!==$this){$org_content=\cp::$content;\cp::$content=$this;}
		$class_name=\cp::get_class_name('meta',$this->conf['type']??'text');
		if(class_exists($class_name)){
			foreach($class_name::loop($this,$flags) as $this->loop_id=>$this->value){yield $this->loop_id=>$this->value;}
			unset($this->loop_id,$this->value);
		}
		if(isset($org_content)){\cp::$content=$org_content;}
	}
}

?>
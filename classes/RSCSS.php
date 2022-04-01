<?php
namespace Catpow;
class RSCSS{
	public $s='sec',$b=[],$e=[],$selectors=[];
	private function __construct($s){
		$this->s=$s;
	}
	public static function section($name=null){
		if(empty($name)){return new self();}
		return new self($name);
	}
	public function add_selector($sel=null){
		$bsel='$this->selectors[".'.$this->s.'"]';
		if(!empty($this->b)){$bsel.='["&-'.implode('"]["&-',$this->b).'"]';}
		if(!empty($this->e)){$bsel.='[">.'.implode('"][">.',$this->e).'"]';}
		if(isset($sel)){$bsel.='["'.$sel.'"]';}
		if(eval("return !isset({$bsel});")){eval($bsel."=[];");}
	}
	public function export_selectors_file($file=null){
		if(empty($file)){$file=get_stylesheet_directory().'/'.CP::get_the_content_path().'/_scss/selectors/'.($this->s??'style').'.scss';}
		$dir=dirname($file);
		if(!is_dir($dir)){mkdir($dir,0755,true);}
		file_put_contents($file,self::get_selectors_code($this->selectors));
	}
	public static function get_selectors_code($selectors,$indent=0){
		$code='';
		foreach($selectors as $sel=>$children){
			$code.=str_repeat("\t",$indent)."{$sel}{\n";
			$code.=self::get_selectors_code($children,$indent+1);
			$code.=str_repeat("\t",$indent)."}\n";
		}
		return $code;
	}
	
	public function apply($html){
		$html=preg_replace('/ @([\w\.\-:]+=)/',' x-on:$1',$html);
		$doc=new \DOMDocument();
		$doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'),\LIBXML_HTML_NOIMPLIED|\LIBXML_HTML_NODEFDTD|\LIBXML_NOERROR);
		foreach($doc->childNodes??[] as $el){
			$this->_apply($el);
		}
		$html=mb_convert_encoding($doc->saveHTML(),'UTF-8','HTML-ENTITIES');
		$html=str_replace('<br>','<br/>',$html);
		$html=preg_replace('/><\/(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)>/','/>',$html);
		$html=preg_replace('/ x\-on:([\w\.\-:]+=)/',' @$1',$html);
		return $html;
	}
	private function _apply($el){
		if(!is_a($el,\DOMElement::class)){return;}
		if(empty($el->getAttribute('class'))){
			$el->setAttribute('class',$el->tagName);
		}
		$classes=explode(' ',$el->getAttribute('class'));
		$_ms=[];
		foreach($classes as $i=>$class){
			if(substr($class,-1)==='-'){
				$_b=substr($class,0,-1);
				$_bi=$i;
			}
			elseif(substr($class,0,1)==='_'){
				$this->selectors[':root']['.'.$class]=[];
			}
			elseif(substr($class,0,1)==='-'){
				$_ms[]=$class;
			}
			elseif(empty($_e) && preg_match('/^[a-zA-Z]+$/',$class)){
				$_e=$class;
			}
		}
		if(empty($_b)){
			if(empty($_e)){
				$_e=$el->tagName;
				$classes[]=$_e;
				$el->setAttribute('class',implode(' ',$classes));
			}
			$prev_e=$this->e;
			$this->e[]=$_e;
			$this->add_selector();
		}
		else{
			$prev_b=$this->b;
			if(substr($_b,0,1)==='-'){
				$this->b[]=substr($_b,1);
			}
			else{
				$this->b=explode('-',$_b);
			}
			$classes[$_bi]=$this->s.'-'.implode('-',$this->b);
			$el->setAttribute('class',implode(' ',$classes));
			$prev_e=$this->e;
			$this->e=[];
			$this->add_selector();
		}
		foreach($_ms as $_m){
			$this->add_selector('&.'.$_m);
		}
		foreach($el->childNodes??[] as $child_el){
			$this->_apply($child_el);
		}
		if(isset($prev_b)){$this->b=$prev_b;}
		if(isset($prev_e)){$this->e=$prev_e;}
	}
}
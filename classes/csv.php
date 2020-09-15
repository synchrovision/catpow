<?php
namespace Catpow;

class CSV{
	
	public $data=array(),$file;
	private $hash,$tree,$depth;
	public function __construct($csv,$fill_column=false){
		if(is_array($csv)){
			$this->data=array_map(function($row){
				return array_values($row);
			},$csv);
		}
		else{
			$this->file=$csv;
			$csv=fopen($csv,'r');
			if(empty($fill_column)){
				while($row=fgetcsv($csv)){
					array_push($this->data,$row);
				}
			}
			else{
				$keys=fgetcsv($csv);
				array_push($this->data,$keys);
				if($fill_column===true){$fill_column=count($keys);}
				if(is_numeric($fill_column)){$fill_column=range(0,$fill_column);}
				elseif(is_string($fill_column)){$fill_column=[array_search($fill_column,$keys)];}
				elseif(is_array($fill_column)){
					foreach($fill_column as $i=>$key){
						if(!is_numeric($key)){$fill_column[$i]=array_search($key,$keys);}
					}
				}
				$current_values=[];
				while($row=fgetcsv($csv)){
					foreach($fill_column as $index){
						if(empty($row[$index])){$row[$index]=$current_values[$index];}
						else{$current_values[$index]=$row[$index];}
					}
					array_push($this->data,$row);
				}
			}
		}
	}
	
	public static function loop($csv,$where=[]){
		$c=new self($csv);
		foreach($csv->select($where) as $i=>$row){yield $i=>$row;}
	}
	
	public function __get($name){
		if($name=='keys')return $this->data[0];
		if($name=='tree')return $this->collect();
	}
	
	public function save($file=null){
		if(isset($file)){$this->file=$file;}
		$f=fopen($this->file,'w');
		foreach($this->data as $i=>$row){
			fputcsv($f,$row);
		}
		fclose($f);
	}
	
	public function select($where=[],$orderby=false,$limit=0){
		$rtn=[];
		$keys=$this->data[0];
		$limit=(int)$limit;
		for($r=1,$l=count($this->data);$r<$l;$r++){
			foreach($where as $key=>$cond){
				$c=array_search($key,$keys);
				if($c===false){continue 2;}
				if($this->test_value($this->data[$r][$c],$cond)===false){continue 2;}
			}
			$row=[];
			foreach($keys as $i=>$key){
				$row[$key]=&$this->data[$r][$i];
			}
			$rtn[]=$row;
			if(!$orderby && $limit-- === 1){return $rtn;}
		}
		if($orderby){
			if(is_a($orderby,'Closure')){usort($rtn,$orderby);}
			elseif(is_array($orderby)){
				$_orderby;
				foreach($orderby as $key=>$order){
					if(is_numeric($key)){
						$_orderby[$order]=1;
					}
					else{
						$_orderby[$key]=($order=='ASC')?1:-1;
					}
				}
				usort($rtn,function($a,$b)use($_orderby){
					foreach($_orderby as $key=>$order){
						if($a[$key] > $b[$key]){return $order;}
						if($a[$key] < $b[$key]){return $order*-1;}
					}
					return 0;
				});
			}
			else{
				if(is_numeric($orderby)){
					$orderby=$keys[$orderby];
				}
				usort($rtn,function($a,$b)use($orderby){
					if($a[$orderby] > $b[$orderby]){return 1;}
					if($a[$orderby] < $b[$orderby]){return -1;}
					return 0;
				});
			}
		}
		if($limit>0){return array_slice($rtn,0,$limit);}
		return $rtn;
	}
	public function collect($collect_by=0){
		$rtn=[];
		$keys=$this->data[0];
		if(is_numeric($collect_by)){$collect_by=range(0,$collect_by);}
		elseif(is_string($collect_by)){$collect_by=[array_search($collect_by,$this->data[0])];}
		elseif(is_array($collect_by)){
			foreach($collect_by as &$key){
				if(!is_numeric($key)){$key=array_search($key,$this->data[0]);}
			}
		}
		for($r=1,$l=count($this->data);$r<$l;$r++){
			$row=[];
			$sel='';
			foreach($collect_by as $i){
				$sel.="['{$this->data[$r][$i]}']";
			}
			foreach($keys as $i=>$key){
				$row[$key]=&$this->data[$r][$i];
			}
			eval('$rtn'.$sel.'[]=$row;');
		}
		return $rtn;
	}
	public function column($col){
		$rtn=[];
		if(!is_numeric($col)){$col=array_search($col,$this->data[0]);}
		for($r=1,$l=count($this->data);$r<$l;$r++){
			$rtn[]=$this->data[$r][$col];
		}
		return $rtn;
	}
	public function update($data,$where){
		$keys=$this->data[0];
		for($r=1,$l=count($this->data);$r<$l;$r++){
			foreach($where as $key=>$cond){
				$c=array_search($key,$keys);
				if($c===false){continue 2;}
				if($this->test_value($this->data[$r][$c],$cond)===false){continue 2;}
			}
			foreach($data as $key=>$val){
				$c=array_search($key,$keys);
				if($c===false){continue;}
				if(is_a($val,'Closure')){
					$val=$val($this->data[$r][$c]);
				}
				if(is_numeric($val)){$val=strval($val);}
				if(is_array($val)){$val=json_encode($val);}
				$this->data[$r][$c]=$val;
			}
		}
	}
	public function delete($where){
		$keys=$this->data[0];
		for($r=1;$r<count($this->data);$r++){
			foreach($where as $key=>$cond){
				$c=array_search($key,$keys);
				if($c===false){continue 2;}
				if($this->test_value($this->data[$r][$c],$cond)===false){continue 2;}
			}
			unset($this->data[$r]);$r--;
		}
	}
	public function insert($data){
		$row=[];
		if(is_array($data)){
			foreach($this->data[0] as $i=>$key){$row[]=$data[$key]?:$data[$i]?:'';}
		}
		elseif(is_object($data)){
			foreach($this->data[0] as $i=>$key){$row[]=$data->$key?:'';}
		}
		$this->data[]=$row;
		if(isset($this->file)){
			$f=fopen($this->file,'a');
			fputcsv($f,$row);
			fclose($f);
		}
	}
	
	public function ref($where){
		$keys=$this->data[0];
		for($r=1,$l=count($this->data);$r<$l;$r++){
			foreach($where as $key=>$cond){
				$c=array_search($key,$keys);
				if($c===false){continue 2;}
				if($this->test_value($this->data[$r][$c],$cond)===false){continue 2;}
			}
			$rtn=[];
			foreach($keys as $i=>$key){
				$rtn[$key]=&$this->data[$r][$i];
			}
			return $rtn;
		}
		return false;
	}
	
	private function test_value($val,$cond){
		if(is_a($cond,'Closure')){
			if(!$cond($val)){return false;}
		}
		if(is_numeric($cond)){$cond=strval($cond);}
		if(is_string($cond)){
			if($cond[0]==='/'){
				if(!preg_match($cond,$val)){return false;}
			}
			elseif($val!==$cond){return false;}
		}
		if(is_array($cond)){
			if(!in_array($val,$cond)){return false;}
		}
		return true;
	}
	

	public function output_table($header_column=1,$class="csv_table"){
		printf("<table class='%s'>\n\t<thead>\n\t\t<tr>\n",$class);
		foreach($this->data[0] as $key){
			echo("\t\t\t<th>{$key}</th>\n");
		}
		echo("\t\t</tr>\n\t</thead>\n\t<tbody>\n");
		for($r=1;$r<count($this->data);$r++){
			echo("\t\t<tr>");
			foreach($this->data[$r] as $c=>$val){
				echo("\t\t\t");
				printf(($c<$header_column)?"<th>%s</th>\n":"<td>%s</td>\n",$val);
			}
			echo("\t\t</tr>");
		}
		echo("\t</tbody>\n</table>\n");
	}
	public function get_output_table($row_head=1,$col_head=1,$class="csv_table"){
		ob_start();
		$this->output_table($row_head,$col_head,$class);
		return ob_get_clean();
	}
	public function output(){
		$f=fopen('php://output','w');
		foreach($this->data as $i=>$row){
			fputcsv($f,$row);
		}
		fclose($f);
	}
	public function get_output(){
		ob_start();
		$this->output();
		return ob_get_clean();
	}
	public function download($fname='data'){
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename="'.$fname.'.csv"');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		$this->output();
		die();
	}
}


?>
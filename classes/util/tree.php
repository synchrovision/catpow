<?php
/**
* インデントとコロンによるツリー構造の簡易表記の文字列をパースする
* 
* category1:
*  method:
*   
*  props:
*   name1:value1
*   name2:value2
*/
namespace Catpow\util;
class tree{
	
	public $data=[];
	public function __construct($str){
		$lines=explode("\n",$str);
		$keys=[];
		for($i=0,$l=count($lines);$i<$l;$i++){
			$line_data=self::parse_line($lines[$i]);
			if($line_data['level']<count($keys)){
				$keys=array_slice($keys,0,$line_data['level']);
			}
			while($line_data['level']>count($keys)){
				if(empty($keys)){$keys[]=count($this->data)-1;}
				else{
					$sel='$this->data['.implode("]['items'][",$keys).'][items]';
					eval('$keys[]=count('.$sel.')-1;');
					eval('if(empty('.$sel.')){'.$sel.'=[];}');
				}
			}
			if(empty($keys)){$this->data[]=$line_data;}
			else{eval('$this->data['.implode("]['items'][",$keys).'][items][]=$line_data;');}
		}
	}
	public static function parse_line($line){
		preg_match('/^(?P<indent>\s*)(?:(?P<key>.+?)\:)?(?P<value>.*?)$/',$line,$matches);
		$rtn=['level'=>strlen($matches['indent']),'value'=>$matches['value']];
		if(!empty($matches['key'])){$rtn['key']=$matches['key'];}
		return $rtn;
	}
	
	public function output_table($class='tree_table'){
		$output_table=function($items)use($class,&$output_table){
			printf('<table class="%s %s"><tbody>',$class,$items[0]['level']);
			foreach($items as $item){
				echo '<tr><th>'.($item['key']??'').'</th>';
				echo '<td>'.$item['value'];
				if(!empty($item['items'])){$output_table($item['items']);}
				echo '</td></tr>';
			}
			echo '</tbody></table>';
		};
		$output_table($this->data);
	}
}

?>
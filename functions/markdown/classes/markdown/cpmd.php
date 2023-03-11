<?php
namespace Catpow\markdown;
use Catpow\CP;

class cpmd{
	public static function markdown_to_block_code($markdown){
		$html=\Michelf\MarkdownExtra::defaultTransform($markdown);
		$html=self::convert_html_to_blocks($html);
		return $html;
	}
	private static function convert_html_to_blocks($html,$level=1){
		if($level>4){
			$html=preg_replace_callback('|<h(\d)>([^$]*?)</h\1>|',function($matches){
				return CP::get_block_code('heading',['level'=>$matches[1],'content'=>trim($matches[2])]);
			},$html);
			$html=preg_replace_callback('|<p>([^$]*?)</p>|',function($matches){
				if(empty($matches[1])){return '';}
				return CP::get_block_code('paragraph',['content'=>trim($matches[1])]);
			},$html);
			if(strpos($html,'<table')!==false){
				$html=preg_replace_callback('|<table[^$]+?</table>|',function($matches){return self::convert_table_html_to_block($matches[0]);},$html);
			}
			if(strpos($html,'<ul')!==false || strpos($html,'<ol')!==false){
				$html=self::convert_list_htmls_to_block($html);
			}
			return $html;
		}
		$parts=preg_split("|<h{$level}>(.+?)</h{$level}>|",$html,-1,\PREG_SPLIT_DELIM_CAPTURE);
		$rtn=self::convert_html_to_blocks($parts[0],$level+1);
		for($i=1;$i<count($parts);$i+=2){
			$children=self::convert_html_to_blocks($parts[$i+1],$level+1);
			$rtn.=CP::get_block_code('section',['title'=>trim($parts[$i]),'classes'=>"article level{$level} headline"],trim($children));
		}
		return $rtn;
	}
	private static function convert_table_html_to_block($html){
		$classes='wp-block-catpow-datatable spec';
		if($hasHeaderRow=strpos($html,'<thead')!==false){
			$classes.=' hasHeaderRow';
		}
		if(preg_match('|<tbody.+<th|',$html)){
			$classes.=' hasHeaderColumn';
		}
		$rows=[];
		preg_match_all('|<tr.*?>([^$]+?)</tr>|',$html,$matches);
		foreach($matches[1] as $rowHtml){
			$row=[];
			preg_match_all('@<(th|td).*?>([^$]+?)</\1>@',$rowHtml,$rowMatches);
			foreach($rowMatches[2] as $cellHtml){
				$row[]=['classes'=>'','text'=>$cellHtml];
			}
			$rows[]=$row;
		}
		return CP::get_block_code('datatable',['classes'=>$classes,'rows'=>$rows]);
	}
	private static function convert_list_htmls_to_block($html){
		if(preg_match_all('@</?(ul|ol|li).*?>@',$html,$matches,\PREG_OFFSET_CAPTURE|\PREG_SET_ORDER)){
			$blocks=[];$stack=[];
			for($i=0;$i<count($matches);$i++){
				if($matches[$i][0][0][1]==='/'){
					if($matches[$i][1][0]==='li'){
					}
					else{
						$list=array_shift($stack);
						if(empty($stack)){
							$list['end']=$matches[$i][0][1]+5;
							array_unshift($blocks,$list);
						}
						else{
							$stack[0]['items'][count($stack[0]['items'])-1]['child']=$list;
						}
					}
				}
				else{
					if($matches[$i][1][0]==='li'){
						$start=$matches[$i][0][1]+strlen($matches[$i][0][0]);
						$end=$matches[$i+1][0][1]-$start;
						$stack[0]['items'][]=[
							'content'=>substr($html,$start,$end)
						];
					}
					else{
						array_unshift($stack,[
							'start'=>$matches[$i][0][1],
							'items'=>[]
						]);
					}
				}
			}
			foreach($blocks as $block){
				$html=substr_replace(
					$html,CP::get_block_code('list',$block),
					$block['start'],$block['end']-$block['start']
				);
			}
		}
		return $html;
	}
}
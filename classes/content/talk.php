<?php
namespace Catpow\content;

/**
* 異なる接続でリアルタイムに一続きのJSの処理を共有する
* WPから独立したエントリーポイントで入出力を行い、データも独自に保持する
*/
class talk extends form{
	public $f,$res,$progress;
	
	public function __construct($param){
		parent::__construct($param);
		$this->f=WP_CONTENT_DIR.'/talk/'.get_current_blog_id().'/'.substr($this->file_path,0,-4).'/'.$this->loop_id.'.json';
		$this->res=get_stylesheet_directory().'/'.$this->path.'/response.php';
		$this->progress=0;
		dir_create($this->dir);
		if(!is_null($this->parent->form)){$this->parent->form->talks[$this->form_id]=$this;}
	}
	
	public function append($cb,$arg){
		file_put_contents($this->f,json_encode(compact('cb','arg')),FILE_APPEND);
	}
}

?>
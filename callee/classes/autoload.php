<?php
spl_autoload_register(function($class){
	$path=str_replace('\\','/',$class);
	$f=__DIR__.'/'.$path.'.php';
	if(!file_exists($f)){
		dir_create(dirname($f));
		$path_data=explode('/',$path);
		$contents="<?php\n";
		if(isset($path_data[1])){
			$contents.='namespace '.implode('\\',array_slice($path_data,0,-1)).";\n";
		}
		$contents.='class '.basename($path).'{public function __get($name){return $this->$name;}}';
		file_put_contents($f,$contents);
	}
	include $f;
});

function dir_create($dir){
	if(!is_dir(dirname($dir))){dir_create(dirname($dir));}
	if(!is_dir($dir)){mkdir($dir);}
}
<?php
namespace Catpow\github;

class Repo{
	protected $repo,$access_token;
	const DEFAULT_REPO='synchrovision/catpow';
	
	public function __construct($repo=null,$access_token=null){
		$this->repo=$repo??static::DEFAULT_REPO;
		$this->access_token=$access_token;
	}
	function query($path){
		$url='https://api.github.com/repos/'.$this->repo.'/'.$path;
		if ($this->token){
			$url=add_query_arg(['access_token'=>$this->access_token],$url);
		}
		$res=wp_remote_get($url);
		$body=wp_remote_retrieve_body($res);
		if(200!==wp_remote_retrieve_response_code($res)){
			error_log($body);
			return [];
		}
		return json_decode($body,1);
	}
	
	function __get($name){
		switch($name){
			case 'homepage':
				return sprintf('https://github.com/%s',$this->repo);
			case 'latestRelease':
				return $this->latestRelease=$this->query('releases/latest');
			case 'latestVersion':
				return $this->latestRelease['tag_name'];
			case 'latestZipUrl':
				return sprintf('https://github.com/%s/archive/%s.zip',$this->repo,$this->latestVersion);
			default:
				return $this->latestRelease[$name]??null;
		}
	}
}
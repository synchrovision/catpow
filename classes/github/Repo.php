<?php
namespace Catpow\github;
use Michelf\MarkdownExtra;

class Repo{
	protected $repo,$access_token;
	public $plugin,$plugin_data;
	const DEFAULT_REPO='synchrovision/catpow';
	
	public function __construct($repo=null,$access_token=null){
		$this->repo=$repo??static::DEFAULT_REPO;
		$this->access_token=$access_token;
	}
	public static function of_plugin($plugin){
		$plugin_data=get_plugin_data(\WP_PLUGIN_DIR.'/'.$plugin);
		if(empty($plugin_data['GitHub Repository'])){return false;}
		$rtn=new self($plugin_data['GitHub Repository']);
		$rtn->plugin=$plugin;
		$rtn->plugin_data=$plugin_data;
		return $rtn;
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
			case 'hasNewerRelease':
				if(empty($this->plugin) || empty($this->plugin_data)){return false;}
				return version_compare($this->latestVersion,$this->plugin_data['Version'],'>');
			case 'dataForTransientUpdatePlugins':
					$res=[
						'slug'=>dirname($this->plugin),
						'plugin'=>$this->plugin,
						'new_version'=>$this->latestVersion,
						'url'=>$this->html_url,
						'package'=>$this->latestZipUrl
					];
				return (object)$res;
			case 'dataForPluginsApi':
				if(empty($this->plugin) || empty($this->plugin_data)){return false;}
				$slug=dirname($this->plugin);
				if(is_file($f=\WP_PLUGIN_DIR.'/'.$slug.'/README.md')){
					$readme=MarkdownExtra::defaultTransform(file_get_contents($f));
				}
				$res=[
					'slug'=>$slug,
					'name'=>$this->plugin_data['Name'],
					'plugin_name'=>$this->plugin_data['Name'],
					'author'=>sprintf(
						'<a href="%1$s" target="_blank">%2$s</a>',
						esc_url($this->author['html_url']),
						esc_html($this->author['login'])
					),
					'homepage'=>$this->homepage,
					'version'=>$this->tag_name,
					'last_updated'=>$this->published_at,
					'download_link'=>esc_url($this->latestZipUrl),
					'sections'=>[
						'readme'=>$readme??'',
						'changelog'=>MarkdownExtra::defaultTransform($this->body)
					]
				];
				return (object)$res;
			default:
				return $this->latestRelease[$name]??null;
		}
	}
}
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
	public static function of_plugin($plugin,$plugin_data=null){
		if(empty($plugin_data)){
			$plugin_data=get_plugin_data(\WP_PLUGIN_DIR.'/'.$plugin);
		}
		$repo=self::get_repo_from_plugin_data($plugin_data);
		if(empty($repo)){return false;}
		$rtn=new self($repo);
		$rtn->plugin=$plugin;
		$rtn->plugin_data=$plugin_data;
		return $rtn;
	}
	public static function get_repo_from_plugin_data($plugin_data){
		if(!empty($plugin_data['GitHub Repository'])){return $plugin_data['GitHub Repository'];}
		if(
			!empty($plugin_data['UpdateURI']) && 
			preg_match('@^https://github\.com/(.+?)/?$@',$plugin_data['UpdateURI'],$matches)
		){return $matches[1];}
		return false;
	}
	public function download($to){
		if(!$this->latestZipUrl){return false;}
		require_once(ABSPATH.'/wp-admin/includes/file.php');
		WP_Filesystem();
			
		$download=download_url($this->latestZipUrl);
		if(is_wp_error($download)){
			error_log($download->get_error_message());
			return false;
		}
 		$result=unzip_file($download,dirname($to));
		if(is_wp_error($result)){
			error_log($result->get_error_message());
			return false;
		}
		rename(dirname($to).'/'.$this->latestReleaseName,$to);
		return true;
	}
	
	function query($path){
		$transient="ghres_{$this->repo}/{$path}";
		if($cache=get_site_transient($transient)){return json_decode($cache,1);}
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
		set_site_transient($transient,$body,\HOUR_IN_SECONDS);
		return json_decode($body,1);
	}
	
	function __get($name){
		switch($name){
			case 'homepage':
				return sprintf('https://github.com/%s',$this->repo);
			case 'name':
				return $this->name=basename($this->repo);
			case 'latestRelease':
				return $this->latestRelease=$this->query('releases/latest');
			case 'latestReleaseName':
				return $this->name.'-'.$this->latestVersion;
			case 'latestVersion':
				return $this->latestRelease['tag_name']??null;
			case 'latestZipUrl':
				return sprintf('https://github.com/%s/archive/%s.zip',$this->repo,$this->latestVersion);
			case 'masterZipUrl':
				return sprintf('https://github.com/%s/archive/refs/heads/master.zip',$this->repo);
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
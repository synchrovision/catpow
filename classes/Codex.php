<?php
namespace Catpow;

/**
 * PHP client for Codex CLI. Call startThread() or resumeThread() before running a turn.
 * Use from trusted server-side code. The PHP worker needs access to Codex CLI and its session storage.
 */
final class Codex{
	public const API_KEY_OPTION='connectors_ai_openai_api_key';
	private const LEGACY_API_KEY_OPTION='catpow_codex_api_key';

	private string $binary;
	private array $options=[];
	private ?string $threadId=null;
	private bool $isThread=false;
	private bool $running=false;

	public function __construct(string $binary='codex'){
		$this->binary=$binary;
	}

	public static function setApiKey(string $apiKey):bool{
		$option=self::getApiKeyOption();
		$apiKey=trim($apiKey);
		if($apiKey===''){
			return get_option($option,'')==='' || delete_option($option);
		}
		return get_option($option,'')===$apiKey || update_option($option,$apiKey,false);
	}

	public static function getApiKey():?string{
		$key=getenv('OPENAI_API_KEY');
		if($key!==false && $key!==''){
			return $key;
		}
		if(defined('OPENAI_API_KEY') && is_string(OPENAI_API_KEY) && OPENAI_API_KEY!==''){
			return OPENAI_API_KEY;
		}
		$key=get_option(self::getApiKeyOption(),'');
		return is_string($key) && $key!==''?$key:null;
	}

	private static function getApiKeyOption():string{
		return function_exists('wp_get_connector')?self::API_KEY_OPTION:self::LEGACY_API_KEY_OPTION;
	}

	/**
	 * Thread options include workingDirectory, model, sandboxMode (read-only or workspace-write)
	 * and skipGitRepoCheck. The default sandbox is read-only.
	 */
	public function startThread(array $options=[]):self{
		$thread=new self($this->binary);
		$thread->options=$options;
		$thread->isThread=true;
		return $thread;
	}

	public function resumeThread(string $id,array $options=[]):self{
		if(!preg_match('/\A[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\z/i',$id)){
			throw new \InvalidArgumentException('Invalid Codex thread ID.');
		}
		$thread=$this->startThread($options);
		$thread->threadId=$id;
		return $thread;
	}

	public function getId():?string{
		return $this->threadId;
	}

	/**
	 * Accepts a string or a list of SDK-style text and local_image inputs.
	 * Turn options include outputSchema and timeout (seconds, default 300).
	 * Returns items, finalResponse and usage.
	 *
	 * @param string|array $input
	 */
	public function run($input,array $options=[]):array{
		$items=[];
		$finalResponse='';
		$usage=null;
		foreach($this->runStreamed($input,$options) as $event){
			if($event['type']==='item.completed'){
				$item=$event['item'];
				$items[]=$item;
				if($item['type']==='agent_message'){
					$finalResponse=$item['text'];
				}
			}
			elseif($event['type']==='turn.completed'){
				$usage=$event['usage'];
			}
		}
		return compact('items','finalResponse','usage');
	}

	/**
	 * Yields CLI JSONL events as associative arrays. Consume to completion to detect errors.
	 *
	 * @param string|array $input
	 * @return \Generator<int,array>
	 */
	public function runStreamed($input,array $options=[]):\Generator{
		if(!$this->isThread || $this->running){
			throw new \LogicException('A Codex thread is required, with only one active turn at a time.');
		}
		$apiKey=self::getApiKey();
		if($apiKey===null){
			throw new \RuntimeException('Configure the OpenAI API key before running a Codex turn.');
		}
		$directory=$this->options['workingDirectory']??getcwd();
		$sandbox=$this->options['sandboxMode']??'read-only';
		$timeout=$options['timeout']??300;
		if(!in_array($sandbox,['read-only','workspace-write'],true)){
			throw new \InvalidArgumentException('Invalid Codex sandbox mode.');
		}
		if(!is_int($timeout) || $timeout<1){
			throw new \InvalidArgumentException('Codex timeout must be a positive integer.');
		}

		$command=[$this->binary,'--sandbox',$sandbox,'--ask-for-approval','never'];
		$command[]='--config';
		$command[]='shell_environment_policy.exclude=["CODEX_API_KEY","OPENAI_API_KEY"]';
		array_push($command,'exec','--json');
		if(isset($this->options['model'])){
			array_push($command,'--model',$this->options['model']);
		}
		if(!empty($this->options['skipGitRepoCheck'])){
			$command[]='--skip-git-repo-check';
		}
		$prompt=$this->prepareInput($input,$command);

		$this->running=true;
		$process=null;
		$pipes=[];
		$stdin=null;
		$schema=null;
		$exitCode=null;
		try{
			$stdin=self::temporaryFile($prompt);
			if(isset($options['outputSchema'])){
				$schema=self::temporaryFile(json_encode($options['outputSchema'],JSON_THROW_ON_ERROR));
				array_push($command,'--output-schema',stream_get_meta_data($schema)['uri']);
			}
			if($this->threadId!==null){
				array_push($command,'resume',$this->threadId);
			}
			$command[]='-';

			$env=getenv();
			unset($env['OPENAI_API_KEY']);
			$env['CODEX_API_KEY']=$apiKey;
			$process=proc_open($command,[0=>$stdin,1=>['pipe','w'],2=>['pipe','w']],$pipes,$directory?:null,$env);
			if(!is_resource($process)){
				throw new \RuntimeException('Unable to start Codex CLI.');
			}

			$completed=false;
			$failed=false;
			$stderr='';
			foreach(self::readLines($process,$pipes,$timeout,$exitCode,$stderr) as $line){
				$event=json_decode($line,true);
				if(!is_array($event) || !is_string($event['type']??null)){
					throw new \RuntimeException('Codex CLI returned an invalid JSONL event.');
				}
				switch($event['type']){
					case 'thread.started':
						$this->threadId=$event['thread_id'];
						break;
					case 'turn.completed':
						$completed=true;
						break;
					case 'turn.failed':
						$failed=true;
						break;
				}
				yield $event;
			}
			if($exitCode!==0 || $failed || !$completed){
				$detail=trim(str_replace($apiKey,'[redacted]',$stderr));
				throw new \RuntimeException('Codex CLI did not complete the turn (exit '.$exitCode.').'.($detail===''?'':' '.$detail));
			}
		}
		finally{
			foreach($pipes as $pipe){
				fclose($pipe);
			}
			if(is_resource($process)){
				if($exitCode===null){
					proc_terminate($process,9);
				}
				proc_close($process);
			}
			foreach([$stdin,$schema] as $file){
				if(is_resource($file)){
					fclose($file);
				}
			}
			$this->running=false;
		}
	}

	/** @param string|array $input */
	private function prepareInput($input,array &$command):string{
		if(is_string($input)){
			return $input;
		}
		if(!is_array($input)){
			throw new \InvalidArgumentException('Invalid Codex input.');
		}
		$text=[];
		foreach($input as $item){
			if(($item['type']??null)==='text' && is_string($item['text']??null)){
				$text[]=$item['text'];
			}
			elseif(($item['type']??null)==='local_image' && is_string($item['path']??null)){
				array_push($command,'--image',$item['path']);
			}
			else{
				throw new \InvalidArgumentException('Invalid Codex input item.');
			}
		}
		return implode("\n\n",$text);
	}

	/** @return resource */
	private static function temporaryFile(string $content){
		$file=tmpfile();
		if($file===false){
			throw new \RuntimeException('Unable to create a temporary file for Codex CLI.');
		}
		if(fwrite($file,$content)!==strlen($content) || !rewind($file)){
			fclose($file);
			throw new \RuntimeException('Unable to write a temporary file for Codex CLI.');
		}
		return $file;
	}

	/** @return \Generator<int,string> */
	private static function readLines($process,array $pipes,int $timeout,?int &$exitCode,string &$stderr):\Generator{
		$deadline=hrtime(true)+$timeout*1000000000;
		$stdout='';
		foreach($pipes as $pipe){
			stream_set_blocking($pipe,false);
		}
		while(true){
			$remaining=$deadline-hrtime(true);
			if($remaining<=0){
				throw new \RuntimeException('Codex CLI timed out.');
			}
			$ready=array_filter($pipes,static function($pipe){return !feof($pipe);});
			if(!$ready){
				$status=proc_get_status($process);
				if(!$status['running']){
					$exitCode=$status['exitcode'];
					break;
				}
				usleep(10000);
				continue;
			}
			$write=$except=null;
			$wait=(int)min(200000,ceil($remaining/1000));
			if(stream_select($ready,$write,$except,0,$wait)===false){
				throw new \RuntimeException('Unable to read Codex CLI output.');
			}
			foreach($ready as $index=>$pipe){
				$chunk=fread($pipe,8192);
				if($chunk===false){
					throw new \RuntimeException('Unable to read Codex CLI output.');
				}
				if($index===2){
					$stderr=substr($stderr.$chunk,-4096);
					continue;
				}
				$lines=explode("\n",$stdout.$chunk);
				$stdout=array_pop($lines);
				foreach($lines as $line){
					if(trim($line)!==''){
						yield $line;
					}
				}
			}
		}
		if(trim($stdout)!==''){
			yield $stdout;
		}
	}
}

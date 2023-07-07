<?php
namespace Catpow\meta;

class jsonld extends data{
	
	public static function output($meta,$prm){
		if(empty($meta->conf['@type'])){return '@typeが指定されていません';}
		add_action('wp_footer',function()use($meta){
			$vals=$meta->value[0];
			$conf=$meta->conf;
			$data=array_merge([
				'@context'=>'http://schema.org',
				'@type'=>$conf['@type'],
			],self::extract_data($meta->value[0],(array)$meta->conf['meta']));
			printf('<script type="application/ld+json">%s</script>',json_encode($data,\JSON_UNESCAPED_UNICODE));
		});
		return '';
	}
	protected static function extract_data($vals,$confs){
		$data=[];
		foreach($confs as $name=>$conf){
			$val=$vals[$name];
			if(empty($val)){continue;}
			if(isset($conf['meta'])){
				foreach($val as $i=>$v){
					$val[$i]=self::extract_data($v,$conf['meta']);
				}
			}
			if(isset($conf['@type'])){
				foreach($val as $i=>$v){
					$val[$i]['@type']=$conf['@type'];
				}
			}
			$data[$name]=empty($conf['multiple'])?reset($val):array_values($val);
		}
		return $data;
	}
}
?>
<?php
namespace Catpow\meta;

class jsonld extends data{
	
	public static function output($meta,$prm){
		if(empty($meta->conf['@type'])){return '@typeが指定されていません';}
		add_action('wp_footer',function()use($meta){
			$vals=$meta->value[0];
			$conf=$meta->conf;
			$data=[
				'@context'=>'http://schema.org',
				'@type'=>$conf['@type'],
			];
			foreach((array)$meta->conf['meta'] as $n=>$child_meta){
				$val=$vals[$n];
				if(empty($val)){continue;}
				if(isset($child_meta['@type'])){
					foreach($val as $i=>$v){
						$val[$i]['@type']=$child_meta['@type'];
					}
				}
				$data[$n]=empty($child_meta['multiple'])?reset($val):array_values($val);
			}
			printf('<script type="application/ld+json">%s</script>',json_encode($data,\JSON_UNESCAPED_UNICODE));
		});
		return '';
	}
}
?>
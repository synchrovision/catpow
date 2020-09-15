<?php
namespace Catpow\template_item\php;
/**
* ページコンテンツ
*/

class page_content extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$rtn=[''];
		$has_template=in_array('template',$conf_data['template']??[]);
		if($has_template){
			$rtn[]="<?php echo apply_filters('the_content',\\cp::get_post_data('{$path_data['data_name']}_tmpl/{$path_data['tmp_name']}')['post_content']); ?>";
		}
		else{
			switch($path_data['tmp_name']){
				case 'single':
					$rtn[]='<?php the_content(); ?>';
					break;
				default:
					$rtn[]=[
						'',
						'<?php foreach(loop() as $obj): ?>',
						['section.wp-block-catpow-section.article.center.catch.hasRead.level3',
							['div.contents',
								['header',
									['div.title',
										['h3.heading','@title'],
										['p','@desc']
									]
								],
								['div.text','@outputs']
							]
						],
						'<?php endforeach; ?>'
					];
			}
		}
		return $rtn;
	}
}

?>
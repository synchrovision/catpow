<?php
namespace Catpow\customize;

use Catpow\CP;

class nav_menu_fields extends \WP_Customize_Setting{
	private const PREFIX='catpow_nav_menu_fields';
	private const TEMPLATE_ID='cpnavnewitem';

	public static function register($manager){
		add_filter('customize_dynamic_setting_args',function($args,$id){
			if(!preg_match('/^'.self::PREFIX.'\[(-?[1-9][0-9]*)\]\[([^\[\]]+)\]$/D',$id,$match)){return $args;}
			if(empty(CP::$config['nav_datas'][$match[2]]['meta'])){return $args;}
			return ['type'=>self::PREFIX,'transport'=>'postMessage','default'=>null];
		},10,2);
		add_filter('customize_dynamic_setting_class',function($class,$id,$args){
			return ($args['type']??null)===self::PREFIX?self::class:$class;
		},10,3);
		add_action('wp_nav_menu_item_custom_fields_customize_template',function(){
			echo '<div class="catpow-customize-nav-menu-fields"></div>';
		});
		add_action('customize_controls_enqueue_scripts',function()use($manager){
			self::enqueue_controls($manager);
		});
	}

	private static function section($location,$item_id){
		$path='nav/'.$location.'/admin/form.php';
		$inputs_class=CP::get_class_name('inputs');
		$content=CP::$content??new \Catpow\content\content(['parent'=>false]);
		return $content->sec($path,$item_id,new $inputs_class($path,[]));
	}

	private static function render($section){
		ob_start();
		$section->render();
		return ob_get_clean();
	}

	private static function enqueue_controls($manager){
		$locations=array_intersect_key(CP::$config['nav_datas']??[],get_registered_nav_menus());
		$locations=array_filter($locations,function($conf){return !empty($conf['meta']);});
		if(!$locations || !$manager->get_panel('nav_menus')){return;}

		$templates=[];
		$settings=$manager->settings();
		foreach($locations as $location=>$conf){
			$templates[$location][self::TEMPLATE_ID]=self::render(self::section($location,self::TEMPLATE_ID));
			foreach($settings as $setting){
				if(!($setting instanceof \WP_Customize_Nav_Menu_Item_Setting)){continue;}
				$item_id=$setting->post_id;
				$id=self::PREFIX.'['.$item_id.']['.$location.']';
				$setting_fields=$manager->get_setting($id);
				$form_id=self::form_item_id($item_id);
				$section=self::section($location,$form_id);
				if($setting_fields && is_string($query=$setting_fields->post_value())){
					$data=$setting_fields->receive($query);
					if(!is_wp_error($data)){
						foreach($data as $name=>$field){
							$section->data[$form_id][$name]=$field['value']??[];
						}
					}
				}
				$html=self::render($section);
				$templates[$location][$item_id]=str_replace(self::TEMPLATE_ID,(string)$item_id,$html);
			}
		}

		CP::enqueue_style('content.css');
		CP::use_component('Customize/NavMenuFields');
		$script='components/Customize/NavMenuFields/component.js';
		wp_add_inline_script($script,'Catpow.Customize.NavMenuFields.mount('.wp_json_encode([
			'prefix'=>self::PREFIX,
			'templateId'=>self::TEMPLATE_ID,
			'templates'=>$templates,
		],JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT).');','after');
	}

	private static function form_item_id($item_id){
		return $item_id>0?(int)$item_id:self::TEMPLATE_ID;
	}

	private function receive($value){
		if(!is_string($value)){return new \WP_Error('invalid_menu_fields',__('Invalid menu item fields.','catpow'));}
		[$item_id,$location]=$this->id_data()['keys'];
		parse_str($value,$request);
		$form_id=self::form_item_id($item_id);
		$request=['nav'=>[$location=>[$form_id=>$request['nav'][$location][$item_id]??[]]]];
		$section=self::section($location,$form_id);
		self::render($section);
		try{
			$section->receive($request);
		}
		catch(\Catpow\content\form_exception $error){
			return new \WP_Error('invalid_menu_fields',implode(' ',(array)($error->data['message']??[])));
		}
		catch(\TypeError $error){
			return new \WP_Error('invalid_menu_fields',__('Invalid menu item fields.','catpow'));
		}
		return $section->inputs->data['nav'][$location][$form_id]??[];
	}

	public function validate($value){
		$data=$this->receive($value);
		return is_wp_error($data)?$data:parent::validate($value);
	}

	protected function update($value): bool{
		$data=$this->receive($value);
		if(is_wp_error($data)){return false;}
		[$item_id,$location]=$this->id_data()['keys'];
		$manager=$this->manager;
		// Core may save the menu item and its location after this setting.
		add_action('customize_save_after',function($publishing_manager)use($manager,$item_id,$location,$data){
			if($publishing_manager!==$manager){return;}
			$setting=$manager->get_setting('nav_menu_item['.$item_id.']');
			$post_id=(int)$item_id;
			if($post_id<0){$post_id=$setting->post_id??0;}
			if($post_id<=0 || get_post_type($post_id)!=='nav_menu_item'){return;}
			$menu_id=(int)(get_nav_menu_locations()[$location]??0);
			if(!$menu_id || true!==is_object_in_term($post_id,'nav_menu',$menu_id)){return;}
			$data=array_intersect_key($data,CP::$config['nav_datas'][$location]['meta']);
			if($data){
				CP::update_data(['nav'=>[$location=>[$post_id=>$data]]],'nav/'.$location.'/'.$post_id);
			}
		});
		return true;
	}
}

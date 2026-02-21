<?php
namespace Catpow\customize;

class control extends \WP_Customize_Control{
	public $param=[];
	public function get_component_param(){
		return apply_filters('cp_customize_component_param_'.$this->type,$this->param);
	}
	public function enqueue(){
		\cp::use_component('Customize/'.$this->type);
	}
	protected function render_content(){
		$id='cp_customize_component_'.$this->id;
		if(!empty($this->label)){
			printf('<h5 class="cp-customize__title">%s</h5>',$this->label);
		}
		?>
		<div id="<?=$id?>"></div>
		<script>
			wp.element.render(
				wp.element.createElement(
					Catpow.Customize,{
						id:'<?=$this->id?>',
						type:'<?=$this->type?>',
						param:<?=json_encode($this->get_component_param(),0500)?>
					}
				),
				document.getElementById('<?=$id?>')
			);
		</script>
		<?php
	}
}
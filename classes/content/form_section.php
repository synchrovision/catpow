<?php
namespace Catpow\content;

class form_section extends form{
	public $parent,$tag='div';
	
	public function __construct($param){
		parent::__construct($param);
		if(!is_null($this->parent->form)){$this->parent->form->sections[$this->form_id]=$this;}
	}
	
	
	public function render($slug=false,$vars=false){
		?>
		<<?=$this->tag?> class="cpform_section" data-role="cpform_section" data-section-id="<?= $this->form_id?>">
			<?php $this->inc($slug,$vars); ?>
		</<?=$this->tag?>>
		<?php
	}
}

?>
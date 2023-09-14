<?php
namespace Catpow\meta;

class Rating extends UI{
	public static $defaultParam=['max'=>5];
	public static function get_output($path,$conf,$prm){
		\cp::enqueue_style('ui/Rating/input.css');
		ob_start();
?>
		<div class="Rating" style="--rating-max':<?=$prm['max']?>;'--rating-value':<?=$prm['value']?>;'--rating-ratio':<?=$prm['value']/$prm['max']?>;">
			<div class="Rating-points">
				<?php foreach(range(1,$prm['max']) as $rate): ?>
					<div class="Rating-points-point<?=$rate<=$prm['value']?' is-active':''?>"></div>
				<?php endforeach; ?>
			</div>
		</div>
<?php
		return ob_get_clean();
	}
}
?>
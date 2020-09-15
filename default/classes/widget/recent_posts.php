<?php
namespace Catpow\widget;
class recent_posts extends \WP_Widget {

	function __construct() {
		$widget_ops = array('classname' => 'widget_recent_custom_entries', 'description' => "最新のカスタム投稿を表示");
		parent::__construct('recent-costom-posts', "最新のカスタム投稿", $widget_ops);
		$this->alt_option_name = 'widget_recent_custom_entries';

		add_action( 'save_post', array(&$this, 'flush_widget_cache') );
		add_action( 'deleted_post', array(&$this, 'flush_widget_cache') );
		add_action( 'switch_theme', array(&$this, 'flush_widget_cache') );
	}

	function widget($args, $instance) {
		global $post_types,$page_cft;
		$cache = wp_cache_get('widget_recent_custom_entries', 'widget');

		if ( !is_array($cache) )
			$cache = array();

		if ( ! isset( $args['widget_id'] ) )
			$args['widget_id'] = $this->id;

		if ( isset( $cache[ $args['widget_id'] ] ) ) {
			echo $cache[ $args['widget_id'] ];
			return;
		}
		ob_start();
		extract($args);

		if ( empty( $instance['number'] ) || ! $number = absint( $instance['number'] ) )$number = 10;

		echo $before_widget;
		if ( !empty($instance['title']) ) echo $before_title . $instance['title'] . $after_title;
		query_posts(array('post_type'=>array($instance['type'])) );
		loop('list');
		echo $after_widget;
		
		$cache[$args['widget_id']] = ob_get_flush();
		wp_cache_set('widget_recent_custom_entries', $cache, 'widget');
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['number'] = (int) $new_instance['number'];
		$instance['type'] = $new_instance['type'];
		$this->flush_widget_cache();

		$alloptions = wp_cache_get( 'alloptions', 'options' );
		if ( isset($alloptions['widget_recent_entries']) )
			delete_option('widget_recent_custom_entries');

		return $instance;
	}

	function flush_widget_cache() {
		wp_cache_delete('widget_recent_custom_entries', 'widget');
	}

	function form( $instance ) {
		global $post_types,$page_cft;
		$title = isset($instance['title']) ? esc_attr($instance['title']) : '';
		$number = isset($instance['number']) ? absint($instance['number']) : 5;
		$type = isset($instance['type']) ? esc_attr($instance['type']) : '';
?>
		<p><label for="<?php echo $this->get_field_id('title'); ?>">タイトル</label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" /></p>

		<p><label for="<?php echo $this->get_field_id('number'); ?>">表示件数</label>
		<input id="<?php echo $this->get_field_id('number'); ?>" name="<?php echo $this->get_field_name('number'); ?>" type="text" value="<?php echo $number; ?>" size="3" /></p>
		
		<p><label for="<?php echo $this->get_field_id('type'); ?>">表示投稿タイプ</label>
		<select id="<?php echo $this->get_field_id('type'); ?>" name="<?php echo $this->get_field_name('type'); ?>">
		<?php foreach($post_types as $post_type=>$type_vals){if(isset($type_vals['name']))printf('<option value="%1$s">%2$s</option>'.chr(10),$post_type,$type_vals['name']);} ?>
		</select>
		</p>
<?php
	}
}
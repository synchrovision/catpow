<?php
register_widget("Widget_Test");
class Widget_Test extends WP_Widget {
	function __construct() {
		parent::__construct('recent-costom-posts', "最小テスト", ['classname' => 'widget_recent_custom_entries', 'description' => "さいしょ"]);
		$this->alt_option_name = 'widget_recent_custom_entries';
	}

	function widget($args, $instance) {
	}

	function update( $new_instance, $old_instance ) {
		return array_merge($old_instance,$new_instance);
	}

	function flush_widget_cache() {
		wp_cache_delete('widget_recent_custom_entries', 'widget');
	}

	function form( $item ) {
	 	printf('<input type="text" name="%s" value="%s"/>',$this->get_field_name('title'),$item['title']);
	}
}
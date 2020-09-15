<?php

class Schedule{
	public $events_list;
	function __construct($prm){
		$this->init($prm);
	}
	function init(){
	}
	function add_events($name,$events){
		$this->events_list[$name]=$events;
	}
	function write(){
		?>
			<table>
			</table>
			<div class="events_wrapper">
				<?php foreach($this->events_list as $name=>$events): ?>
				<div class="events <?=$name?>">
					<?php foreach($events as $i=>$event): ?>
					<div class="event">
						<h3><?=$event['summary']?></h3>
						<p><?=$event['description']?></p>
						<input type="hidden" name="events[<?=$event['id']?>][start][datetime]" value="<?=$event['start']['datetime']?>"/>
						<input type="hidden" name="events[<?=$event['id']?>][end][datetime]" value="<?=$event['end']['datetime']?>"/>
					</div>
					<?php endforeach; ?>
				</div>
				<?php endforeach; ?>
			</div>
		<?php
	}
}
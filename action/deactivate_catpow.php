<?php
/*cron*/
wp_clear_scheduled_hook('cp_cron_every_minutes');
wp_clear_scheduled_hook('cp_cron_hourly');
wp_clear_scheduled_hook('cp_cron_daily');
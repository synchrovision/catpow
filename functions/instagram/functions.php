<?php
use Catpow\instagram\cpig;
add_action('admin_init',[cpig::class,'register_settings']);
add_action('rest_api_init',[cpig::class,'register_settings']);
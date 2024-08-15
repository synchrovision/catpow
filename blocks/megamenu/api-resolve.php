<?php
namespace Catpow;
$props=MenuManager::resolve_props_for_menu_component('MegaMenu',$req['props']);
$res->set_data(['props'=>$props]);
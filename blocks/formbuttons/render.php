<?php
$form=\cp::$content->form;
if(!empty($form)){
	$content=$form->fill_buttons($content);
}
echo $content;

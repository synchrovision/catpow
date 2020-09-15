<?php
$form=\cp::$content->form;
if(!empty($form)){
	$content=preg_replace_callback(
		'/(?:data\-action="(?P<action>[\w_\-]+)")(?:'.
			'(?: data\-callback="(?P<callback>[\w_\-]+)")|'.
			'(?: data\-param="(?P<param>[\w_\-]+)")|'.
			'(?: data\-target="(?P<target>[\w_\-]+)")|'.
			'(?: ignore\-message="(?P<ignoreMessage>1)")'.
		')*/',
		function($matches)use($form){
			return $form->button_attr(
				$matches['action'],
				$matches['callback']??null,
				$matches['param']??null,
				$matches['target']??null,
				$matches['ignoreMessage']??null
			);
		},
		$content
	);
}
echo $content;

<?php
namespace Catpow;
api::register_nonce();
$appFile=\cp::get_file_path('<!--data_type-->/<!--data_name-->/manage/app.js',cp::FROM_THEME|cp::FROM_CONFIG);
\cp::use_components([
	'Finder',
	'Finder/Focused','Finder/SearchResults',
	'Finder/SelectLayout','Finder/SelectColumns','Finder/BulkControl',
	'Finder/FilterControl','Finder/Download','Finder/PerPage','Finder/Status','Finder/Pagenate',
	'Spinner'
]);
$id=uniqid('manage-');
$props=[
	'basepath'=>"<!--data_type-->/<!--data_name-->/manage",
	'baseurl'=>html_entity_decode(menu_page_url('cpdb-<!--data_name-->-manage-admin',false)),
	'query'=>get_query_var('q',null)
];
?>
<div class="appContainer">
	<div id="<?=$id?>"></div>
	<script type="module">
		import App from "<?=CP::get_file_url('<!--data_type-->/<!--data_name-->/manage/app.mjs',0773)?>";
		document.addEventListener('DOMContentLoaded',function(){
			wp.element.render(
				wp.element.createElement(App,<?=json_encode($props)?>),
				document.getElementById('<?=$id?>')
			);
		});
	</script>
</div>
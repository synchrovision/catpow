<?php
use Catpow\util\BlockCode;

$name='catpow/recruitinfo';
$prefix='wp-block-catpow-recruitinfo';
$comment=BlockCode::commentAttributes($name,$attr,['vars','HeadingTag']);
$attr=BlockCode::defaults($name,$attr);
$title=BlockCode::rich($attr['title']??'');
$description=BlockCode::rich($attr['description']??'');
$organization=$attr['hiringOrganizationName']??'';
$application=$attr['applicationUrl']??'';
$remote=($attr['jobLocationType']??'')==='TELECOMMUTE';
$requirements=$attr['applicantLocationRequirements']??'';
$location=$remote?sprintf(__('リモート（%s）','catpow'),$requirements?:__('地域未指定','catpow')):
	($attr['addressRegion']??'').($attr['addressLocality']??'').($attr['streetAddress']??'');
$types=[
	'FULL_TIME'=>__('正社員（フルタイム）','catpow'),'PART_TIME'=>__('パート・アルバイト','catpow'),
	'CONTRACTOR'=>__('業務委託','catpow'),'TEMPORARY'=>__('派遣社員','catpow'),
	'INTERN'=>__('インターン','catpow'),'OTHER'=>__('その他','catpow')
];
$units=['HOUR'=>__('時給','catpow'),'DAY'=>__('日給','catpow'),'WEEK'=>__('週給','catpow'),'MONTH'=>__('月給','catpow'),'YEAR'=>__('年俸','catpow')];
$employment=array_intersect_key($types,array_fill_keys($attr['employmentType']??[],true));
$currency=$attr['salaryCurrency']??'JPY';
$unit=$attr['salaryUnitText']??'';
$value=$attr['salaryValue']??null;
$min=$attr['salaryMinValue']??null;
$max=$attr['salaryMaxValue']??null;
$hasSalary=$value||$min||$max;
$amount=$value?:($min?:'—').'〜'.($max?:'—');
$salary=$hasSalary?($units[$unit]??'').' '.$amount.($currency==='JPY'?__('円','catpow'):' '.$currency):'';
$posted=$attr['datePosted']??'';
$through=$attr['validThrough']??'';
$details=[
	__('雇用形態','catpow')=>implode('、',$employment),__('勤務地','catpow')=>$location,
	__('給与','catpow')=>$salary,__('掲載日','catpow')=>$posted,__('掲載終了日','catpow')=>$through
];
$clean=static fn($values)=>array_filter($values,static fn($entry)=>$entry!==null && $entry!=='' && $entry!==[]);
$structured=$clean([
	'@context'=>'https://schema.org','@type'=>'JobPosting','title'=>html_entity_decode(strip_tags($title),ENT_QUOTES|ENT_HTML5,'UTF-8'),
	'description'=>$description,'datePosted'=>$posted,'validThrough'=>$through?$through.'T23:59:59+09:00':'',
	'employmentType'=>$attr['employmentType']??[],
	'hiringOrganization'=>$clean(['@type'=>'Organization','name'=>$organization,'sameAs'=>$attr['hiringOrganizationSameAs']??null,'logo'=>$attr['hiringOrganizationLogo']??null]),
	'identifier'=>empty($attr['identifier'])?null:$clean(['@type'=>'PropertyValue','name'=>$organization,'value'=>$attr['identifier']]),
	'jobLocation'=>$remote?null:['@type'=>'Place','address'=>['@type'=>'PostalAddress']+array_intersect_key($clean($attr),array_fill_keys(['addressCountry','addressRegion','addressLocality','streetAddress','postalCode'],true))],
	'jobLocationType'=>$attr['jobLocationType']??null,
	'applicantLocationRequirements'=>$remote&&$requirements?['@type'=>'Country','name'=>$requirements]:null,
	'baseSalary'=>$hasSalary?['@type'=>'MonetaryAmount','currency'=>$currency,
		'value'=>$clean(['@type'=>'QuantitativeValue','unitText'=>$unit]+($value?['value'=>$value]:['minValue'=>$min,'maxValue'=>$max]))]:null,
	'url'=>$application,'directApply'=>$attr['directApply']??null
]);
ob_start();
?>
<article<?=BlockCode::root('recruitinfo',$attr)?>>
	<header class="<?=$prefix?>__header">
		<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__header-title',$title)?>
		<?php if($organization): ?><?=BlockCode::element('p',$prefix.'__header-organization',esc_html($organization))?><?php endif; ?>
	</header>
	<?=BlockCode::element('div',$prefix.'__description',$description)?>
	<dl class="<?=$prefix?>__details">
	<?php foreach(array_filter($details) as $label=>$value): ?>
		<div class="<?=$prefix?>__details-item">
			<dt class="<?=$prefix?>__details-item-dt"><?=esc_html($label)?></dt>
			<dd class="<?=$prefix?>__details-item-dd"><?=esc_html($value)?></dd>
		</div>
	<?php endforeach; ?>
	</dl>
	<?php if($application): ?><p class="<?=$prefix?>__apply">
		<?=BlockCode::element('a',$prefix.'__apply-button',esc_html(__('応募する','catpow')),['href'=>$application])?>
	</p><?php endif; ?>
</article>
<?=BlockCode::jsonLd($structured)?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>

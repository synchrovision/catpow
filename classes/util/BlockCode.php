<?php
namespace Catpow\util;

class BlockCode {
	public static function serialize($name,$attributes=[],$content=''){
		return get_comment_delimited_block_content($name,$attributes,$content);
	}

	public static function commentAttributes($name,$attributes,$extra=[]){
		$definitions=\Catpow\blocks::get_generation_attributes($name);
		$result=array_intersect_key($attributes,array_fill_keys($extra,true));
		foreach($definitions as $key=>$definition){
			if(array_key_exists($key,$attributes) && ($definition['type']??null)!=='query' && !isset($definition['source']) && ($definition['role']??null)!=='local'){
				$result[$key]=$attributes[$key]===[] && ($definition['type']??null)==='object'?(object)[]:$attributes[$key];
			}
		}
		return $result;
	}

	public static function defaults($name,$attributes){
		$definitions=\Catpow\blocks::get_generation_attributes($name);
		foreach($definitions as $key=>$definition){
			if(array_key_exists('default',$definition) && !array_key_exists($key,$attributes)){
				$attributes[$key]=$definition['default'];
			}
		}
		return $attributes;
	}

	public static function classes(...$classes){
		$tokens=preg_split('/\s+/',trim(implode(' ',$classes)),-1,PREG_SPLIT_NO_EMPTY);
		return implode(' ',array_unique($tokens));
	}

	public static function has($classes,$flag){
		return in_array($flag,explode(' ',self::classes($classes)),true);
	}

	public static function tag($tag,$fallback='div'){
		return is_string($tag) && preg_match('/^[a-z][a-z0-9-]*$/D',$tag)?$tag:$fallback;
	}

	public static function attrs($attributes){
		$html='';
		foreach($attributes as $name=>$value){
			if($value===null || $value===false || !preg_match('/^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/D',$name)){continue;}
			$html.=' '.$name.'="'.esc_attr($value===true?'':$value).'"';
		}
		return $html;
	}

	public static function style($values){
		$declarations=[];
		foreach((array)$values as $name=>$value){
			if(!is_scalar($value) || is_bool($value) || $value===''){continue;}
			if(!str_starts_with($name,'--')){
				$name=strtolower(preg_replace('/[A-Z]/','-$0',$name));
			}
			$declarations[]=$name.':'.$value;
		}
		return $declarations?implode(';',$declarations):null;
	}

	public static function root($name,$attributes,$extra=[]){
		$class=self::classes('wp-block-catpow-'.$name,$attributes['classes']??'',$attributes['className']??'');
		return self::attrs(['class'=>$extra['class']??$class]+$extra+['style'=>self::style($attributes['vars']??[])]);
	}

	public static function rich($value){
		return is_array($value)?implode('',$value):($value??'');
	}

	public static function element($tag,$class,$body='',$attributes=[]){
		return '<'.$tag.self::attrs(['class'=>$class]+$attributes).'>'.self::rich($body).'</'.$tag.'>';
	}

	public static function image($item,$class='cp-responsiveimage',$prefix='',$picture=false,$attributes=[]){
		$key=static fn($suffix)=>$prefix?$prefix.ucfirst($suffix):$suffix;
		$src=$item[$key('src')]??\cp::get_file_url('images/dummy.jpg');
		$alt=$item[$key('alt')]??null;
		$primary=explode(' ',$class)[0];
		$mime=$item[$key('mime')]??'';
		if($mime==='application/pdf'){return self::element('iframe',$class.' is-pdf','',['src'=>$src,'data-mime'=>$mime]);}
		if(str_starts_with($mime,'audio/')){return self::element('audio',$class.' is-audio','',['src'=>$src,'data-mime'=>$mime]);}
		if(str_starts_with($mime,'video/')){
			return self::element('video',$class.' is-video','',['src'=>$src,'data-mime'=>$mime,'autoplay'=>true,'loop'=>true,'playsinline'=>true,'muted'=>true]);
		}
		$image='<img'.self::attrs([
			'class'=>$picture?$primary.'-img':self::classes($class,'is-img'),
			'src'=>$src,'alt'=>$alt,'srcset'=>$picture?null:($item[$key('srcset')]??null)
		]+$attributes).'/>';
		if(!$picture){return $image;}
		$sources='';
		$devices=['sp'=>640,'tb'=>1280,'lt'=>1920];
		$items=$item[$key('sources')]??[];
		usort($items,static fn($a,$b)=>($devices[$a['device']??'']??PHP_INT_MAX)<=>($devices[$b['device']??'']??PHP_INT_MAX));
		foreach($items as $source){
			$device=$source['device']??null;
			$media=$source['media']??(isset($devices[$device])?'(max-width:'.$devices[$device].'px)':null);
			$sources.='<source'.self::attrs(['srcset'=>$source['srcset']??null,'media'=>$media,'data-device'=>$device]).'/>';
		}
		return self::element('picture',$class.' is-picture',$sources.$image);
	}

	public static function button($name,$item,$form=false,$tag='li'){
		$base='wp-block-'.str_replace('/','-',$name);
		$button=$item['buttonClasses']??null;
		$classes=$button!==null
			?self::classes($button,'cp-button')
			:self::classes($base.'__button','cp-button',$item['classes']??'is-ui-type-solid is-rank-secondary');
		if(preg_match('/(?:^| )('.preg_quote($base,'/').'__[a-z-]+)(?: |$)/',$classes,$matches)){
			$element=$matches[1];
		}
		else{$element=$base.'__button';}
		$classes=strtr($classes,['hasIcon'=>'has-icon','hasCaption'=>'has-caption','hasMicroCopy'=>'has-micro-copy']);
		$attributes=[];
		foreach(['event'=>'event','yss-event'=>'yssEvent','yjad-event'=>'yjadEvent','fbp-event'=>'fbpEvent','linetag-event'=>'linetagEvent'] as $key=>$field){
			$attributes['data-'.$key]=$item[$field]??$item[$key]??null;
		}
		if($form){
			foreach(['action','callback','target'] as $key){$attributes['data-'.$key]=$item[$key]??null;}
			$attributes['ignore-message']=isset($item['ignoreMessage'])?(int)(bool)$item['ignoreMessage']:null;
		}
		else{
			$attributes['href']=$item['buttonHref']??$item['href']??$item['url']??'';
			if(preg_match('~^\w+://~',$attributes['href'])){$attributes+=['target'=>'_blank','rel'=>'noopener'];}
		}
		$copy=self::has($classes,'has-micro-copy')?self::element('span',$element.'-copy cp-button__copy',$item['buttonCopy']??$item['microcopy']??''):'';
		$caption=self::has($classes,'has-caption')?self::element('span',$element.'-caption cp-button__caption',$item['buttonCaption']??$item['caption']??''):'';
		$icon=self::has($classes,'has-icon')?self::icon($base.'-button__icon cp-button__link-icon',$item):'';
		$text=self::element('span',$base.'-button__text cp-button__link-text',$item['buttonText']??$item['text']??'');
		return self::element($tag,$classes,$copy.self::element($form?'span':'a',$base.'-button cp-button__link',$icon.$text,$attributes).$caption);
	}

	public static function icon($class,$item){
		return self::element('span',$class,'<img'.self::attrs(['src'=>$item['iconSrc']??null,'alt'=>$item['iconAlt']??null]).'/>');
	}

	public static function templateImage($item,$attributes,$class='cp-responsiveimage',$prefix='',$picture=false){
		$code=$item[$prefix?$prefix.'Code':'code']??($prefix?null:($item['imageCode']??null));
		return !empty($attributes['isTemplate']) && $code?esc_html($code):self::image($item,$class,$prefix,$picture);
	}

	public static function decorations($class,$images){
		$body='';
		foreach($images as $image){
			$body.=self::image($image,$class.'-picture','',true);
		}
		return self::element('div',$class,$body);
	}

	public static function link($class,$item,$field=null){
		$href=$item['linkHref']??$item['linkUrl']??$item['url']??'';
		$attributes=['href'=>$href];
		if(preg_match('~^\w+://~',$href)){$attributes+=['target'=>'_blank','rel'=>'noopener'];}
		return self::element('a',self::classes($class,'cp-link'),$field?($item[$field]??''):'',$attributes);
	}

	public static function counter($class,$number,$prefix='',$suffix=''){
		return self::element('div',$class,
			($prefix!==''?self::element('span',$class.'-prefix',esc_html($prefix)):'').
			self::element('span',$class.'-number',$number).
			($suffix!==''?self::element('span',$class.'-suffix',esc_html($suffix)):''));
	}

	public static function legacySectionClasses($classes){
		$mapping=['article'=>'is-type-article','headline'=>'has-heading-type-headline','catch'=>'has-heading-type-catch','center'=>'is-align-center','left'=>'is-align-left','right'=>'is-align-right'];
		$tokens=explode(' ',self::classes($classes));
		return implode(' ',array_map(static function($class)use($mapping){
			if(preg_match('/^level[1-6]$/D',$class)){return 'is-'.$class;}
			if(preg_match('/^has[A-Z]/',$class)){return strtolower(preg_replace('/[A-Z]/','-$0',$class));}
			return $mapping[$class]??$class;
		},$tokens));
	}

	public static function flowContents($attributes,$item,$prefix){
		$class=$attributes['contentsClasses']??$prefix.'__item-texts-contents';
		$heading=self::has($attributes['classes']??'','has-sub-title')?
			self::element(self::tag($attributes['SubHeadingTag']??'h4','h4'),$class.'-subtitle',$item['subTitle']??''):'';
		return $heading.self::element('p',$class.'-text',$item['text']??'');
	}

	public static function mapUrl($attributes,$item){
		if(self::has($item['classes']??'','use-embed-url')){return $item['src']??'';}
		$query=['output'=>'embed','z'=>$attributes['z']??16,'t'=>$attributes['t']??'m','hl'=>$attributes['hl']??'ja',
			'q'=>$item['q']??strip_tags(preg_replace('~<br\s*/?>|\R~i',' ',self::rich($item['address']??'')))
		];
		if(!empty($item['ll'])){$query['ll']=$item['ll'];}
		return 'https://www.google.com/maps?'.http_build_query($query,'','&',PHP_QUERY_RFC3986);
	}

	public static function jsonLd($data){
		return '<script type="application/ld+json">'.wp_json_encode($data,JSON_HEX_TAG|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES).'</script>';
	}

	public static function context($namespace,$context,$directives=[]){
		return ['data-wp-interactive'=>$namespace,'data-wp-context'=>wp_json_encode((object)$context)]+$directives;
	}

	public static function spacer($prefix,$height,$unit,$columns=null,$group='tbody'){
		if($height<=0){return '';}
		$row=$prefix.(str_contains($prefix,'__')?'-':'__').$group.'-tr';
		return '<tr'.self::attrs(['class'=>$row]).'><td'.self::attrs([
			'class'=>$row.'-td is-spacer-cell',
			'style'=>'height:'.$height.$unit,
			'colspan'=>$columns
		]).'></td></tr>';
	}
}

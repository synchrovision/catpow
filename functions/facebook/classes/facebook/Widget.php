<?php
namespace Catpow\facebook;
use Catpow\_;

class Widget{
	public static $label='FaceBook';
	public static function get_conf(){
		return [
			['input'=>'buttons','label'=>'Type','values'=>['like'=>'LIKE','share'=>'SHARE','page'=>'PAGE'],'key'=>'type','sub'=>[
				'like'=>[
					['input'=>'gridbuttons','key'=>'layout','default'=>'button_count','values'=>['standard','button_count','button','box_count'],'sub'=>[
						'standard'=>[
							['input'=>'range','label'=>_('幅'),'key'=>'width','min'=>225,'max'=>960,'step'=>10,'default'=>450],
						]
					]],
					['input'=>'gridbuttons','key'=>'action','default'=>'like','values'=>['like','recommend']],
					['input'=>'gridbuttons','key'=>'colorscheme','default'=>'light','values'=>['dark','light']],
					['input'=>'buttons','label'=>_('サイズ'),'key'=>'size','values'=>['small','large'],'default'=>'small'],
					['input'=>'bool','label'=>_('シェアボタンを表示'),'key'=>'share','default'=>false],
					['input'=>'bool','label'=>_('子供向け'),'key'=>'kid_directed_site','default'=>false,],
					['input'=>'text','label'=>_('対象URL'),'key'=>'href','default'=>''],
					['input'=>'text','label'=>_('リファララベル'),'key'=>'ref','default'=>'']
				],
				'share'=>[
					['input'=>'gridbuttons','key'=>'layout','default'=>'button_count','values'=>['icon_link','box_count','button_count','button']],
					['input'=>'buttons','label'=>_('サイズ'),'key'=>'size','values'=>['small','large'],'default'=>'small'],
					['input'=>'text','label'=>_('対象URL'),'key'=>'href','default'=>'']
				],
				'page'=>[
					['input'=>'text','label'=>_('FaceBookページ URL'),'key'=>'href','default'=>''],
					['input'=>'range','label'=>_('幅'),'key'=>'width','min'=>180,'max'=>500,'step'=>10,'default'=>340],
					['input'=>'range','label'=>_('高さ'),'key'=>'height','min'=>70,'max'=>1200,'step'=>10,'default'=>500],
					['input'=>'gridbuttons','key'=>'tabs','default'=>'timeline','values'=>['timeline','events','messages']],
					['input'=>'bool','label'=>_('カバー写真を非表示'),'key'=>'hide_cover','default'=>true,],
					['input'=>'bool','label'=>_('プロフィール写真を表示'),'key'=>'show_facepile','default'=>false,],
					['input'=>'bool','label'=>_('CTAボタンを非表示'),'key'=>'hide_cta','default'=>false,],
					['input'=>'bool','label'=>_('小さなヘッダーを使用'),'key'=>'small_header','default'=>true,],
					['input'=>'bool','label'=>_('サイズを調整'),'key'=>'adapt_container_width','default'=>true,]
				]
			]],
			['input'=>'bool','label'=>_('遅延読み込み'),'key'=>'lazy','default'=>true]
		];
	}
	public static function render($param){
		if(empty($param['type'])){return;}
		cpfb::parts($param['type'],array_diff_key($param,['type'=>1]));
	}
}
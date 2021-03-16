jQuery(function($){
	$(document).on('click','[data-role="cp-input-item-decrease"]',function(){
		$(this).closest('[data-role="cp-meta-unit"]').remove();
		$(document).trigger(new $.Event('update_form'));
	});
	$(document).on('click','[data-role="cp-input-item-increase"]',function(){
		var $tgt=$(this).closest('[data-role="cp-meta-unit"]');
		$tgt=$tgt.clone().insertAfter($tgt);
		reset_multiple_input_attr($(this).closest('[data-role="cp-meta-item"]'));
		$(document).trigger(new $.Event('update_form'));
	});
});

function reset_multiple_input_attr($input_item){
	$input_item.children('[data-role="cp-meta-unit"]').each(function(i){
		if(document.getElementById(this.id)===this)return;
		var orgID=this.id;
		var path=orgID.split('--');
		var n=parseInt(path.pop());
		var m=n+1;
		var baseID=path.join('--');
		var newID=baseID+'--'+m;
		while(document.getElementById(newID)){m++;newID=baseID+'--'+m;}
		var baseName=path[0]+'['+path.slice(1).join('][')+']';
		var orgName=baseName+'['+n+']';
		var newName=baseName+'['+m+']';
		this.id=newID;
		jQuery(this).find(':input,[id^="'+orgID+'"]').each(function(){
			if(this.name){
				this.name=this.name.replace(orgName,newName);
			}
			if(this.id){
				this.id=this.id.replace(orgID,newID);
				var $label=jQuery(this).closest('label');
				if($label.length && $label.attr('for')){
					$label.attr('for',$label.attr('for').replace(orgID,newID));
				}
			}
		});
		jQuery(this).find('[data-ui]').each(function(){
			var props=JSON.parse(JSON.stringify(window.Catpow.uiProps[this.id]));
			props.name=props.name.replace(orgName,newName);
			this.id=this.id.replace(orgID,newID);
			window.Catpow.uiProps[this.id]=props;
			wp.element.render(
				wp.element.createElement(
					window.Catpow[this.dataset.ui],
					props
				),
				this
			);
		});
	});
}
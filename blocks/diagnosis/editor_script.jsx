import {range} from 'util';
const {__}=wp.i18n;
CP.config.diagnosis={
	devices:['sp','tb'],
	imageKeys:{
		image:{src:"src",alt:"alt",sources:"sources",items:"sections"}
	}
};
wp.blocks.registerBlockType('catpow/diagnosis',{
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo,useCallback}=wp.element;
		const {InnerBlocks,InspectorControls,RichText,useBlockProps}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl}=wp.components;
		const {sections=[],currentSection=-1,currentButton=-1,currentStep=0,numSteps=3,EditMode=false}=attributes;
		const {devices,imageKeys}=CP.config.diagnosis;
		const classes=Catpow.util.bem('wp-block-catpow-diagnosis');
		var states=CP.classNamesToFlags(attributes.classes);
		
		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'numSteps',input:'range',key:'numSteps',label:'ステップ数',min:2,max:21},
				{name:'scoreColumns',input:'dataset',key:'scoreColumns',label:'スコア項目',items:{
					label:{type:'text',label:'ラベル',default:'スコア'},
					name:{type:'text',label:'変数名',default:'score'},
					show:{type:'bool',label:'開示',default:true},
				}},
				{name:'hasCount',label:'設問番号',values:'has-count',sub:[
					{name:'countPrefix',input:'text',label:'番号前置テキスト',key:'countPrefix'},
					{name:'countSuffix',input:'text',label:'番号後置テキスト',key:'countSuffix'}
				]},
				{name:'doSendEvent',label:'計測イベント送信',values:'do-send-event'},
				'color'
			];
			wp.hooks.applyFilters('catpow.blocks.diagnosis.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveSectionClasses=useMemo(()=>{
			const selectiveSectionClasses=[
				{name:'type',type:'gridbuttons',label:'セクションタイプ',values:{'is-section-start':'開始','is-section-question':'設問','is-section-result':'結果'}},
				{name:'step',input:'range',key:'step',label:'ステップ',min:0,max:20,effect:(value,states,props)=>{if(props.attr.numSteps<=value){props.set({numSteps:value+1})}}},
				
				{name:'hasImage',label:'画像',values:'has-image',sub:[
					{name:'size',type:'gridbuttons',label:'サイズ',values:{'has-small-image':'小','has-medium-image':'中','has-large-image':'大'}},
					{name:'image',input:'picture',keys:imageKeys.image,devices},
				]},
				'color'
			];
			wp.hooks.applyFilters('catpow.blocks.diagnosis.selectiveSectionClasses',CP.finderProxy(selectiveSectionClasses));
			return selectiveSectionClasses;
		},[]);
		const selectiveButtonClasses=useMemo(()=>{
			const selectiveButtonClasses=[
				'color'
			];
			wp.hooks.applyFilters('catpow.blocks.diagnosis.selectiveButtonClasses',CP.finderProxy(selectiveButtonClasses));
			return selectiveButtonClasses;
		},[]);
		
		const save=()=>{
			setAttributes({sections:JSON.parse(JSON.stringify(sections))});
		};
		
		const blockProps=useBlockProps({className:classes(attributes.classes)});
		
		
		const stepOptions=useMemo(()=>{
			const stepOptions=[...range(0,numSteps-1)];
			stepOptions.push('ALL');
			return stepOptions;
		},[numSteps]);
		
		return (
			<>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
					modes={['EditMode']}
				/>
				{(isSelected && !EditMode) && (
					<CP.NavBar
						label="Step"
						options={stepOptions}
						value={currentStep}
						onChange={(currentStep)=>setAttributes({currentStep})}
					/>
				)}
				{EditMode?(
					<div className="alt_content">
						<div className="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							itemsKey="sections"
							columns={[
								{type:'text',key:'step'},
								{type:'text',key:'title'},
								{type:'text',key:'lead'},
								{type:'text',key:'desc'},
							]}
						/>
					</div>
				):(
					<div {...blockProps}>
						<div className={classes._body()}>
							<Catpow.Digit value="6"/>
							{attributes.sections.map((section,index)=>{
								const sectionStates=CP.classNamesToFlags(section.classes);
								return (
									<CP.Item
										tag="div"
										className={classes.section({'is-active':(currentStep==='ALL' || section.step==currentStep)})}
										set={setAttributes}
										attr={attributes}
										items={attributes.sections}
										index={index}
										indexKey="currentSection"
										isSelected={isSelected}
										key={section.id}
									>
										<div className={classes.section._header()}>
											<div className={classes.section.title()}>
												{(states.hasCount && sectionStates.isSectionQuestion) && (
													<div className={classes.section.title.count()}>
														{attributes.countPrefix && (<span className={classes.section.title.count.prefix()}>{attributes.countPrefix}</span>)}
														<span className={classes.section.title.count.number()}>{section.step}</span>
														{attributes.countSuffix && (<span className={classes.section.title.count.suffix()}>{attributes.countSuffix}</span>)}
													</div>
												)}
												<div className={classes.section.title._text()} data-role="title">
													<RichText value={section.title} onChange={(title)=>{item.title=title;save();}}/>
												</div>
											</div>
										</div>
										<div className={classes.section._body()}>
											{sectionStates.hasImage && (
												<div className={classes.section._body.image()}>
													<CP.SelectResponsiveImage
														className={classes.section.image._img()}
														attr={attributes}
														set={setAttributes}
														keys={imageKeys.image}
														index={index}
														size='vga'
														isTemplate={states.isTemplate}
													/>
												</div>
											)}
											<div className={classes.section._body.text()}>
												{sectionStates.hasLead && (
													<h4 className={classes.section.lead()} value={section.lead} data-role="lead">
														<RichText value={section.lead} onChange={(lead)=>{item.lead=lead;save();}}/>
													</h4>
												)}
												{sectionStates.hasDesc && (
													<div className={classes.section.desc()} data-role="desc">
														<RichText value={section.desc} onChange={(desc)=>{item.desc=desc;save();}}/>
													</div>
												)}
												{(states.hasScore && sectionStates.isSectionResult) && (
													<dl className={classes.section.score()}>
														<template data-wp-each--score="context.scores">
															<dt className={classes.section.score.label()} data-wp-text="context.score.label"/>
															<dd className={classes.section.score.point()}>
																<span className={classes.section.score.point.number()} data-wp-text="context.score.point"/>
																<span className={classes.section.score.point.unit()} data-wp-text="context.score.unit"/>
															</dd>
														</template>
													</dl>
												)}
												{sectionStates.isSectionResult?(
													<>
														{sectionStates.hasButtons && (
															<div className={classes.section.buttons()}>
																{section.buttons.map((button,buttonIndex)=>{
																	return (
																		<a 
																			tagName="a"
																			className={classes.section.buttons.button(button.classes)}
																			data-button-class={button.classes}
																			href={button.href}
																			data-role="button"
																			key={buttonIndex}
																		>
																			<RichText value={button.text} onChange={(text)=>{button.text=text;save();}}/>
																		</a>
																	);
																})}
															</div>
														)}
													</>
												):(
													<ul className={classes.section.buttons()}>
														{section.buttons.map((button,buttonIndex)=>{
															return (
																<li
																	className={classes.section.buttons.button(button.classes)}
																	data-button-class={button.classes}
																	data-button-id={button.id}
																	data-wp-on--click="actions.onClickButton"
																	data-flag={button.flag}
																	data-score={button.score}
																	data-role="button"
																	key={buttonIndex}
																>
																	<RichText value={button.text} onChange={(text)=>{button.text=text;save();}}/>
																</li>
															);
														})}
													</ul>
												)}
											</div>
										</div>
									</CP.Item>
								);
							})}
						</div>
					</div>
				)}
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
					{currentSection>=0 && (
						<CP.SelectClassPanel
							title='セクション'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveSectionClasses}
							items={sections}
							itemsKey="sections"
							index={currentSection}
						/>
					)}
					{currentSection>=0 && currentButton>=0 && (
						<CP.SelectClassPanel
							title='ボタン'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveButtonClasses}
							items={sections}
							itemsKey="sections"
							index={currentSection}
							subItemsKey="buttons"
							subIndex={currentButton}
						/>
					)}
				</InspectorControls>
			</>
		);
	},

	save({attributes,className}){
		const {useState,useMemo,useCallback}=wp.element;
		const {InnerBlocks,RichText,useBlockProps}=wp.blockEditor;
		const {sections=[]}=attributes;
		const {imageKeys}=CP.config.diagnosis;
		const classes=Catpow.util.bem('wp-block-catpow-diagnosis');
		
		var states=CP.classNamesToFlags(attributes.classes);
		const context={step:0,count:0,activeSection:0};
		const blockProps=useBlockProps.save({
			className:classes(attributes.classes),
			'data-wp-interactive':"diagnosis",
			'data-wp-context':JSON.stringify(context),
			'data-wp-init':"callbacks.initBlock"
		});
		
		
		return (
			<div {...blockProps}>
				<div className={classes._body()}>
					<div data-cp-component="Digit">
						<script type="application/json">{JSON.stringify({value:6})}</script>
					</div>
					{attributes.sections.map((section,index)=>{
						const sectionStates=CP.classNamesToFlags(section.classes);
						return (
							<div
								className={classes.section(section.classes)}
								data-section-class={section.classes}
								data-section-id={section.id}
								data-step={section.step}
								data-cond={section.cond}
								data-wp-class--is-active="callbacks.isActiveSection"
								data-index={index}
								data-role="section"
								key={index}
							>
								<div className={classes.section._header()}>
									<div className={classes.section.title()}>
										{(states.hasCount && sectionStates.isSectionQuestion) && (
											<div className={classes.section.title.count()}>
												{attributes.countPrefix && (<span className={classes.section.title.count.prefix()}>{attributes.countPrefix}</span>)}
												<span className={classes.section.title.count.number()} data-wp-text="state.step"></span>
												{attributes.countSuffix && (<span className={classes.section.title.count.suffix()}>{attributes.countSuffix}</span>)}
											</div>
										)}
										<div className={classes.section.title._text()} data-role="title">
											<RichText.Content value={section.title}/>
										</div>
									</div>
								</div>
								<div className={classes.section._body()}>
									{sectionStates.hasImage && (
										<div className={classes.section._body.image()}>
											<img className={classes.section.image._img()} src={section.src} alt={section.alt} data-role="image"/>
										</div>
									)}
									<div className={classes.section._body.text()}>
										{sectionStates.hasLead && (
											<h4 className={classes.section.lead()} value={section.lead} data-role="lead">
												<RichText.Content value={section.lead}/>
											</h4>
										)}
										{sectionStates.hasDesc && (
											<div className={classes.section.desc()} data-role="desc">
												<RichText.Content value={section.desc}/>
											</div>
										)}
										{(states.hasScore && sectionStates.isSectionResult) && (
											<dl className={classes.section.score()}>
												<template data-wp-each--score="context.scores">
													<dt className={classes.section.score.label()} data-wp-text="context.score.label"/>
													<dd className={classes.section.score.point()}>
														 <span className={classes.section.score.point.number()} data-wp-text="context.score.point"/>
														 <span className={classes.section.score.point.unit()} data-wp-text="context.score.unit"/>
													</dd>
												</template>
											</dl>
										)}
										{sectionStates.isSectionResult?(
											<>
												{sectionStates.hasButtons && (
													<div className={classes.section.buttons()}>
														{section.buttons.map((button,buttonIndex)=>{
															return (
																<a 
																	tagName="a"
																	className={classes.section.buttons.button(button.classes)}
																	data-button-class={button.classes}
																	href={button.href}
																	data-role="button"
																	key={buttonIndex}
																>
																	<RichText.Content value={button.text}/>
																</a>
															);
														})}
													</div>
												)}
											</>
										):(
											<ul className={classes.section.buttons()}>
												{section.buttons.map((button,buttonIndex)=>{
													return (
														<li
															className={classes.section.buttons.button(button.classes)}
															data-button-class={button.classes}
															data-button-id={button.id}
															data-wp-on--click="actions.onClickButton"
															data-flag={button.flag}
															data-score={button.score}
															data-role="button"
															key={buttonIndex}
														>
															<RichText.Content value={button.text}/>
														</li>
													);
												})}
											</ul>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
});
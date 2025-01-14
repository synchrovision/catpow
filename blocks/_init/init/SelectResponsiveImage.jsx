import { useCallback } from 'preact/hooks';
import {CP} from './CP.jsx';
import {bem} from 'catpow/util';

CP.SelectResponsiveImage=(props)=>{
	const {className='',attr,set,keys={},index=0,subIndex=0,size,devices,device,isTemplate,...otherProps}=props;
	const {useMemo,useCallback}=wp.element;
	const classes=useMemo(()=>bem('CP-SelectResponsiveImage '+className),[className]);
	
	let {sizes}=props;
	let type,onClick,item,items,subItems;
	
	item=attr || {};
	if(keys.items){
		items=item[keys.items] || [];
		item=items[index] || {};
		if(keys.subItems){
			subItems=item[keys.subItems] || [];
			item=subItems[subIndex];
		}
	}

	if(device){
		const sizeData=CP.devices[device];
		onClick=(e)=>CP.selectImage({src:'src'},function({src}){
			if(keys.sources){
				const source=item[keys.sources].find(source=>source.device===device);
				if(source){source.srcset=src;}
				else{item[keys.sources].push({device,srcset:src});}
				if(items){
					set({[keys.items]:JSON.parse(JSON.stringify(items))});
				}
				else{
					set({[keys.sources]:JSON.parse(JSON.stringify(item[keys.sources]))});
				}
			}
			else{
				if(item[keys.srcset].match(sizeData.reg)){
					item[keys.srcset]=item[keys.srcset].replace(sizeData.reg,src+sizeData.rep);
				}
				else{
					item[keys.srcset]+=','+src+sizeData.rep;
				}
				if(items){
					set({[keys.items]:JSON.parse(JSON.stringify(items))});
				}
				else{
					set({[keys.srcset]:item[keys.srcset]});
				}
			}
		},sizeData.media_size);
	}
	else{
		onClick=(e)=>CP.selectImage(keys,function(data){
			if(keys.items){
				Object.assign(item,data);
				set({[keys.items]:JSON.parse(JSON.stringify(items))});
			}
			else{
				set(data);
			}
		},size,devices);
	}
	if(isTemplate && keys.code && item[keys.code]){
		return <CP.DummyImage text={item[keys.code]}/>;
	}
	if(item[keys.mime]){type=item[keys.mime].split('/')[0];}
	else{type='image';}
	if(type=='audio'){
		return (
			<audio
				className={classes('is-audio')}
				src={item[keys.src]}
				data-mime={item[keys.mime]}
				onClick={onClick}
				{...otherProps}
				></audio>
		);
	}
	if(item[keys.srcset] && !sizes){
		if(device){
			sizes=CP.devices[device].sizes_value;
		}
		else{
			sizes=CP.getImageSizesForDevices(devices || ['sp','pc']);
		}
	}
	if(type=='video'){
		return (
			<video
				className={classes('is-video')}
				src={item[keys.src]}
				data-mime={item[keys.mime]}
				onClick={onClick}
				autoplay={1}
				loop={1}
				playsinline={1}
				muted={1}
				{...otherProps}
				></video>
		);
	}
	var src=CP.imageSrcOrDummy(item[keys.src]);
	if(keys.sources){
		if(device){
			const source=(item[keys.sources] && item[keys.sources].find((source)=>source.device===device)) || {srcset:wpinfo.theme_url+'/images/dummy.jpg'};
			return (
				<picture
					className={classes('is-picture')}
					onClick={onClick}
					{...otherProps}
				>
					<img
						className={classes.img()}
						src={source.srcset}
						alt={item[keys.alt]}
					/>
				</picture>
			);
		}
		return (
			<picture
				className={classes('is-picture')}
				onClick={onClick}
				{...otherProps}
			>
				{item[keys.sources] && item[keys.sources].map((source)=>(
					<source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device}/>
				))}
				<img
					className={classes.img()}
					src={src}
					alt={item[keys.alt]}
				/>
			</picture>
		);
	}
	return (
		<img
			className={classes('is-img')}
			src={src}
			alt={item[keys.alt]}
			srcSet={item[keys.srcset]}
			sizes={sizes}
			data-mime={item[keys.mime]}
			onClick={onClick}
			{...otherProps}
		/>
	);
};
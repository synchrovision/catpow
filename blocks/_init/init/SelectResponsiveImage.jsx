import {CP} from './CP.jsx';

CP.SelectResponsiveImage=(props)=>{
	const {className,attr,set,keys={},index,size,devices,device,isTemplate,...otherProps}=props;
	let {sizes}=props;
	let type,onClick,item,items;
	if(keys.items){
		items=attr[keys.items];
		if(keys.subItems){
			item=items[index][keys.subItems][subIndex];
		}
		else{
			item=items[index];
		}
	}
	else{
		item=attr;
	}
	if(device){
		const sizeData=CP.devices[device];
		onClick=(e)=>CP.selectImage({src:'src'},function({src}){
			if(keys.sources){
				item[keys.sources].forEach((source)=>{
					if(source.device===device){source.srcset=src;}
				});
				if(items){
					set({[keys.items]:JSON.parse(JSON.stringify(items))});
				}
				else{
					set({[keys.sources]:JSON.parse(JSON.stringify(item[keys.sources]))});
				}
			}
			else{
				if(items){
					item[keys.srcset]=item[keys.srcset].replace(sizeData.reg,src+sizeData.rep);
					set({[keys.items]:JSON.parse(JSON.stringify(items))});
				}
				else{
					set({[keys.srcset]:item[keys.srcset].replace(sizeData.reg,src+sizeData.rep)});
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
				className={'selectImage '+className}
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
				className={'selectImage '+className}
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
			const source=item[keys.sources].find((source)=>source.device===device) || {srcset:wpinfo.theme_url+'/images/dummy.jpg'};
			return (
				<picture
					className={'selectImage '+className}
					onClick={onClick}
					{...otherProps}
				>
					<img
						src={source.srcset}
						alt={item[keys.alt]}
					/>
				</picture>
			);
		}
		return (
			<picture
				className={'selectImage '+className}
				onClick={onClick}
				{...otherProps}
			>
				{item[keys.sources].map((source)=>(
					<source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device}/>
				))}
				<img
					src={src}
					alt={item[keys.alt]}
				/>
			</picture>
		);
	}
	return (
		<img
			className={'selectImage '+className}
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
import {CP} from './CP.jsx';

CP.ResponsiveImage=({className,attr,keys,index,sizes,devices,device,isTemplate})=>{
	let type,item;
	if(keys.items){item=attr[keys.items][index];}
	else{item=attr;}
	if(isTemplate && keys.code && item[keys.code]){
		return item[keys.code];
	}
	if(item[keys.mime]){type=item[keys.mime].split('/')[0];}
	else{type='image';}
	if(type=='audio'){
		return (
			<audio
				src={item[keys.src]}
				data-mime={item[keys.mime]}
				></audio>
		);
	}
	if(item[keys.srcset] && !sizes){
		devices=devices || ['sp','pc'];
		sizes=CP.getImageSizesForDevices(devices);
	}
	if(type=='video'){
		return (
			<video
				className={className}
				src={item[keys.src]}
				srcSet={item[keys.srcset]}
				sizes={sizes}
				data-mime={item[keys.mime]}
				autoplay={1}
				loop={1}
				playsinline={1}
				muted={1}
				></video>
		);
	}
	if(keys.sources && item[keys.sources] && item[keys.sources].length){
		if(device){
			const source=item[keys.sources].find((source)=>source.device===device);
			return (
				<picture className={'selectImage '+className}>
					<img
						src={source.srcset}
						alt={item[keys.alt]}
					/>
				</picture>
			);
		}
		return (
			<picture className={'selectImage '+className}>
				{item[keys.sources].map((source)=>(
					<source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device}/>
				))}
				<img
					src={item[keys.src]}
					alt={item[keys.alt]}
				/>
			</picture>
		);
	}
	return (
		<img
			className={className}
			src={item[keys.src]}
			alt={item[keys.alt]}
			srcSet={item[keys.srcset]}
			sizes={sizes}
			data-mime={item[keys.mime]}
		/>
	);
};
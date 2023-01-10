import {CP} from './CP.jsx';

CP.StandardIcon={
	Input:(props)=>{
		const {item,prm,save}=props;
		prm.keys=prm.keys || {};
		prm.keys.src=prm.keys.src || prm.input+'Src';
		prm.keys.alt=prm.keys.alt || prm.input+'Alt';
		return (
			<CP.SelectPreparedImage
				name={prm.input}
				value={item[prm.keys.src]}
				color={prm.color || CP.getColor({attr:item}) || 0}
				onChange={(image)=>{
					save({
						[prm.keys.src]:image.url,
						[prm.keys.alt]:image.alt,
					});
				}}
			/>
		);
	},
	Output:(props)=>{
		const {item}=props;
		return (
			<span className="icon">
				<img src={item.iconSrc} alt={item.iconAlt}/>
			</span>
		)
	}
};
import {CP} from './CP.jsx';

CP.SelectDeviceToolbar=(props)=>{
	const {BlockControls}=wp.blockEditor;
	const {Toolbar}=wp.components;
	const {set,attr,devices=['sp','pc']}=props;
	return (
		<BlockControls>
			{devices.map((device)=>{
				return (
					<Toolbar
						controls={[
							{
								icon:CP.devices[device].icon,
								title:device,
								isActive:attr.device===device,
								onClick:()=>{
									if(attr.device===device){
										set({device:null});
									}
									else{set({device});}
								}
							}
						]}
						key={device}
					/>
				);
			})}
		</BlockControls>
	);
};
import {CP} from './CP.jsx';

CP.SelectDeviceToolbar=(props)=>{
	const {BlockControls}=wp.blockEditor;
	const {ToolbarGroup}=wp.components;
	const {set,attr,devices=['sp','pc'],defaultInput}=props;
	return (
		<BlockControls>
			{devices.map((device)=>{
				return (
					<ToolbarGroup
						controls={[
							{
								icon:CP.devices[device].icon,
								title:device,
								isActive:attr.device===device,
								onClick:()=>{
									if(attr.device===device){
										set({device:defaultInput || null});
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
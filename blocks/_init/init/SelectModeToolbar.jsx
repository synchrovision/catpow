import {CP} from './CP.jsx';

CP.SelectModeToolbar=(props)=>{
	const {BlockControls}=wp.blockEditor;
	const {Toolbar}=wp.components;

	const {set,attr,modes=['EditMode','AltMode']}=props;
	const SomeMode=modes.some((mode)=>attr[mode]);
	const icons={
		EditMode:'edit',
		OpenMode:'video-alt3',
		AltMode:'welcome-comments',
		TextMode:'media-text'
	};
	const cond={
		AltMode:'doLoop'
	};
	return (
		<BlockControls>
			{modes.map((mode)=>{
				if(!attr[mode] && SomeMode){return false;}
				if(cond[mode] && !attr[cond[mode]]){return false;}
				return (
					<Toolbar
						controls={[
							{
								icon:icons[mode],
								title:mode,
								isActive:attr[mode],
								onClick:()=>set({[mode]:!attr[mode]})
							}
						]}
						key={mode}
					/>
				);
			})}
		</BlockControls>
	);
};
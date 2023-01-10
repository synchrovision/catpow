import {CP} from './CP.jsx';

CP.SelectColors=(props)=>{
	const {useState,useRef}=wp.element;
	const {ColorPicker,ColorPalette,Popover}=wp.components;
	const {onChange}=props;
	const [index,setIndex]=useState(-1);

	const colorValues=props.colors.map((color)=>{
		if(typeof color === 'string'){
			return color;
		}
		if('h' in color){
			if('a' in color){return `hsla(${color.h},${color.s},${color.l},${color.a})`;}
			return `hsl(${color.h},${color.s},${color.l})`;
		}
		if('a' in color){return `rgba(${color.r},${color.g},${color.b},${color.a})`;}
		return `rgba(${color.r},${color.g},${color.b})`;
	});
	const colors=colorValues.map((color)=>{
		return {name:color,color};
	});

	return (
		<div>
			<ColorPalette
				colors={colors}
				color={index>-1 && colors[index].color}
				onChange={(colorValue)=>{
					setIndex(colorValues.indexOf(colorValue));
				}}
			/>
			{index>-1 && (
				<Popover>
					<ColorPicker
						color={colors[index].color}
						onChangeComplete={(value)=>{
							colors[index].color=value.hex;
							onChange(index,value);
						}}
					/>
				</Popover>
			)}
		</div>
	);
};
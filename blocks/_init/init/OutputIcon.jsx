import {CP} from './CP.jsx';

CP.OutputIcon=(props)=>{
	return wp.element.createElement(CP[wp.hooks.applyFilters('catpow.IconComponent','StandardIcon')].Output,props);
};
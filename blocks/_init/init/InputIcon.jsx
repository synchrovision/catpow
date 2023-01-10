import {CP} from './CP.jsx';

CP.InputIcon=(props)=>{
	return wp.element.createElement(CP[wp.hooks.applyFilters('catpow.IconComponent','StandardIcon')].Input,props);
};
import {CP} from './CP.jsx';

CP.AlignmentIcon=(props)=>{
	const {icon}=props;
	switch(icon){
		case 'top':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="10" y="3" width="8" height="11"/><rect x="2" y="3" width="7" height="15"/><rect x="1" y="1" width="18" height="1"/></svg>
		);
		case 'middle':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="1.5 17.5 8.5 17.5 8.5 10.5 9.5 10.5 9.5 15.5 17.5 15.5 17.5 10.5 18.5 10.5 18.5 9.5 17.5 9.5 17.5 4.5 9.5 4.5 9.5 9.5 8.5 9.5 8.5 2.5 1.5 2.5 1.5 9.5 .5 9.5 .5 10.5 1.5 10.5 1.5 17.5"/></svg>
		);
		case 'bottom':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="10" y="6" width="8" height="11"/><rect x="2" y="2" width="7" height="15"/><rect x="1" y="18" width="18" height="1"/></svg>
		);
		case 'left':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="3" y="2" width="11" height="8"/><rect x="3" y="11" width="15" height="7"/><rect x="1" y="1" width="1" height="18"/></svg>
		);
		case 'center':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="9 19 10 19 10 18 17 18 17 11 10 11 10 10 15 10 15 2 10 2 10 1 9 1 9 2 4 2 4 10 9 10 9 11 2 11 2 18 9 18 9 19"/></svg>
		);
		case 'right':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="6" y="2" width="11" height="8"/><rect x="2" y="11" width="15" height="7"/><rect x="18" y="1" width="1" height="18"/></svg>
		);
		case 'evenTop':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="5"/><rect x="2" y="12" width="16" height="7"/><rect x="1" y="1" width="18" height="1"/><rect x="1" y="10" width="18" height="1"/></svg>
		);
		case 'evenMiddle':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="17 2 3 2 3 4 1 4 1 5 3 5 3 7 17 7 17 5 19 5 19 4 17 4 17 2"/><polygon points="18 11 2 11 2 14 1 14 1 15 2 15 2 18 18 18 18 15 19 15 19 14 18 14 18 11"/></svg>
		);
		case 'evenBottom':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="3" y="1" width="14" height="5"/><rect x="2" y="10" width="16" height="7"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="18" width="18" height="1"/></svg>
		);
		case 'evenLeft':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="3" y="3" width="5" height="14"/><rect x="12" y="2" width="7" height="16"/><rect x="1" y="1" width="1" height="18"/><rect x="10" y="1" width="1" height="18"/></svg>
		);
		case 'evenCenter':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="4 1 4 3 2 3 2 17 4 17 4 19 5 19 5 17 7 17 7 3 5 3 5 1 4 1"/><polygon points="15 1 14 1 14 2 11 2 11 18 14 18 14 19 15 19 15 18 18 18 18 2 15 2 15 1"/></svg>
		);
		case 'evenRight':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="1" y="3" width="5" height="14"/><rect x="10" y="2" width="7" height="16"/><rect x="7" y="1" width="1" height="18"/><rect x="18" y="1" width="1" height="18"/></svg>
		);
		case 'evenSpaceV':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="4" y="2" width="13" height="6"/><rect x="4" y="11" width="14" height="7"/><polygon points="3 10 3 9 4 9 4 8 3 8 3 7 2 7 2 8 1 8 1 9 2 9 2 10 1 10 1 11 2 11 2 12 3 12 3 11 4 11 4 10 3 10"/></svg>
		);
		case 'evenSpaceH':return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="2" y="4" width="6" height="13"/><rect x="11" y="4" width="7" height="14"/><polygon points="12 3 12 2 11 2 11 1 10 1 10 2 9 2 9 1 8 1 8 2 7 2 7 3 8 3 8 4 9 4 9 3 10 3 10 4 11 4 11 3 12 3"/></svg>
		);
	}
};
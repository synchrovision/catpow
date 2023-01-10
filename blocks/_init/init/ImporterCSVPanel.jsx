import {CP} from './CP.jsx';

CP.ImporterCSVPanel=(props)=>{
	const {PanelBody,FormFileUpload}=wp.components;
	let reader=new FileReader();
	reader.onload=(e)=>{
		props.callback(CP.parseCSV(e.target.result));
	}
	return (
		<PanelBody title={props.title} initialOpen={false} icon={props.icon}>
			<FormFileUpload
				label='CSV'
				accept="text/csv"
				onChange={(e)=>{reader.readAsText(e.target.files[0]);}}
			/>
		</PanelBody>
	);
};
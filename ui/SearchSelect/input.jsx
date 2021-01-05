/*
絞り込み選択のUI

*/
Catpow.UI.SearchSelect=class extends wp.element.Component{
	constructor(props) {
		super(props);
		this.flatSelections={};
		this.allLabels=[];
		let currentLabel=props.defaultLabel;
		const walkSelections=(sels)=>{
			if(Array.isArray(sels)){
				sels.map((val)=>{
					if(typeof val === 'object'){
						walkSelections(val);
					}
					else{
						this.flatSelections[val]=val;
						this.allLabels.push(val);
						if(val===this.props.value){currentLabel=val;}
					}
				});
			}
			else{
				Object.keys(sels).map((key)=>{
					let val=sels[key];
					if(typeof val === 'object'){
						walkSelections(val);
					}
					else{
						this.flatSelections[key]=val;
						this.allLabels.push(key);
						if(val===this.props.value){currentLabel=key;}
					}
				});
			}
		};
		walkSelections(props.selections);
		this.state={
			value:props.value,
			selecting:false,
			currentSelections:[],
			currentLabel,
			cache:{},
			needle:''
		};
	}
	render(){
		var classes='SearchSelect';
		const {cache,needle,currentSelections,currentLabel}=this.state;
		const search=(needle)=>{
			if(cache[needle]){return cache[needle];}
			if(needle.length<2){return [];}
			let haystack;
			if(needle.length>3){haystack=search(needle.slice(0,-1));}
			else{haystack=this.allLabels;}
			return cache[needle]=haystack.filter((val)=>val.indexOf(needle)>=0);
		};
		return (
			<div className={'SearchSelect'}>
				<div
					className="currentLabel"
					onClick={(e)=>{
						this.setState({selecting:!this.state.selecting});
					}}
				>{currentLabel || this.props.defaultLabel}</div>
				<Catpow.Popup open={this.state.selecting} onClose={()=>this.setState({selecting:false})}>
					<div class="searchBox">
						<input
							type="text"
							className="searchInput"
							value={needle}
							placeholder={this.props.placeholder}
							onChange={(e)=>{
								this.setState({
									needle:e.currentTarget.value,
									currentSelections:search(e.currentTarget.value)
								});
							}}
						/>
					</div>
					<div class="selectBox">
						<Catpow.SelectTable
							selections={currentSelections}
							value={currentLabel}
							col={this.props.col || 5}
							onChange={(label)=>{
								this.setState({
									value:this.flatSelections[label],
									needle:label,
									currentLabel:label,
									selecting:false
								});
							}}
						/>
					</div>
				</Catpow.Popup>
				<Catpow.UI.HiddenValues name={this.props.name} value={this.state.value}/>
			</div>
		);
	}
}
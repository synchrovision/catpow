/* global console Catpow Reflect Proxy*/

Catpow.eventProcessor={
	processors:{},
	register(name,processor){
		this.processors[name]=processor;
	},
	sendEvent(data){
		for(let name in this.processors){
			const processor=this.processors[name];
			if(processor.sendCommonFormatEvent!=null){
				processor.sendCommonFormatEvent(data);
			}
		}
	}
}
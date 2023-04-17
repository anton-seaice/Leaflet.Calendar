/*
🍂namespace Time Local
These are the supported layers types.

First create map.date and add the datepicker control, then you can add these layers.

Layers from local files have urls formed with:
fileBasePath+dateString+fileExtension

- fileBasePath is all parts of the url that go before the date in the url
- fileExtension is all parts of the url that go after the date in the url
- dateString is :
	- returned from this.options.dateStr(time)
	- or 'YYYY-M-D' or 'YYYY-M' or 'YYYY' depending on the value of this.options.freq (default: daily) 


*/

/*

These are functions to 'mixin' with leaflet classes to add time functions with local files

It relies on a date picker being added to the map (e.g. L.Control.Date) 

options are shared with the leaflet class, the ones used here are:
freq: 'daily'/'monthly'/'yearly' to specify how far apart images are in time
dateStr: function(date) : an alternative way of constructing the path

The leaflet extension class needs a 'updateTime: function(event)'  which is triggered when the date of the map is changed 

*/

export const TimeFns={
	startEventListener(map) {
		// start lisiting for date change events from the datePicker.
		switch(this.options.freq) {
			case 'yearly' : 
				map.on('yearChanged', this.updateTime, this) ; 
				break ;
			case 'monthly' :
			case 'monthly mean': 
				map.on('monthChanged', this.updateTime, this) ; 
				break ;
			default : 
				map.on('dayChanged', this.updateTime, this) ; 
		} 
	} ,
	
	stopEventListener(map) {
		switch(this.options.freq) {
			case 'yearly' : 
				map.off('yearChanged', this.updateTime, this) ; 
				break ;
			case 'monthly' :
			case 'monthly mean': 
				map.off('monthChanged', this.updateTime, this) ; 
				break ;
			default : 
				map.off('dayChanged', this.updateTime, this) ; 
		} 
	}
}

var TimeLocal={	

	setupTimeLocal(fileBasePath, fileExtension, options) {	

		this._basePath=String(fileBasePath) ;
		this._fileExtension=String(fileExtension) ;
		
		L.setOptions(this, options) ;
		
	} ,
		
	localUrl(time) {
		
		/*return a url in the form:
		fileBasePath+dateString+fileExtension
		
		where dateString is :
		 - returned from this.options.dateStr(time)
		 - or 'YYYY-M-D' or 'YYYY-M' or 'YYYY' depending on the value of this.options.freq (default: daily) 
		*/
		
		const d = new Date(time);
		const year = String(d.getFullYear());
		const month = String(d.getMonth() +1) ; //zero indexed
		const day = String(d.getDate()) ;

		if (this.options.dateStr) {
			return this._basePath+this.options.dateStr(time)+this._fileExtension ;
		} else {
			switch(this.options.freq) {
				case 'yearly' :
					return this._basePath+year+this._fileExtension ;
				case 'monthly' :
					return this._basePath+year+'_'+month+this._fileExtension ;
				case 'monthly mean' :
					return this._basePath+month+this._fileExtension ;
				default :
					return this._basePath+year+'_'+month+'_'+day+this._fileExtension ;
			}
		}
	} ,
}

Object.setPrototypeOf(TimeLocal, TimeFns)

export default TimeLocal ;
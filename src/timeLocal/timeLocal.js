/*
🍂namespace Time Local
These are the supported layers types.

First create map.date and add the datepicker control, then you can add these layers.

Layers from local files have urls formed with a url template, using keywords surrounded by {}. 

The allowed keywords are :
- dateStr: returned from this.options.dateStr(obj)
- year: four digit year
- month: 1/2 digit month as a number
- day: 1/2 digit day as a number

obj contains a date object, a day,month,year strings.
e.g. dateStr:(obj) => { return obj.date.toISOString()} would let us use a {dateStr} var in the url which would return the data in `2023-04-20T04:30:06.608Z` format

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

	setupTimeLocal(urlTemplate,options) {	
		this._urlTemplate=String(urlTemplate) ;
		L.setOptions(this, options) ;
	} ,
		
	localUrl(time) {
		/*
		return a url using the template this._urlTemplate and the time provided
		
		allowed vars in the template:
			- date: returned from this.options.dateStr(time)
			- year: four digit year
			- month: 1/2 digit month as a number
			- day: 1/2 digit day as a number
		*/
		
		const d = new Date(time);
		const data = {
			date:d ,
			year: String(d.getFullYear()),
			month: String(d.getMonth() +1) , //zero indexed
			day: String(d.getDate()) ,
		}

		const localUrl = L.Util.template(
			this._urlTemplate, 
			L.Util.extend(data,this.options) //just incase there are other template vars in this.options
		)

		console.debug("New Url: " + localUrl)

		return  localUrl;
	} ,
}

Object.setPrototypeOf(TimeLocal, TimeFns)

export default TimeLocal ;
import {createApp, ref} from 'vue' ;
import Datepicker from './Datepicker.vue' ;

/* 
@namespace L
@class Control.Datepicker
@aka L.Control.Datepicker
Inherits L.Control

This creates a leaflet 'control' with a datepicker inside it. The datepicker is an app made usign the Vue framework, and can be daily, monthly or annual.

The frequency of the datepicker is set by the 'freq' option for each layer added to the map. The highest frequency 'freq' option set for layer added to the map is used as the date picker. e.g:
- If no layers have the 'freq' option, then the datepicker does not show (but there is an empty space in allocated for it)
- If one layer has the freq option set as 'yearly', then a calendar with years only is shown
- If one layer has the 'monthly' option, and one has the 'yearly' option, then the monthly calendar is shown
- If one layer has the 'daily' option set, and two layers have 'monthly', and three have 'yearly', the daily calendar is shown.

The date is stored as a date object in map.date

The datepicker is used with the TimeLocal extensions to Leaflet layers

@example
```js
L.control.datepicker().addTo(map) ;

L.tileLayer.time(
	 "https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png", 
		{
			layer: "AMSRU2_Sea_Ice_Concentration_12km",
			tileMatrixSet: "1km",
			format: "image/png",
			transparent: true,
			freq:'daily',
			attribution: "<a href='https://seaice.uni-bremen.de/sea-ice-concentration/amsre-amsr2/'>AMSR2</a>",
		}
).addTo(map) ;

```

*/

L.Control.Datepicker=L.Control.extend({
		
	options: {
		//@option position: String = 'topright'|'topleft'|'bottomleft'|'bottomright'
		//which corner to show the datepicker on the map
		position: 'topright',
	} ,

	onAdd(map) {

		function dateChange(newDate) {
			//determine if the month or year has also changed, and fire events for each case
			console.log(`tracker date change ${newDate}`)  ;
			if (newDate!=map.date) {map.fire('dayChanged', {date:newDate}) ; }
			if (newDate.getMonth()!=map.date.getMonth() || newDate.getFullYear()!=map.date.getFullYear()) { map.fire('monthChanged', {date:newDate}) ;}
			if (newDate.getFullYear()!=map.date.getFullYear()) { map.fire('yearChanged', {date:newDate}) ; }
			map.date=newDate ;
		} 
		
		this._container = L.DomUtil.create('div', 'date-control leaflet-control') ;
		map._dateFreq = ref('monthly') ;

		//mount the vue app in it
		this._app=createApp(Datepicker, {
			startDate: map.date ,
			freq: map._dateFreq , 
			onDateChange:dateChange 
		}).mount(this._container);

		// set up an event listener for when an layer is added
		map.on('layeradd', this._layerChange, map) ;
		map.on('layerremove', this._layerChange, map) ;
		
		return this._container ;
	},
	
	onRemove(map) {

		this._app=null ;

		L.DomUtil.remove(this._container) ;
		
		map.off('layeradd', this._layerChange) ;
		map.off('layerremove', this._layerChange,) ;
		
	},
	
	_layerChange(event) {
		// if the layer has a freq, then check if the date picker is correct still
		// this function needs to be run with map scope for these to be accessible outside this object.

		if (event.layer.options.freq) {

			let freqsList=[];
			this.eachLayer( (l) => 
					{ freqsList.push(l.options.freq) ; }
			) ;
			
			if (freqsList.includes('daily')) {
				this._dateFreq.value = 'daily' ;
			} else if (freqsList.includes('monthly') | freqsList.includes('monthly mean')) {
				this._dateFreq.value = 'monthly' ;
			} else if (freqsList.includes('yearly')) {
				this._dateFreq.value = 'yearly' ;
			} else {
				this._dateFreq.value = 'none' ;
			}  
		} 
	} ,
})


L.control.datepicker=function(options) {
	return new L.Control.Datepicker(options) 
}

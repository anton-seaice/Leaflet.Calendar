import TimeLocal from './timeLocal.js' ;

/* 
🍂namespace Time Local
🍂class ImageOverlay.TimeLocal
Inherits ImageOverlay

Used to load a single image from local storage based on the specified time

🍂example
```js

L.imageOverlay.timeLocal(
	map.date,
	"tracker_data/chlor_conc_anoms/occci_chlor_conc_anoms_", 
	".png", 
	minus40Bounds,
	{
		attribution: Ocean Colour - CCI",
		freq: 'monthly',
		alt: 'No data for Chlorophyll Conc for this month'
	}
) 
```
time,fileBasePath and fileExtension are used by 'mixin' TimeLocal

Bounds is unchanged from L.ImageOverlay


*/

L.ImageOverlay.TimeLocal=L.ImageOverlay.extend({
		
	includes: TimeLocal ,
	//🍂option freq: String = 'daily'
	//Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'
	//🍂option dateStr: Function(date) = returns YYYY-M-D
	// you might need to tweak it to suit the format required 
		
		
	initialize(time, fileBasePath, fileExtension, bounds, options ) { 
	// (date, String, String, LatLngBounds, Object)
			
		this.setupTimeLocal(
			fileBasePath, fileExtension, options
		) ;
				
		// run the initialize function from the super class
		L.ImageOverlay.prototype.initialize.call(
			this, this.localUrl(time), bounds, options
		) ;
	},
	
	onAdd(map) {
		
		this.startEventListener(map) ;
		
		this.setUrl(this.localUrl(map.date)) ;
		
		L.ImageOverlay.prototype.onAdd.call(this,map) ;
		
	} ,
	
	onRemove(map) {
		
		this.stopEventListener(map) ;
		
		L.ImageOverlay.prototype.onRemove.call(this,map) ;
	},
	
	updateTime(eventValue) {
		//change URL and redraw for the new time
		this.setUrl(this.localUrl(eventValue.date)) ;
	},
	
})

L.imageOverlay.timeLocal = function (time, fileBasePath, fileExtension, bounds, options) {
	return new L.ImageOverlay.TimeLocal(time, fileBasePath, fileExtension, bounds, options) ;
}

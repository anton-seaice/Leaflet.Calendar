import TimeFns from './timeLocal.js' ;

/* 
🍂namespace Time Local
🍂class TileLayer.Time 
Inherits L.TileLayer

Used to load a single image from web (TMS server) based on the specified time. Url must include `{time}`.

Other options are inherited from L.TileLayer

🍂example
```js
L.tileLayer.time(
	"https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png", 
	{
		layer: "AMSRU2_Sea_Ice_Concentration_12km",
		tileMatrixSet: "1km",
		tileSize: 256,
		format: "image/png",
		transparent: true,
		freq:'daily',
		attribution: "<a href='https://seaice.uni-bremen.de/sea-ice-concentration/amsre-amsr2/'>AMSR2</a>",
	}
)
```
*/

L.TileLayer.Time = L.TileLayer.extend({
	
	includes: TimeFns ,

	options: {
		//🍂option freq: String = 'daily'
		// Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'
		//🍂option dateStr: Function(date) = returns YY-MM-DD
		// you might need to tweak it to suit the format required by the server
		dateStr: (date) => {
			return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,0)}-${String(date.getDate()).padStart(2,0)}`;
		}
	} ,

	onAdd: function(map) {
		
		const d = new Date(map.date);
		this.options.time = this.options.dateStr(d) ;

		this.startEventListener(map) ;

		L.TileLayer.prototype.onAdd.call(this,map) ;
		
	} ,
	
	onRemove: function(map) {

		this.stopEventListener(map) ;
		L.TileLayer.prototype.onRemove.call(this,map) ;
		
	},
	
	updateTime: function(eventValue) {
		
		const d = new Date(eventValue.date);
		this.options.time = this.options.dateStr(d)  ;
		this.redraw() ;

	},

	_clampZoom: function(zoom) {
		// This is a workaround for https://github.com/Leaflet/Leaflet/issues/8276

		// Round the zoom level to a whole number
		return L.TileLayer.prototype._clampZoom.call(this,Math.round(zoom)) ;
	}
	
})

L.tileLayer.time = function (url, options) {
	return new L.TileLayer.Time(url, options) ;
}

/* 
🍂namespace Time Local
🍂class TileLayer.WMS.Time
Inherits L.TileLayer

Used to load a WMS from web based on the specified time. Url must include `{time}`

🍂example
```js
L.tileLayer.wms.time(
	"https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png", 
	{
		layer: "AMSRU2_Sea_Ice_Concentration_12km",
		tileMatrixSet: "1km",
		tileSize: 256, 
		format: "image/png",
		transparent: true,
		freq:'daily',
		attribution: "AMSR2",
	}
)
```

*/

L.TileLayer.WMS.Time = L.TileLayer.WMS.extend({

	includes: TimeFns ,
	
	options: {
		//🍂option freq: String = 'daily'
		//Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'
		freq:'daily' ,
		//🍂option dateStr: Function(date) = returns YYYY-MM-DDTHH:mm:ss.sssZ
		//default date format is Zulu time, as this is more common for WMS servers than our default 
		dateStr: (date) => {
			return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,0)}-${String(date.getDate()).padStart(2,0)}T12:00:00.000Z`;
		}
	} ,

	onAdd: function(map) {
		
		const d = new Date(map.date);
		this.wmsParams.time = this.options.dateStr(d)  ;

		this.startEventListener(map) ;
		
		L.TileLayer.WMS.prototype.onAdd.call(this,map) ;
		
	} ,
	
	onRemove: function(map) {

		this.stopEventListener(map) ;
		L.TileLayer.WMS.prototype.onRemove.call(this,map) ;
	},
	
	updateTime: function(eventValue) {

		const d = new Date(eventValue.date);

		this.setParams({time:this.options.dateStr(d)}) ;
		
	}
	
})

L.tileLayer.wms.time = function (url, options) {
	return new L.TileLayer.WMS.Time(url, options) ;
}

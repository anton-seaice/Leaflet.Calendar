/*
🍂namespace L
A calendar plugin for leaflet maps, using the Vue Datepicker

https://anton-seaice.github.io/Leaflet.Calendar/examples/antarctic.html
https://anton-seaice.github.io/Leaflet.Calendar/examples/world.html

#To-do

an example with Geojson points - i.e. if you have a calendar, could you show what events are on in your city on that day?

*/

import './leaflet-datepicker.css'
//The datepicker element
import './L.Control.Datepicker.js'

/*

TimeLocal is a folder of extensions to leaflet layers to add time functionality and handle local files. They are all imported by L.Layer.TimeLocal.js

For .timeLocal layers, urls are formed by basePath+dateString+fileExtension

dateString can be formed by the result from a function(Date) passed to the dateStr option, or by the default:

```
switch(this.options.freq) {
    case 'yearly' :
        return this._basePath+year+this._fileExtension ;
    case 'monthly' :
        return this._basePath+year+'_'+month+this._fileExtension ;
    case 'monthly mean' :
        return this._basePath+month+this._fileExtension ;
    default : //daily
        return this._basePath+year+'_'+month+'_'+day+this._fileExtension ;
}
```

*/

import './timeLocal/L.ImageOverlay.TimeLocal.js' ;

import './timeLocal/L.TileLayer.Time.js' ;

import './timeLocal/L.GeoJSON.TimeLocal.js' ;

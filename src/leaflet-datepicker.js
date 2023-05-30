/*
🍂namespace L
A calendar plugin for leaflet maps. This lets you add a datepicker to your [Leaflet](https://leafletjs.com/) web-map to give end-user control over the date of the data displayed.

There are two main elements needed: 
1:- the date picker, to select the date and 
2:- extensions to the leaflet layers types so that information is updated when the date is changed.

Click the images for examples:

[![Antarctic Example](./examples/antarcticScreenshot.jpg)](https://anton-seaice.github.io/Leaflet.Datepicker/examples/antarctic.html)
[![Simple Example](./examples/simpleScreenshot.jpg)](https://anton-seaice.github.io/Leaflet.Datepicker/examples/simple.html)]

This plugin uses the [Vue Datepicker](https://vue3datepicker.com/), but you do not need to be using Vue. It is standalone.

Simple install:

🍂example
```js
<script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>
and the css file
```

if you are using npm, install leaflet-datepicker
🍂example
```js
import 'leaflet-datepicker'
import '../node_modules/leaflet-calendar/dist/style.css'
```

if you are using vite, also install @vitejs/plugin-vue (as dev dependency). Add the vue plugin in vite.config.js:
🍂example
```js
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  ... //the rest of your config
```

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

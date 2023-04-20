# Leafdoc-generated API reference

## L

<p>A calendar plugin for leaflet maps. This lets you add a datepicker to your <a href="https://leafletjs.com/">Leaflet</a> web-map to give end-user control over the date of the data displayed.</p>
<p>There are two main elements needed: 1:- the date picker, to select the date and 2:- extensions to the leaflet layers types so that information is updated when the date is changed.</p>
<p>Click the images for examples:</p>
<p><a href="https://anton-seaice.github.io/Leaflet.Datepicker/examples/antarctic.html"><img src="./examples/antarcticScreenshot.jpg" alt="Antarctic Example"></a>
<a href="https://anton-seaice.github.io/Leaflet.Datepicker/examples/simple.html"><img src="./examples/simpleScreenshot.jpg" alt="Simple Example"></a>]</p>
<p>This plugin uses the <a href="https://vue3datepicker.com/">Vue Datepicker</a>, but you do not need to be using Vue. It is standalone.</p>
<p>Simple install:</p>


### Usage example







<pre><code class="language-js">&lt;script src=&quot;https://unpkg.com/leaflet@1.9.2/dist/leaflet.js&quot; integrity=&quot;sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=&quot; crossorigin=&quot;&quot;&gt;&lt;/script&gt;
and the css file
</code></pre>
<p>if you are using npm, install leaflet-datepicker</p>
<pre><code class="language-js">import 'leaflet-datepicker'
import '../node_modules/leaflet-calendar/dist/style.css'
</code></pre>
<p>if you are using vite, also install @vitejs/plugin-vue (as dev dependency). Add the vue plugin in vite.config.js:</p>
<pre><code class="language-js">import vue from '@vitejs/plugin-vue'
export default defineConfig({
 plugins: [vue()],
 ... //the rest of your config
</code></pre>
<p>#To-do</p>
<p>an example with Geojson points - i.e. if you have a calendar, could you show what events are on in your city on that day?</p>







## L.Control.Datepicker

<p>Inherits L.Control</p>
<p>This creates a leaflet 'control' with a datepicker inside it. The datepicker can be daily, monthly or annual. This changes the value of map.date, when the calendar is changes, and also emits the date used a &quot;dayChanged&quot;, &quot;monthChanged&quot; and or &quot;yearChanged&quot; event</p>
<p>The frequency of the datepicker is set by the 'freq' option for each layer added to the map. The highest frequency 'freq' option set for layers added to the map is used as the date picker. e.g:</p>
<ul>
<li>If no layers have the 'freq' option, then the datepicker does not show (but there is an empty space in allocated for it)</li>
<li>If one layer has the freq option set as 'yearly', then a calendar with years only is shown</li>
<li>If one layer has the 'monthly' option, and one has the 'yearly' option, then the monthly calendar is shown</li>
<li>If one layer has the 'daily' option set, and two layers have 'monthly', and three have 'yearly', the daily calendar is shown.</li>
</ul>
<p>The date is stored as a date object in map.date. The datepicker can by styled using the 'date-control' css element, and the #datepicker css id.</p>
<p>The datepicker is used with the TimeLocal extensions to Leaflet layers</p>


### Usage example







<pre><code class="language-js">
map.date=new Date() ;

L.control.datepicker().addTo(map) ;

</code></pre>






### Options






<table><thead>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	</thead><tbody>
	<tr id='l-control-datepicker-position'>
		<td><code><b>position</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;topright&#x27;</code></td>
		<td>'topright'|'topleft'|'bottomleft'|'bottomright'
<p>which corner to show the datepicker on the map.</p></td>
	</tr>
	<tr id='l-control-datepicker-frequency'>
		<td><code><b>frequency</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;monthly&#x27;</code></td>
		<td>'daily'|'monthly'|'yearly'|'none'
<p>which frequency to start the datepicker on. This is changed later by the freq option for each layer added.</p></td>
	</tr>
	<tr id='l-control-datepicker-mindate'>
		<td><code><b>minDate</b></code></td>
		<td><code>[String|Date object]</code>
		<td><code>&#x27;1980&#x27;</code></td>
		<td>the first date you can pick in the datepicker, default 1980</td>
	</tr>
	<tr id='l-control-datepicker-maxdate'>
		<td><code><b>maxDate</b></code></td>
		<td><code>[String|Date object]</code>
		<td><code>yesterday</code></td>
		<td>the last date you can pick in the datepicker,</td>
	</tr>
</tbody></table>





## Time Local

<p>These are the supported layers types.</p>
<p>First create map.date and add the datepicker control, then you can add these layers.</p>
<p>Layers from local files have urls formed with a url template, using keywords surrounded by {}.</p>
<p>The allowed keywords are :</p>
<ul>
<li>dateStr: returned from this.options.dateStr(obj)</li>
<li>year: four digit year</li>
<li>month: 1/2 digit month as a number</li>
<li>day: 1/2 digit day as a number</li>
</ul>
<p>obj contains a date object, a day,month,year strings.
e.g. dateStr:(obj) =&gt; { return obj.date.toISOString()} would let us use a {dateStr} var in the url which would return the data in <code>2023-04-20T04:30:06.608Z</code> format</p>



## GeoJSON.TimeLocal

<p>aka L.GeoJSON.TimeLocal
inherits L.GeoJSON.FromURL</p>
<p>Load a GeoJSONs file from local storage or a URL, with one file per timestep. he urlTemplate can use the words {year}, {month} or {day} or {date},which is formated by this.options.dateStr()</p>
<pre><code class="language-js">//Constructor function:
L.geoJSON.timeLocal(
	startDate,
	urlTemplate,
	options
)
</code></pre>


### Usage example







<pre><code class="language-js">L.geoJSON.timeLocal(
	date,
	&quot;data/duration/duration_{year}.json&quot;,
	{
		freq: 'yearly',
	}
).addTo(map)
</code></pre>
<p>which would show <code>data/duration/duration_2022.json</code> on the map if 2022 was the year shown in the calendar</p>






### Options






<table><thead>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	</thead><tbody>
	<tr id='geojson-timelocal-freq'>
		<td><code><b>freq</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;daily&#x27;</code></td>
		<td>Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'</td>
	</tr>
	<tr id='geojson-timelocal-datestr'>
		<td><code><b>dateStr</b></code></td>
		<td><code>Function(obj)</code>
		<td><code>None</code></td>
		<td>use this to create a custom dateStr var in the urlTemplate</td>
	</tr>
</tbody></table>





## ImageOverlay.TimeLocal

<p>inherits L.ImageOverlay</p>
<p>Load an  image from local storage based on the specified date. The urlTemplate can use the words {year}, {month} or {day} or {date},which is formated by this.options.dateStr()</p>
<pre><code class="language-js">//Constructor function:
L.imageOverlay.timeLocal(
	startDate,
	urlTemplate,
	bounds,
	options
)
</code></pre>


### Usage example







<pre><code class="language-js">
L.imageOverlay.timeLocal(
	map.date,
	&quot;tracker_data/chlor_conc_anoms/occci_chlor_conc_anoms_{year}_{month}.png&quot;, 
	[[-39.23, -42.24],[-41.45, 135.0]],
	{
		freq: 'monthly',
		alt: 'No data for Chlorophyll Conc for this month'
	}
) 
</code></pre>
<p>Bounds is unchanged from L.ImageOverlay</p>






### Options






<table><thead>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	</thead><tbody>
	<tr id='imageoverlay-timelocal-freq'>
		<td><code><b>freq</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;daily&#x27;</code></td>
		<td>Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'</td>
	</tr>
	<tr id='imageoverlay-timelocal-datestr'>
		<td><code><b>dateStr</b></code></td>
		<td><code>Function(obj)</code>
		<td><code></code></td>
		<td>function to create a custom dateStr var to use in the url template.</td>
	</tr>
</tbody></table>





## TileLayer.Time

<p>Inherits L.TileLayer</p>
<p>Used to load a single image from web (TMS server) based on the specified time. Url must include <code>{time}</code>.</p>
<p>Other options are inherited from L.TileLayer</p>


### Usage example







<pre><code class="language-js">L.tileLayer.time(
	&quot;https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png&quot;, 
	{
		layer: &quot;AMSRU2_Sea_Ice_Concentration_12km&quot;,
		tileMatrixSet: &quot;1km&quot;,
		tileSize: 256,
		format: &quot;image/png&quot;,
		transparent: true,
		freq:'daily',
		attribution: &quot;&lt;a href='https://seaice.uni-bremen.de/sea-ice-concentration/amsre-amsr2/'&gt;AMSR2&lt;/a&gt;&quot;,
	}
)
</code></pre>






### Options






<table><thead>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	</thead><tbody>
	<tr id='tilelayer-time-freq'>
		<td><code><b>freq</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;daily&#x27;</code></td>
		<td>Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'</td>
	</tr>
	<tr id='tilelayer-time-datestr'>
		<td><code><b>dateStr</b></code></td>
		<td><code>Function(date)</code>
		<td><code>returns YY-MM-DD</code></td>
		<td>you might need to tweak it to suit the format required by the server</td>
	</tr>
</tbody></table>





## TileLayer.WMS.Time

<p>Inherits L.TileLayer</p>
<p>Used to load a WMS from web based on the specified time. Url must include <code>{time}</code></p>


### Usage example







<pre><code class="language-js">L.tileLayer.wms.time(
	&quot;https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png&quot;, 
	{
		layer: &quot;AMSRU2_Sea_Ice_Concentration_12km&quot;,
		tileMatrixSet: &quot;1km&quot;,
		tileSize: 256, 
		format: &quot;image/png&quot;,
		transparent: true,
		freq:'daily',
		attribution: &quot;AMSR2&quot;,
	}
)
</code></pre>






### Options






<table><thead>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	</thead><tbody>
	<tr id='tilelayer-wms-time-freq'>
		<td><code><b>freq</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;daily&#x27;</code></td>
		<td>Frequency of steps between data in this data set. Options are 'daily','monthly','yearly'</td>
	</tr>
	<tr id='tilelayer-wms-time-datestr'>
		<td><code><b>dateStr</b></code></td>
		<td><code>Function(date)</code>
		<td><code>returns YYYY-MM-DDTHH:mm:ss.sssZ</code></td>
		<td>default date format is Zulu time, as this is more common for WMS servers than our default</td>
	</tr>
</tbody></table>







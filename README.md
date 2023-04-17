<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<style>
	table {
		border-collapse: collapse;
	}
	table td, table th {
		border: 1px solid #888;
	}
	pre code {
		display: inline-block;
		background: #eee;
	}
	td:last-child code {
		background: #eee;
	}
	body {
		font-family: Sans;
		max-width: 50em;
		margin: auto;
	}
	</style>
</head>
<body>
	<h2>Leafdoc generated API reference</h2>

	<h2 id='l'>L</h2>
<p>A calendar plugin for leaflet maps, using the Vue Datepicker</p>
<p>https://anton-seaice.github.io/Leaflet.Calendar/examples/antarctic.html
https://anton-seaice.github.io/Leaflet.Calendar/examples/world.html</p>
<p>#To-do</p>
<p>an example with Geojson points - i.e. if you have a calendar, could you show what events are on in your city on that day?</p>

<h2 id='l-control-datepicker'>L.Control.Datepicker</h2>
<p>Inherits L.Control</p>
<p>This creates a leaflet 'control' with a datepicker inside it. The datepicker is an app made usign the Vue framework, and can be daily, monthly or annual.</p>
<p>The frequency of the datepicker is set by the 'freq' option for each layer added to the map. The highest frequency 'freq' option set for layer added to the map is used as the date picker. e.g:</p>
<ul>
<li>If no layers have the 'freq' option, then the datepicker does not show (but there is an empty space in allocated for it)</li>
<li>If one layer has the freq option set as 'yearly', then a calendar with years only is shown</li>
<li>If one layer has the 'monthly' option, and one has the 'yearly' option, then the monthly calendar is shown</li>
<li>If one layer has the 'daily' option set, and two layers have 'monthly', and three have 'yearly', the daily calendar is shown.</li>
</ul>
<p>The date is stored as a date object in map.date</p>
<p>The datepicker is used with the TimeLocal extensions to Leaflet layers</p>

<h3 id='l-control-datepicker-example'>Usage example</h3>

<section>



<pre><code class="language-js">
map.date=new Date() ;

L.control.datepicker().addTo(map) ;

L.tileLayer.time(
	 &quot;https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png&quot;, 
		{
			layer: &quot;AMSRU2_Sea_Ice_Concentration_12km&quot;,
			tileMatrixSet: &quot;1km&quot;,
			format: &quot;image/png&quot;,
			transparent: true,
			freq:'daily',
			attribution: &quot;&lt;a href='https://seaice.uni-bremen.de/sea-ice-concentration/amsre-amsr2/'&gt;AMSR2&lt;/a&gt;&quot;,
		}
).addTo(map) ;

</code></pre>


</section>


<h3 id='l-control-datepicker-option'>Options</h3>

<section>


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
		<td><code>&#x27;topright&#x27;|&#x27;topleft&#x27;|&#x27;bottomleft&#x27;|&#x27;bottomright&#x27;</code></td>
		<td>which corner to show the datepicker on the map</td>
	</tr>
	<tr id='l-control-datepicker-frequency'>
		<td><code><b>frequency</b></code></td>
		<td><code>String</code>
		<td><code>&#x27;daily&#x27;|&#x27;monthly&#x27;|&#x27;yearly&#x27;|&#x27;none&#x27;</code></td>
		<td>which frequency to start the datepicker on. This is changed later by the freq option for each layer added.</td>
	</tr>
	<tr id='l-control-datepicker-mindate'>
		<td><code><b>minDate</b></code></td>
		<td><code>[String|Date object]</code>
		<td><code>valid date string or date object</code></td>
		<td>the first date you can pick in the datepicker, default 1980</td>
	</tr>
	<tr id='l-control-datepicker-maxdate'>
		<td><code><b>maxDate</b></code></td>
		<td><code>[String|Date object]</code>
		<td><code>valid date string or date object</code></td>
		<td>the last date you can pick in the datepicker, defaults to yesterday</td>
	</tr>
</tbody></table>
</section>


<h2 id='time-local'>Time Local</h2>
<p>These are the supported layers types.</p>
<p>Once you have created map.date and added the datepicker control, you can add these layers.</p>

<h2 id='geojson-timelocal'>GeoJSON.TimeLocal</h2>
<p>aka L.GeoJSON.TimeLocal
inherits L.GeoJSON.Local</p>
<p>Load a single GeoJSON file from local storage, with one file per timestep.</p>

<h3 id='geojson-timelocal-example'>Usage example</h3>

<section>



<pre><code class="language-js">L.geoJSON.timeLocal(
	date,
	&quot;tracker_data/duration/duration_&quot;,
	'.json',
	{
		freq: 'yearly',
		attribution: &quot;Derived from NSIDC CDR&quot;,
	}
)
</code></pre>
<p>time,fileBasePath and fileExtension are used by 'mixin' TimeLocal</p>


</section>


<h3 id='geojson-timelocal-option'>Options</h3>

<section>


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
	<tr id='geojson-timelocal-dateformat'>
		<td><code><b>dateFormat</b></code></td>
		<td><code>Function(date)</code>
		<td><code>returns YYYY-M-D</code></td>
		<td>you might need to tweak it to suit the format required by the server</td>
	</tr>
</tbody></table>
</section>


<h2 id='imageoverlay-timelocal'>ImageOverlay.TimeLocal</h2>
<p>Inherits ImageOverlay</p>
<p>Used to load a single image from local storage based on the specified time</p>
<pre><code class="language-js">const time = new Date() ;

L.imageOverlay.timeLocal(
	date,
	&quot;tracker_data/chlor_conc_anoms/occci_chlor_conc_anoms_&quot;, 
	&quot;.png&quot;, 
	minus40Bounds,
	{
		attribution: Ocean Colour - CCI&quot;,
		freq: 'monthly',
		alt: 'No data for Chlorophyll Conc for this month'
	}
) 
</code></pre>
<p>time,fileBasePath and fileExtension are used by 'mixin' TimeLocal</p>
<p>Bounds is unchanged from L.ImageOverlay</p>

<h3 id='imageoverlay-timelocal-option'>Options</h3>

<section>


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
		<td><code>Function(date)</code>
		<td><code>returns YYYY-M-D</code></td>
		<td>you might need to tweak it to suit the format required</td>
	</tr>
</tbody></table>
</section>


<h2 id='tilelayer-time'>TileLayer.Time</h2>
<p>Inherits L.TileLayer</p>
<p>Used to load a single image from web (TMS server) based on the specified time. Url must include <code>{time}</code>.</p>
<p>Other options are inherited from L.TileLayer</p>

<h3 id='tilelayer-time-example'>Usage example</h3>

<section>



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


</section>


<h3 id='tilelayer-time-option'>Options</h3>

<section>


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
</section>


<h2 id='tilelayer-wms-time'>TileLayer.WMS.Time</h2>
<p>Inherits L.TileLayer</p>
<p>Used to load a WMS from web based on the specified time. Url must include <code>{time}</code></p>

<h3 id='tilelayer-wms-time-example'>Usage example</h3>

<section>



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


</section>


<h3 id='tilelayer-wms-time-option'>Options</h3>

<section>


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
</section>




</body></html>

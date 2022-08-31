
// Philly map options
var options = {
  zoomSnap: .5,
  center: [40, -75.1],
  zoom: 11.5,
  minZoom: 2,
  zoomControl: false,
  // attributionControl: false
}

// create map
var map = L.map('mapid', options);

// request tiles and add to map
// https://leaflet-extras.github.io/leaflet-providers/preview/
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Stadia
// var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// });
//
// var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// });
//
// var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// });

// change zoom control position
L.control.zoom({
  position: 'bottomleft'
}).addTo(map);

var minTemp = 80;

// example breaks for legend
var breaks = [];
for (var i = 0; i < 6; i++) {
  breaks[i] = minTemp + 5*i;
}
var colorize = chroma.scale(chroma.brewer.YlOrRd).classes(breaks).mode('lab');
drawLegend(breaks, colorize);

var neighborhoodsLayer = L.geoJSON();

// setup slider
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
// Create two timestamps to define a range.
    range: {
        min: 75,
        max: 95
    },

// Steps of one degree
    step: 1,

// handle starting positions.
    start: [minTemp],

    tooltips: [true],

    pips: {
      mode: 'positions',
      values: [0, 25, 50, 75, 100],
      density: 4
    },

// No decimals
    format: {
      to: function (value) {
        return Math.floor(Number(value));
      },
      from: function (value) {
        return Math.floor(Number(value));
      }
    }
});


// update slider
slider.noUiSlider.on('update', function (value) {
  // console.log(value);
  minTemp = +value;
  updateMap(+value);
});



drawMap();


// DRAW MAP FUNCTION
function drawMap() {

  neighborhoodsLayer.addData(neighborhoods)
    .bindTooltip(function (layer) {
      return (minTemp+layer.feature.properties['AvgTempDiff_F']+13.99).toPrecision(3).toString() + " &deg;F";
    }, {
      sticky: true
    })
    .addTo(map);

  neighborhoodsLayer.setStyle(style);

  map.fitBounds(neighborhoodsLayer.getBounds());

  map.on('zoomend', function (e) {
    console.log(map.getZoom());
  })


}   //end drawMap()

function drawLegend(breaks, colorize) {

  var legendControl = L.control({
    position: 'topright'
  });

  legendControl.onAdd = function(map) {

    var legend = L.DomUtil.create('div', 'legend');
    return legend;

  };

  legendControl.addTo(map);

  var legend = document.querySelector('.legend');
  var legendHTML = "<h3>Legend</h3><ul>";

  for (var i = 0; i < breaks.length - 1; i++) {

    var color = colorize(breaks[i], breaks);

    var classRange = '<li><span style="background:' + color + '"></span> ' +
        breaks[i].toLocaleString() + ' &mdash; ' +
        breaks[i + 1].toLocaleString() + '</li>'
    legendHTML += classRange;

  }

  legendHTML += '</ul><p>(Data from SOURCE)</p>';
  legend.innerHTML = legendHTML;

} // end drawLegend()

function updateMap(temp) {

  for (var i = 0; i < 6; i++) {
    breaks[i] = temp + 5*i;
  }
  var colorize = chroma.scale(chroma.brewer.YlOrRd).classes(breaks).mode('lab');

  neighborhoodsLayer.setStyle(style);

  updateLegend(breaks, colorize);

}

function style (feature) {
  // console.log(minTemp+feature.properties['AvgTempDiff_F']+13.99);
  let color = colorize(minTemp+feature.properties['AvgTempDiff_F']+13.99, breaks);
  return {
    opacity: 1,
    weight: 1,
    color: color,
    fillColor: color,
    fillOpacity: .6,
  };
}  // end style()

function updateLegend(breaks, colorize) {
  var legendul = document.querySelector(".legend ul");
  // console.log(legendUl);
  let legendList = "";

  for (var i = 0; i < breaks.length - 1; i++) {

    var color = colorize(breaks[i], breaks);

    var classRange = '<li><span style="background:' + color + ';"></span> ' +
        breaks[i].toLocaleString() + ' &mdash; ' +
        breaks[i + 1].toLocaleString() + '</li>';
    legendList += classRange;

  }

  legendul.innerHTML = legendList;
}

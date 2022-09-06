var minTemp = 80;

// example breaks for legend
var breaks = [];
for (var i = 0; i < 6; i++) {
  breaks[i] = minTemp + 5*i;
}

colors = [
  "#1a9641",
  "#a6d96a",
  "#ffffbf",
  "#fdae61",
  "#d7191c",
]

var style = {
  'version': 8,
  'sources': {
    'raster-tiles': {
      'type': 'raster',
      'tiles': [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      ],
      'tileSize': 256,
      'attribution':
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    'neighborhoods': {
      'type': 'geojson',
      'data': "./data/neighborhoods.json",
      'promoteId': 'GEOID10'
    }
  },
  'layers': [
    {
      'id': 'simple-tiles',
      'type': 'raster',
      'source': 'raster-tiles',
      'minzoom': 0,
      'maxzoom': 19
    },
    {
      'id': 'neighborhoods-fill',
      'type': 'fill',
      'source': 'neighborhoods',
      'paint': {
        'fill-opacity': .6,
        'fill-color': ['case',
          // min difference -13.99034496
          // max difference 7.83785996
          ['<', ['get', 'AvgTempDiff_F'], -10], colors[0],
          ['<', ['get', 'AvgTempDiff_F'], -5], colors[1],
          ['<', ['get', 'AvgTempDiff_F'], 0], colors[2],
          ['<', ['get', 'AvgTempDiff_F'], 5], colors[3],
          colors[4]
        ]
      }
    },
    {
      'id': 'neighborhoods-outline',
      'type': 'line',
      'source': 'neighborhoods',
      'paint': {
        'line-color': ['case',
          // min difference -13.99034496
          // max difference 7.83785996
          ['<', ['get', 'AvgTempDiff_F'], -10], colors[0],
          ['<', ['get', 'AvgTempDiff_F'], -5], colors[1],
          ['<', ['get', 'AvgTempDiff_F'], 0], colors[2],
          ['<', ['get', 'AvgTempDiff_F'], 5], colors[3],
          colors[4]
        ],
        'line-width': 2
      },
      'layout': {

      }
    },
    {
      'id': 'neighborhoods-label',
      'type': 'symbol',
      'source': 'neighborhoods',
      'paint': {
        'text-color': ['case',
          // min difference -13.99034496
          // max difference 7.83785996
          ['<', ['get', 'AvgTempDiff_F'], -10], colors[0],
          ['<', ['get', 'AvgTempDiff_F'], -5], colors[1],
          ['<', ['get', 'AvgTempDiff_F'], 0], colors[2],
          ['<', ['get', 'AvgTempDiff_F'], 5], colors[3],
          colors[4]
        ],
        'text-halo-width': 1,
        'text-halo-color': "#444"
      },
      'layout': {
        'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
        'text-field': ['number-format',
          ['+', ['get','AvgTempDiff_F'], minTemp],
          { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
        ],
        'text-size': 12
      }
    }
  ],
  "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=dFoGksq0UrNkBuFCUsAj"
}

// Philly map options
var options = {
  container: 'mapid',
  style: style,
  center: [-75.1, 40],
  zoom: 10,
  minZoom: 2,
}

// create map
var map = new maplibregl.Map(options);

// Add geolocate control to the map.
map.addControl(
  new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
      trackUserLocation: false
    })
);

// add geocoder for address search
var geocoder_api = {
  forwardGeocode: async (config) => {
    const features = [];
    try {
      let request =
        'https://nominatim.openstreetmap.org/search?q=' +
        config.query +
        '&bounded=1&viewbox=-74,41,-76,39&format=geojson';
      const response = await fetch(request);
      const geojson = await response.json();
      for (let feature of geojson.features) {
        let center = [
          feature.bbox[0] +
          (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] +
          (feature.bbox[3] - feature.bbox[1]) / 2
        ];
        let point = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: center
          },
          place_name: feature.properties.display_name.replace(", United States","").replace(/,\s[^,]*County,/,","),
          properties: feature.properties,
          text: feature.properties.display_name.replace(", United States","").replace(/,\s[^,]*County,/,","),
          place_type: ['place'],
          center: center
        };
        features.push(point);
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return {
    features: features
    };
  }
};
map.addControl(
  new MaplibreGeocoder(geocoder_api, {
    maplibregl: maplibregl,
    bbox: [-74,41,-76,39],
    marker: false,
    showResultMarkers: false
  })
);


// // create search button
//
// // add "random" button
// const buttonTemplate = `<div class="leaflet-search"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg></div><div class="auto-search-wrapper max-height"><input type="text" id="searchInput" autocomplete="off"  aria-describedby="instruction" aria-label="Search ..." /><div id="instruction" class="hidden">When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.</div></div>`;
//
// // create custom button
// const customControl = L.Control.extend({
//   // button position
//   options: {
//     position: "topright",
//     className: "leaflet-autocomplete",
//   },
//
//   // method
//   onAdd: function () {
//     return this._initialLayout();
//   },
//
//   _initialLayout: function () {
//     // create button
//     const container = L.DomUtil.create(
//       "div",
//       "leaflet-bar " + this.options.className
//     );
//
//     L.DomEvent.disableClickPropagation(container);
//
//     container.innerHTML = buttonTemplate;
//
//     return container;
//   },
// });
//
// // adding new button to map controll
// map.addControl(new customControl());
//
// // input element
// const root = document.getElementById("searchInput");
//
// function addClassToParent() {
//   const searchBtn = document.querySelector(".leaflet-search");
//   searchBtn.addEventListener("click", (e) => {
//     // toggle class
//     e.target
//       .closest(".leaflet-autocomplete")
//       .classList.toggle("active-autocomplete");
//
//     // add placeholder
//     root.placeholder = "Search ...";
//
//     // focus on input
//     root.focus();
//
//     // click on clear button
//     clickOnClearButton();
//   });
// }
//
// // function click on clear button
// function clickOnClearButton() {
//   document.querySelector(".auto-clear").click();
// }
//
// addClassToParent();
//
// // function clear input
// map.on("click", () => {
//   document
//     .querySelector(".leaflet-autocomplete")
//     .classList.remove("active-autocomplete");
//
//   clickOnClearButton();
// });
//
// // autocomplete section
// // more config find in https://github.com/tomik23/autocomplete
// // --------------------------------------------------------------
//
// new Autocomplete("searchInput", {
//   delay: 1000,
//   selectFirst: true,
//   howManyCharacters: 2,
//
//   onSearch: function ({ currentValue }) {
//     const api = `https://nominatim.openstreetmap.org/search?bounded=1&viewbox=-74,41,-76,39&format=geojson&limit=5&q=${encodeURI(
//       currentValue
//     )}`;
//     console.log(api);
//
//     /**
//      * Promise
//      */
//     return new Promise((resolve) => {
//       fetch(api)
//         .then((response) => response.json())
//         .then((data) => {
//           resolve(data.features);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     });
//   },
//
//   onResults: ({ currentValue, matches, template }) => {
//     const regex = new RegExp(currentValue, "i");
//     // checking if we have results if we don't
//     // take data from the noResults method
//     return matches === 0
//       ? template
//       : matches
//           .map((element) => {
//             return `
//               <li role="option">
//                 <p>${element.properties.display_name.replace(", United States","")
//                   .replace(/,\s[^,]*County,/,",").replace(
//                   regex,
//                   (str) => `<b>${str}</b>`
//                 )}</p>
//               </li> `;
//           })
//           .join("");
//   },
//
//   onSubmit: ({ object }) => {
//     const { display_name } = object.properties;
//     const cord = object.geometry.coordinates;
//
//     map.setView([cord[1], cord[0]], 15);
//   },
//
//   // the method presents no results
//   noResults: ({ currentValue, template }) =>
//     template(`<li>No results found: "${currentValue}"</li>`),
// });


// drawLegend(breaks, colorize);

// var neighborhoodsLayer = L.geoJSON();

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


class legendControl {
    onAdd(map) {
      this._map = map;
      this._container = document.createElement('div');
      this._container.className = 'maplibregl-ctrl legend';
      let content = '<h3>Legend</h3><ul>';

      for (var i = 0; i < breaks.length - 1; i++) {

        var classRange = '<li><span style="background:' + colors[i] + '"></span> ' +
            breaks[i].toLocaleString() + ' &mdash; ' +
            breaks[i + 1].toLocaleString() + '</li>'
        content += classRange;

      }

      content += '</ul><p>(Data from the <a href="https://phl.maps.arcgis.com/apps/webappviewer/index.html?id=9ef74cdc0c83455c9df031c868083efd" target="_blank">Philadelphia Heat Vulnerability Index</a>)</p>';

      this._container.innerHTML = content;
      return this._container;
    }
    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
}

map.addControl(new legendControl(), 'bottom-left');

map.on("load", function () {

  // update slider
  slider.noUiSlider.on('update', function (value) {
    // console.log(value);
    minTemp = +value;
    updateLegend(+value);
  });

})


// drawMap();


// DRAW MAP FUNCTION
function drawMap() {

  neighborhoodsLayer.addData(neighborhoods).addTo(map);

  neighborhoodsLayer.setStyle(style);

  map.fitBounds(neighborhoodsLayer.getBounds());

  // map.on('zoomend', function () {
  //   console.log(map.getZoom());
  //   if (map.getZoom() < 14) {
  //     neighborhoodsLayer.eachLayer(function (layer) {
  //       layer.closeTooltip();
  //       layer.getTooltip().options.permanent = false;
  //       layer.getTooltip().options.sticky = true;
  //       layer.getTooltip().options.direction = 'auto';
  //       layer.getTooltip().options.className = '';
  //     });
  //   } else {
  //     neighborhoodsLayer.eachLayer(function (layer) {
  //       // console.log(layer.getTooltip());
  //       layer.closeTooltip();
  //       layer.getTooltip().options.permanent = true;
  //       layer.getTooltip().options.sticky = false;
  //       layer.getTooltip().options.direction = 'center';
  //       layer.getTooltip().options.className = 'polyLabel';
  //       layer.openTooltip();
  //     });
  //   }
  // });

}   //end drawMap()

function drawLegend(breaks, colorize) {

  var legendControl = L.control({
    position: 'bottomright'
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

  legendHTML += '</ul><p>(Data from the <a href="https://phl.maps.arcgis.com/apps/webappviewer/index.html?id=9ef74cdc0c83455c9df031c868083efd" target="_blank">Philadelphia Heat Vulnerability Index</a>)</p>';
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

function updateLegend(value) {
  for (var i = 0; i < 6; i++) {
    breaks[i] = value + 5*i;
  }
  var legendul = document.querySelector(".legend ul");
  let legendList = "";

  for (var i = 0; i < breaks.length - 1; i++) {

    var classRange = '<li><span style="background:' + colors[i] + '"></span> ' +
        breaks[i].toLocaleString() + ' &mdash; ' +
        breaks[i + 1].toLocaleString() + '</li>'
    legendList += classRange;

  }

  legendul.innerHTML = legendList;
}

var minTemp = 80;

// example breaks for legend
var breaks = [];
var tempDiff = [];
for (var i = 0; i < 8; i++) {
  tempDiff[i] = -10 + 3.2*i;
  breaks[i] = minTemp + 3.2*i;
}
// console.log(tempDiff);
// console.log(breaks);

colors = [
  "#08519c",
  "#4292c6",
  "#9ecae1",
  "#ffffbf",
  "#fc9272",
  "#ef3b2c",
  "#67000d",
]

// style.sources['neighborhoods'] = {
//       'type': 'geojson',
//       'data': "./data/neighborhoods.json",
//       'promoteId': 'GEOID10'
//     }
//
// style.layers.push({
//       'id': 'neighborhoods-fill',
//       'type': 'fill',
//       'source': 'neighborhoods',
//       'paint': {
//         'fill-opacity': .6,
//         'fill-color': ['case',
//           // min difference -13.99034496
//           // max difference 7.83785996
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
//           colors[6]
//         ]
//       }
//     },
//     {
//       'id': 'neighborhoods-outline',
//       'type': 'line',
//       'source': 'neighborhoods',
//       'paint': {
//         'line-color': ['case',
//           // min difference -13.99034496
//           // max difference 7.83785996
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
//           colors[6]
//         ],
//         'line-width': 2
//       },
//       'layout': {
//
//       }
//     },
//     {
//       'id': 'neighborhoods-label',
//       'type': 'symbol',
//       'source': 'neighborhoods',
//       'paint': {
//         'text-color': ['case',
//           // min difference -13.99034496
//           // max difference 7.83785996
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
//           colors[6]
//         ],
//         'text-halo-width': 1,
//         'text-halo-color': ['case',
//           // min difference -13.99034496
//           // max difference 7.83785996
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], "#fff",
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], "#111",
//           ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], "#111",
//           "#fff"
//         ],
//         'text-halo-blur': 2
//       },
//       'layout': {
//         'text-font': ['Noto Sans Regular'],
//         'text-field': ['number-format',
//           ['+', ['get','AvgTempDiff_F'], minTemp+14],
//           { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
//         ],
//         'text-size': [
//           'interpolate',
//           ['linear'],
//           ['zoom'],
//           10, 12,
//           13, 16,
//           15, 36
//         ],
//         'text-padding': 5
//       }
//     });

var style = {
  'version': 8,
  'sources': {
    'raster-tiles': {
      'type': 'raster',
      'tiles': [
        // 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        // 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png'
        'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png'
        // 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
      ],
      'tileSize': 256,
      'attribution':
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    'neighborhoods': {
      'type': 'geojson',
      'data': "./data/neighborhoods.json",
      'promoteId': 'GEOID10'
    },
    'priority-areas': {
      'type': 'geojson',
      'data': '/data/priority_areas.geojson',
      'promoteId': 'GEOID10',
      'filter': ['!=', ['get', 'Priority_Level'], "Lowest Priority"]
    },
    'parks': {
      'type': 'geojson',
      'data': '/data/parks.json'
    },
    'sites': {
      'type': 'geojson',
      'data': '/data/sites.geojson'
    },
    'area-circles': {
      'type': 'geojson',
      'data': '/data/areas.geojson'
    }
    // 'priority-areas': {
    //   'type': 'vector',
    //   'tiles': ['https://services2.arcgis.com/qjOOiLCYeUtwT7x7/arcgis/rest/services/Priority_Blocks_Azavea_v4/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pbf']
    // }
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
      'id': 'priority-fill',
      'type': 'fill',
      'source': 'priority-areas',
      // 'source-layer': 'priority_map_layer_0325',
      'paint': {
        'fill-color': ['case',
          // ['==', ['get', 'Priority_Level'], "Lowest Priority"], '#fff',
          ['==', ['get', 'Priority_Level'], "Very Low Priority"], '#fff',
          ['==', ['get', 'Priority_Level'], "Low Priority"], '#f4c8a5',
          ['==', ['get', 'Priority_Level'], "Moderate Priority"], '#f2b07e',
          ['==', ['get', 'Priority_Level'], "High Priority"], '#fb8e5c',
          ['==', ['get', 'Priority_Level'], "Very High Priority"], '#f6783e',
          ['==', ['get', 'Priority_Level'], "Highest Priority"], '#f75e22',
          'black'
        ],
        'fill-opacity': ['case',
          // ['==', ['get', 'Priority_Level'], "Lowest Priority"], '#fff',
          ['==', ['get', 'Priority_Level'], "Very Low Priority"], 0,
          ['==', ['get', 'Priority_Level'], "Low Priority"], .5,
          ['==', ['get', 'Priority_Level'], "Moderate Priority"], .5,
          ['==', ['get', 'Priority_Level'], "High Priority"], .5,
          ['==', ['get', 'Priority_Level'], "Very High Priority"], .5,
          ['==', ['get', 'Priority_Level'], "Highest Priority"], .5,
          0
        ]
      },
      'layout': {
        'visibility': 'none'
      }
    },
    {
      'id': 'priority-outline',
      'type': 'line',
      'source': 'priority-areas',
      'minzoom': 13,
      'paint': {
        'line-color': '#f4c8a5',
        'line-width': 1
      },
      'layout': {
        'visibility': 'none'
      }
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
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
          colors[6]
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
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
          colors[6]
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
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
          colors[6]
        ],
        'text-halo-width': 1,
        'text-halo-color': ['case',
          // min difference -13.99034496
          // max difference 7.83785996
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], "#fff",
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], "#111",
          ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], "#111",
          "#fff"
        ],
        'text-halo-blur': 2
      },
      'layout': {
        'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
        'text-field': ['number-format',
          ['+', ['get','AvgTempDiff_F'], minTemp+14],
          { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
        ],
        'text-size': [
          'interpolate',
          ['linear'],
          ['zoom'],
          10, 12,
          13, 16,
          15, 36
        ],
        'text-padding': 5
      }
    },
    {
      'id': 'parks-fill',
      'source': 'parks',
      'type': 'fill',
      'paint': {
        'fill-opacity': .7,
        'fill-color': '#c1c9cc'
      },
      'layout': {
        'visibility': 'none'
      }
    },
    {
      'id': 'parks-label',
      'source': 'parks',
      'type': 'symbol',
      'minzoom': 11,
      'paint': {
        'text-opacity': .7
      },
      'layout': {
        'visibility': 'none',
        'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
        // 'text-allow-overlap': true,
        'text-field': ['get', 'PUBLIC_NAM'],
        'text-size': 8
      }
    },
    {
      'id': 'staff-circle',
      'source': 'sites',
      'type': 'circle',
      'paint': {
        'circle-radius': ['+',
          ['*', ['get', 'Staff FT (program and maintenance)'], 4], 3
        ],
        'circle-color': 'green',
        'circle-opacity': .4
      },
      'layout': {
        'visibility': 'none'
      }
    },
    {
      'id': 'staff-label',
      'source': 'sites',
      'type': 'symbol',
      'paint': {

      },
      'layout': {
        'visibility': 'none',
        'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
        // 'text-allow-overlap': true,
        'text-field': ['get', 'Staff FT (program and maintenance)'],
        'text-size': 10
      }
    },
    {
      'id': 'area-circles',
      'source': 'area-circles',
      'type': 'line',
      'paint': {
        'line-blur': 3,
        'line-width': 3,
        'line-dasharray': [1, 3]
      },
      'layout': {
        'line-cap': 'round'
      }
    }
  ],
  "glyphs": "/fonts/{fontstack}/{range}.pbf"
}

// Philly map options
var options = {
  container: 'mapid',
  // style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
  style: style,
  center: [-75.1, 40],
  zoom: 10,
  minZoom: 2,
}

// create map
var map = new maplibregl.Map(options);

var layers = {
  temp: ['neighborhoods-fill', 'neighborhoods-outline', 'neighborhoods-label'],
  canopy: ['priority-fill', 'priority-outline', 'parks-fill', 'parks-label'],
  staff: ['staff-circle', 'staff-label']
};

const markers = {};

var areas = {
  'west': {
    'name': 'West',
    'coords': [-75.23445, 39.96800]
  },
  'southwest': {
    'name': 'Southwest',
    'coords': [-75.22413, 39.93047]
  },
  'south': {
    'name': 'South',
    'coords': [-75.16854, 39.92882]
  },
  'north': {
    'name': 'North',
    'coords': [-75.16434, 40.00416]
  },
  'kensington-harrowgate': {
    'name': 'Kensington / Harrowgate',
    'coords': [-75.10748, 39.99918]
  },
  'northwest': {
    'name': 'Northwest',
    'coords': [-75.15183, 40.05226]
  },
  'northeast': {
    'name': 'Northeast',
    'coords': [-75.10122, 40.03676]
  }
}

var priorityLegend = [
  ["Low", '#f4c8a5'],
  ["Moderate", '#f2b07e'],
  ["High", '#fb8e5c'],
  ["Very High", '#f6783e'],
  ["Highest", '#f75e22']
];


var activeChapterName = 'intro'; //Change this to match the first chapter of your story

var mapDefault = {
        bearing: 0,
        center: [-75.1, 40],
        zoom: 10,
      }

var chapters = {
    // 'program-staff': {
    //   mapOptions: mapDefault,
    //   mapFunction: drawStaff,
    //   layout: "side-by-side"
    // },
    'temperature-map': {
      mapOptions: mapDefault,
      mapFunction: showTemperatureMap,
      layout: "side-by-side"
    },
    'priority-canopy': {
      mapOptions: mapDefault,
      mapFunction: drawPriorityAreas
    },
    'west': {
      mapOptions: {
        bearing: 0,
        center: [-75.23445, 39.96800],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    'southwest': {
      mapOptions: {
        bearing: 0,
        center: [-75.22413, 39.93047],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    'south': {
      mapOptions: {
        bearing: 0,
        center: [-75.16854, 39.92882],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    'north': {
      mapOptions: {
        bearing: 0,
        center: [-75.16434, 40.00416],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    'kensington-harrowgate': {
      mapOptions: {
        bearing: 0,
        center: [-75.10748, 39.99918],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    'northwest': {
      mapOptions: {
        bearing: 0,
        center: [-75.15183, 40.05226],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    'northeast': {
      mapOptions: {
        bearing: 0,
        center: [-75.10122, 40.03676],
        zoom: 12,
      },
      mapFunction: drawPriorityAreas
    },
    // 'operations': {
    //   mapOptions: mapDefault
    // }
};

map.on('load', () => {
  //var service;



  //Function to run the story
  // On every scroll event, check which element is on screen
  window.onscroll = function() {
      var chapterNames = Object.keys(chapters);
      for (var i = 0; i < chapterNames.length; i++) {
          var chapterName = chapterNames[i];
          if (isElementOnScreen(chapterName)) {
              setActiveChapter(chapterName);
              break;
          }
      }
  };


})




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
    showResultMarkers: false,
    placeholder: "Search Address"
  })
);

// Navigation control
var nav = new maplibregl.NavigationControl({showCompass: false});
map.addControl(nav, 'top-right');

// Add geolocate control to the map.
map.addControl(
  new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
      trackUserLocation: false
    })
);

// setup legend
const legendTitle = document.createElement('h3');
const sourceP = document.createElement('p');
var legendSorce = '';
class legendControl {
    onAdd(map) {
      this._map = map;
      this._container = document.createElement('div');
      this._container.className = 'maplibregl-ctrl legend-ctrl';
      this._container.id = 'legend-ctrl'

      this._container.insertAdjacentHTML("afterbegin",`<input type="checkbox" class="openLegend" id="openLegend" checked>
			  <label for="openLegend" class="legendIconToggle">
			    <div class="spinner diagonal part-1"></div>
			    <div class="spinner horizontal"></div>
			    <div class="spinner diagonal part-2"></div>
			  </label>`)

      const containerDiv = document.createElement('div');
      containerDiv.id = "legend-contents";

      const uiDiv = document.createElement('div');
      uiDiv.classList = "ui-controls";

      const slider = document.createElement('div');
      slider.id = "slider";
      uiDiv.appendChild(slider);

      noUiSlider.create(slider, {
      // Create two timestamps to define a range.
          range: {
              min: 75,
              max: 95
          },

          orientation: 'vertical',
          direction: 'rtl',
          connect: 'lower',

      // Steps of one degree
          step: 1,

      // handle starting positions.
          start: [minTemp],

          tooltips: [true],

          // pips: {
          //   mode: 'positions',
          //   values: [0, 25, 50, 75, 100],
          //   density: 4
          // },

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

      const legendDiv = document.createElement('div');
      legendDiv.classList = "legend"
      let content = `<ul>`;

      for (var i = 0; i < breaks.length - 1; i++) {

        var classRange = '<li><span style="background:' + colors[i] + '"></span> ' +
            breaks[i].toLocaleString() + '&ndash;' +
            breaks[i + 1].toLocaleString() + '</li>'
        content += classRange;

      }

      content += '</ul>';
      legendDiv.innerHTML = content;

      legendTitle.innerText = "High Temperature";
      containerDiv.appendChild(legendTitle);
      const sliderDesc = document.createElement('p');
      sliderDesc.innerText = "Set the high temperature for the coolest neighborhood:";
      containerDiv.appendChild(sliderDesc);

      containerDiv.appendChild(uiDiv)
      containerDiv.appendChild(legendDiv)

      sourceP.innerHTML = `(Data from the <a href="https://phl.maps.arcgis.com/apps/webappviewer/index.html?id=9ef74cdc0c83455c9df031c868083efd" target="_blank">Philadelphia Heat Vulnerability Index</a>)`
      containerDiv.appendChild(sourceP)

      this._container.appendChild(containerDiv)
      return this._container;
    }
    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
}

map.addControl(new legendControl(), 'bottom-left');

map.on("load", function () {
  var slider = document.getElementById('slider')

  // update slider
  slider.noUiSlider.on('update', function (value) {

    // console.log(value);
    minTemp = +value;

    updateLegend(+value);
  });

  slider.noUiSlider.on('set', function (value) {
    map.setLayoutProperty('neighborhoods-label', 'text-field',
    ['number-format',
      ['+', ['get','AvgTempDiff_F'], +value+14],
      { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
    ])


  });

})

function updateLegend(value) {

  for (var i = 0; i < 8; i++) {
    breaks[i] = value + 3.2*i;
  }
  var legendul = document.querySelector(".legend ul");
  let legendList = "";

  for (var i = 0; i < breaks.length - 1; i++) {

    var classRange = '<li><span style="background:' + colors[i] + '"></span> ' +
        breaks[i].toLocaleString() + '&ndash;' +
        breaks[i + 1].toLocaleString() + '</li>'
    legendList += classRange;

  }

  legendul.innerHTML = legendList;
}

function priorityLegendDraw() {

  document.getElementById('legend-ctrl').style.display = '';
  document.querySelector(".ui-controls").style.display = 'none';

  var legendul = document.querySelector(".legend ul");
  let legendList = "";

  legendTitle.innerText = "Priority Levels";

  for (var i = 0; i < priorityLegend.length; i++) {

    var classDesc = '<li><span style="background:' + priorityLegend[i][1] + '"></span> ' +
        priorityLegend[i][0] + '</li>'
    legendList += classDesc;

  }

  legendul.innerHTML = legendList;
  document.getElementById('legend-contents').classList = 'canopy';

  document.querySelector('input[type="checkbox"]:checked ~ label').classList = 'legendIconToggle canopy';
  // if (document.querySelector('input[type="checkbox"]:checked ~ #legend-contents') != null) {
  //   document.querySelector('input[type="checkbox"]:checked ~ #legend-contents').style.transform = "translateY(-160px)";
  //   document.querySelector('input[type="checkbox"]:checked ~ label').style.transform = "translateY(-160px)";
  // }
  // input[type="checkbox"]:checked ~ #legend-contents {
  //     transform: translateY(-210px);
  // }
  //
  // input[type="checkbox"]:checked ~ label {
  //     transform: translateY(-210px);
  // }

} // end priorityLegendDraw()

function showTemperatureMap() {
  // add temperature layers
  changeVisibility('temp', 'visible');

  // reset legend
  document.querySelector(".ui-controls").style.display = '';
  legendTitle.innerText = "High Temperature";
  updateLegend(document.getElementById('slider').noUiSlider.get());
  document.getElementById('legend-ctrl').style.display = '';

  document.getElementById('legend-contents').classList = 'temps';

  document.querySelector('input[type="checkbox"]:checked ~ label').classList = 'legendIconToggle temps';


  // if (document.querySelector('input[type="checkbox"]:checked ~ #legend-contents') != null) {
  //   document.querySelector('input[type="checkbox"]:checked ~ #legend-contents').style.transform = "translateY(-210px)";
  //   document.querySelector('input[type="checkbox"]:checked ~ label').style.transform = "translateY(-210px)";
  // }


  if (map.getSource('priority-areas')) {
    changeVisibility('canopy', 'none');
    changeVisibility('staff', 'none');
    // service.disableRequests();
  }

  // console.log(markers);
  // removeMarkers();

} // end showTemperatureMap()

function drawPriorityAreas() {
  // remove temperature layers
  changeVisibility('temp', 'none');
  changeVisibility('staff', 'none');

  priorityLegendDraw();
  // map.setLayoutProperty('neighborhoods-fill', 'visibility', 'none');
  // map.setLayoutProperty('neighborhoods-outline', 'visibility', 'none');
  // map.setLayoutProperty('neighborhoods-label', 'visibility', 'none');

  const prioritySourceId = 'priority-areas';


  // console.log(markers);
  // removeMarkers();

  if (!map.getSource(prioritySourceId)) {

    // map.addSource('parks', {
    //   type: 'geojson',
    //   data:
    // })

      // service = new FeatureService(prioritySourceId, map, {
      //   url: 'https://services2.arcgis.com/qjOOiLCYeUtwT7x7/arcgis/rest/services/Priority_Blocks_Azavea_v4/FeatureServer/0',
      //   simplifyFactor: 0,
      //   precision: 5,
      //   where: "Priority_Level IN ('Moderate Priority', 'High Priority', 'Very High Priority', 'Highest Priority')"
      // })
      // //
      // console.log(service);

      // map.on('click', 'priority-fill', (e) => {
      //   console.log(e.features);
      // })


  } else {
    changeVisibility('canopy', 'visible');

    // map.setLayoutProperty('priority-fill', 'visibility', 'visible');
    // map.setLayoutProperty('priority-outline', 'visibility', 'visible');
    // service.enableRequests();

    // console.log(markers);
    // console.log(areas);
    // for (var area in areas) {
    //   if (!markers.hasOwnProperty(area)) {
    //     // console.log(area);
    //     // console.log(areas[area]);
    //     var markerEl = document.createElement('div');
    //     markerEl.classList = 'marker'
    //     markerEl.innerHTML = `<h4>${areas[area].name}</h4>`;
    //
    //     let marker = markers[area]
    //     marker = markers[area] = new maplibregl.Marker({
    //       element: markerEl
    //     }).setLngLat(areas[area].coords)
    //       .addTo(map);
    //
    //     markerEl.addEventListener('click', function(e) {
    //       console.log(area);
    //       document.getElementById(area).scrollIntoView({ behavior: "smooth", inline: "start" });
    //     })
    //
    //   } else {
    //     markers[area].addTo(map);
    //   }
    // }

  }
  // console.log(markers);

}  // end drawPriorityAreas()

function drawStaff() {

  // hide legend
  document.getElementById('legend-ctrl').style.display = 'none';

  // removeMarkers();
  changeVisibility('staff', 'visible');

  // remove temperature and canopy layers
  changeVisibility('temp', 'none');
  changeVisibility('canopy', 'none');


} // end drawStaff()

function changeVisibility(cat, viz) {
  layers[cat].forEach((l, i) => {
    map.setLayoutProperty(l, 'visibility', viz);
  });
}

function removeMarkers() {
  for (const id in markers) {
      markers[id].remove();
  }
}

function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName].mapOptions);

    if (chapters[chapterName].mapFunction) {
      chapters[chapterName].mapFunction.call();
    }

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}
//End of function to run the story

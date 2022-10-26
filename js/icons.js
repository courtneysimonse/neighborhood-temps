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

amenityFilter = ["basketball",
      "water",
      "swimming",
      "tennis",
      "soccer",
      "baseball",
      "playground",
      "school",
      "picnic-sites",
      "harbor",
      "garden"
    ];

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
        `<a href="https://www.stadiamaps.com/">&copy; Stadia Maps</a>
        <a href="https://openmaptiles.org/">&copy; OpenMapTiles</a>
        <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap contributors</a>.`
    },
    'neighborhoods': {
      'type': 'geojson',
      'data': "./data/neighborhoods.json",
      'promoteId': 'GEOID10'
    },
    'park-amenities': {
      'type': 'geojson',
      'data': './data/ppr_datapts.geojson',
      'generateId': true,
      'filter': ["any",
          ["==", ["get", "YEAR"], 2022],
          ["==", ["get", "YEAR"], null]
        ]
    },
    'trails': {
      'type': 'geojson',
      'data': './data/ppr_lines.geojson'
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
      'id': 'park-amenities',
      'type': 'symbol',
      'source': 'park-amenities',
      'filter': ["==", ["get", "icon"], amenityFilter[0]],
      'layout': {
        'icon-image': "{icon}",
        'icon-size': 1,
        'icon-padding': 0,
        'icon-allow-overlap': true,
        'symbol-sort-key': ["get", "sort"]
        // 'symbol-z-order': 'viewport-y'
      },
      'paint': {
        // 'icon-color': 'green',
        // 'icon-opacity': ["case",
        //     ["boolean", ["feature-state", 'visible'], false],
        //     1,
        //     0
        //   ]
      }
    },
    {
      'id': 'trails',
      'type': 'line',
      'source': 'trails',
      'paint': {
        'line-width': .5,
        'line-color': 'green',
        'line-dasharray': [10,2]
      },
      'layout': {

      }
    }
    // {
    //   'id': 'neighborhoods-fill',
    //   'type': 'fill',
    //   'source': 'neighborhoods',
    //   'paint': {
    //     'fill-opacity': .6,
    //     'fill-color': ['case',
    //       // min difference -13.99034496
    //       // max difference 7.83785996
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
    //       colors[6]
    //     ]
    //   }
    // },
    // {
    //   'id': 'neighborhoods-outline',
    //   'type': 'line',
    //   'source': 'neighborhoods',
    //   'paint': {
    //     'line-color': ['case',
    //       // min difference -13.99034496
    //       // max difference 7.83785996
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
    //       colors[6]
    //     ],
    //     'line-width': 2
    //   },
    //   'layout': {
    //
    //   }
    // },
    // {
    //   'id': 'neighborhoods-label',
    //   'type': 'symbol',
    //   'source': 'neighborhoods',
    //   'paint': {
    //     'text-color': ['case',
    //       // min difference -13.99034496
    //       // max difference 7.83785996
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[0]], colors[0],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], colors[1],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], colors[2],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[3]], colors[3],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], colors[4],
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[5]], colors[5],
    //       colors[6]
    //     ],
    //     'text-halo-width': 1,
    //     'text-halo-color': ['case',
    //       // min difference -13.99034496
    //       // max difference 7.83785996
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[1]], "#fff",
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[2]], "#111",
    //       ['<', ['get', 'AvgTempDiff_F'], tempDiff[4]], "#111",
    //       "#fff"
    //     ],
    //     'text-halo-blur': 2
    //   },
    //   'layout': {
    //     'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
    //     'text-field': ['number-format',
    //       ['+', ['get','AvgTempDiff_F'], minTemp+14],
    //       { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
    //     ],
    //     'text-size': [
    //       'interpolate',
    //       ['linear'],
    //       ['zoom'],
    //       10, 12,
    //       13, 16,
    //       15, 36
    //     ],
    //     'text-padding': 5
    //   }
    // }
  ],
  "glyphs": "/fonts/{fontstack}/{range}.pbf",
  "sprite": "https://stunning-choux-3558b1.netlify.app/sprites/sprites"
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


var numAmenities = 1;
map.on("load", function () {

  console.log(map.getLayer('park-amenities'));

  setInterval(setFilter, 2000);

});

function setFilter() {

  var newFilter = [];
  newFilter.push("any");

  for (var i = 0; i < numAmenities; i++) {
    newFilter.push(["==", ["get", "icon"], amenityFilter[i]])
  }

  map.setFilter('park-amenities', newFilter);

  numAmenities++;

  if (numAmenities == amenityFilter.length) {
    numAmenities = 0;
  }
}

// function updateLegend(value) {
//   for (var i = 0; i < 8; i++) {
//     breaks[i] = value + 3.2*i;
//   }
//   var legendul = document.querySelector(".legend ul");
//   let legendList = "";
//
//   for (var i = 0; i < breaks.length - 1; i++) {
//
//     var classRange = '<li><span style="background:' + colors[i] + '"></span> ' +
//         breaks[i].toLocaleString() + '&ndash;' +
//         breaks[i + 1].toLocaleString() + '</li>'
//     legendList += classRange;
//
//   }
//
//   legendul.innerHTML = legendList;
// }

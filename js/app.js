var minTemp = 80;

// example breaks for legend
var breaks = [];
for (var i = 0; i < 6; i++) {
  breaks[i] = minTemp + 5*i;
}

colors = [
  "#4575b4",
  "#74add1",
  "#ffffbf",
  "#e27b63",
  "#a50026",
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
        'text-halo-color': ['case',
          // min difference -13.99034496
          // max difference 7.83785996
          ['<', ['get', 'AvgTempDiff_F'], -10], "#fff",
          ['<', ['get', 'AvgTempDiff_F'], -5], "#111",
          ['<', ['get', 'AvgTempDiff_F'], 0], "#111",
          ['<', ['get', 'AvgTempDiff_F'], 5], "#111",
          "#fff"
        ],
        'text-halo-blur': 2
      },
      'layout': {
        'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
        'text-field': ['number-format',
          ['+', ['get','AvgTempDiff_F'], minTemp],
          { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
        ],
        'text-size': 12,
        'text-padding': 5
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

  slider.noUiSlider.on('set', function (value) {
    map.setLayoutProperty('neighborhoods-label', 'text-field',
    ['number-format',
      ['+', ['get','AvgTempDiff_F'], minTemp],
      { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
    ])
  });

})

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

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

var style = {
  'version': 8,
  'sources': {
    'raster-tiles': {
      'type': 'raster',
      'tiles': [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        // 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png'
        // 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png'
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
    }
  ],
  "glyphs": "/fonts/{fontstack}/{range}.pbf"
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

document.getElementsByClassName('noUi-tooltip')[0].classList.add('hidden');


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

var initialize = false;

map.on("load", function () {

  // update slider
  slider.noUiSlider.on('update', function (value) {

    if (initialize == true) {
      document.getElementsByClassName('noUi-tooltip')[0].classList.remove('hidden');
    } else {
      initialize = true;
    }

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

    document.getElementsByClassName('noUi-tooltip')[0].classList.add('hidden');

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
        breaks[i].toLocaleString() + ' &mdash; ' +
        breaks[i + 1].toLocaleString() + '</li>'
    legendList += classRange;

  }

  legendul.innerHTML = legendList;
}

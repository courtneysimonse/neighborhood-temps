import { minTemp, tempDiff, colors } from "./constants.js";


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
        'data': "../data/neighborhoods.json",
        'promoteId': 'GEOID10'
      },
      'park-amenities': {
        'type': 'geojson',
        'data': '../data/ppr_datapts_2022.geojson',
        'generateId': true,
        'filter': ["any",
            ["==", ["get", "YEAR"], "2022"],
            ["==", ["get", "YEAR"], null]
          ],
        // 'attribution': `Swing by Emfahmin from <a href="https://thenounproject.com/browse/icons/term/swing/" target="_blank" title="Swing Icons">Noun Project</a>`
      },
      'trails': {
        'type': 'geojson',
        'data': '../data/ppr_lines.geojson'
      },
      'parks': {
        'type': 'geojson',
        'data': '../data/parks.json'
      },
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
          // 'visibility': 'none'
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
          // 'visibility': 'none',
          'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
          // 'text-allow-overlap': true,
          'text-field': ['get', 'PUBLIC_NAM'],
          'text-size': 8
        }
      },
      {
        'id': 'park-amenities',
        'type': 'symbol',
        'source': 'park-amenities',
        // 'filter': ["==", ["get", "icon"], amenityFilter[0]],
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
      },

    ],
    "glyphs": "/fonts/{fontstack}/{range}.pbf",
    "sprite": "https://stunning-choux-3558b1.netlify.app/sprites/sprite"
  }

  export default style
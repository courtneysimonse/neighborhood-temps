import { minTemp, tempDiff, colors } from "./constants.js";


var style = {
    'version': 8,
    'sources': {
      'openmaptiles': {
        'type': 'vector',
        'url': 'https://tiles.stadiamaps.com/data/openmaptiles.json'
      },
      'neighborhoods': {
        'type': 'geojson',
        'data': "../data/neighborhoods.geojson",
        'promoteId': 'GEOID10'
      },
      'tracts': {
        'type': 'geojson',
        'data': "../data/tracts.geojson",
        'promoteId': 'GEOID10'
      },
      'park-amenities': {
        'type': 'geojson',
        'data': '../data/ppr_datapts_2022.geojson',
        'generateId': true,
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
        "id": "background",
        "paint": {
          "background-color": "rgb(242,243,240)"
        },
        "type": "background"
      },
      {
        "filter": [
          "==",
          "$type",
          "Polygon"
        ],
        "id": "park_fill",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "fill-color": "rgb(230, 233, 229)"
        },
        "source": "openmaptiles",
        "source-layer": "park",
        "type": "fill"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "==",
            "subclass",
            "ice_shelf"
          ]
        ],
        "id": "landcover_ice_shelf",
        "layout": {
          "visibility": "visible"
        },
        "maxzoom": 8,
        "paint": {
          "fill-color": "hsl(0, 0%, 97%)",
          "fill-opacity": 0.7
        },
        "source": "openmaptiles",
        "source-layer": "landcover",
        "type": "fill"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "==",
            "subclass",
            "glacier"
          ]
        ],
        "id": "landcover_glacier",
        "layout": {
          "visibility": "visible"
        },
        "maxzoom": 8,
        "paint": {
          "fill-color": "hsl(0, 0%, 98%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                0,
                1
              ],
              [
                8,
                0.5
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "landcover",
        "type": "fill"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "==",
            "class",
            "residential"
          ]
        ],
        "id": "landuse_residential",
        "layout": {
          "visibility": "visible"
        },
        "maxzoom": 16,
        "paint": {
          "fill-color": "hsl(60, 8%, 92%)",
          "fill-opacity": {
            "base": 0.6,
            "stops": [
              [
                8,
                0.8
              ],
              [
                9,
                0.6
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "landuse",
        "type": "fill"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "==",
            "class",
            "wood"
          ]
        ],
        "id": "landcover_wood",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 10,
        "paint": {
          "fill-color": "rgb(220,224,220)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                8,
                0
              ],
              [
                12,
                1
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "landcover",
        "type": "fill"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "==",
            "subclass",
            "park"
          ]
        ],
        "id": "landcover_park",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 10,
        "paint": {
          // "fill-color": "rgb(210,224,210)",
          "fill-color": "#c1c9cc",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                8,
                0
              ],
              [
                12,
                0.8
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "landcover",
        "type": "fill"
      },
      {
        "filter": [
          "==",
          "admin_level",
          4
        ],
        "id": "boundary_state",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-blur": 0.4,
          "line-color": "rgb(230, 204, 207)",
          "line-dasharray": [
            2,
            2
          ],
          "line-opacity": 1,
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                3,
                1
              ],
              [
                22,
                15
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "boundary",
        "type": "line"
      },
      {
        "filter": [
          "==",
          "admin_level",
          2
        ],
        "id": "boundary_country",
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-blur": {
            "base": 1,
            "stops": [
              [
                0,
                0.4
              ],
              [
                22,
                4
              ]
            ]
          },
          "line-color": "rgb(230, 204, 207)",
          "line-opacity": 1,
          "line-width": {
            "base": 1.1,
            "stops": [
              [
                3,
                1
              ],
              [
                22,
                20
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "boundary",
        "type": "line"
      },
      {
        "filter": [
          "==",
          "$type",
          "Polygon"
        ],
        "id": "water",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "fill-antialias": true,
          "fill-color": "#c1c9cc"
        },
        "source": "openmaptiles",
        "source-layer": "water",
        "type": "fill"
      },
      {
        "filter": [
          "==",
          "$type",
          "LineString"
        ],
        "id": "waterway",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsl(195, 17%, 78%)"
        },
        "source": "openmaptiles",
        "source-layer": "waterway",
        "type": "line"
      },
      {
        "filter": [
          "==",
          "$type",
          "Polygon"
        ],
        "id": "building",
        "minzoom": 12,
        "paint": {
          "fill-antialias": true,
          "fill-color": "hsl(95, 5%, 84%)",
          "fill-outline-color": "rgb(219, 219, 218)"
        },
        "source": "openmaptiles",
        "source-layer": "building",
        "type": "fill"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "brunnel",
              "tunnel"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ]
        ],
        "id": "tunnel_motorway_casing",
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "minzoom": 6,
        "paint": {
          "line-color": "rgb(212, 212, 212)",
          "line-opacity": 1,
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                5.8,
                0
              ],
              [
                6,
                3
              ],
              [
                20,
                35
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "brunnel",
              "tunnel"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ]
        ],
        "id": "tunnel_motorway_inner",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 6,
        "paint": {
          "line-color": "rgb(234,234,234)",
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                4,
                2
              ],
              [
                6,
                1.3
              ],
              [
                20,
                30
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "class",
            "path",
            "footway",
            "construction"
          ]
        ],
        "id": "highway_path",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsl(0, 0%, 91%)",
          "line-opacity": 0.9,
          "line-width": {
            "base": 1.2,
            "stops": [
              [
                13,
                1
              ],
              [
                20,
                10
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "class",
            "minor",
            "service",
            "track"
          ]
        ],
        "id": "highway_minor",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 8,
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(0, 0%, 86%)"
              ],
              [
                12,
                "hsl(0, 0%, 86%)"
              ],
              [
                13,
                "hsl(0, 0%, 81%)"
              ],
              [
                16,
                "hsl(0, 0%, 80%)"
              ]
            ]
          },
          "line-opacity": 0.9,
          "line-width": {
            "base": 1.55,
            "stops": [
              [
                13,
                1
              ],
              [
                18,
                8
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "class",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ]
        ],
        "id": "highway_major_casing",
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "minzoom": 12,
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-dasharray": [
            12,
            0
          ],
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                10,
                3
              ],
              [
                20,
                20
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "class",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ]
        ],
        "id": "highway_major_inner",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 12,
        "paint": {
          "line-color": "#efefef",
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                10,
                2
              ],
              [
                20,
                18
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "class",
            "primary",
            "secondary",
            "tertiary",
            "trunk"
          ]
        ],
        "id": "highway_major_subtle",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "maxzoom": 12,
        "paint": {
          "line-color": "hsla(0, 0%, 85%, 0.69)",
          "line-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "brunnel",
              "bridge",
              "tunnel"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ]
        ],
        "id": "highway_motorway_casing",
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "minzoom": 6,
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-dasharray": [
            2,
            0
          ],
          "line-opacity": 1,
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                5.8,
                0
              ],
              [
                6,
                3
              ],
              [
                20,
                30
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "brunnel",
              "bridge",
              "tunnel"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ]
        ],
        "id": "highway_motorway_inner",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 6,
        "paint": {
          "line-color": "#efefef",
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                4,
                2
              ],
              [
                6,
                1.3
              ],
              [
                20,
                25
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ],
        "id": "highway_motorway_subtle",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "maxzoom": 6,
        "paint": {
          "line-color": "hsla(0, 0%, 85%, 0.53)",
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                4,
                0.75
              ],
              [
                5,
                1.5
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "rail"
            ],
            [
              "has",
              "service"
            ]
          ]
        ],
        "id": "railway_service",
        "layout": {
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 16,
        "paint": {
          "line-color": "#ddd",
          "line-width": 3
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "class",
            "rail"
          ],
          [
            "has",
            "service"
          ]
        ],
        "id": "railway_service_dashline",
        "layout": {
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 16,
        "paint": {
          "line-color": "#fafafa",
          "line-dasharray": [
            3,
            3
          ],
          "line-width": 2
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!has",
              "service"
            ],
            [
              "==",
              "class",
              "rail"
            ]
          ]
        ],
        "id": "railway",
        "layout": {
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 13,
        "paint": {
          "line-color": "#ddd",
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                16,
                3
              ],
              [
                20,
                7
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "id": "railway_dashline",
        "paint": {
          "line-color": "#fafafa",
          "line-dasharray": [
            3,
            3
          ],
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                16,
                2
              ],
              [
                20,
                6
              ]
            ]
          }
        },
        "ref": "railway"
      },
      {
        "filter": [
          "==",
          "$type",
          "LineString"
        ],
        "id": "aeroway_line",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "line-color": "#ddd"
        },
        "source": "openmaptiles",
        "source-layer": "aeroway",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "brunnel",
              "bridge"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ]
        ],
        "id": "highway_motorway_bridge_casing",
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "minzoom": 6,
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-dasharray": [
            2,
            0
          ],
          "line-opacity": 1,
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                5.8,
                0
              ],
              [
                6,
                5
              ],
              [
                20,
                35
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "brunnel",
              "bridge"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ]
        ],
        "id": "highway_motorway_bridge_inner",
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "minzoom": 6,
        "paint": {
          "line-color": "#efefef",
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                4,
                2
              ],
              [
                6,
                1.3
              ],
              [
                20,
                30
              ]
            ]
          }
        },
        "source": "openmaptiles",
        "source-layer": "transportation",
        "type": "line"
      },
      {
        "filter": [
          "all",
          [
            "!in",
            "class",
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary"
          ],
          [
            "==",
            "$type",
            "LineString"
          ]
        ],
        "id": "highway_name_other",
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-spacing": 350,
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                " ",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-max-angle": 30,
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "map",
          "text-size": 12,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#888",
          "text-halo-blur": 1,
          "text-halo-color": "#fefefe",
          "text-halo-width": 2,
          "text-translate": [
            0,
            0
          ]
        },
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "type": "symbol"
      },
      {
        "filter": [
          "==",
          "$type",
          "LineString"
        ],
        "id": "water_name_line",
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-spacing": 500,
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Italic"
          ],
          "text-letter-spacing": 0.25,
          "text-line-height": 1.55,
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "map",
          "text-size": 14
        },
        "paint": {
          "text-color": "#999",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "water_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "!in",
            "class",
            "ocean"
          ]
        ],
        "id": "water_name_nonocean",
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "point",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Italic"
          ],
          "text-letter-spacing": 0.1,
          "text-line-height": 1.55,
          "text-size": {
            "stops": [
              [
                0,
                14
              ],
              [
                6,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-color": "#999",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 2
        },
        "source": "openmaptiles",
        "source-layer": "water_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "==",
            "class",
            "ocean"
          ]
        ],
        "id": "water_name_ocean",
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "point",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Italic"
          ],
          "text-letter-spacing": 0.2,
          "text-line-height": 1.55,
          "text-size": 18
        },
        "paint": {
          "text-color": "#999",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 2
        },
        "source": "openmaptiles",
        "source-layer": "water_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "in",
            "class",
            "park"
          ],
          [
            "<=",
            "rank",
            3
          ],
          [
            "==",
            "$type",
            "Point"
          ]
        ],
        "id": "poi_gen1",
        "layout": {
          "symbol-avoid-edges": true,
          "text-anchor": "center",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "center",
          "text-line-height": 1.55,
          "text-size": 14,
          "visibility": "visible"
        },
        "minzoom": 15,
        "paint": {
          "text-color": "#aaa",
          "text-halo-blur": 1,
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "text-translate": [
            0,
            0
          ]
        },
        "source": "openmaptiles",
        "source-layer": "poi",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "subclass",
            "park"
          ],
          [
            "==",
            "rank",
            1
          ],
          [
            "==",
            "$type",
            "Point"
          ]
        ],
        "id": "poi_gen0_parks",
        "layout": {
          "symbol-avoid-edges": true,
          "text-anchor": "center",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "center",
          "text-line-height": 1.55,
          "text-size": 14,
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#aaa",
          "text-halo-blur": 1,
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "text-translate": [
            0,
            0
          ]
        },
        "source": "openmaptiles",
        "source-layer": "poi",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "in",
            "subclass",
            "university",
            "hospital"
          ],
          [
            "<=",
            "rank",
            3
          ],
          [
            "==",
            "$type",
            "Point"
          ]
        ],
        "id": "poi_gen0_other",
        "layout": {
          "symbol-avoid-edges": true,
          "text-anchor": "center",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "center",
          "text-line-height": 1.55,
          "text-size": 14,
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#aaa",
          "text-halo-blur": 1,
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "text-translate": [
            0,
            0
          ]
        },
        "source": "openmaptiles",
        "source-layer": "poi",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "!in",
            "class",
            "city",
            "suburb",
            "town",
            "village"
          ],
          [
            "==",
            "$type",
            "Point"
          ]
        ],
        "id": "place_other",
        "layout": {
          "symbol-avoid-edges": true,
          "text-anchor": "center",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "center",
          "text-letter-spacing": 0.1,
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0
          ],
          "text-padding": {
            "base": 1,
            "stops": [
              [
                11,
                10
              ],
              [
                12,
                2
              ]
            ]
          },
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                10
              ],
              [
                14,
                12
              ]
            ]
          },
          "visibility": "visible"
        },
        "maxzoom": 14,
        "minzoom": 11,
        "paint": {
          "text-color": "hsl(214.3, 11.3%, 70%)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 2
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "in",
            "class",
            "trunk",
            "primary",
            "secondary",
            "tertiary"
          ],
          [
            "==",
            "$type",
            "LineString"
          ]
        ],
        "id": "highway_name_major",
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-spacing": 350,
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                " ",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-line-height": 1.55,
          "text-max-angle": 30,
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "map",
          "text-size": 13,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#777",
          "text-halo-blur": 1,
          "text-halo-color": "#fefefe",
          "text-halo-width": 2,
          "text-translate": [
            0,
            0
          ]
        },
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "<=",
            "ref_length",
            6
          ],
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "!in",
            "network",
            "us-highway",
            "us-state",
            "us-interstate"
          ]
        ],
        "id": "highway_shield_other",
        "layout": {
          "icon-image": "road_{ref_length}",
          "icon-rotation-alignment": "viewport",
          "icon-size": 1,
          "symbol-avoid-edges": true,
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "text-field": "{ref}",
          "text-font": [
            "Stadia Regular"
          ],
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "minzoom": 8,
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "<=",
            "ref_length",
            6
          ],
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "network",
            "us-highway",
            "us-state"
          ]
        ],
        "id": "highway_shield_us_other",
        "layout": {
          "icon-image": "{network}_{ref_length}",
          "icon-rotation-alignment": "viewport",
          "icon-size": 1,
          "symbol-avoid-edges": true,
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "text-field": "{ref}",
          "text-font": [
            "Stadia Regular"
          ],
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "minzoom": 9,
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "<=",
            "ref_length",
            3
          ],
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "network",
            "us-interstate"
          ]
        ],
        "id": "highway_shield_us_interstate",
        "layout": {
          "icon-image": "{network}_{ref_length}",
          "icon-rotation-alignment": "viewport",
          "icon-size": 1,
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "text-field": "{ref}",
          "text-font": [
            "Stadia Regular"
          ],
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "minzoom": 7,
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "==",
            "class",
            "suburb"
          ]
        ],
        "id": "place_suburb",
        "layout": {
          "symbol-avoid-edges": true,
          "text-anchor": "center",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "center",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                10
              ],
              [
                14,
                13
              ]
            ]
          },
          "visibility": "visible"
        },
        "maxzoom": 15,
        "paint": {
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 2,
          "text-opacity": 0.7
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "==",
            "class",
            "village"
          ]
        ],
        "id": "place_village",
        "layout": {
          "icon-size": 0.4,
          "symbol-avoid-edges": true,
          "text-anchor": "left",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "left",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0.2
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                10
              ],
              [
                14,
                13
              ]
            ]
          },
          "visibility": "visible"
        },
        "maxzoom": 14,
        "paint": {
          "icon-opacity": 0.6,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 2
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "has",
            "iata"
          ]
        ],
        "id": "airport_label_gen0",
        "layout": {
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-line-height": 1.55,
          "text-max-width": 9,
          "text-padding": 2,
          "text-size": 13,
          "visibility": "visible"
        },
        "minzoom": 10,
        "paint": {
          "text-color": "#888",
          "text-halo-blur": 1,
          "text-halo-color": "#fff",
          "text-halo-width": 2,
          "text-translate": [
            0,
            0
          ]
        },
        "source": "openmaptiles",
        "source-layer": "aerodrome_label",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "==",
            "class",
            "town"
          ]
        ],
        "id": "place_town",
        "layout": {
          "icon-image": {
            "base": 1,
            "stops": [
              [
                0,
                "circle-11"
              ],
              [
                8,
                ""
              ]
            ]
          },
          "icon-size": 0.4,
          "symbol-avoid-edges": true,
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                0,
                "left"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "left",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0.2
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                10
              ],
              [
                14,
                13
              ]
            ]
          },
          "visibility": "visible"
        },
        "maxzoom": 15,
        "paint": {
          "icon-opacity": 0.6,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 2
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "all",
            [
              "!=",
              "capital",
              2
            ],
            [
              "==",
              "class",
              "city"
            ],
            [
              ">",
              "rank",
              3
            ]
          ]
        ],
        "id": "place_city",
        "layout": {
          "icon-image": {
            "base": 1,
            "stops": [
              [
                0,
                "circle-11"
              ],
              [
                8,
                ""
              ]
            ]
          },
          "icon-size": 0.4,
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                0,
                "left"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "left",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0.2
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                10
              ],
              [
                14,
                18
              ]
            ]
          },
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "all",
            [
              "!=",
              "capital",
              2
            ],
            [
              "<=",
              "rank",
              3
            ],
            [
              "==",
              "class",
              "city"
            ]
          ]
        ],
        "id": "place_city_large",
        "layout": {
          "icon-image": {
            "base": 1,
            "stops": [
              [
                0,
                "circle-11"
              ],
              [
                8,
                ""
              ]
            ]
          },
          "icon-size": 0.4,
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                0,
                "left"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "left",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0.2
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                4,
                11
              ],
              [
                12,
                18
              ],
              [
                14,
                22
              ]
            ]
          },
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "all",
            [
              "==",
              "capital",
              2
            ],
            [
              "==",
              "class",
              "city"
            ],
            [
              ">",
              "rank",
              3
            ]
          ]
        ],
        "id": "place_capital_gen1",
        "layout": {
          "icon-image": {
            "base": 1,
            "stops": [
              [
                0,
                "star-11"
              ],
              [
                8,
                ""
              ]
            ]
          },
          "icon-size": 1,
          "symbol-avoid-edges": true,
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                0,
                "left"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "left",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0.2
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                13
              ],
              [
                14,
                24
              ]
            ]
          },
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "minzoom": 4,
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "all",
            [
              "==",
              "capital",
              2
            ],
            [
              "==",
              "class",
              "city"
            ],
            [
              "<=",
              "rank",
              3
            ]
          ]
        ],
        "id": "place_capital_gen0",
        "layout": {
          "icon-image": {
            "base": 1,
            "stops": [
              [
                0,
                "star-11"
              ],
              [
                8,
                ""
              ]
            ]
          },
          "icon-size": 1,
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                0,
                "left"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-justify": "left",
          "text-line-height": 1.55,
          "text-offset": [
            0.5,
            0.2
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                13
              ],
              [
                14,
                24
              ]
            ]
          },
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "==",
            "class",
            "state"
          ]
        ],
        "id": "place_state",
        "layout": {
          "symbol-avoid-edges": true,
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Regular"
          ],
          "text-line-height": 1.55,
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "maxzoom": 12,
        "paint": {
          "text-color": "rgb(113, 129, 144)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "all",
            [
              "==",
              "class",
              "country"
            ],
            [
              ">=",
              "rank",
              2
            ]
          ]
        ],
        "id": "place_country_other",
        "layout": {
          "symbol-avoid-edges": true,
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Semibold"
          ],
          "text-letter-spacing": 0.05,
          "text-line-height": 1.55,
          "text-padding": 10,
          "text-size": {
            "base": 1,
            "stops": [
              [
                0,
                12
              ],
              [
                6,
                14
              ],
              [
                9,
                24
              ]
            ]
          },
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "maxzoom": 10,
        "minzoom": 1,
        "paint": {
          "text-color": {
            "base": 1,
            "stops": [
              [
                3,
                "rgb(157,169,177)"
              ],
              [
                4,
                "rgb(153, 153, 153)"
              ]
            ]
          },
          "text-halo-color": "rgba(236,236,234,0.7)",
          "text-halo-width": 1.4
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "all",
            [
              "<=",
              "rank",
              1
            ],
            [
              "==",
              "class",
              "country"
            ]
          ]
        ],
        "id": "place_country_major",
        "layout": {
          "symbol-avoid-edges": true,
          "text-anchor": "center",
          "text-field": [
            "concat",
            [
              "get",
              "name:latin"
            ],
            [
              "case",
              [
                "all",
                [
                  "has",
                  "name:nonlatin"
                ],
                [
                  "is-supported-script",
                  [
                    "get",
                    "name:nonlatin"
                  ]
                ]
              ],
              [
                "concat",
                "\n",
                [
                  "get",
                  "name:nonlatin"
                ]
              ],
              ""
            ]
          ],
          "text-font": [
            "Stadia Semibold"
          ],
          "text-letter-spacing": 0.05,
          "text-line-height": 1.55,
          "text-size": {
            "base": 1.4,
            "stops": [
              [
                0,
                12
              ],
              [
                6,
                16
              ],
              [
                9,
                24
              ]
            ]
          },
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "maxzoom": 10,
        "minzoom": 1,
        "paint": {
          "text-color": {
            "base": 1,
            "stops": [
              [
                3,
                "rgb(157,169,177)"
              ],
              [
                4,
                "rgb(153, 153, 153)"
              ]
            ]
          },
          "text-halo-color": "rgba(236,236,234,0.7)",
          "text-halo-width": 1.4
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
      },
      {
        "filter": [
          "==",
          "class",
          "continent"
        ],
        "id": "place-continent",
        "layout": {
          "text-field": "{name:latin}",
          "text-font": [
            "Stadia Bold"
          ],
          "text-letter-spacing": 0.1,
          "text-max-width": 6.25,
          "text-size": 16,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "maxzoom": 1,
        "paint": {
          "text-color": "rgb(157,169,177)",
          "text-halo-color": "rgba(236,236,234,0.7)",
          "text-halo-width": 1.4
        },
        "source": "openmaptiles",
        "source-layer": "place",
        "type": "symbol"
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
          'text-opacity': .9
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
        'filter': ['==', 'icon', 'nothing'],
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
          'line-width': 1,
          'line-color': 'green',
          'line-dasharray': [10,2]
        },
        'layout': {
  
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
        },
        'layout': {
          'visibility': 'none'
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
          'visibility': 'none'
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
          'text-padding': 5,
          'visibility': 'none'
        }
      },
      {
        'id': 'tracts-fill',
        'type': 'fill',
        'source': 'tracts',
        'paint': {
          'fill-opacity': .2,
          'fill-color': ['case',
            ['<', ['get', 'Social Progress Index'], 40], 'red',
            ['<', ['get', 'Social Progress Index'], 50], 'orange',
            ['<', ['get', 'Social Progress Index'], 60], 'yellow',
            'green'
          ]
        }
      },
      {
        'id': 'tracts-outline',
        'type': 'line',
        'source': 'tracts',
        'paint': {
          'line-color': ['case',
            ['<', ['get', 'Social Progress Index'], 40], 'red',
            ['<', ['get', 'Social Progress Index'], 50], 'orange',
            ['<', ['get', 'Social Progress Index'], 60], 'yellow',
            'green'
          ],
          'line-width': 1
        },
        'layout': {
  
        }
      },
      {
        'id': 'tracts-label',
        'type': 'symbol',
        'source': 'tracts',
        'paint': {
          'text-color': ['case',
            ['<', ['get', 'Social Progress Index'], 40], 'red',
            ['<', ['get', 'Social Progress Index'], 50], 'orange',
            ['<', ['get', 'Social Progress Index'], 60], 'yellow',
            'green'
          ],
          'text-halo-width': 1,
          'text-halo-color': ['case',
            ['<', ['get', 'Social Progress Index'], 40], '#fff',
            ['<', ['get', 'Social Progress Index'], 50], '#111',
            ['<', ['get', 'Social Progress Index'], 60], '#111',
            '#fff'
          ],
          'text-halo-blur': 2
        },
        'layout': {
          'text-font': ['Lato Extra Bold','Open Sans Extra Bold'],
          'text-field': ['number-format',
            ['get','Social Progress Index'],
            { 'min-fraction-digits': 0, 'max-fraction-digits': 0 }
          ],
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 12,
            13, 16,
            15, 36
          ],
          'text-padding': 5,
        }
      },
    ],
    "glyphs": "./fonts/{fontstack}/{range}.pbf",
    "sprite": "https://mayor--stunning-choux-3558b1.netlify.app/sprites/sprite"
  }

  export default style
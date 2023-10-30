import style from "./style.js";
import layersControl from "./layersControl.js";
import legendControl from "./legendControl.js";
import { breaks, colors } from "./constants.js";

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

var categories = [
  "basketball",
  "water",
  "swimming",
  "harbor",
  "tennis",
  "soccer",
  "baseball",
  "playground",
  "school",
  "garden",
  "picnic-site"
]

var amenityFilter = [
  ["all"],
  ["basketball"],
  ["water", "swimming", "harbor"],
  ["tennis"],
  ["soccer"],
  ["baseball"],
  ["playground", "school", "garden"],
  ["picnic-site"]
];

const layerStatus = {};
categories.forEach(c => {
    layerStatus[c] = false;
})

map.addControl(new layersControl(categories), 'bottom-right')

// map.addControl(new legendControl(breaks, colors), 'bottom-left');

map.addControl(new legendControl([0,40,50,60,100], ['red','orange','yellow','green']), 'bottom-left');

map.on("load", function () {

  for (const l in layerStatus) {
    if (Object.hasOwnProperty.call(layerStatus, l)) {
        layersToggle(l);
        
    }
}

})

function layersToggle(name) {
  let checkbox = document.getElementById('check-'+name.replace(/\s/g,''));

  checkbox.addEventListener('change', function(event) {

      layerStatus[name] = !layerStatus[name];

      let layersShown = [];

      for (const key in layerStatus) {
          if (Object.hasOwnProperty.call(layerStatus, key)) {
              if (layerStatus[key]) {
                  layersShown.push(key)
              }
          }
      }
      
      map.setFilter('park-amenities', 
        ['in', 'icon', ...layersShown]
        );
  });
}  // end legendToggle


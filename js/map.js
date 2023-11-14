import style from "./style.js";
import layersControl from "./layersControl.js";
import LegendControl from "./LegendControl.js";
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

// var categories = [
//   "basketball",
//   "water",
//   "swimming",
//   "harbor",
//   "tennis",
//   "soccer",
//   "baseball",
//   "playground",
//   "school",
//   "garden",
//   "picnic-site"
// ]

// var amenityFilter = [
//   ["all"],
//   ["basketball"],
//   ["water", "swimming", "harbor"],
//   ["tennis"],
//   ["soccer"],
//   ["baseball"],
//   ["playground", "school", "garden"],
//   ["picnic-site"]
// ];

// const layerStatus = {};
// categories.forEach(c => {
//     layerStatus[c] = false;
// })

// map.addControl(new layersControl(categories), 'bottom-right')

// map.addControl(new legendControl(breaks, colors), 'bottom-left');

map.addControl(new LegendControl([0,40,50,60,100], ['#FF0000','#FFA500','#FFFF00','#008000']), 'bottom-left');

map.on("load", function () {

  // for (const l in layerStatus) {
  //   if (Object.hasOwnProperty.call(layerStatus, l)) {
  //       layersToggle(l);
        
  //   }
  // }

  // Create a popup, but don't add it to the map yet.
  const popup = new maplibregl.Popup({
    // closeButton: false,
    // closeOnClick: false,
    className: 'custom-popup'
  });

  // add SPI score to site points
  map.on('mouseover', 'parks-spi', (e) => {
    map.getCanvas().style.cursor = 'pointer';
  })


  // event to show popup on click
  map.on('click', 'parks-spi', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const spi = e.features[0].properties["PARK_NAME"] + " - " + Math.round(e.features[0].properties["Social Progress Index"]);

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setText(spi).addTo(map);
  });

  map.on('mouseleave', 'parks-spi', () => {
      map.getCanvas().style.cursor = '';
      // popup.remove();
  });

  // filter sites by spi selection
  const layerCheckboxes = document.querySelectorAll('.layers-checkbox[data-layer="parks-spi"]');
  layerCheckboxes.forEach(box => {
    box.addEventListener('change', e => {
      let limits = [];
      layerCheckboxes.forEach(i => {
        if (i.checked) {
          limits.push(['all', [
            '>=',
            ['get', 'Social Progress Index'],
            ['to-number', i.dataset.low]
          ],
          [
            '<=',
            ['get', 'Social Progress Index'],
            ['to-number', i.dataset.high]
          ]]
          )
        }
      })

      let filter = [
        'any', ...limits
      ]

      map.setFilter('parks-spi', filter)

    })
  })

  // show/hide tree plan areas
  const treeCheckbox = document.querySelector('[data-layer="tree-plan-circles"]');
  treeCheckbox.addEventListener('change', e => {
    let visibility;
    if (e.target.checked) {
      visibility = 'visible';
    } else {
      visibility = 'none';
    }

    map.setLayoutProperty('tree-plan-circles', 'visibility', visibility);
  })

})

// function layersToggle(name) {
//   let checkbox = document.getElementById('check-'+name.replace(/\s/g,''));

//   checkbox.addEventListener('change', function(event) {

//       layerStatus[name] = !layerStatus[name];

//       let layersShown = [];

//       for (const key in layerStatus) {
//           if (Object.hasOwnProperty.call(layerStatus, key)) {
//               if (layerStatus[key]) {
//                   layersShown.push(key)
//               }
//           }
//       }
      
//       map.setFilter('park-amenities', 
//         ['in', 'icon', ...layersShown]
//         );
//   });
// }  // end legendToggle


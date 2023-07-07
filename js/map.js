import style from "./style.js";
import layersControl from "./layersControl.js";
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

map.addControl(new layersControl(categories), 'bottom-right')

// setup legend
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

      const legendTitle = document.createElement('h3');
      legendTitle.innerText = "High Temperature";
      containerDiv.appendChild(legendTitle);

      containerDiv.appendChild(uiDiv)
      containerDiv.appendChild(legendDiv)

      const sourceP = document.createElement('p');
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


})
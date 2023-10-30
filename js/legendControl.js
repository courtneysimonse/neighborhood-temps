// setup legend
class legendControl {
    constructor(breaks, colors) {
        this.breaks = breaks;
        this.colors = colors;
    }

    onAdd(map) {
      this._map = map;
      this._container = document.createElement('div');
      this._container.className = 'maplibregl-ctrl legend-ctrl';
      this._container.id = 'legend-ctrl'
      var breaks = this.breaks;
      var colors = this.colors;
  
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
      legendTitle.innerText = "Social Progress Index";
      containerDiv.appendChild(legendTitle);
  
      containerDiv.appendChild(uiDiv)
      containerDiv.appendChild(legendDiv)
  
      const sourceP = document.createElement('p');
      sourceP.innerHTML = `(Data from the <a href="https://controller.phila.gov/philadelphia-audits/progressphl/#/" target="_blank">ProgressPHL</a>)`
      containerDiv.appendChild(sourceP)
  
      this._container.appendChild(containerDiv)
      return this._container;
    }
    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
  }

export default legendControl
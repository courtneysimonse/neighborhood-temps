// setup legend
class LegendControl {
  constructor(breaks, colors) {
    if (!breaks || !colors || breaks.length !== colors.length + 1) {
        throw new Error('Invalid breaks or colors');
    }

    this.breaks = breaks;
    this.colors = colors;
  }
  
  createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'openLegend';
    checkbox.id = 'openLegend';
    checkbox.checked = true;

    const label = document.createElement('label');
    label.htmlFor = 'openLegend';
    label.className = 'legendIconToggle';
    label.innerHTML = `
        <div class="spinner diagonal part-1"></div>
        <div class="spinner horizontal"></div>
        <div class="spinner diagonal part-2"></div>
    `;

    this._container.appendChild(checkbox);
    this._container.appendChild(label);
  }

  createLegendContent() {
    const containerDiv = document.createElement('div');
    containerDiv.id = 'legend-contents';

    // const uiDiv = document.createElement('div');
    // uiDiv.classList = 'ui-controls';

    const legendDiv = document.createElement('div');
    legendDiv.classList = 'legend';
    legendDiv.innerHTML = `<div>
      <img src="./icons/production/alidade-smooth/star-11.svg">
      </div>
      <div>9 to 9 sites<div>`;

    const scaleDiv = document.createElement('div');
    scaleDiv.classList = 'scale';
    let content = '<ul>';

    for (let i = 0; i < this.breaks.length - 1; i++) {
        const classRange = `<li><span style="background:${this.colors[i]}"></span> ${this.breaks[i].toLocaleString()}&ndash;${this.breaks[i + 1].toLocaleString()}</li>`;
        content += classRange;
    }

    content += '</ul>';
    scaleDiv.innerHTML = content;

    const legendTitle = document.createElement('h3');
    legendTitle.innerText = 'Social Progress Index';

    containerDiv.appendChild(legendTitle);
    // containerDiv.appendChild(uiDiv);
    containerDiv.appendChild(legendDiv);
    containerDiv.appendChild(scaleDiv);
    containerDiv.appendChild(this.createSourceParagraph())

    this._container.appendChild(containerDiv);
  }

  createSourceParagraph() {
      const sourceP = document.createElement('p');
      sourceP.classList = 'source';
      sourceP.innerHTML = `(Data from the <a href="https://controller.phila.gov/philadelphia-audits/progressphl/#/" target="_blank">ProgressPHL</a>)`;

      return sourceP;
  }

  onAdd(map) {
      this._map = map;
      this._container = document.createElement('div');
      this._container.className = 'maplibregl-ctrl legend-ctrl';
      this._container.id = 'legend-ctrl';

      this.createCheckbox();
      this.createLegendContent();
      this.createSourceParagraph();

      return this._container;
  }


  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export default LegendControl
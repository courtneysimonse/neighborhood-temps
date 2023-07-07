class layersControl {
    constructor(categories) {
        this.categories = categories || [1,2,3];
      }
    
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl layers-ctrl';
        const categories = this.categories;
        let content = '<h3>Park Amenities</h3>';
        content += '<div>';

        categories.forEach(item => {

            content += '<label><div>';
            content += '<input type="checkbox" class="control-layers-selector" id="check-' + item.replace(/\s/g,'') + '" />';
            // content += '<span><span class="legendColor" style="background:' + colors[item] + '"></span>';

            content += item + '</span>';


            content += '</div></label>';

        })

        content += '</div></div>'

        this._container.innerHTML = content;
        return this._container;
    }
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

export default layersControl
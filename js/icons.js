
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




var indexAmenities = 0;
map.on("load", function () {

  // Playground by Danishicon from <a href="https://thenounproject.com/browse/icons/term/playground/" target="_blank" title="Playground Icons">Noun Project</a>
  // Swing by Emfahmin from <a href="https://thenounproject.com/browse/icons/term/swing/" target="_blank" title="Swing Icons">Noun Project</a>
  // console.log(map.getLayer('park-amenities'));

  setInterval(setFilter, 2000);

 

});

function setFilter() {

  if (indexAmenities == 0) {
    map.setFilter('park-amenities', null);
  } else {
    var newFilter = [];
    newFilter.push("any");

    for (var i = 0; i < amenityFilter[indexAmenities].length; i++) {
      newFilter.push(["==", ["get", "icon"], amenityFilter[indexAmenities][i]])
    }

    console.log(newFilter);
    map.setFilter('park-amenities', newFilter);
  }



  indexAmenities++;

  if (indexAmenities == amenityFilter.length) {
    indexAmenities = 0;
  }
}

function legendToggle(name) {
  let checkbox = document.getElementById('check-'+name.replace(/\s/g,''));

  checkbox.addEventListener('change', function(event) {

      if ([...checkbox.classList].includes("control-customer-selector")) {
          customersStatus[name] = !customersStatus[name];
      } else if ([...checkbox.classList].includes("control-community-selector")) {
          communityStatus[name] = !communityStatus[name];
      } else {
          categoriesStatus[name] = !categoriesStatus[name];
      }

      let filters = setJobFilter();
      console.log(filters);
      
      filterLayers(filters);
  });
}  // end legendToggle


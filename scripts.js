var map = L.map('map').setView([47.598,-122.311],9);
  // Base map is added here, there is a access togen generated from the mapbox account
  L.tileLayer('https://api.mapbox.com/styles/v1/daeleng/cla8pwozb000015mpwznmq0eg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbDl5d3h6NzkwOTdoM29xb20xYzJ3NmZsIn0.sMhj9jD84igqnZdX08l33A/draft', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbGE4MnNpbjQwMHgxM29vMG1xNXA0YjR3In0.1m-yZapuOVRg2zWL8fimbw',
  }).addTo(map);
// this function is to create buttons from clicking on the map on the screen
function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
 });
// this is where the routing plug in is used
var control = L.Routing.control({
          router: L.Routing.mapbox('pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbGE4MnNpbjQwMHgxM29vMG1xNXA0YjR3In0.1m-yZapuOVRg2zWL8fimbw'),
          units:'imperial',
          collapsible: true,
          show: false,
          geocoder: L.Control.Geocoder.photon(),
          waypoints: [
            null
          //      L.latLng(47.246587, -122.438830),
          //      L.latLng(47.318017, -122.542970),
          //      L.latLng(47.258024, -122.444725)
          ],
            routeWhileDragging: true
       }).addTo(map);
// this code adds a map overlay in the bottom left hand side that gives the user information
L.Control.textbox = L.Control.extend({
       		onAdd: function(map) {

       		var text = L.DomUtil.create('div');
       		text.id = "instructions on the routing";
       		text.innerHTML = "<strong>Click on the map to set the starting and finishing locations!</strong>"
       		return text;
       		},

       		onRemove: function(map) {
       			// Nothing to do here
       		}
       	});
L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
L.control.textbox({ position: 'topright' }).addTo(map);

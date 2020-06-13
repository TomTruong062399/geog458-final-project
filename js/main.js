// 1. Create a map object.
var mymap = L.map('map', {
  center: [47.6619352, -122.3178549],
  zoom: 15,
  maxZoom: 20,
  minZoom: 15,
  detectRetina: true
});

// 2. Add a base map.
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png').addTo(mymap);

// 3. Add restaurant GeoJSON data.
var restaurants = null;

// 4. Build up a set of colors from ColorBrewer's Paired category.
var colors = chroma.scale('Paired').mode('lch').colors(10);

// 5. Dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 10; i++) {
  $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 10px;} </style>"));
}

restaurants = L.geoJson.ajax("assets/Restaurants_Operating_during.geojson", {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<b><u>Name</u>: </b>" + feature.properties.business_n + "<br />" +
      "<b><u>Address</u>: </b>" + feature.properties.address_he + "<br />" +
      "<b><u>Phone Number</u>: </b>" + feature.properties.phone_numb + "<br />" +
      "<b><u>Website</u>: </b>" + feature.properties.business_w + "<br />" +
      "<b><u>Details</u>: </b>" + feature.properties.provide_de + "<br />");
  },
  pointToLayer: function(feature, latlng) {
    var id = 0;
    if (feature.properties.are_you_op == "delivery") {
      id = 0;
    } else if (feature.properties.are_you_op == "takeout") {
      id = 1;
    } else if (feature.properties.are_you_op == "third_party_delivery_service") {
      id = 2;
    } else if (feature.properties.are_you_op == "takeout,curbside") {
      id = 3;
    } else if (feature.properties.are_you_op == "takeout,curbside,delivery") {
      id = 4;
    } else if (feature.properties.are_you_op == "takeout,curbside,third_party_delivery_service") {
      id = 5;
    } else if (feature.properties.are_you_op == "takeout,curbside,delivery,third_party_delivery_service") {
      id = 6;
    } else if (feature.properties.are_you_op == "takeout,delivery") {
      id = 7;
    } else if (feature.properties.are_you_op == "takeout,third_party_delivery_service") {
      id = 8;
    } else {
      id = 9;
    } //"takeout,delivery,third_party_delivery_service"
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'fa fa-cutlery marker-color-' + (id + 1).toString()
      })
    });
  },
  attribution: 'Restaurants Data: City of Seattle | Base Map: CartoDB | Made By: Tom Truong'
}).addTo(mymap);

// 6. Create Leaflet Control Object of legend.
var legend = L.control({
  position: 'topright'
});

// 7. Function that runs when legend is added to map.
legend.onAdd = function() {
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<b><u>Delivery Options:</u></b><br />';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-1"></i><p>Delivery</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-2"></i><p>Takeout</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-3"></i><p>Third Party Delivery Service</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-4"></i><p>Takeout, Curbside</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-5"></i><p>Takeout, Curbside, Delivery</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-6"></i><p>Takeout, Curbside, Third Party Delivery Service</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-7"></i><p>Takeout, Curbside, Delivery, Third Party Delivery Service</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-8"></i><p>Takeout, Delivery</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-9"></i><p>Takeout, Third Party Delivery Service</p>';
  div.innerHTML += '<i class="fa fa-cutlery marker-color-10"></i><p>Takeout, Delivery, Third Party Delivery Service</p>';
  return div;
};

// 8. Add a legend to map.
legend.addTo(mymap);

// 9. Add a scale bar to map.
L.control.scale({
  position: 'bottomleft'
}).addTo(mymap);

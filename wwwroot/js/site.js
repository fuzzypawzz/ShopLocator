/**
 * Google Maps API script callback calls this method
 */
function shopLocator() {
  let showDenmark = {
    lat: 55.942732,
    lng: 10.3415227,
  };

  let showCph = {
    lat: 55.6959315,
    lng: 12.4609883,
  };

  /**
   * CONTROL BUTTON "TÆT PÅ MIG" IN THE TOP LEFT CORNER OF THE MAP
   * @param {object} controlDiv The element containing the custom control "tæt på mig"
   * @param {element} map The map which shall be controlled
   */
  function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement("div");
    controlUI.className = "controlUI";
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.borderRadius = "20px";
    controlUI.style.cursor = "pointer";
    controlDiv.appendChild(controlUI); // Set CSS for the control interior.
    var controlText = document.createElement("div");
    controlText.className = "closeToMe";
    controlText.innerHTML = DEFAULTS.closeToMeText;
    var locationIcon = new Svg(
      "nav-location-icon",
      "closeToMeIcon"
    ).createSvg();
    controlUI.appendChild(locationIcon);
    controlUI.appendChild(controlText); // Add the event listener to button
    controlUI.addEventListener("click", function() {
      openClosestStore();
    });
  }

  let map = new google.maps.Map(document.getElementById("mapDiv"), {
    center: showCph,
    clickable: true,
    zoom: 11,
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    // Dont display business and transport Point Of Interest
    styles: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        stylers: [{ visibility: "on" }],
      },
    ],
  });

  let infoWindow = new google.maps.InfoWindow();

  /**
   *
   * @param {object} latLng - object containing Lat and Lng
   */
  function addMarker(latLng, model) {
    if (typeof latLng !== "object") {
      throw new Error("Marker coordinates must be an object!");
    }
    let marker = new google.maps.Marker({
      position: latLng,
      map,
      id: model.id,
    });

    // TODO: Refractor, make controller return the id format like: "marker_ID"
    // When done, just call querySelector with this.id and remove the prefix from the view: stores/index.cshtml
    marker.addListener("click", function() {
      let listItemRadio = document.querySelector(`#section-toggle_${this.id}`);
      console.log(listItemRadio);
      listItemRadio.checked = true;

      let infoWindowContent = getClone(`popup_${model.id}`);
      console.log(infoWindowContent);
      infoWindow.setContent(infoWindowContent);
      infoWindow.setPosition(latLng);
      infoWindow.setOptions({
        // Display infowindow correctly relatively to the marker position
        pixelOffset: new google.maps.Size(0, -30),
      });
      map.setZoom(15);
      infoWindow.open(map);
      map.setCenter(latLng);
    });
  }
  
  /**
   * TODO: Refractor when setting up Vue templates
   * @param {string} id - Element ID to clone a new element from
   */
  function getClone(id) {
    let node = document.querySelector(`#${id}`);
    if (!node) {
      throw new Error("Template to clone could not be found");
    }
    return node.cloneNode([true]);
  }

  function contructLatLngObject(lat, lng) {
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
  }

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // How do i make sure that this is always a list? For safety.
      let list = JSON.parse(xmlhttp.responseText);
      list.forEach((objectInList) => {
        const latLng = contructLatLngObject(objectInList.lat, objectInList.lng);
        addMarker(latLng, objectInList);
      });
    }
  };

  // TODO: Get controller endpoint from a constant
  xmlhttp.open("GET", "/Stores/GetCoordinates", true);
  xmlhttp.send();
}

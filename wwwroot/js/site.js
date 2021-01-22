// TODO: Refractor all as per JavaScript structure standards

/**
 * Author: Jannik Maag (Github: Fuzzypawzz)
 * License: MIT
 */

/**
 * Google Maps API script callback calls this method
 */
function shopLocator() {
  const showDenmark = {
    lat: 55.942732,
    lng: 10.3415227,
  };

  const showCph = {
    lat: 55.6959315,
    lng: 12.4609883,
  };

  const markerStorage = [];

  const map = new google.maps.Map(document.getElementById("mapDiv"), {
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

  document
    .querySelector("#listofstores")
    .querySelectorAll("li")
    .forEach((listItem) => {
      listItem.addEventListener("click", function() {
          markerStorage.forEach(marker => {
              if (marker.id == this.id) {
                clickMarker(marker);
              }
          })
      });
    });

  const infoWindow = new google.maps.InfoWindow();

  google.maps.event.addListener(infoWindow, "closeclick", function() {
    map.setZoom(11);
  });

  /**
   *
   * @param {object} latLng - object containing Lat and Lng
   */
  function addMarker(latLng, model) {
    if (typeof latLng !== "object") {
      throw new Error("Marker coordinates must be an object!");
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      id: `marker_${model.id}`,
    });

    // TODO: Refractor, make controller return the id format like: "marker_ID"
    // When done, just call querySelector with this.id and remove the prefix from the view: stores/index.cshtml
    marker.addListener("click", function() {
      let listItemRadio = document.querySelector(`#${this.id}`)
      .querySelector("input");
      listItemRadio.checked = true;

      let infoWindowContent = getClone(`popup_${model.id}`);
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

    markerStorage.push(marker);
  }

  function clickMarker(marker) {
    google.maps.event.trigger(marker, "click");
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

function initMap() {
    var location= {lat:28.698828747322892, lng:77.13001451640814 };
    var map = new google.maps.Map(document.getElementById("map"),{
    zoom:4,
      center: location
    });
    }
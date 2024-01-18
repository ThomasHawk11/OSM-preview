<!DOCTYPE html>
<html>
<head>
    <title>Map Preview</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
        #map {
            height: 100vh;
        }
    </style>
</head>
<body>

<div id="map"></div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    var address = getQueryParam('address') || "Paris, France";

    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address))
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var result = data[0];
                var latlng = [result.lat, result.lon];
                map.setView(latlng, 15);
                L.marker(latlng).addTo(map);
            } else {
                console.error("Aucun résultat trouvé pour l'adresse spécifiée.");
            }
        })
        .catch(error => console.error("Erreur lors de la requête Nominatim:", error));
</script>

</body>
</html>

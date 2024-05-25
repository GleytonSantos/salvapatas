// Inicializar o mapa
var map = L.map('map').setView([-14.855849, -40.841776], 13);

// Adicionar camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Coordenadas do centro do raio

const arrCenter = [[-14.855849, -40.841776],[-14.863657, -40.835522]]
// Raio em metros
var markers = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();

        // Personalize a cor do cluster com base na quantidade de marcadores filhos
        var clusterColor = '';
        if (childCount > 10) {
            clusterColor = '';
        } else if (childCount > 5) {
            clusterColor = '';
        }

        return L.divIcon({
            html: `
            <style>figcaption {
                position: absolute;
                bottom: 1px;
                left: 50%; 
                transform: translateX(-50%); 
                color: white; 
                font-size: 11px;
               // background-color: rgba(0, 0, 0, 0.5); 
                padding: 5px 10px; /* Espaçamento interno do texto */
              }</style>
            <div style="background-color: ${clusterColor};
             width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center;"><figure><img src="./src/img/pataIcon.png" style="width: 30px; height: 30px;"><figcaption>${childCount}</figcaption></figure></div>`,
            className: 'custom-cluster-icon',
            iconSize: L.point(40, 40)
        });
    }
});
var radius = 150
// Adicionar um círculo e marcador para cada coordenada
// arrCenter.forEach(function(coord) {
//     var circle = L.circle(coord, {
//         color: '#0b07ff',
//         fillColor: '#0b07ff',
//         fillOpacity: 0.3,
//         radius: radius+15
//     });

//     // Adicionar um ícone dentro do círculo
//     var icon = L.icon({
//         iconUrl: './src/img/pataIcon.png', // URL da imagem do ícone
//         iconSize: [32, 32], // Tamanho do ícone
//         iconAnchor: [16, 16] // Ponto de ancoragem do ícone
//     });

//     var marker = L.marker(coord, { icon: icon });

//     // Adicionar o círculo e o marcador ao cluster
//     var layerGroup = L.layerGroup([circle, marker]);
//     //markers.addLayer(circle);
//     markers.addLayer(layerGroup);
// });

arrCenter.forEach(function(coord) {
    // Criar um divIcon combinando círculo e marcador
    var customIcon = L.divIcon({
        className: 'custom-icon',
        html: `
            <div style="position: absolute; width: ${radius * 2}px; height: ${radius * 2}px;">
                <div style="position: absolute; top: 0; left: 0; width: ${radius * 2}px; height: ${radius * 2}px; background-color: rgba(95, 164, 255, 0.226); border-radius: 50%; border:1px solid rgba(17, 119, 252, 0.753) "></div>
                <img src="./src/img/pataIcon.png" style="position: absolute; width: 32px; height: 32px; left: 50%; top: 50%; transform: translate(-50%, -50%);">
            </div>
        `,
        iconSize: L.point(radius * 2, radius * 2),
        iconAnchor: [radius, radius] // Centraliza o ícone no ponto
    });

    var marker = L.marker(coord, { icon: customIcon });
    markers.addLayer(marker);
});

// Adicionar o cluster ao mapa
map.addLayer(markers);




//for(i=0;i<=center.length;i++)
// Alternativamente, usar Turf.js para criar o círculo (opcional)
// var turfCircle = turf.circle(center, 2.3, { // radius em km para o Turf.js
//     steps: 64,
//     units: 'kilometers'
// });

// // Converter para camada do Leaflet (opcional)
// var geojsonLayer = L.geoJSON(turfCircle, {
//     style: {
//         color: 'blue',
//         fillColor: '#30f',
//         fillOpacity: 0.3
//     }
// }).addTo(map);


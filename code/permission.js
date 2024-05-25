function getLocation(pos){
    console.log(pos.coords)
    const key = "aae9a062fa6a452d98df121f9669a160"
    const latitude = pos.coords.latitude
    const longitude = pos.coords.longitude
    params = {
        q:latitude + "%2C" + longitude,
        key: key
    }
    const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

    const url = `https://api.opencagedata.com/geocode/v1/json?${queryString}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.results && data.results.length > 0) {
            const firstResult = data.results[0];
            const formattedAddress = firstResult.formatted;
            console.log('Endereço:', formattedAddress);
            const input = document.getElementById('address').value = formattedAddress    
        } else {
            console.error('Nenhum resultado encontrado');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
}
navigator.geolocation.getCurrentPosition(getLocation)

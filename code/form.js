
function submitForm() {
    let file

    if ( document.getElementById('imageformResgate').files[0]) {

        return file =  file.name
    } else {
       file = ''
    }
    const formData = {
        address: document.getElementById('address').value,
        situation: document.getElementById('situacao').value,
        caracteristicas: document.getElementById('caract').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        image: file.name
    };
    
    // Obtém os dados existentes no localStorage
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    
    // Adiciona os novos dados
    data.push(formData);
    
    // Salva os dados atualizados no localStorage
    localStorage.setItem('formData', JSON.stringify(data));
    
    // Exibe os dados salvos
    displaySavedData();
    
    //alert('Formulário enviado com sucesso!');
}

function displaySavedData() {
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    document.getElementById('savedData').textContent = JSON.stringify(savedData, null, 2);
}


function clearData() {
    // Limpa os dados do localStorage
    localStorage.removeItem('formData');
    
    // Atualiza a exibição dos dados
    displaySavedData();
    
    //alert('Todos os dados foram apagados!');
}
// Exibe os dados salvos quando a página é carregada
window.onload = displaySavedData;


function getLocation(pos){
    console.log(pos.coords)
    const key = "aae9a062fa6a452d98df121f9669a160"
    const latitude = pos.coords.latitude
    const longitude = pos.coords.longitude
    const coords = latitude + "%2C" + longitude
    const params = {
        q:coords,
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
             document.getElementById('latitude').value = latitude
             document.getElementById('longitude').value = longitude
           // return formattedAddress
        } else {
            console.error('Nenhum resultado encontrado');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });


}
navigator.geolocation.getCurrentPosition(getLocation)

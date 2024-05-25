function submitForm() {
            

    const formData = {
        address: document.getElementById('address').value,
        situation: document.getElementById('situacao').value,
        caracteristicas: document.getElementById('caract').value,

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
function getLocation(){
    
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
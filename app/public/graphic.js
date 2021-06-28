const data1 = {"user": localStorage.getItem("id")};
fetch("http://localhost:8000/find",{
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body:  JSON.stringify(data1)
})
.then(function(res) {
    return res.json();
})    
.then(function(datos) {
    console.log(datos);
    var aux1 = new Array();
    var aux2 = new Array();
    for(var i=0; i<datos.length;i++){
        aux1.push(datos[i].hora);
        aux2.push(datos[i].temp);
    }
    // Obtener una referencia al elemento canvas del DOM
    const $grafica = document.querySelector("#grafica");
    // Las etiquetas son las que van en el eje X. 
    const etiquetas = aux1;
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const datosVentas2020 = {
        label: "Registros",
        data: aux2, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
    };
    new Chart($grafica, {
        type: 'line',// Tipo de gráfica
        data: {
            labels: etiquetas,
            datasets: [
                datosVentas2020,
                // Aquí más datos...
            ]
        },
        options : {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Temperatura [°C]'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Tiempo [Hrs]'
                }
              }]
            }
        }
    });

})
.catch(function(err) {
    console.log("error");
});



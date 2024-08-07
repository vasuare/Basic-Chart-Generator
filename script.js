//Variable que guarda la cantidad de leyendas a insertar en el gráfico
let cantidadLeyendas;
//Este arreglo guardara los pares de elementos que se insertaran en el grafico:
//Se guardara en formato de arreglo. Ejemplo: 
//[['leyenda 1', 600],['leyenda 2', 200]]
var arregloDatos = [];

//Función que agregar una leyenda más
function agregarDato() {
    //Tomo la cantidad de leyendas actual
    cantidadLeyendas = document.getElementsByClassName("dato").length;
    //Le sumo 1
    cantidadLeyendas++;

    //Creo un nuevo elemento div, que contendrá los datos nuevos
    const dato = document.createElement("div");
    dato.className = "dato";

    //Creo el input de la leyenda y le asigno sus propiedades y clases
    const inputLeyenda = document.createElement("input");
    inputLeyenda.type = "text";
    inputLeyenda.className = "serie";
    inputLeyenda.placeholder = "Leyenda " + cantidadLeyendas;
    //Agrego el input al div datos
    dato.appendChild(inputLeyenda);
    document.getElementById("datos").appendChild(dato);

    //Creo el input para el valor y le asigno sus propiedades y clases
    const inputValor = document.createElement("input");
    inputValor.type = "number"; // Cambiado a "number" para validación mejorada
    inputValor.className = "valor";
    inputValor.placeholder = "Valor " + cantidadLeyendas;
    inputValor.min = 0; // Valor mínimo para validación
    //Agrego el input al div datos
    dato.appendChild(inputValor);
    document.getElementById("datos").appendChild(dato);
}

//Función que cargar el gráfico de Google
function cargarGrafico() {
    // Cargo el gráfico de Google
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
}

// Dibujo el gráfico y coloco los valores
function drawChart() {
    arregloDatos = [];
    //Recupero los inputs que hay dentro del div datos
    var datos = document.getElementById("datos").getElementsByTagName("input");

    //Controlo que todos los input tengan un valor cargado y válido
    for (let i = 0; i < datos.length; i++) {
        if (datos[i].value === "" || (datos[i].type === "number" && parseFloat(datos[i].value) <= 0)) {
            alert("Cargue todos los campos con valores válidos.");
            return;
        }
    }

    //El primer par [x,x] a insertar en arregloDatos debe ser info del grafico.
    //Esta info no es visible, por lo tanto es indistinto el valor que le asignemos
    var t = ['Leyenda', 'Valor'];
    arregloDatos.push(t);

    for (let i = 0; i < datos.length; i += 2) {
        //Voy agregando los pares al arreglo arregloDatos.
        t = [datos[i].value, parseFloat(datos[i + 1].value)];
        arregloDatos.push(t);
    }

    //Genero la tabla que contiene los datos con el arreglo arregloDatos
    var data = google.visualization.arrayToDataTable(arregloDatos);

    // Opcional; Agrego el título del gráfico
    var options = {
        'title': document.getElementById("titulo").value,
        'width': '100%',
        'height': 400,
        'chartArea': { width: '80%', height: '70%' },
        'legend': { position: 'bottom' },
        'tooltip': { isHtml: true }, // Activar tooltips HTML para interactividad
        'titleTextStyle': { // Estilo del título
            color: 'black',
            fontSize: 24, // Tamaño del texto
            bold: true,
            italic: false
        },
        'titlePosition': 'center' // Posición del título
    };

    // Muestro el gráfico dentro del elemento <div> con id="piechart"
    //Dependiendo del tipo de gráfico
    let chart;
    if (document.getElementById("tipo").value == "circular") {
        chart = new google.visualization.PieChart(document.getElementById('piechart'));
    } else {
        chart = new google.visualization.ColumnChart(document.getElementById('piechart'));
    }

    chart.draw(data, options);
}

// Asegurar que el gráfico se redibuje al cambiar el tamaño de la ventana para ser responsivo
window.onresize = function() {
    drawChart();
};

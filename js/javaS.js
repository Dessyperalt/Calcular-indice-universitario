/* Calculo de indice
 * Copyright 2016 Desiree Peralta Encarnacion
 * DesireePeraltaE@gmail.com
 * https://github.com/Dessyperalt */

 var col = 1;

function agregar()
{
	var table = document.getElementById("Materias");
    var row = table.insertRow(col);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = document.getElementById("Materia").value;
    cell2.innerHTML = document.getElementById("NoCreditos").value;
    cell3.innerHTML = document.getElementById("Nota").value;

    if (cell3.innerHTML < 70)
    {
    	cell4.innerHTML = "D";
    }

    if (cell3.innerHTML < 80 && cell3.innerHTML > 69)
    {
    	cell4.innerHTML = "C";
    }
    
    if (cell3.innerHTML < 90 && cell3.innerHTML > 79)
    {
    	cell4.innerHTML = "B";
    }
    
    if (cell3.innerHTML > 89)
    {
    	cell4.innerHTML = "A";
    }
    col = col +1;
    document.getElementById("Materia").value = "";
    document.getElementById("NoCreditos").value = "";
    document.getElementById("Nota").value = "";
}
function borrar()
{
    var rowCount = document.getElementById("Materias").rows.length - 1;
    if (rowCount != 0)
    {
        document.getElementById("Materias").deleteRow(rowCount);
        col = col - 1 ;
    }
    document.getElementById("Indice").value = "0.00";
    document.getElementById("NoCreditos").value = "0";
    document.getElementById("Condicion").value = "-";
	
}

function calculo()
{

	var total = 0;
    var rowCount = document.getElementById("Materias").rows.length;

	tabla = document.getElementById("Materias");
	for(var i = 1; tabla.rows[i]; i++) {
		total += Number(tabla.rows[i].cells[1].innerHTML);
	}

	document.getElementById("ResultadoCredito").innerHTML = total;

    var mult = 0;
    var totalIndice = 0;
    var subtotal = 0;
   
    for (var i = 1; i  < rowCount; i++)
            {

                letra = tabla.rows[i].cells[3].innerHTML;
                credito = tabla.rows[i].cells[1].innerHTML;

                if (letra == "A")
                {
                    mult = credito * 4;
                }
                else if (letra =="B")
                {
                    mult = credito * 3;
                }
                else if (letra == "C")
                {
                    mult = credito * 2;
                }
                else if (letra == "D")
                {
                    mult = credito * 1;
                }
                else
                {
                    mult = 0;
                }

                subtotal += mult;

            }

            totalIndice = (subtotal / total).toFixed(2);
            document.getElementById("Indice").innerHTML = totalIndice;

            if (totalIndice > 2)
            {
                document.getElementById("Condicion").innerHTML =  "Condicion Normal";

            }
            else {
                alert("Cuidado, debes estudiar mas!");
                document.getElementById("Condicion").innerHTML = "Prueba academica";
                
            }
}

function imprimir()
{
    window.print();
}

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.txt';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function generarTexto() {
    var texto = []; 
    texto.push('Materia, Numero de credito, Nota, Letra');
    var Indice = document.getElementById("Indice").innerHTML;
    var Condicion = document.getElementById("Condicion").innerHTML;
    var Credito = document.getElementById("ResultadoCredito").innerHTML;

    tabla = document.getElementById("Materias");
    var rowCount = document.getElementById("Materias").rows.length;
    texto.push('\n');
    for (var i = 1; i  < rowCount; i++)
    {
        texto.push(tabla.rows[i].cells[0].innerHTML + ',');
        texto.push(tabla.rows[i].cells[1].innerHTML + ',');
        texto.push(tabla.rows[i].cells[2].innerHTML + ',');
        texto.push(tabla.rows[i].cells[3].innerHTML);
        texto.push('\n');
    }
    texto.push('\n');
    texto.push('Resultados:');
    texto.push('\n');
    texto.push('No. Creditos, indice, Condicion');
    texto.push('\n');
    texto.push( Credito + ',' + Indice + ',' + Condicion );

    return new Blob(texto, {
        type: 'text/plain'
    });
};

document.getElementById('imprimir').addEventListener('click', function () {
    descargarArchivo(generarTexto(), 'Indice ' + (new Date()).toLocaleDateString() + '.csv');
}, false
);


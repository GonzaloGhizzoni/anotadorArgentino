// Función para guardar los datos de la tabla en LocalStorage
function guardarDatos() {
    const tabla = document.getElementById('tablaJugadores');
    const headerRow = tabla.querySelector('thead tr');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');

    const datos = {
        jugadores: Array.from(headerRow.children).slice(1).map(th => th.textContent),
        puntuaciones: Array.from(rows).map(row =>
            Array.from(row.children).slice(1).map(cell => cell.textContent)
        ),
        totales: Array.from(totalRow.children).slice(1).map(cell => cell.textContent)
    };

    localStorage.setItem('tablaDatos', JSON.stringify(datos));
}

// Función para cargar los datos de la tabla desde LocalStorage
function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem('tablaDatos'));
    if (!datos) return; // Si no hay datos, no hace nada

    const tabla = document.getElementById('tablaJugadores');
    const headerRow = tabla.querySelector('thead tr');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');

    // Restaurar los nombres de los jugadores
    datos.jugadores.forEach(nombre => {
        const headerCell = document.createElement('th');
        headerCell.textContent = nombre;
        headerRow.appendChild(headerCell);
    });

    // Restaurar las puntuaciones
    datos.puntuaciones.forEach((puntuacionFila, filaIndex) => {
        puntuacionFila.forEach(puntuacion => {
            const cell = document.createElement('td');
            cell.contentEditable = "true";
            cell.textContent = puntuacion;
            cell.addEventListener('input', () => {
                calcularTotales();
                guardarDatos();
            });
            rows[filaIndex].appendChild(cell);
        });
    });

    // Restaurar los totales
    datos.totales.forEach(total => {
        const totalCell = document.createElement('td');
        totalCell.textContent = total;
        totalRow.appendChild(totalCell);
    });
}

// Función modificada para añadir un jugador y guardar datos
function agregarJugador() {
    const input = document.getElementById('nombreJugador');
    const tabla = document.getElementById('tablaJugadores');
    const nombreJugador = input.value.trim();

    if (!nombreJugador) {
        alert("Por favor, escribe el nombre de un jugador.");
        return;
    }

    const headerRow = tabla.querySelector('thead tr');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');

    // Crear celda en la cabecera
    const headerCell = document.createElement('th');
    headerCell.textContent = nombreJugador;
    headerRow.appendChild(headerCell);

    // Crear celdas vacías para cada fila en el cuerpo
    rows.forEach(row => {
        const cell = document.createElement('td');
        cell.contentEditable = "true";
        cell.textContent = "";
        cell.addEventListener('input', () => {
            calcularTotales();
            guardarDatos();
        });
        row.appendChild(cell);
    });

    // Añadir celda en la fila de totales
    const totalCell = document.createElement('td');
    totalCell.textContent = "0";
    totalRow.appendChild(totalCell);

    // Limpiar el campo de entrada
    input.value = "";

    // Guardar cambios en LocalStorage
    guardarDatos();
}

// Función modificada para reiniciar la tabla y guardar datos
function reiniciarTabla() {
    const tabla = document.getElementById('tablaJugadores');
    const headerRow = tabla.querySelector('thead tr');
    const rows = tabla.querySelectorAll('tbody tr, tfoot tr');

    // Eliminar columnas de jugadores
    while (headerRow.children.length > 1) {
        headerRow.removeChild(headerRow.lastChild);
    }

    // Eliminar celdas de puntuación y totales
    rows.forEach(row => {
        while (row.children.length > 1) {
            row.removeChild(row.lastChild);
        }
    });

    // Limpiar LocalStorage
    localStorage.removeItem('tablaDatos');
}

// Función modificada para reiniciar la partida y guardar datos
function reiniciarPartida() {
    const tabla = document.getElementById('tablaJugadores');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');

    // Limpiar celdas de puntuación
    rows.forEach(row => {
        for (let col = 1; col < row.children.length; col++) {
            row.children[col].textContent = "";
        }
    });

    // Limpiar totales
    for (let col = 1; col < totalRow.children.length; col++) {
        totalRow.children[col].textContent = "0";
    }

    // Guardar cambios en LocalStorage
    guardarDatos();
}

// Cargar los datos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarDatos);

// Función para calcular los totales de las puntuaciones
function calcularTotales() {
    const tabla = document.getElementById('tablaJugadores');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');

    for (let col = 1; col < totalRow.children.length; col++) {
        let total = 0;
        rows.forEach(row => {
            const value = parseInt(row.children[col].textContent) || 0;
            total += value;
        });
        totalRow.children[col].textContent = total;
    }
}

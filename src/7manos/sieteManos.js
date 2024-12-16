function agregarJugador() {
    const input = document.getElementById('nombreJugador');
    const tabla = document.getElementById('tablaJugadores');
    const nombreJugador = input.value.trim();
  
    if (!nombreJugador) {
      alert("Por favor, escribe el nombre de un jugador.");
      return;
    }
  
    // Añadir una nueva columna para el jugador
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
      cell.contentEditable = "true"; // Hacer la celda editable
      cell.textContent = ""; // Valor inicial vacío
      cell.addEventListener('input', () => calcularTotales()); // Recalcular totales al cambiar valor
      row.appendChild(cell);
    });
  
    // Añadir celda en la fila de totales
    const totalCell = document.createElement('td');
    totalCell.textContent = "0"; // Valor inicial de la columna total
    totalRow.appendChild(totalCell);
  
    // Limpiar el campo de entrada
    input.value = "";
  }
  
  function calcularTotales() {
    const tabla = document.getElementById('tablaJugadores');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');
  
    // Para cada columna (jugador)
    const numJugadores = tabla.querySelector('thead tr').children.length - 1;
    for (let col = 1; col <= numJugadores; col++) {
      let suma = 0;
  
      // Sumar valores en la columna
      rows.forEach(row => {
        const cell = row.children[col];
        const valor = parseInt(cell.textContent.trim()) || 0; // Convertir a número
        suma += valor;
      });
  
      // Actualizar la celda de total correspondiente
      totalRow.children[col].textContent = suma;
    }
  }
  
  function reiniciarTabla() {
    const tabla = document.getElementById('tablaJugadores');
  
    // Eliminar columnas de jugadores
    const headerRow = tabla.querySelector('thead tr');
    while (headerRow.children.length > 1) {
      headerRow.removeChild(headerRow.lastChild);
    }
  
    // Eliminar celdas de puntuación y totales
    const rows = tabla.querySelectorAll('tbody tr, tfoot tr');
    rows.forEach(row => {
      while (row.children.length > 1) {
        row.removeChild(row.lastChild);
      }
    });
  }
  
  function reiniciarPartida() {
    const tabla = document.getElementById('tablaJugadores');
    const rows = tabla.querySelectorAll('tbody tr');
    const totalRow = tabla.querySelector('tfoot .total-row');
  
    // Limpiar celdas de puntuación
    rows.forEach(row => {
      for (let col = 1; col < row.children.length; col++) {
        row.children[col].textContent = ""; // Dejar en blanco
      }
    });
  
    // Limpiar totales
    for (let col = 1; col < totalRow.children.length; col++) {
      totalRow.children[col].textContent = "0";
    }
  }
  
document.addEventListener('DOMContentLoaded', () => {
    const dadoBloques = document.querySelectorAll('.dado-bloque');

    dadoBloques.forEach(bloque => {
        const botonMenos = bloque.querySelector('.botones button:first-child');
        const botonMas = bloque.querySelector('.botones button:last-child');
        const contadorElemento = bloque.querySelector('.contador');

        let contador = 0; // Inicializamos el contador para cada bloque

        botonMas.addEventListener('click', () => {
            contador++;
            contadorElemento.textContent = contador;
        });

        botonMenos.addEventListener('click', () => {
            if (contador > 0) {
                contador--;
                contadorElemento.textContent = contador;
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (código para los contadores de arriba) ...

    const botonLanzar = document.getElementById('lanzarDados');
    const resultadosDiv = document.querySelector('.resultados');

    botonLanzar.addEventListener('click', async () => {
        const dadosSeleccionados = {};
        const dadoBloques = document.querySelectorAll('.dado-bloque');

        dadoBloques.forEach(bloque => {
            const tipoDado = bloque.dataset.sides; // Obtener el tipo de dado (e.g., "4", "6")
            const contadorElemento = bloque.querySelector('.contador');
            const cantidad = parseInt(contadorElemento.textContent);

            if (cantidad > 0) {
                dadosSeleccionados[`D${tipoDado}`] = cantidad;
            }
        });

        console.log("Dados a lanzar:", dadosSeleccionados); // Para depuración

        try {
            const response = await fetch('/lanzar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosSeleccionados)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Resultados del lanzamiento:", data); // Para depuración

            // Mostrar los resultados en la interfaz
            resultadosDiv.innerHTML = '<h2>Resultados del lanzamiento:</h2>';
            for (const tipoDado in data) {
                const resultados = data[tipoDado];
                resultadosDiv.innerHTML += `<p>${tipoDado}: ${resultados.join(', ')} (Suma: ${resultados.reduce((a, b) => a + b, 0)})</p>`;
            }

        } catch (error) {
            console.error("Error al lanzar los dados:", error);
            resultadosDiv.innerHTML = `<p style="color: red;">Error al lanzar los dados: ${error.message}</p>`;
        }
    });
});
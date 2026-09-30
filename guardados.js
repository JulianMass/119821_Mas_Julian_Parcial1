let seriesGuardadas = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

let contenedor = document.getElementById("series");

function mostrarSeries(series) {
    contenedor.innerHTML = "";

    series.forEach(datos => {
        let serie = Serie.createFromJsonString(JSON.stringify(datos));

        let elemento = serie.createHtmlElement();

        contenedor.appendChild(elemento);
    });
}

mostrarSeries(seriesGuardadas);

document.getElementById("ordenarAZ").addEventListener("click", () => {
    seriesGuardadas.sort((a, b) => a.name.localeCompare(b.name));

    mostrarSeries(seriesGuardadas);
});

document.getElementById("ordenarZA").addEventListener("click", () => {
    seriesGuardadas.sort((a, b) => b.name.localeCompare(a.name));

    mostrarSeries(seriesGuardadas);
});
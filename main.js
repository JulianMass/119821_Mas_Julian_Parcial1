function mostrarSeries(series) {
    let contenedor = document.getElementById("series");

    contenedor.innerHTML = "";

    series.forEach(datosSerie => {
        let serie = new Serie(datosSerie.id, datosSerie.url, datosSerie.name, datosSerie.language, datosSerie.genres, datosSerie.image ? datosSerie.image.medium : "");
        
        let elemento = serie.createHtmlElement();

        contenedor.appendChild(elemento);
    });
}

function cargarSeries() {
    cargarPagina(1);
}

let paginaActual = 1;

function cargarPagina(numeroPagina) {
    fetch(`https://api.tvmaze.com/shows?page=${numeroPagina - 1}`)
        .then(respuesta => respuesta.json())
        .then(datos => {

            let series = datos.slice(0, 6);

            mostrarSeries(series);
            actualizarBotones();

        })
        .catch(error => {

            console.log("Error:", error);

        });
}

function actualizarBotones() {
    document.getElementById("anterior").disabled = paginaActual === 1;
}

function paginaSiguiente() {
    paginaActual++;

    cargarPagina(paginaActual);
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;

        cargarPagina(paginaActual);
    }
}

cargarSeries();

document.getElementById("siguiente").addEventListener("click", paginaSiguiente);
document.getElementById("anterior").addEventListener("click", paginaAnterior);

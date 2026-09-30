class Serie {

    id
    url
    name
    language
    genres
    image

    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        let datos = JSON.parse(json);

        return new Serie(datos.id, datos.url, datos.name, datos.language, datos.genres, datos.image);
    }

    createHtmlElement() {
        let div = document.createElement("div");
        div.classList.add("serie");

        let imagen = document.createElement("img");
        imagen.src = this.image;

        imagen.onclick = () => {
            window.open(this.url, "_blank");
        };

        let nombre = document.createElement("h2");
        nombre.textContent = this.name;

        let idioma = document.createElement("p");
        idioma.textContent = `Idioma: ${this.language}`;

        let generos = document.createElement("p");
        generos.textContent = `Géneros: ${this.genres.join(", ")}`;

        let botonGuardar = document.createElement("button");
        botonGuardar.textContent = "Guardar";

        botonGuardar.addEventListener("click", () => {
            Serie.guardarSerie(this);
        });

        div.appendChild(imagen);
        div.appendChild(nombre);
        div.appendChild(idioma);
        div.appendChild(generos);
        div.appendChild(botonGuardar);

        return div;
    }
    
    static guardarSerie(serie) {
        let seriesGuardadas = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

        let existe = seriesGuardadas.some(s => s.id === serie.id);
        
        if (!existe) {
            seriesGuardadas.push(serie);

            localStorage.setItem("seriesGuardadas", JSON.stringify(seriesGuardadas));
        }
    }    
}
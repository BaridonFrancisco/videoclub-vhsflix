document.addEventListener("DOMContentLoaded", function () {
    const addPeliculaForm = document.getElementById("addPeliculaForm");
    const parrafoAlerta = document.createElement("P");
    const tituloElement = document.getElementById("nombre");
    const anioLanzamientoElement = document.getElementById("anioLanzamiento");
    const duracionElement = document.getElementById("duracion");
    const generoElement = document.getElementById("genero");
    const directorElement = document.getElementById("director");
    const repartoElement = document.getElementById("reparto");
    const descripcionElement = document.getElementById("descripcion");
    const urlThrillerElement = document.getElementById("urlThriller");


    const imageElement = document.getElementById("imagen");
    const imagenPreview = document.getElementById("imagenPreview");
    const imagenContainer = document.getElementById("imagenContainer");

    addPeliculaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const datos = new FormData();
        datos.append("action", "add");
        datos.append("nombre", tituloElement.value);
        datos.append("anioLanzamiento", anioLanzamientoElement.value);
        datos.append("duracion", duracionElement.value);
        datos.append("genero", generoElement.value);
        datos.append("director", directorElement.value);
        datos.append("reparto", repartoElement.value);
        datos.append("descripcion", descripcionElement.value);
        datos.append("urlThriller", urlThrillerElement.value);
        datos.append("imagen", imageElement.files[0]);

        fetch("/app/peliculas", {
            method: "POST",
            body: datos
        })
                .then(response => response.json())
                .then(data => {
                    parrafoAlerta.textContent = data.message;
                    addPeliculaForm.appendChild(parrafoAlerta);

                    setTimeout(() => {
                        parrafoAlerta.remove();
                        tituloElement.value = "";
                        anioLanzamientoElement.value = "";
                        duracionElement.value = "";
                        generoElement.value = "";
                        directorElement.value = "";
                        repartoElement.value = "";
                        descripcionElement.value = "";
                        urlThrillerElement.value = "";
                        imageElement.value = "";
                        imagenContainer.classList.add("d-none");
                        window.location.href = "/app/index.html";
                    }, 2000);

                });
    });

    imageElement.addEventListener("change", function () {
        const selectedImage = imageElement.files[0];

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagenPreview.src = e.target.result;
                imagenContainer.classList.remove("d-none");
            };
            reader.readAsDataURL(selectedImage);
        } else {
            imagenPreview.src = "";
        }
    });
});
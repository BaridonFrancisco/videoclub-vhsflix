document.addEventListener("DOMContentLoaded", function () {
    const cardsPeliculas = document.getElementById("peliculasCard");
    const peliculas = [];

    function cargarListaPeliculas() {
        fetch("/app/peliculas?action=listAll")
                .then(res => res.json())
                .then(data => {
                    data.forEach(pelicula => {
                        peliculas.push(pelicula);
                        cardsPeliculas.innerHTML += `
                            <div class="col-md-3 mb-4 ident" data-pelicula-id="${pelicula.idPelicula}">
                                <div class="card h-100 animate-hover-card">
                                    <img src="data:image/jpeg;base64,${pelicula.imagenBase64}" class="card-img-top h-75" alt="Imagen Portada de la Pelicula">
                                    <div class="card-body">
                                        <h5 class="card-title">${pelicula.nombre}</h5>
                                        <p class="card-text">${pelicula.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        `
                    })
                })
    }


    function filterPeliculas(palabra) {
        const peliculasFiltradas = peliculas.filter(pelicula => {
            return pelicula.nombre.toLowerCase().includes(palabra.toLowerCase());
        })

        cardsPeliculas.innerHTML = "";

        peliculasFiltradas.forEach(pelicula => {
            const card = document.createElement("div");
            card.className = "col-md-3 mb-4 ident";
            card.setAttribute("data-pelicula-id", pelicula.idPelicula);
            card.innerHTML = `
                <div class="card h-100 animate-hover-card">
                    <img src="data:image/jpeg;base64, ${pelicula.imagenBase64}" class="card-img-top h-75" alt="Imagen de portada">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.nombre}</h5>
                        <p class="card-text">${pelicula.descripcion}</p>
                    </div>
                </div>
            `;
            cardsPeliculas.appendChild(card);
        });
    }

    const searchForm = document.querySelector("form[role='search']")
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const searchTerm = searchForm.querySelector("input[type='search']").value;
        filterPeliculas(searchTerm);
    });


    cardsPeliculas.addEventListener("click", function (e) {
        const clickedCard = e.target.closest(".ident");
        if (!clickedCard) {
            return;
        }

        const idPelicula = clickedCard.dataset.peliculaId;
        fetch(`/app/peliculas?action=getDetails&id=${idPelicula}`, )
                .then(response => response.json())
                .then(peliculaDetails => {
                    const queryParams = new URLSearchParams({
                        id: peliculaDetails.idPelicula
                    });

                    window.location.href = `/app/pages/PeliculasDetalles.html?${queryParams.toString()}`;
                })
                .catch(error => console.error("Error en la solicitud GET:", error));
    });



    cargarListaPeliculas();

});

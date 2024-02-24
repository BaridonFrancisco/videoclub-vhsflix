document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);

    const PeliculaDetallesId = {
        id: queryParams.get("id")
    };

    const PeliculaDetallesContainer = document.getElementById("PeliculasDetalles");
    const btnEliminarElement = document.getElementById("btnEliminar");
    const btnModificarElement = document.getElementById("btnModificar");
    const btnGuardarElement = document.getElementById("btnGuardar");
    const btnContainerElement = document.getElementById("btnContainer");


    let objetoPelicula = {
        id: 0,
        nombre: "",
        anioLanzamiento: 0,
        duracion: 0,
        genero: "",
        director: "",
        reparto: "",
        descripcion: "",
        urlThriller: "",
        portada: ""

    };

    function loadPelicula() {

        fetch(`/app/peliculas?action=getById&id=${PeliculaDetallesId.id}`)
                .then(response => response.json())
                .then(data => {
                    PeliculaDetallesContainer.innerHTML += `
                    <div class="col-md-6 text-center">
                      <div class="clearfix">
                        <img src="data:image/jpeg;base64,${data.imagenBase64}" class="my-4 img-fluid" style="width: 75%" alt="imagen de pelicula"/>
                      </div>
                    </div>
                    <div class="card-body col-md-6">
                       <ul class="list-group list-group-flush">
                         <li class="list-group-item">
                           <h2 class="card-title">${data.nombre}</h2>
                         </li>
                         <li class="list-group-item">Año de Lanzamiento: ${data.anioLanzamiento} </li>
                         <li class="list-group-item">Duración: ${data.duracion} min</li>
                         <li class="list-group-item">Genero: ${data.genero} </li>
                         <li class="list-group-item">Director: ${data.director} </li>
                         <li class="list-group-item">Reparto: ${data.reparto} </li>
                         <li class="list-group-item">Descripción: ${data.descripcion} </li>
                         <li class="list-group-item text-center"><iframe width="400" height="250" src="${data.urlThriller}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></li>
                       </ul>
                    </div>
                    `;
                    objetoPelicula.id = data.id;
                    objetoPelicula.nombre = data.nombre;
                    objetoPelicula.anioLanzamiento = data.anioLanzamiento;
                    objetoPelicula.duracion = data.duracion;
                    objetoPelicula.genero = data.genero;
                    objetoPelicula.director = data.director;
                    objetoPelicula.reparto = data.reparto;
                    objetoPelicula.descripcion = data.descripcion;
                    objetoPelicula.urlThriller = data.urlThriller;
                    objetoPelicula.portada = data.imagenBase64;


                });
    }

    btnEliminarElement.addEventListener("click", function () {
        if (!confirm(`¿Está seguro que desea eliminar la pelicula: ${objetoPelicula.nombre}?`)) {
            return;
        } else {
            fetch(`/app/peliculas?action=eliminarPelicula&id=${PeliculaDetallesId.id}`, {
                method: "DELETE"
            })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message.toLowerCase() === "ok") {
                            setTimeout(() => {
                                window.location.href = "/app/index.html";
                            }, 2000);
                        }
                    })
        }
    });

    btnModificarElement.addEventListener("click", function () {
        btnModificarElement.classList.add("d-none");
        btnEliminarElement.classList.add("d-none");
        btnGuardarElement.classList.remove("d-none");


        PeliculaDetallesContainer.innerHTML = `
                <div class="col-md-6 text-center">
                    <div class="clearfix">
                        <img src="data:image/jpeg;base64,${objetoPelicula.portada}" class="my-4" style="width: 75%;" alt="imagen de pelicula"/>
                    </div>
                </div>
                <div class="card-body col-md-6">
                    <form class="mb-4" id="updatePeliculaForm" enctype="multipart/form-data">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-floating my-3">
                                        <input type="text" class="form-control" name="nombre" id="nombre" required/>
                                        <label for="nombre">Título</label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="number" class="form-control" name="anioLanzamiento" id="anioLanzamiento" required/>
                                            <label for="anioLanzamiento"> Año de lanzamiento</label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="number" class="form-control" name="duracion" id="duracion" required/>
                                        <label for="duracion"> Duración</label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="text" class="form-control" name="genero" id="genero" required/>
                                        <label for="genero">Género</label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-floating my-3">
                                        <input type="text" class="form-control" name="director" id="director" required/>
                                        <label for="director">Director</label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="text" class="form-control" name="reparto" id="reparto" required/>
                                        <label for="reparto">Reparto</label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <textarea class="form-control" placeholder="Escriba aquí la descripción" name="descripcion" id="descripcion"></textarea>
                                        <label for="descripcion"> Descripción </label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="text" class="form-control" name="urlThriller" id="urlThriller" required/>
                                        <label for="urlThriller">Thriller Url</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                `;
    });
    btnGuardarElement.addEventListener("click", function (e) {
        e.preventDefault();
        const form = new FormData();
        form.append("action", "update");
        form.append("idPelicula", PeliculaDetallesId.id);
        form.append("nombre", document.getElementById("nombre").value);
        form.append("anioLanzamiento", document.getElementById("anioLanzamiento").value);
        form.append("duracion", document.getElementById("duracion").value);
        form.append("genero", document.getElementById("genero").value);
        form.append("director", document.getElementById("director").value);
        form.append("reparto", document.getElementById("reparto").value);
        form.append("descripcion", document.getElementById("descripcion").value);
        form.append("urlThriller", document.getElementById("urlThriller").value);

        fetch(`/app/peliculas`, {
            method: "POST",
            body: form

        })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud:${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success == "true") {
                        window.location.href = `/app/index.html`;
                    } else {
                        console.log("solicitud exitosa, pero error en la respuesta" + data.message);
                    }
                })
    });


    loadPelicula();
});

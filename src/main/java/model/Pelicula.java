package model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Pelicula {

    private int idPelicula;
    private String nombre;
    private int anioLanzamiento;
    private String duracion;
    private String genero;
    private String director;
    private String reparto;
    private String descripcion;
    private String urlThriller;
    private byte[] imagen;
    private String imagenBase64;
    private boolean activa;

    public Pelicula(String nombre, int anioLanzamiento, String duracion, String genero, String director, String reparto, String descripcion, String urlThriller, byte[] imagen, boolean activa) {
        this.nombre = nombre;
        this.anioLanzamiento = anioLanzamiento;
        this.duracion = duracion;
        this.genero = genero;
        this.director = director;
        this.reparto = reparto;
        this.descripcion = descripcion;
        this.urlThriller = urlThriller;
        this.imagen = imagen;
        this.activa = activa;
    }

    public Pelicula(int idPelicula, String nombre, int anioLanzamiento, String duracion, String genero, String director, String reparto, String descripcion, String urlThriller, byte[] imagen) {
        this.idPelicula = idPelicula;
        this.nombre = nombre;
        this.anioLanzamiento = anioLanzamiento;
        this.duracion = duracion;
        this.genero = genero;
        this.director = director;
        this.reparto = reparto;
        this.descripcion = descripcion;
        this.urlThriller = urlThriller;
        this.imagen = imagen;
    }

    public Pelicula(int idPelicula, String nombre, int anioLanzamiento, String duracion, String genero, String director, String reparto, String descripcion, String urlThriller) {
        this.idPelicula = idPelicula;
        this.nombre = nombre;
        this.anioLanzamiento = anioLanzamiento;
        this.duracion = duracion;
        this.genero = genero;
        this.director = director;
        this.reparto = reparto;
        this.descripcion = descripcion;
        this.urlThriller = urlThriller;
    }

    public Pelicula() {

    }

}

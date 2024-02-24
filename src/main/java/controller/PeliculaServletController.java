package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import data.PeliculaDAO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import model.Pelicula;
import org.apache.commons.io.IOUtils;

@WebServlet("/peliculas")
@MultipartConfig(
        location = "/media/temp",
        fileSizeThreshold = 1024 * 1024,
        maxFileSize = 1024 * 1024 * 5,
        maxRequestSize = 1024 * 1024 * 10
)
public class PeliculaServletController extends HttpServlet {

    private List<Pelicula> listaPeliculas = new ArrayList<>();
    ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String route = req.getParameter("action");

        switch (route) {
            case "listAll" -> {
                res.setContentType("application/json; charset=UTF-8");
                listaPeliculas = PeliculaDAO.recuperarPeliculas();

                for (Pelicula pelicula : listaPeliculas) {
                    byte[] imagenBytes = pelicula.getImagen();
                    String imagenBase64 = Base64.getEncoder().encodeToString(imagenBytes);
                    pelicula.setImagenBase64(imagenBase64);
                }
                mapper.writeValue(res.getWriter(), listaPeliculas);
            }

            case "getDetails" -> {
                String idPelicula = req.getParameter("id");
                Pelicula peliculaDetalles = PeliculaDAO.recuperarPeliculaPorId(Integer.parseInt(idPelicula));

                res.setContentType("application/json");
                mapper.writeValue(res.getWriter(), peliculaDetalles);
            }

            case "getById" -> {
                int id = Integer.parseInt(req.getParameter("id"));
                res.setContentType("application/json; charset=UTF-8");

                Pelicula pelicula = PeliculaDAO.recuperarPeliculaPorId(id);
                byte[] imagenBytes = pelicula.getImagen();
                String imagenBase64 = Base64.getEncoder().encodeToString(imagenBytes);
                pelicula.setImagenBase64(imagenBase64);

                mapper.writeValue(res.getWriter(), pelicula);
            }

            default ->
                System.out.println("Parametro Invalido");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        req.setCharacterEncoding("UTF-8");
        String route = req.getParameter("action");

        switch (route) {
            case "add" -> {
                String nombre = req.getParameter("nombre");
                int anioLanzamiento = Integer.parseInt(req.getParameter("anioLanzamiento"));
                String duracion = req.getParameter("duracion");
                String genero = req.getParameter("genero");
                String director = req.getParameter("director");
                String reparto = req.getParameter("reparto");
                String descripcion = req.getParameter("descripcion");
                String urlThriller = req.getParameter("urlThriller");

                Part filePart = req.getPart("imagen");
                byte[] imagenBytes = IOUtils.toByteArray(filePart.getInputStream());

                Pelicula pelicula = new Pelicula(nombre, anioLanzamiento, duracion, genero, director, reparto, descripcion, urlThriller, imagenBytes, true);

                PeliculaDAO.insertar(pelicula);

                res.setContentType("application/json");
                res.setCharacterEncoding("UTF-8");

                Map<String, String> response = new HashMap();
                response.put("message", "Pelicula guardada con éxito!");

                mapper.writeValue(res.getWriter(), response);
            }
            case "update" -> {
                try {
                    int idPelicula = Integer.parseInt(req.getParameter("idPelicula"));
                    String nombre = req.getParameter("nombre");
                    int anioLanzamiento = Integer.parseInt(req.getParameter("anioLanzamiento"));
                    String duracion = req.getParameter("duracion");
                    String genero = req.getParameter("genero");
                    String director = req.getParameter("director");
                    String reparto = req.getParameter("reparto");
                    String descripcion = req.getParameter("descripcion");
                    String urlThriller = req.getParameter("urlThriller");

                    Pelicula pelicula = new Pelicula(idPelicula, nombre, anioLanzamiento, duracion, genero, director, reparto, descripcion, urlThriller);
                    PeliculaDAO.actualizar(pelicula);

                    res.setContentType("application/json");
                    res.setCharacterEncoding("UTF-8");

                    Map<String, String> response = new HashMap<>();
                    response.put("success", "true");

                    mapper.writeValue(res.getWriter(), response);
                } catch (Exception e) {
                    res.setContentType("application/json");
                    res.setCharacterEncoding("UTF-8");

                    Map<String, String> responseFail = new HashMap<>();
                    responseFail.put("success", "false");
                    responseFail.put("message", e.getMessage());

                    mapper.writeValue(res.getWriter(), responseFail);
                }
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String route = req.getParameter("action");

        switch (route) {
            case "eliminarPelicula" -> {
                int idPelicula = Integer.parseInt(req.getParameter("id"));
                int registroAfectado = PeliculaDAO.eliminar(idPelicula);

                if (registroAfectado == 1) {
                    res.setContentType("application/json");
                    Map<String, String> response = new HashMap();
                    response.put("message", "ok");

                    mapper.writeValue(res.getWriter(), response);
                }
            }
        }
    }
}

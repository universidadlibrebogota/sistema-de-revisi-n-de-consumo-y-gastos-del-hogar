package com.gastos.hogar.Servicios;

import com.gastos.hogar.Entidades.Recomendacion;
import com.gastos.hogar.Entidades.Usuario;
import com.gastos.hogar.Repositorios.Gastorepositorio;
import com.gastos.hogar.Repositorios.Gastorepositorio;
import com.gastos.hogar.Repositorios.RecomendacionRepositorio;
import com.gastos.hogar.Repositorios.RecomendacionRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RecomendacionServicio {

    @Autowired
    private RecomendacionRepositorio recomendacionRepository;

    @Autowired
    private Gastorepositorio gastoRepository;

    public void generarRecomendaciones(Usuario usuario) {

        List<Recomendacion> lista = recomendacionRepository.findByUsuarioId(usuario.getId());

        if (lista.isEmpty()) {
            Recomendacion r = new Recomendacion();
            r.setMensaje("Reduce el consumo innecesario en servicios públicos");
            r.setFecha(LocalDate.now());
            r.setUsuario(usuario);

            recomendacionRepository.save(r);
        }
    }

    public List<Recomendacion> listar(Long usuarioId) {
        return recomendacionRepository.findByUsuarioId(usuarioId);
    }
}
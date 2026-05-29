package com.gastos.hogar.Servicios;

import com.gastos.hogar.Entidades.Alerta;
import com.gastos.hogar.Entidades.Usuario;
import com.gastos.hogar.Repositorios.AlertaRepositorio;
import com.gastos.hogar.Repositorios.AlertaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AlertaServicio {

    @Autowired
    private AlertaRepositorio alertaRepository;

    public void generarAlerta(Usuario usuario, String mensaje) {

        Alerta alerta = new Alerta();
        alerta.setMensaje(mensaje);
        alerta.setFecha(LocalDate.now());
        alerta.setActiva(true);
        alerta.setUsuario(usuario);

        alertaRepository.save(alerta);
    }

    public List<Alerta> obtenerActivas(Long usuarioId) {
        return alertaRepository.findByUsuarioIdAndActivaTrue(usuarioId);
    }
}

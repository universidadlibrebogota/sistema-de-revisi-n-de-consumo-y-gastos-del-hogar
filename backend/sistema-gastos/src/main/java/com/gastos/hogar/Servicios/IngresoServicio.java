package com.gastos.hogar.Servicios;

import com.gastos.hogar.DTO.IngresoDTO;
import com.gastos.hogar.Entidades.Ingreso;
import com.gastos.hogar.Entidades.Usuario;
import com.gastos.hogar.Repositorios.IngresoRepositorio;
import com.gastos.hogar.Repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngresoServicio {

    @Autowired
    private IngresoRepositorio ingresoRepository;

    @Autowired
    private UsuarioRepositorio usuarioRepository;

    public Ingreso crearIngreso(IngresoDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Ingreso ingreso = new Ingreso();
        ingreso.setValor(dto.getValor());
        ingreso.setFecha(dto.getFecha());
        ingreso.setUsuario(usuario);

        return ingresoRepository.save(ingreso);
    }

    public List<Ingreso> listarPorUsuario(Long usuarioId) {
        return ingresoRepository.findByUsuarioId(usuarioId);
    }
}
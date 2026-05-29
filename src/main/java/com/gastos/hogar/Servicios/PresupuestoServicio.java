package com.gastos.hogar.Servicios;

import com.gastos.hogar.DTO.PresupuestoDTO;
import com.gastos.hogar.Entidades.Presupuesto;
import com.gastos.hogar.Entidades.Usuario;
import com.gastos.hogar.Repositorios.PresupuestoRepositorio;
import com.gastos.hogar.Repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PresupuestoServicio {

    @Autowired
    private PresupuestoRepositorio presupuestoRepository;

    @Autowired
    private UsuarioRepositorio usuarioRepository;

    public Presupuesto guardar(PresupuestoDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Presupuesto presupuesto = new Presupuesto();
        presupuesto.setCategoria(dto.getCategoria());
        presupuesto.setLimite(dto.getLimite());
        presupuesto.setUsuario(usuario);

        return presupuestoRepository.save(presupuesto);
    }
}
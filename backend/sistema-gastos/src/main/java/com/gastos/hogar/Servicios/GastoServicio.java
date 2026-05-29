package com.gastos.hogar.Servicios;

import com.gastos.hogar.DTO.GastoDTO;
import com.gastos.hogar.Entidades.Gasto;
import com.gastos.hogar.Entidades.Presupuesto;
import com.gastos.hogar.Entidades.Usuario;
import com.gastos.hogar.Repositorios.Gastorepositorio;
import com.gastos.hogar.Repositorios.PresupuestoRepositorio;
import com.gastos.hogar.Repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GastoServicio {

    @Autowired
    private Gastorepositorio gastoRepository;

    @Autowired
    private UsuarioRepositorio usuarioRepository;

    @Autowired
    private PresupuestoRepositorio presupuestoRepository;

    @Autowired
    private AlertaServicio alertaService;

    public Gasto crearGasto(GastoDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (dto.getValor() <= 0) {
            throw new RuntimeException("El valor del gasto debe ser mayor a 0");
        }

        Gasto gasto = new Gasto();
        gasto.setCategoria(dto.getCategoria());
        gasto.setValor(dto.getValor());
        gasto.setFecha(dto.getFecha());
        gasto.setUsuario(usuario);

        Gasto guardado = gastoRepository.save(gasto);

        //  VALIDAR PRESUPUESTO Y GENERAR ALERTA
        presupuestoRepository.findByUsuarioIdAndCategoria(usuario.getId(), dto.getCategoria())
                .ifPresent(presupuesto -> {
                    if (dto.getValor() > presupuesto.getLimite()) {
                        alertaService.generarAlerta(
                                usuario,
                                "Exceso en categoría: " + dto.getCategoria()
                        );
                    }
                });

        return guardado;
    }

    public List<Gasto> listarPorUsuario(Long usuarioId) {
        return gastoRepository.findByUsuarioId(usuarioId);
    }
}

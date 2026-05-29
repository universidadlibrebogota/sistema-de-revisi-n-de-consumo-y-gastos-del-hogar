package com.gastos.hogar.Repositorios;

import com.gastos.hogar.Entidades.Presupuesto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PresupuestoRepositorio extends JpaRepository<Presupuesto, Long> {

    List<Presupuesto> findByUsuarioId(Long usuarioId);

    Optional<Presupuesto> findByUsuarioIdAndCategoria(Long usuarioId, String categoria);

}

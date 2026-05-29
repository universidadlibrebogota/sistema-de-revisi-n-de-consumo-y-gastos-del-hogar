package com.gastos.hogar.Repositorios;

import com.gastos.hogar.Entidades.Ingreso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngresoRepositorio extends JpaRepository<Ingreso, Long> {

    List<Ingreso> findByUsuarioId(Long usuarioId);

}

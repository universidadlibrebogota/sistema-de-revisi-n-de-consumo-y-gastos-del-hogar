package com.gastos.hogar.Repositorios;

import com.gastos.hogar.Entidades.Recomendacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecomendacionRepositorio extends JpaRepository<Recomendacion, Long> {

    List<Recomendacion> findByUsuarioId(Long usuarioId);

}

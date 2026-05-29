package com.gastos.hogar.Repositorios;

import com.gastos.hogar.Entidades.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertaRepositorio extends JpaRepository<Alerta, Long> {

    List<Alerta> findByUsuarioIdAndActivaTrue(Long usuarioId);

}

package com.gastos.hogar.Repositorios;

import com.gastos.hogar.Entidades.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Gastorepositorio extends JpaRepository<Gasto, Long> {

    List<Gasto> findByUsuarioId(Long usuarioId);

    List<Gasto> findByCategoria(String categoria);

}

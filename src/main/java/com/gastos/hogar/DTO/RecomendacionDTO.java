package com.gastos.hogar.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RecomendacionDTO {

    private String mensaje;
    private LocalDate fecha;
    private Long usuarioId;

}
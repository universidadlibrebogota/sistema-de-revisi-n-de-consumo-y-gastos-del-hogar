package com.gastos.hogar.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class IngresoDTO {

    private Double valor;
    private LocalDate fecha;
    private Long usuarioId;

}
package com.gastos.hogar.DTO;


import lombok.Data;

import java.time.LocalDate;

@Data
public class GastoDTO {

    private String categoria;
    private Double valor;
    private LocalDate fecha;
    private Long usuarioId;

}


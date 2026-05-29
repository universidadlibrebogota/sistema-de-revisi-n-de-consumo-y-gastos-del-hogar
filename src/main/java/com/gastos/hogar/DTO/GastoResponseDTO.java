package com.gastos.hogar.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GastoResponseDTO {

    private Long id;
    private String categoria;
    private Double valor;
    private LocalDate fecha;

}

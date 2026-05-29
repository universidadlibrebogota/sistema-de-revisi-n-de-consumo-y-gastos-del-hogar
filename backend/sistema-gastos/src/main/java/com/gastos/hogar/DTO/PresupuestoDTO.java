package com.gastos.hogar.DTO;


import lombok.Data;

@Data
public class PresupuestoDTO {

    private String categoria;
    private Double limite;
    private Long usuarioId;

}


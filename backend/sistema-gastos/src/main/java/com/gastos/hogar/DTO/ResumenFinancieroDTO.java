package com.gastos.hogar.DTO;

import lombok.Data;

@Data
public class ResumenFinancieroDTO {

    private Double totalGastos;
    private Double totalIngresos;
    private Double balance;

}
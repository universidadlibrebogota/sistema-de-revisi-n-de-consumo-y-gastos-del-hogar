package com.gastos.hogar.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AlertaDTO {

    private String mensaje;
    private LocalDate fecha;
    private boolean activa;
    private Long usuarioId;

}
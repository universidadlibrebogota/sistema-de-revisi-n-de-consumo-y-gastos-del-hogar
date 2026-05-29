package com.gastos.hogar.Controller;

import com.gastos.hogar.Entidades.Alerta;
import com.gastos.hogar.Servicios.AlertaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertas")
@CrossOrigin
public class AlertaController {

    @Autowired
    private AlertaServicio alertaService;

    @GetMapping("/usuario/{id}")
    public List<Alerta> obtener(@PathVariable Long id) {
        return alertaService.obtenerActivas(id);
    }
}
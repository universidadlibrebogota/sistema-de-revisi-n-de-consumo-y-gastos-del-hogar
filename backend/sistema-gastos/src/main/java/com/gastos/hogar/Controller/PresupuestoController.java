package com.gastos.hogar.Controller;

import com.gastos.hogar.DTO.PresupuestoDTO;
import com.gastos.hogar.Entidades.Presupuesto;
import com.gastos.hogar.Servicios.PresupuestoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/presupuestos")
@CrossOrigin
public class PresupuestoController {

    @Autowired
    private PresupuestoServicio presupuestoService;

    @PostMapping
    public Presupuesto guardar(@RequestBody PresupuestoDTO dto) {
        return presupuestoService.guardar(dto);
    }
}
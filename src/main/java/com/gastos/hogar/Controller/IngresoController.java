package com.gastos.hogar.Controller;

import com.gastos.hogar.DTO.IngresoDTO;
import com.gastos.hogar.Entidades.Ingreso;
import com.gastos.hogar.Servicios.IngresoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingresos")
@CrossOrigin
public class IngresoController {

    @Autowired
    private IngresoServicio ingresoService;

    @PostMapping
    public Ingreso crear(@RequestBody IngresoDTO dto) {
        return ingresoService.crearIngreso(dto);
    }

    @GetMapping("/usuario/{id}")
    public List<Ingreso> listar(@PathVariable Long id) {
        return ingresoService.listarPorUsuario(id);
    }
}
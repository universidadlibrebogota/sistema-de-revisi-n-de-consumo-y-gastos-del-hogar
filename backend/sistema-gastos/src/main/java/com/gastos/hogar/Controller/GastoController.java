package com.gastos.hogar.Controller;

import com.gastos.hogar.DTO.GastoDTO;
import com.gastos.hogar.Entidades.Gasto;
import com.gastos.hogar.Servicios.GastoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gastos")
@CrossOrigin(origins = "*")
public class GastoController {

    @Autowired
    private GastoServicio gastoService;

    @PostMapping
    public Gasto crear(@RequestBody GastoDTO dto) {
        return gastoService.crearGasto(dto);
    }

    @GetMapping("/usuario/{id}")
    public List<Gasto> listar(@PathVariable Long id) {
        return gastoService.listarPorUsuario(id);
    }
}
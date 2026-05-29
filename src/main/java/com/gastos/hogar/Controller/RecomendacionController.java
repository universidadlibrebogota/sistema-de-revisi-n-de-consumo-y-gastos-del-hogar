package com.gastos.hogar.Controller;

import com.gastos.hogar.Entidades.Recomendacion;
import com.gastos.hogar.Servicios.RecomendacionServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recomendaciones")
@CrossOrigin
public class RecomendacionController {

    @Autowired
    private RecomendacionServicio recomendacionService;

    @GetMapping("/usuario/{id}")
    public List<Recomendacion> listar(@PathVariable Long id) {
        return recomendacionService.listar(id);
    }
}

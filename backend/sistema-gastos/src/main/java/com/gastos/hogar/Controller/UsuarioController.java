package com.gastos.hogar.Controller;

import com.gastos.hogar.DTO.LoginDTO;
import com.gastos.hogar.DTO.UsuarioDTO;
import com.gastos.hogar.Entidades.Usuario;

import com.gastos.hogar.Servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioServicio usuarioService;

    @PostMapping("/registro")
public Usuario registrar(@Valid @RequestBody UsuarioDTO dto) {
    return usuarioService.registrar(dto);
}

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginDTO dto) {
        return usuarioService.login(dto);
    }
}

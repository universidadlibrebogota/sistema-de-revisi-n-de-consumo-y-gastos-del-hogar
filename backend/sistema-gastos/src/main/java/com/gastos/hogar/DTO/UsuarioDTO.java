package com.gastos.hogar.DTO;

import lombok.Data;

@Data
public class UsuarioDTO {


  @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, message = "El nombre debe tener mínimo 3 caracteres")
    private String nombre;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Correo inválido")
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener mínimo 6 caracteres")
    private String password;

}

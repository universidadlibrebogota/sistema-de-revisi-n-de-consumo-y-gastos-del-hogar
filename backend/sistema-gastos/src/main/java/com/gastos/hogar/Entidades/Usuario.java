package com.gastos.hogar.Entidades;

import jakarta.persistence.*;

import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
@NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, message = "El nombre debe tener mínimo 3 caracteres")

    private String nombre;

    @Column(unique = true)
    
@NotBlank(message = "El correo es obligatorio")
    @Email(message = "Correo inválido")

    private String correo;
    
@NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener mínimo 6 caracteres")

    private String password;

    @OneToMany(mappedBy = "usuario")
    private List<Gasto> gastos;

    @OneToMany(mappedBy = "usuario")
    private List<Ingreso> ingresos;

    @OneToMany(mappedBy = "usuario")
    private List<Presupuesto> presupuestos;
}
